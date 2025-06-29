import { useTheme } from "@/context/ThemeContext";
import { Category } from "@/lib/appwrite";
import { colorWithOpacity } from "@/utils/functions/colorsWithOpacity";
import { getIconComponent } from "@/utils/functions/getIconComponent.";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Typography from "./ui/Typography";

interface CategoryItemProps {
  item: Category;
  onSelectIcon: (category: Category) => void;
}

export default function CategoryItem({ item, onSelectIcon }: CategoryItemProps) {
  const IconComponent = getIconComponent(item.iconFamily);
  const { colors, theme } = useTheme();
  return (
    <TouchableOpacity style={styles.categoryItemContainer} onPress={() => onSelectIcon(item)}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: theme === "dark" ? colors.backgroundCard : colorWithOpacity(colors.yellow, 0.2),
          },
        ]}
      >
        <IconComponent
          name={item.iconName as any}
          size={28}
          color={theme === "dark" ? colorWithOpacity(colors.yellow, 0.8) : "#333"}
        />
      </View>
      <Typography
        variant="caption"
        weight="interRegular"
        style={[styles.categoryName, { color: colors.text }]}
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItemContainer: {
    alignItems: "center",
    margin: 10,
    width: "20%",
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryName: {
    color: "#333",
    fontSize: 12,
    textAlign: "center",
  },
});
