# Hafif resmi Python imajı — yerel geliştirme ortamıyla (3.12) uyumlu sürüm
FROM python:3.12-slim

# .pyc üretme, çıktıyı tamponlama: konteyner loglarının anında görünmesini sağlar
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Önce yalnızca requirements.txt kopyalanır: kod değiştiğinde bu katman
# Docker önbelleğinden gelir, bağımlılıklar yeniden yüklenmez.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama kodu en son kopyalanır (.dockerignore kapsamı hariç)
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
