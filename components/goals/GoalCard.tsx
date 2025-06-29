import { useTheme } from "@/context/ThemeContext";
import { Goal } from "@/models/GoalSchema"; // Importa el tipo Goal
import { getIconComponent } from "@/utils/functions/getIconComponent."; // Necesitas tu helper para iconos
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from "../ui/ProgressBar";
import Typography from "../ui/Typography";
// import { Colors } from "@/constants/Colors";

interface GoalCardProps {
  goal: Goal;
  // onDetailsPress?: () => void; // Si tienes botones de acción, añade sus callbacks
  // onAddFundsPress?: () => void;
  // onWithdrawFundsPress?: () => void;
}

export default function GoalCard({ goal }: GoalCardProps) {
  const { colors } = useTheme();
  const { name, targetAmount, currentAmount, startDate, iconName, iconFamily, color } = goal;

  let progressPercentage = 0;
  if (targetAmount > 0) {
    progressPercentage = (currentAmount / targetAmount) * 100;
  }

  const clampedProgressPercentage = Math.max(0, Math.min(100, progressPercentage));
  const displayProgressPercentage = `${clampedProgressPercentage.toFixed(0)}%`;

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formattedCurrentAmount = formatAmount(currentAmount);
  const formattedTargetAmount = formatAmount(targetAmount);

  // --- Calcular "days left" o "tiempo transcurrido" ---
  // Dado que eliminaste `endDate`, ahora calculamos el tiempo desde `startDate` hasta hoy,
  // o si quieres una fecha límite, deberías re-añadir `endDate` a tu esquema y formulario.
  // Por ahora, mostraré el tiempo transcurrido desde `startDate`.

  const getDaysLeftOrProgress = (startIsoDate: string): string => {
    const startDateObj = new Date(startIsoDate);
    const now = new Date();

    // Puedes adaptar esta lógica para mostrar "días restantes" si añades un `endDate` en el futuro.
    // Para "días restantes", necesitarías:
    // const endDateObj = new Date(goal.endDate);
    // const diffTime = endDateObj.getTime() - now.getTime();
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // if (diffDays > 0) return `${diffDays} days left`;
    // else if (diffDays === 0) return "Due today";
    // else return "Overdue";

    // Si solo tenemos startDate y no endDate, mostraremos "X days since start"
    const diffTime = now.getTime() - startDateObj.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    else if (diffDays === 1) return "1 day ago";
    else if (diffDays > 1) return `${diffDays} days ago`;
    else if (diffDays === 7) return "a week ago";
    else if (diffDays > 7) return `${Math.floor(diffDays / 7)} weeks ago`;
    else if (diffDays === 30) return "a month ago";
    else if (diffDays > 30) return `${Math.floor(diffDays / 30)} months ago`;
    else if (diffDays === 365) return "a year ago";
    else if (diffDays > 365) return `${Math.floor(diffDays / 365)} years ago`;
    else return "Invalid date"; // Si la fecha de inicio es en el futuro
  };

  const daysLeftText = getDaysLeftOrProgress(startDate); // Usamos startDate para el cálculo

  // Obtenemos el componente de icono dinámicamente
  const IconComponent = getIconComponent(iconFamily || "Ionicons");

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      {/* Header */}
      <View>
        <Typography
          variant="bodySmall"
          weight="interRegular"
          style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Goal Name
        </Typography>
        <Typography
          variant="heading3"
          weight="interSemiBold"
          style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Typography>
      </View>

      {/* Progresbar section */}
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginBottom: 8,
          }}
        >
          <Typography
            variant="bodySmall"
            weight="interRegular"
            style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Balance
          </Typography>
          <Typography
            variant="bodySmall"
            weight="interRegular"
            style={{ color: "#ECEDEE", flexShrink: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayProgressPercentage}
          </Typography>
        </View>
        {/* Progress Bar */}
        <ProgressBar
          progress={clampedProgressPercentage}
          bgColor={colors.background}
          color={colors.secondary}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 8,
          }}
        >
          <Typography
            variant="bodySmall"
            weight="interRegular"
            style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{formattedCurrentAmount} </Text>
            of {formattedTargetAmount}
          </Typography>
          <Typography
            variant="bodySmall"
            weight="interRegular"
            style={{ color: "#ECEDEE", flexShrink: 1 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {daysLeftText} {/* <-- AHORA MUESTRA EL TIEMPO DESDE startDate */}
          </Typography>
        </View>
      </View>

      {/* Buttons section */}
      {/* TODO: Hacer estos TouchableOpacity para que sean clickeables */}
      <View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
        <Typography
          variant="bodySmall"
          weight="bold"
          style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Details
        </Typography>
        <View style={{ flexDirection: "row", gap: 15 }}>
          <Typography
            variant="bodySmall"
            weight="bold"
            style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Add
          </Typography>
          <Typography
            variant="bodySmall"
            weight="bold"
            style={{ color: "#ECEDEE", flexShrink: 1, marginRight: 5 }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Take out
          </Typography>
        </View>
      </View>

      {/* Icono de fondo */}
      {IconComponent && ( // Asegúrate de que IconComponent exista
        <IconComponent
          name={iconName as any} // 'as any' para compatibilidad con react-native-vector-icons
          size={100}
          color={colors.secondary} // Usa el color del tema para el icono de fondo
          style={{
            position: "absolute",
            top: -10,
            transform: [{ rotate: "-34deg" }],
            right: -0,
            opacity: 0.2,
            zIndex: -1,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 15,
    shadowColor: "rgba(0, 0, 0, 0.6)",
    shadowOffset: {
      width: 7,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    gap: 10,
    position: "relative",
    overflow: "hidden",
  },
});
