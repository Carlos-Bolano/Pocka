// src/components/CategoryInputSelector.tsx
import { useTheme } from "@/context/ThemeContext";
import { Category } from "@/lib/appwrite"; // Asegúrate de importar Category
import { getIconComponent } from "@/utils/functions/getIconComponent.";
import { Ionicons } from "@expo/vector-icons";

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryInputSelectorProps {
  label: string;
  selectedCategory: Category | null; // Puede ser null si no hay ninguna seleccionada
  onPress: () => void; // Función para abrir la modal
  error?: string; // Para mostrar errores de validación si los hay
}

export default function CategoryInputSelector({
  label,
  selectedCategory,
  onPress,
  error,
}: CategoryInputSelectorProps) {
  const { colors } = useTheme();

  const IconComponent = getIconComponent(selectedCategory?.iconFamily.toString() || "");

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.backgroundCard,
          },
        ]}
        onPress={onPress}
      >
        <View style={styles.categoryDisplay}>
          {selectedCategory && selectedCategory.iconName ? (
            <IconComponent
              name={selectedCategory.iconName as any}
              size={24}
              color={colors.text}
              style={styles.icon}
            />
          ) : (
            <IconComponent name={"apps-outline"} size={24} color={colors.text} style={styles.icon} />
          )}
          <Text style={[styles.categoryText, { color: selectedCategory ? colors.text : colors.paragrahp }]}>
            {selectedCategory ? selectedCategory.name : "Seleccionar Categoría"}
          </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={24} color={colors.text} />
      </TouchableOpacity>
      {error && <Text style={[styles.errorText, { color: colors.red }]}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 16,
    marginTop: 5,
  },
  categoryDisplay: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
  },
});
