// src/components/home/TransactionCard.tsx

import { useTheme } from "@/context/ThemeContext";
import { colorWithOpacity } from "@/utils/functions/colorsWithOpacity";
import { getIconComponent } from "@/utils/functions/getIconComponent.";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typography from "../ui/Typography";

// ¡Importa las funciones necesarias de date-fns!
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale"; // Importa el locale para español

interface TransactionCardProps {
  title: string;
  subtitle: string;
  amount: number;
  iconName: string;
  iconFamily?: string;
  type: "income" | "expense";
  date: string; // La fecha de la transacción como string ISO
}

export default function TransactionCard({
  title,
  subtitle,
  amount,
  iconName,
  type,
  iconFamily,
  date,
}: TransactionCardProps) {
  const { colors } = useTheme();

  const isExpense = type === "expense";
  const baseColor = isExpense ? colors.red : colors.green;
  const amountColor = isExpense ? colorWithOpacity(baseColor, 0.83) : colorWithOpacity(baseColor, 0.9);
  const iconBgColor = colorWithOpacity(baseColor, 0.1);
  const amountSign = isExpense ? "-" : "+";

  // Convertir la fecha de string a Date object
  const transactionDate = new Date(date);

  // ¡Usar formatDistanceToNowStrict de date-fns!
  const relativeTime = formatDistanceToNow(transactionDate, {
    // addSuffix: true, // Añade "hace" o "en"
    locale: enUS, // Usa el locale en español
  });

  // Obtener el componente de icono dinámicamente
  const IconComponent = getIconComponent(iconFamily || "MaterialCommunityIcons");

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
      {/* Sección izquierda: Icono y Textos */}
      <View style={styles.leftSection}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <IconComponent name={iconName as any} size={24} color={baseColor} />
        </View>
        <View style={styles.textContainer}>
          <Typography
            variant="body"
            weight="interSemiBold"
            style={{ color: colors.secondary }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Typography>
          <Typography
            variant="bodySmall"
            weight="interMedium"
            style={{ color: colors.paragrahp }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {subtitle}
          </Typography>
        </View>
      </View>

      {/* Sección derecha: Monto y Tiempo Relativo */}
      <View style={styles.rightSection}>
        <Typography variant="body" weight="interBold" style={{ color: amountColor }}>
          {amountSign}$
          {amount.toLocaleString("es-CO", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </Typography>
        <Typography
          variant="bodySmall"
          weight="light"
          style={{ color: colors.paragrahp }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {relativeTime}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 99,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 10,
  },
});
