// src/components/home/MiniGoalCard.tsx

import { useTheme } from "@/context/ThemeContext";
import { Goal } from "@/models/GoalSchema"; // Importa el tipo Goal
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native"; // Importa TouchableOpacity
import ProgressBar from "../ui/ProgressBar";
import Typography from "../ui/Typography";

interface MiniGoalCardProps {
  goal: Goal; // Ahora recibe el objeto Goal completo
  // progressBarColor ya no es necesario como prop separada si usas goal.color
}

export default function MiniGoalCard({ goal }: MiniGoalCardProps) {
  const { colors } = useTheme();

  // Desestructura las propiedades del objetivo
  const { name, targetAmount, currentAmount, color } = goal;

  // Calculate progress percentage based on dynamic props
  let progressPercentage = 0;
  if (targetAmount > 0) {
    progressPercentage = (currentAmount / targetAmount) * 100;
  }

  // Ensure progress stays between 0 and 100 (clamped)
  const clampedProgress = Math.max(0, Math.min(100, progressPercentage));

  // Formats a number into Colombian Pesos currency format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
      // onPress={() => router.push(`/(authenticated)/(modal)/goalDetails/${goal.$id}`)} // Navega a una pantalla de detalles del objetivo
    >
      {/* Header */}
      <View style={styles.header}>
        <Typography
          variant="bodySmall"
          weight="interMedium"
          style={{ color: colors.paragrahp, flexShrink: 1, marginRight: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name} {/* Usa el nombre del objetivo real */}
        </Typography>
        <Octicons name="chevron-right" size={24} color={colors.text} />
      </View>
      {/* Target Amount */}
      <Typography
        variant="heading4"
        weight="interBold"
        style={{ color: colors.text, marginBottom: 15 }}
        numberOfLines={1} // Agregado: Limita a una línea
        ellipsizeMode="tail"
      >
        {formatCurrency(targetAmount)} {/* Usa el monto objetivo real */}
      </Typography>

      {/* Progress Bar */}
      {/* Usa el color del objetivo (goal.color) para la barra de progreso */}
      <ProgressBar progress={clampedProgress} color={color} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 7,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: 190,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
