// Importaciones necesarias de React Native y @expo/vector-icons
import Typography from "@/components/ui/Typography";
import { GoalIcon, goalIconCategories } from "@/constants/goalIconCategories";
import { useTheme } from "@/context/ThemeContext";
import { colorWithOpacity } from "@/utils/functions/colorsWithOpacity";
import { getIconComponent } from "@/utils/functions/getIconComponent.";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface GoalIconItemProps {
  item: GoalIcon;
  onSelectIcon: (icon: GoalIcon) => void;
}

/**
 * Componente funcional para renderizar un icono de meta individual.
 * Incluye un círculo para el icono y su nombre.
 */
const GoalIconItem: React.FC<GoalIconItemProps> = ({ item, onSelectIcon }) => {
  const { colors, theme } = useTheme();

  const IconComponent = getIconComponent(item.iconFamily);

  return (
    <TouchableOpacity style={styles.iconItemContainer} onPress={() => onSelectIcon(item)}>
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
        style={[styles.iconNameText, { color: colors.text }]}
      >
        {item.name}{" "}
      </Typography>
    </TouchableOpacity>
  );
};

const GoalIconsScreen: React.FC = () => {
  const { colors } = useTheme();

  const handleIconSelect = (icon: GoalIcon) => {
    Alert.alert("Icono Seleccionado", `Has seleccionado: ${icon.name} (${icon.iconFamily}/${icon.iconName})`);
    console.log("Icono seleccionado:", icon);
  };

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      {/* <Text style={[styles.screenTitle, { color: colors.text }]}>Selecciona un Icono para tu Meta</Text> */}
      <ScrollView contentContainerStyle={{ paddingVertical: 30 }}>
        {goalIconCategories.map((category) => (
          <View key={category.title} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
            <FlatList<GoalIcon>
              data={category.icons}
              keyExtractor={(item: GoalIcon) => item.name}
              numColumns={5} // Ajusta el número de columnas para los iconos
              renderItem={({ item }) => <GoalIconItem item={item} onSelectIcon={handleIconSelect} />}
              scrollEnabled={false} // Deshabilita el scroll interno
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// --- Estilos ---

// Obtenemos el ancho de la pantalla para calcular el tamaño de los elementos dinámicamente
const { width } = Dimensions.get("window");
const numColumns = 5;
const marginHorizontal = 10; // Margen a los lados de la pantalla
const iconMargin = 5; // Margen entre cada icono

// Calculamos el tamaño de cada ítem para que quepan 5 por fila con márgenes
const itemWidth = (width - marginHorizontal * 2 - iconMargin * (numColumns * 2)) / numColumns;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  categorySection: {
    marginBottom: 20,
    paddingHorizontal: marginHorizontal,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 5,
  },
  iconItemContainer: {
    alignItems: "center",
    marginBottom: 15,
    width: itemWidth, // Ancho calculado dinámicamente
    marginHorizontal: iconMargin, // Margen horizontal entre iconos
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  iconNameText: {
    fontSize: 10,
    textAlign: "center",
  },
});

export default GoalIconsScreen;
