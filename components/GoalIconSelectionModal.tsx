// src/components/GoalIconSelectionModal.tsx
import Typography from "@/components/ui/Typography"; // Asume que tienes este componente para texto
import { GoalIcon, goalIconCategories } from "@/constants/goalIconCategories"; // Importa tus datos de iconos
import { useTheme } from "@/context/ThemeContext";
import { colorWithOpacity } from "@/utils/functions/colorsWithOpacity"; // Para el color de fondo del círculo
import { getIconComponent } from "@/utils/functions/getIconComponent."; // Función para obtener el componente de icono
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// --- Componente Individual de Icono ---
interface GoalIconItemProps {
  item: GoalIcon;
  onSelectIcon: (icon: GoalIcon) => void;
}

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
        numberOfLines={1} // Asegura que el texto no se desborde
        ellipsizeMode="tail" // Añade "..." si el texto es muy largo
      >
        {item.name}
      </Typography>
    </TouchableOpacity>
  );
};

// --- Props para la Modal Principal de Selección de Iconos ---
interface GoalIconSelectionModalProps {
  onSelectIcon: (icon: GoalIcon) => void; // Función para pasar el icono seleccionado al padre
  onClose: () => void; // Función para cerrar la modal
}

// --- Componente Principal de la Modal ---
export default function GoalIconSelectionModal({ onSelectIcon, onClose }: GoalIconSelectionModalProps) {
  const { colors } = useTheme();

  // Aunque no tienes una carga asíncrona aquí, es buena práctica mantener un estado de "carga"
  // o al menos un manejo de estado para el caso de que goalIconCategories esté vacío.
  const isLoading = goalIconCategories.length === 0;

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.yellow} />
        <Text style={{ color: colors.text, marginTop: 10 }}>Cargando iconos...</Text>
      </View>
    );
  }

  return (
    // <Modal> se maneja en el componente padre (createGoal.tsx)
    <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
      {/* Header de la modal */}
      <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
        <Typography variant="heading3" weight="interSemiBold" style={{ color: colors.text }}>
          Select an Icon
        </Typography>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-circle-outline" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {goalIconCategories.map((category) => (
          <View key={category.title} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, { color: colors.text }]}>{category.title}</Text>
            {category.icons.length > 0 ? (
              <FlatList<GoalIcon>
                data={category.icons}
                keyExtractor={(item: GoalIcon) => `${item.iconFamily}-${item.iconName}`} // Clave única
                numColumns={numColumns} // Usar la constante definida abajo
                renderItem={({ item }) => <GoalIconItem item={item} onSelectIcon={onSelectIcon} />}
                scrollEnabled={false} // Deshabilita el scroll interno de FlatList
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Typography style={{ color: colors.text, marginLeft: 20 }}>
                No icons available in this category.
              </Typography>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// --- Estilos ---
const { width } = Dimensions.get("window");
const numColumns = 5; // Número de columnas para los iconos
const marginHorizontal = 10; // Margen a los lados de la pantalla del Modal
const iconMargin = 5; // Margen entre cada icono

// Calcular el ancho de cada ítem para que quepan 'numColumns' por fila
const itemWidth = (width - marginHorizontal * 2 - iconMargin * (numColumns * 2)) / numColumns;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 0 : 50, // Ajuste para SafeArea en iOS
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,

    borderBottomWidth: 1,
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  scrollViewContent: {
    paddingVertical: 10,
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
  flatListContent: {
    alignItems: "center", // Centra los ítems si no llenan la última fila
    // paddingHorizontal: 10, // Ya se maneja con marginHorizontal en categorySection
  },
  iconItemContainer: {
    alignItems: "center",
    marginBottom: 15,
    width: itemWidth,
    marginHorizontal: iconMargin,
    // Puedes quitar las sombras si lo deseas, o ajustarlas
    // shadowColor: "#000",
    // shadowOffset: { width: 1, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 15, // Un poco de borderRadius para suavizar
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  iconNameText: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 2,
  },
});
