import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(modal)"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}
