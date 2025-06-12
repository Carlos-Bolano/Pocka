// components/Button.tsx
import { ButtonSize, ButtonVariant, getButtonStyles } from "@/constants/Buttons";
import { useTheme } from "@/context/ThemeContext";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import Typography from "./Typography";

// Define las props para tu componente Button
interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode; // El contenido del botón
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isCircular?: boolean; // Booleano para el estilo circular
  isDisabled?: boolean;
  isLoading?: boolean;
  textStyle?: TextStyle; // Estilos para el texto dentro del botón
  style?: ViewStyle; // Estilos para el contenedor del botón
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  variant = "primary", // Variante por defecto
  size = "medium", // Tamaño por defecto
  isCircular = false, // Por defecto no es circular
  isDisabled = false, // Por defecto habilitado
  isLoading = false, // Por defecto no está cargando
  textStyle, // Estilos de texto adicionales
  style, // Estilos de contenedor adicionales
  ...rest // Resto de props de TouchableOpacity
}) => {
  const { colors } = useTheme(); // Obtiene los colores del tema actual

  // Genera los estilos dinámicamente usando useMemo
  const styles = useMemo(() => getButtonStyles(colors), [colors]);

  // Determina el estilo base del botón basado en la variante y el tamaño
  const buttonVariantStyle: ViewStyle = styles[variant as keyof typeof styles] as ViewStyle;
  const buttonSizeStyle: ViewStyle = styles[size];

  // Determina el estilo base del texto del botón
  const buttonTextVariantStyle: TextStyle = styles[`${variant}Text`];

  // Combina todos los estilos del botón
  const combinedButtonStyle = [
    styles.baseButton,
    buttonVariantStyle,
    buttonSizeStyle,
    isCircular && styles.circular,
    isDisabled && styles.disabled,
    style,
  ];

  // Combina todos los estilos del texto
  const combinedTextStyle = [
    styles.baseText,
    buttonTextVariantStyle,
    isDisabled && styles.disabledText, // Aplica estilo de texto deshabilitado
    textStyle, // Estilos de texto personalizados pasados por props
  ];

  if (isCircular && !style?.width && !style?.height) {
    if (size === "small") combinedButtonStyle.push({ width: 20, height: 20 });
    else if (size === "medium") combinedButtonStyle.push({ width: 50, height: 50 });
    else if (size === "large") combinedButtonStyle.push({ width: 60, height: 60 });
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isDisabled || isLoading} // Deshabilita si está deshabilitado o cargando
      style={combinedButtonStyle}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          color={buttonTextVariantStyle.color || colors.background} // Color del spinner
        />
      ) : (
        <Typography style={combinedTextStyle}>{children}</Typography>
      )}
    </TouchableOpacity>
  );
};

export default Button;
