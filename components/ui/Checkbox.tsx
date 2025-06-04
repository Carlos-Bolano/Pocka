// components/Checkbox.tsx
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type CheckboxProps = {
  checked: boolean;
  onChange: (newValue: boolean) => void;
  label?: string;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, disabled }) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={() => !disabled && onChange(!checked)} style={styles.container}>
      <View
        style={[
          styles.checkboxBase,
          checked && styles.checkboxChecked,
          disabled && styles.disabled,
          { borderColor: checked ? colors.blue : colors.border },
          { backgroundColor: checked ? colors.blue : colors.background },
        ]}
      >
        {checked && <Ionicons name="checkmark" size={16} color="#fff" />}
      </View>
      {label && (
        <Text style={[styles.label, disabled && styles.disabled, { color: colors.text }]}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxBase: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {},
  label: {
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Checkbox;
