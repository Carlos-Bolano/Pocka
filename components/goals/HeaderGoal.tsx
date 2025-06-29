import { useTheme } from "@/context/ThemeContext";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "../ui/Typography";

export default function HeaderGoal() {
  const { colors } = useTheme();
  return (
    <View style={styles.headerAbsolute}>
      {/* left icon */}
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <Octicons name="chevron-left" size={30} color={colors.text} />
      </TouchableOpacity>
      {/* screen title */}
      <Typography
        variant="heading2"
        weight="bold"
        style={[{ color: colors.text }, styles.headerTitleAbsolute]}
      >
        Goals
      </Typography>
      {/* right icon */}
      <View>
        <Octicons name="plus" size={30} color={colors.text} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  headerAbsolute: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    height: 30,
  },
  headerTitleAbsolute: {
    position: "absolute",
    left: 0,
    right: 0,
    top: -5,
    textAlign: "center",
  },
});
