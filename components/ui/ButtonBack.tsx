import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface Props {
  marginLeft?: number;
  style?: ViewStyle;
}

export default function ButtonBack({ marginLeft, style }: Props) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={[styles.button, { marginLeft }, style]}>
      <Ionicons name="arrow-back-outline" size={24} color="#000" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.background,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.light.text,
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.30)",
  },
});
