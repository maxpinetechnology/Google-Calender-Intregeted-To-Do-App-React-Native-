import { DarkTheme, DefaultTheme, ThemeProvider as NavigationProvider } from 'expo-router/react-navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black
} from '@expo-google-fonts/roboto';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { ThemeProvider, useAppTheme } from '@/context/ThemeContext';
import { TaskProvider } from '@/context/TaskContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { isGoogleConnected } = useAuth();
  const router = useRouter();
  const { isDark } = useAppTheme();
  const [loaded, error] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync().catch(() => {});
      
      // Redirect to onboarding if not connected
      if (!isGoogleConnected) {
        // Use setTimeout to ensure router is ready
        setTimeout(() => {
          router.replace('/onboarding');
        }, 100);
      }
    }
  }, [loaded, error, isGoogleConnected, router]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationProvider value={isDark ? DarkTheme : DefaultTheme}>
        <TaskProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </TaskProvider>
        <StatusBar style={isDark ? 'light' : 'dark'} />
      </NavigationProvider>
    </GestureHandlerRootView>
  );
}


export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </ThemeProvider>
  );
}


