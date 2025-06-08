import Logo from "@/assets/svgs/logo.svg";
import { useTheme } from "@/context/ThemeContext";
import { resetOnboarding } from "@/utils/onboarding";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomSafeAreaView from "../CustomSafeAreaView";
import Typography from "../ui/Typography";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthTabSelector = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { colors, theme } = useTheme();
  const router = useRouter();

  const handleAuthSuccess = async () => {
    console.log("Authentication successful, redirecting...");
    // Aquí tu lógica de redirección, por ejemplo:
    // router.replace("/(app)/home"); // o la ruta que corresponda
  };

  const handleResetAndRestart = async () => {
    await resetOnboarding();
    router.replace("/");
  };

  return (
    <CustomSafeAreaView style={[styles.outerContainerStyle, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingContainer}
      >
        <View style={styles.header}>
          <Logo width={30} height={30} />
          <View style={styles.textsContainer}>
            <Typography variant="heading1" textAlign="center" weight="interBold" style={styles.title}>
              Get Started now
            </Typography>
            <Typography variant="body" textAlign="center" style={styles.description}>
              Create an account or log in to explore about our app
            </Typography>
          </View>
        </View>

        <View style={[styles.tabBar, { backgroundColor: theme === "dark" ? colors.black : colors.border }]}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "signup" && styles.activeTabButton,
              activeTab === "signup" && {
                backgroundColor: colors.background,
                shadowColor: colors.background,
              },
            ]}
            onPress={() => setActiveTab("signup")}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.text },
                activeTab === "signup" && { color: colors.secondary },
              ]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              activeTab === "login" && styles.activeTabButton,
              activeTab === "login" && { backgroundColor: colors.background, shadowColor: colors.background },
            ]}
            onPress={() => setActiveTab("login")}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.text },
                activeTab === "login" && { color: colors.secondary },
              ]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        {/* Este View asegura que el contenido del formulario tenga flex: 1 */}
        <View style={styles.formContainer}>
          {activeTab === "login" ? (
            <LoginForm onLoginSuccess={handleAuthSuccess} />
          ) : (
            <RegisterForm onRegisterSuccess={handleAuthSuccess} />
          )}
        </View>

        {/* Botón de reset (solo para desarrollo) */}
        {/* <View style={{ marginTop: 50, paddingHorizontal: 20, width: "100%" }}>
          <Button title="Resetear App (Dev)" color="red" onPress={handleResetAndRestart} />
        </View> */}
      </KeyboardAvoidingView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerContainerStyle: {
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  textsContainer: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 10,
  },
  title: {
    fontSize: 35,
  },
  description: {
    marginTop: 10,
  },
  tabBar: {
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 20,
    overflow: "hidden",
    width: "90%",
    height: 50,
    padding: 4,
    marginTop: 20,
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },
  activeTabButton: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  keyboardAvoidingContainer: {
    flex: 1,
    width: "100%",
  },
  formContainer: {
    flex: 1,
    width: "100%",
  },
});

export default AuthTabSelector;
