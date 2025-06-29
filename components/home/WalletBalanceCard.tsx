// src/components/home/WalletBalanceCard.tsx

import { useTheme } from "@/context/ThemeContext";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";

interface WalletBalanceCardProps {
  totalBalance: number; // Nuevo prop para el balance total
}

export default function WalletBalanceCard({ totalBalance }: WalletBalanceCardProps) {
  const { colors, theme } = useTheme();

  // Formats a number into Colombian Pesos currency format
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formattedBalance = formatCurrency(totalBalance);

  return (
    <View style={[styles.container, { backgroundColor: colors.secondary }]}>
      <View
        style={[
          styles.badge,
          {
            backgroundColor: theme === "light" ? "rgba(238, 216, 104, 0.2)" : "rgba(30, 27, 12, 0.89)",
            borderColor: "transparent",
          },
        ]}
      >
        <Ionicons name="wallet-outline" size={24} color={colors.strongYellow} />
        <Typography variant="bodySmall" style={{ color: colors.strongYellow }}>
          Pocka
        </Typography>
      </View>
      <View style={{ marginTop: 10 }}>
        <Typography variant="body" weight="interRegular" style={[{ color: colors.background }, styles.text]}>
          Total Balance
        </Typography>
        <Typography variant="heading1" weight="interBold" style={{ color: colors.background, marginTop: -5 }}>
          {formattedBalance}
        </Typography>
        <TouchableOpacity style={styles.button} onPress={() => router.push("/wallet")}>
          <Typography
            variant="bodySmall"
            weight="interRegular"
            style={[{ color: colors.background }, styles.text]}
          >
            My Wallet
          </Typography>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary }]}>
            <FontAwesome6 name="arrow-right" size={24} color={colors.secondary} />
          </View>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../assets/images/wallet-top.png")}
        style={{ position: "absolute", top: 0, right: -10, width: 130, height: 130, zIndex: -1 }}
      />
      <Image
        source={require("../../assets/images/wallet-bottom.png")}
        style={[{ position: "absolute", bottom: -95, left: -60, width: 150, height: 150, zIndex: -1 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
    borderRadius: 20,
    position: "relative",
    overflow: "hidden",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    maxWidth: 100,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: -10,
    gap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
  },
});
