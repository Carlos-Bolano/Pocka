import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progressWidth: number;
  color?: string;
}

export default function ProgressBar({ progressWidth, color }: ProgressBarProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.progressBarContainer, { backgroundColor: colors.background }]}>
      <View
        style={[styles.progressBarFill, { width: progressWidth, backgroundColor: color || colors.secondary }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});
