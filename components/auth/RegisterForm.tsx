import { useTheme } from "@/context/ThemeContext";
import { loginWithGoogle } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { RegisterFormData, registerSchema } from "@/models/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Redirect } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "../ui/Button";
import { FormInput } from "../ui/Input";

interface RegisterFormProps {
  onRegisterSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const { colors } = useTheme();
  const { refetch, loading, isLogged } = useGlobalContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  if (!loading && isLogged) return <Redirect href="/(authenticated)/(tabs)" />;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      console.log("Register Data:", data);
      // Aquí iría tu lógica de registro (API call, etc.)
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
    } catch (error) {
      console.error("Register error:", error);
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
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <FormInput
          containerStyle={{ width: "48%" }}
          name="firstName"
          placeholder="John"
          label="First Name"
          control={control}
          errors={errors}
          isErrorDown
          placeholderTextColor={colors.border}
          autoCapitalize="none"
        />
        <FormInput
          containerStyle={{ width: "48%" }}
          name="lastName"
          placeholder="Doe"
          label="Last Name"
          control={control}
          errors={errors}
          isErrorDown
          placeholderTextColor={colors.border}
        />
      </View>
      <FormInput
        name="email"
        label="Email"
        placeholder="jhon@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        control={control}
        errors={errors}
        placeholderTextColor={colors.border}
      />
      <FormInput
        name="password"
        label="Password"
        secureTextEntry
        autoCapitalize="none"
        control={control}
        errors={errors}
        placeholder="••••••••"
        placeholderTextColor={colors.border}
      />

      <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 20, backgroundColor: colors.secondary }}>
        Sign Up
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 20, // Mantiene tu padding horizontal original
    paddingBottom: 40, // Espacio extra al final para que el último input no quede pegado al teclado
    marginTop: 35,
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
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

export default RegisterForm;
