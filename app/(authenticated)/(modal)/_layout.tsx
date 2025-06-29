// import { useAuth } from "@/context/AuthContext";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Layout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="settings"
          options={{
            title: "Settings",
            headerStyle: { backgroundColor: Colors.light.yellow },
            headerShadowVisible: false,
            headerTitleStyle: { fontFamily: "Inter-Bold", color: Colors.light.text },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={28} color={Colors.light.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="createTransaction"
          options={{
            title: "Add transaction",
            headerStyle: { backgroundColor: Colors.light.yellow },
            headerShadowVisible: false,
            headerTitleStyle: { fontFamily: "Inter-Bold", color: Colors.light.text },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={28} color={Colors.light.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="createGoal"
          options={{
            title: "Add goal",
            headerStyle: { backgroundColor: Colors.light.yellow },
            headerShadowVisible: false,
            headerTitleStyle: { fontFamily: "Inter-Bold", color: Colors.light.text },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={28} color={Colors.light.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="goalIcons"
          options={{
            title: "Select an icon",
            headerStyle: { backgroundColor: Colors.light.yellow },
            animation: "slide_from_right",
            headerShadowVisible: false,
            headerTitleStyle: { fontFamily: "Inter-Bold", color: Colors.light.text },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={28} color={Colors.light.text} />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="categories"
          options={{
            title: "Categories",
            animation: "slide_from_right",
            headerStyle: { backgroundColor: Colors.light.yellow },
            headerShadowVisible: false,
            headerTitleStyle: { fontFamily: "Inter-Bold", color: Colors.light.text },
            headerTitleAlign: "center",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <FontAwesome6 name="arrow-left" size={28} color={Colors.light.text} />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
};
export default Layout;
