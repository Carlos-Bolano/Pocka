import { useTheme } from "@/context/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import Typography from "./ui/Typography";

type Props = {
  title: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  onRightPress?: () => void;
  textColor?: string;
};

export default function HeaderSection(props: Props) {
  const { title, showLeftIcon = true, showRightIcon = true, onRightPress, textColor } = props;

  const { colors } = useTheme();
  return (
    <View style={styles.header}>
      {/* Left Icon */}
      <View style={styles.sideContainer}>
        {showLeftIcon && (
          <Pressable onPress={() => router.back()}>
            <FontAwesome6 name="arrow-left" size={30} color={textColor || colors.text} />
          </Pressable>
        )}
      </View>

      {/* Title */}
      <View style={styles.centerContainer}>
        <Typography variant="heading2" weight="interBold" style={{ color: textColor || colors.text }}>
          {title}
        </Typography>
      </View>

      {/* Right Icon */}
      <View style={styles.sideContainer}>
        {showRightIcon && (
          <Pressable onPress={onRightPress}>
            <FontAwesome6 name="plus" size={30} color={textColor || colors.text} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
  },
  sideContainer: {
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    // paddingBottom: 9,
    justifyContent: "center",
  },
});
