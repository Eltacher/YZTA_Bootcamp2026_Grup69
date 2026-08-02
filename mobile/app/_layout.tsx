import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform, View, StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';

  const content = (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );

  if (Platform.OS === 'web') {
    const isDark = colorScheme === 'dark';
    return (
      <View style={[styles.webOuterContainer, { backgroundColor: isDark ? '#0B1120' : '#0F172A' }]}>
        <View
          style={[
            styles.webMobileWrapper,
            {
              backgroundColor: Colors[colorScheme].background,
              borderColor: isDark ? '#334155' : '#475569',
            },
          ]}>
          {content}
        </View>
      </View>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  webOuterContainer: {
    flex: 1,
    width: '100vw' as any,
    height: '100vh' as any,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    boxSizing: 'border-box' as any,
  },
  webMobileWrapper: {
    flex: 1,
    width: '100%',
    maxWidth: 440,
    maxHeight: 900,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
  },
});

