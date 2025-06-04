// constants/Buttons.ts
import { StyleSheet } from "react-native";
import { ColorTheme } from "./Colors";
import { FontWeights } from "./Typography";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "icon"; // Asegúrate de que 'icon' esté aquí

export type ButtonSize = "small" | "medium" | "large";

export const getButtonStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    // --- Base Styles (aplicados a todos los botones) ---
    baseButton: {
      borderRadius: 8, // Se sobrescribe si es circular
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
    },
    baseText: {
      fontFamily: FontWeights.semiBold,
      textAlign: "center",
    },

    // --- Size Styles ---
    // Estos definirán el tamaño base para botones NO circulares o el tamaño máximo para circulares
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      minWidth: 80,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      minWidth: 120,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 32,
      minWidth: 160,
    },

    // --- Variant Styles ---
    primary: {
      backgroundColor: colors.primary,
    },
    primaryText: {
      color: colors.background,
    },
    secondary: {
      backgroundColor: colors.secondary,
    },
    secondaryText: {
      color: colors.background,
    },
    outline: {
      backgroundColor: "transparent",
      borderWidth: 2,
      borderColor: colors.primary,
    },
    outlineText: {
      color: colors.primary,
    },
    ghost: {
      backgroundColor: "transparent",
    },
    ghostText: {
      color: colors.primary,
    },

    iconText: {
      color: colors.primary, // El color del icono será el color de texto normal del tema
    },

    // --- Disabled Styles ---
    disabled: {
      opacity: 0.6,
      backgroundColor: colors.gray,
      shadowOpacity: 0, // Remover sombra cuando deshabilitado
      elevation: 0,
    },
    disabledText: {
      color: colors.secondary,
    },

    // --- Circular Style (ahora la variante 'icon' lo incluye, pero puede ser útil para otros) ---
    circular: {
      borderRadius: 999,
      aspectRatio: 1,
      padding: 0,
    },
  });
