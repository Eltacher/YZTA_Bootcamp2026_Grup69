"""React Native kamera ve dosya seçici yüklemeleri için regresyon testleri."""

import io
import unittest
from unittest.mock import patch

import httpx
from PIL import Image

from app.api.dependencies import get_ai_service
from app.main import app
from app.schemas.document_schema import DocumentAnalysisResponse
from app.services.ai_service import (
    MAX_DOCUMENT_BYTES,
    AIService,
    UnsupportedDocumentError,
    resolve_media_type,
)


def make_image(image_format: str = "JPEG") -> bytes:
    """Test için küçük ve geçerli bir kamera görseli üretir."""
    output = io.BytesIO()
    with Image.new("RGB", (8, 8), color=(240, 240, 240)) as image:
        image.save(output, format=image_format)
    return output.getvalue()


class FakeAIService:
    """Harici Wiro çağrısı yapmadan controller sözleşmesini kaydeder."""

    def __init__(self) -> None:
        self.last_content: bytes | None = None
        self.last_media_type: str | None = None

    async def analyze_medical_document(
        self, content: bytes, media_type: str
    ) -> DocumentAnalysisResponse:
        self.last_content = content
        self.last_media_type = media_type
        return DocumentAnalysisResponse(
            document_type="Tahlil Sonucu",
            summary="Mobil yükleme testi başarıyla işlendi.",
            key_findings=[],
            recommendations=[],
        )


class MobileMediaTypeTests(unittest.TestCase):
    def test_android_octet_stream_uses_uppercase_jpeg_extension(self) -> None:
        self.assertEqual(
            resolve_media_type("application/octet-stream", "CAMERA_001.JPEG"),
            "image/jpeg",
        )

    def test_missing_mime_uses_png_extension(self) -> None:
        self.assertEqual(resolve_media_type(None, "camera.png"), "image/png")

    def test_ios_heic_variants_are_supported(self) -> None:
        self.assertEqual(resolve_media_type("image/heic", "camera.heic"), "image/heic")
        self.assertEqual(
            resolve_media_type("image/heif-sequence", "camera.heif"), "image/heif"
        )
        self.assertEqual(
            resolve_media_type("application/octet-stream", "camera.HEIC"), "image/heic"
        )

    def test_unknown_mobile_file_type_is_rejected(self) -> None:
        self.assertIsNone(resolve_media_type("application/octet-stream", "camera.bin"))


class MobileImageValidationTests(unittest.TestCase):
    def test_valid_jpeg_is_preserved(self) -> None:
        content = make_image("JPEG")
        prepared, media_type = AIService._prepare_image_for_model(content)
        self.assertEqual(prepared, content)
        self.assertEqual(media_type, "image/jpeg")

    def test_valid_png_is_preserved(self) -> None:
        content = make_image("PNG")
        prepared, media_type = AIService._prepare_image_for_model(content)
        self.assertEqual(prepared, content)
        self.assertEqual(media_type, "image/png")

    def test_ios_heic_is_converted_to_jpeg(self) -> None:
        content = make_image("HEIF")
        prepared, media_type = AIService._prepare_image_for_model(content)
        self.assertEqual(media_type, "image/jpeg")
        with Image.open(io.BytesIO(prepared)) as converted:
            self.assertEqual(converted.format, "JPEG")

    def test_corrupt_camera_file_is_rejected_before_ai_call(self) -> None:
        with self.assertRaisesRegex(UnsupportedDocumentError, "geçerli veya okunabilir"):
            AIService._prepare_image_for_model(b"not-an-image")

    def test_excessive_pixel_count_is_rejected(self) -> None:
        with patch("app.services.ai_service.MAX_IMAGE_PIXELS", 1):
            with self.assertRaisesRegex(UnsupportedDocumentError, "çözünürlüğü"):
                AIService._prepare_image_for_model(make_image("JPEG"))


class MobileUploadEndpointTests(unittest.IsolatedAsyncioTestCase):
    async def asyncSetUp(self) -> None:
        self.ai_service = FakeAIService()
        app.dependency_overrides[get_ai_service] = lambda: self.ai_service
        self.client = httpx.AsyncClient(
            transport=httpx.ASGITransport(app=app),
            base_url="http://testserver",
        )

    async def asyncTearDown(self) -> None:
        await self.client.aclose()
        app.dependency_overrides.clear()

    async def test_react_native_octet_stream_upload_is_accepted(self) -> None:
        content = make_image("JPEG")
        response = await self.client.post(
            "/api/v1/document/analyze",
            files={"file": ("camera.jpg", content, "application/octet-stream")},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.ai_service.last_content, content)
        self.assertEqual(self.ai_service.last_media_type, "image/jpeg")

    async def test_react_native_heic_upload_is_accepted(self) -> None:
        content = make_image("HEIF")
        response = await self.client.post(
            "/api/v1/document/analyze",
            files={"file": ("IMG_0001.HEIC", content, "image/heic")},
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.ai_service.last_media_type, "image/heic")

    async def test_oversized_camera_upload_is_rejected(self) -> None:
        response = await self.client.post(
            "/api/v1/document/analyze",
            files={
                "file": (
                    "large.jpg",
                    b"0" * (MAX_DOCUMENT_BYTES + 1),
                    "image/jpeg",
                )
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("boyutu sınırı", response.json()["detail"])
        self.assertIsNone(self.ai_service.last_content)

    async def test_unsupported_mobile_attachment_is_rejected(self) -> None:
        response = await self.client.post(
            "/api/v1/document/analyze",
            files={"file": ("notes.txt", b"hello", "text/plain")},
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn("Desteklenmeyen", response.json()["detail"])


if __name__ == "__main__":
    unittest.main()
