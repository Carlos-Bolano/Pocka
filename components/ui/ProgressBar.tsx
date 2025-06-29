import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  progress: number; // value between 0 and 100
  color?: string;
  bgColor?: string;
}

export default function ProgressBar({ progress, color, bgColor }: ProgressBarProps) {
  const { colors } = useTheme();

  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={[styles.progressBarContainer, { backgroundColor: bgColor || colors.background }]}>
      <View
        style={[
          styles.progressBarFill,
          { width: `${clampedProgress}%`, backgroundColor: color || colors.secondary },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    width: "100%",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 4,
  },
});
