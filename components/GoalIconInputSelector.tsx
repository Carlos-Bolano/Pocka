// src/components/GoalIconInputSelector.tsx
import { GoalIcon } from "@/constants/goalIconCategories"; // Importa tu interfaz GoalIcon
import { useTheme } from "@/context/ThemeContext";
import { getIconComponent } from "@/utils/functions/getIconComponent."; // Asume que ya tienes esta función para cargar el componente del icono
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface GoalIconInputSelectorProps {
  label: string;
  selectedIcon: GoalIcon | null; // Puede ser null si no hay ninguno seleccionado
  onPress: () => void; // Función para abrir la modal de selección
  error?: string; // Para mostrar errores de validación
}

export default function GoalIconInputSelector({
  label,
  selectedIcon,
  onPress,
  error,
}: GoalIconInputSelectorProps) {
  const { colors } = useTheme();

  // Obtiene el componente de icono dinámicamente
  // Si no hay icono seleccionado, usa un icono por defecto
  const IconComponent = getIconComponent(selectedIcon?.iconFamily || "Ionicons");

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.input,
          {
            borderColor: error ? colors.red : colors.border, // Resalta el borde si hay error
            backgroundColor: colors.backgroundCard,
          },
        ]}
        onPress={onPress}
      >
        <View style={styles.iconDisplay}>
          {selectedIcon && selectedIcon.iconName ? (
            <IconComponent
              name={selectedIcon.iconName as any} // 'as any' porque el tipo de 'name' varía por familia
              size={24}
              color={colors.text}
              style={styles.selectedIcon}
            />
          ) : (
            // Icono por defecto si no hay ninguno seleccionado
            <Ionicons name="trophy-outline" size={24} color={colors.text} style={styles.selectedIcon} />
          )}
          <Text style={[styles.iconText, { color: selectedIcon ? colors.text : colors.paragrahp }]}>
            {selectedIcon ? selectedIcon.name : "Select Goal Icon"}
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
  iconDisplay: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Permite que el texto ocupe el espacio restante
  },
  selectedIcon: {
    marginRight: 10,
  },
  iconText: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
  },
});
