import { Colors } from "@/constants/Colors";
import { ThemeProvider } from "@/context/ThemeContext";
import GlobalProvider, { useGlobalContext } from "@/lib/global-provider";
import { hasSeenOnboarding } from "@/utils/onboarding";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import {
  PlusJakartaSans_400Regular,
  PlusJakartaSans_500Medium,
  PlusJakartaSans_600SemiBold,
  PlusJakartaSans_700Bold,
  PlusJakartaSans_800ExtraBold,
} from "@expo-google-fonts/plus-jakarta-sans";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreenExpo.preventAutoHideAsync();

SplashScreenExpo.setOptions({
  fade: true,
});

function AppContent() {
  const { isLogged, loading } = useGlobalContext();
  const [checking, setChecking] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const validate = async () => {
      const seenOnboarding = await hasSeenOnboarding();

      if (!seenOnboarding) {
        router.replace("/onboarding");
        return;
      }

      if (!loading && !isLogged) {
        router.replace("/auth");
        return;
      }

      setChecking(false);
    };

    validate();
  }, [loading, isLogged]);

  if (loading || checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.light.blue} />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Regular": Inter_400Regular,
    "Inter-Bold": Inter_700Bold,
    "Inter-Medium": Inter_500Medium,
    "Inter-SemiBold": Inter_600SemiBold,
    "PlusJakartaSans-Regular": PlusJakartaSans_400Regular,
    "PlusJakartaSans-Medium": PlusJakartaSans_500Medium,
    "PlusJakartaSans-SemiBold": PlusJakartaSans_600SemiBold,
    "PlusJakartaSans-Bold": PlusJakartaSans_700Bold,
    "PlusJakartaSans-ExtraBold": PlusJakartaSans_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreenExpo.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GlobalProvider>
          <StatusBar style="auto" />
          <AppContent />
        </GlobalProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
