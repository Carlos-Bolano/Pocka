import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { useGlobalContext } from "@/lib/global-provider";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function Profile() {
  const { colors } = useTheme();
  const { user } = useGlobalContext();

  return (
    <View style={styles.container}>
      <Image source={user?.avatar} style={styles.profilePicture} />
      <View>
        <Typography variant="bodySmall" style={{ color: colors.text }}>
          Good Morning!
        </Typography>
        <Typography variant="heading3" weight="bold" style={{ color: colors.secondary, marginTop: -7 }}>
          {user?.name || "Loading..."}
        </Typography>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  profilePicture: {
    width: 42,
    height: 42,
    borderRadius: 99,
  },
});
