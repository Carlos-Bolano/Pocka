import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface FormInputProps extends TextInputProps {
  name: string;
  control: Control<any>;
  errors: FieldErrors;
  label?: string;
  secureTextEntry?: boolean;
}

export const FormInput: React.FC<FormInputProps> = (Props: FormInputProps) => {
  const { name, control, errors, label, secureTextEntry, ...rest } = Props;
  const [hidePassword, setHidePassword] = useState(secureTextEntry);
  const { colors, theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>}
        {errors[name] && (
          <Text style={[styles.errorText, { color: colors.red }]}>{errors[name]?.message?.toString()}</Text>
        )}
      </View>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View
            style={[
              styles.inputWrapper,
              { backgroundColor: colors.background, borderColor: colors.border },
              errors[name] && { borderColor: colors.red }, // <<<<< aplica aquí el error
            ]}
          >
            <TextInput
              style={[styles.input, { color: colors.text }]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={hidePassword}
              placeholderTextColor={colors.gray}
              {...rest}
            />
            {secureTextEntry && (
              <Pressable onPress={() => setHidePassword(!hidePassword)} style={styles.icon}>
                <Ionicons name={hidePassword ? "eye" : "eye-off"} size={28} color={colors.gray} />
              </Pressable>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginTop: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    letterSpacing: 0.7,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans-Medium",
  },
  icon: {
    paddingHorizontal: 6,
  },
});
