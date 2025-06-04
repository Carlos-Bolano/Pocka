import { ColorTheme } from "@/constants/Colors";
import { FontFamily, FontWeights, TextVariant, getTypographyStyles } from "@/constants/Typography";
import { useTheme } from "@/context/ThemeContext";
import React, { useMemo } from "react";
import { Text, TextProps, TextStyle } from "react-native";

interface TypographyProps extends TextProps {
  variant?: TextVariant;
  weight?: FontFamily;
  colorName?: keyof ColorTheme;
  textAlign?: "left" | "center" | "right" | "justify";
}

const Typography: React.FC<TypographyProps> = (props: TypographyProps) => {
  const { children, variant = "body", weight, colorName, textAlign, style, ...rest } = props;
  const { colors } = useTheme();

  const typographyStyles = useMemo(() => getTypographyStyles(colors), [colors]);
  const baseStyle: TextStyle = typographyStyles[variant] || typographyStyles.body;

  const composedStyle: TextStyle = {
    ...baseStyle,
    ...(weight && { fontFamily: FontWeights[weight] }),
    ...(colorName && colors[colorName] && { color: colors[colorName] }),
    ...(textAlign && { textAlign }),
  };

  return (
    <Text style={[composedStyle, style]} {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
