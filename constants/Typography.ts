// constants/Typography.ts
import { StyleSheet } from "react-native";
import { ColorTheme } from "./Colors"; // Importa el tipo de tus colores

// Define los pesos de fuente que usarás para Plus Jakarta Sans
// Asegúrate de que estos nombres coincidan con los que definiste en app/_layout.tsx
export const FontWeights = {
  light: "PlusJakartaSans-Light",
  regular: "PlusJakartaSans-Regular",
  medium: "PlusJakartaSans-Medium",
  semiBold: "PlusJakartaSans-SemiBold",
  bold: "PlusJakartaSans-Bold",
  extraBold: "PlusJakartaSans-ExtraBold",
  interRegular: "Inter-Regular",
  interBold: "Inter-Bold",
  interMedium: "Inter-Medium",
  interSemiBold: "Inter-SemiBold",
};

// Define un tipo para las propiedades de estilo de texto
export type TextVariant =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "body"
  | "bodySmall"
  | "caption"
  | "button"; // Añade más variantes si las necesitas

// Función para generar los estilos de tipografía basados en el tema
export const getTypographyStyles = (colors: ColorTheme) =>
  StyleSheet.create({
    heading1: {
      fontSize: 32,
      fontFamily: FontWeights.bold,
      color: colors.text,
    },
    heading2: {
      fontSize: 24,
      fontFamily: FontWeights.semiBold,
      color: colors.text,
    },
    heading3: {
      fontSize: 20,
      fontFamily: FontWeights.medium,
      color: colors.text,
    },
    heading4: {
      fontSize: 18,
      fontFamily: FontWeights.medium,
      color: colors.text,
    },
    body: {
      fontSize: 16,
      fontFamily: FontWeights.interRegular,
      color: colors.paragrahp,
    },
    bodySmall: {
      fontSize: 14,
      fontFamily: FontWeights.interRegular,
      color: colors.paragrahp,
    },
    caption: {
      fontSize: 12,
      fontFamily: FontWeights.interRegular,
      color: colors.tint, // Ejemplo: un color más sutil
    },
    button: {
      fontSize: 16,
      fontFamily: FontWeights.bold,
      color: colors.background, // Color de texto del botón, suele ser claro para botones oscuros y viceversa
    },
  });

// Opcional: Define un tipo para los props de `fontFamily` directamente
export type FontFamily = keyof typeof FontWeights;
