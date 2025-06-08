import { useTheme } from "@/context/ThemeContext";
import { loginWithGoogle } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { LoginFormData, loginSchema } from "@/models/loginSchema"; // Asume que tienes estos modelos
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { Redirect } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import { FormInput } from "../ui/Input";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const { colors } = useTheme();
  const { refetch, loading, isLogged } = useGlobalContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (!loading && isLogged) return <Redirect href="/(authenticated)/(tabs)" />;

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log("Login Data:", data);
      // Aquí iría tu lógica de autenticación (API call, etc.)
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      // Manejo de errores
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();

      if (result) {
        console.log("Logged in with Google successfully");
        refetch();
      } else {
        Alert.alert("Error", "Failed to log in with Google");
      }
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Aquí irían tus FormInput si los tienes */}
      <FormInput
        name="email"
        label="Email"
        placeholder="ejemplo@mail.com"
        keyboardType="email-address"
        autoCapitalize="none"
        control={control}
        errors={errors}
      />
      <FormInput
        name="password"
        label="Password"
        placeholder="••••••••"
        secureTextEntry
        autoCapitalize="none"
        control={control}
        errors={errors}
      />
      <View
        style={[styles.text, { justifyContent: "space-between", flexDirection: "row", alignItems: "center" }]}
      >
        <Checkbox label="Remember me" onChange={(checked) => {}} checked={true} />
        <Pressable
          onPress={() => {
            Alert.alert("Forgot password", "This feature is not implemented yet.");
          }}
        >
          <Text style={{ color: colors.blue, fontSize: 16, fontWeight: "500" }}>Forgot password?</Text>
        </Pressable>
      </View>
      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20, backgroundColor: colors.secondary }}>
        Login
      </Button>

      <View
        style={[
          styles.text,
          {
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            gap: 30,
            marginTop: 20,
          },
        ]}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }}></View>
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>or</Text>
        <View style={{ flex: 1, height: 1, backgroundColor: colors.border }}></View>
      </View>

      <TouchableOpacity
        onPress={handleLoginWithGoogle}
        style={[styles.googleButton, { borderColor: colors.border, backgroundColor: colors.background }]}
      >
        <Image source={require("@/assets/images/google-logo.png")} style={{ width: 30, height: 30 }} />
        <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500", textAlign: "center" }}>
          Continue with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 35,
    gap: 5,
  },
  text: {
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
});

export default LoginForm;
