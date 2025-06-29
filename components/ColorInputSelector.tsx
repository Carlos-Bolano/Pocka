// src/components/ColorInputSelector.tsx

// import { useTheme } from "@/context/ThemeContext"; // ELIMINA ESTA IMPORTACIÓN
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ColorInputSelectorProps {
  label: string;
  selectedColor: string; // El color actualmente seleccionado (hex string)
  colorName: string;
  onPress: () => void; // Función para abrir la modal
  error?: string; // Mensaje de error de validación
  // **NUEVAS PROPS DE COLORES**
  textColor: string;
  borderColor: string;
  backgroundColor: string;
  errorColor: string;
}

const ColorInputSelector: React.FC<ColorInputSelectorProps> = ({
  label,
  selectedColor,
  onPress,
  error,
  textColor, // <--- RECIBE LA PROP
  borderColor, // <--- RECIBE LA PROP
  backgroundColor, // <--- RECIBE LA PROP
  errorColor, // <--- RECIBE LA PROP
  colorName,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.inputContainer,
          {
            borderColor: error ? errorColor : borderColor,
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <View style={[styles.colorCircle, { backgroundColor: selectedColor }]} />
        <Text style={[styles.colorText, { color: textColor }]}>{colorName || "Select a color"}</Text>
        <Ionicons name="color-palette-outline" size={24} color={textColor} />
      </TouchableOpacity>
      {error && <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 5,
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc", // Un borde claro para que se vea el círculo en colores claros
    marginRight: 10,
  },
  colorText: {
    flex: 1,
    fontSize: 16,
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
  },
});

export default ColorInputSelector;
