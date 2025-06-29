// src/components/ColorSelectionModal.tsx
import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native"; // Elimina 'Modal' de aquí

interface AllowedColorItem {
  name: string;
  color: string;
}

interface ColorSelectionModalProps {
  // `visible` ya no es necesaria aquí si el padre la gestiona con el Modal de RN
  onSelectColor: (color: string) => void;
  onClose: () => void;
  allowedColors: AllowedColorItem[];
}

const ColorSelectionModal: React.FC<ColorSelectionModalProps> = ({
  // Ya no necesitas `visible` como prop aquí
  onSelectColor,
  onClose,
  allowedColors,
}) => {
  const { colors } = useTheme();
  const renderColorItem = ({ item }: { item: AllowedColorItem }) => (
    <TouchableOpacity
      style={[styles.colorItem, { backgroundColor: item.color, borderColor: colors.border }]}
      onPress={() => onSelectColor(item.color)}
    >
      {/* Puedes añadir un icono de check si es el color actualmente seleccionado en la modal (opcional) */}
    </TouchableOpacity>
  );

  return (
    // ¡Elimina el <Modal> de aquí! Ahora solo es un View que representa el contenido.
    <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
        <Text style={[styles.modalTitle, { color: colors.text }]}>Select Color</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      {allowedColors.length === 0 ? (
        <View style={styles.emptyListContainer}>
          <Text style={{ color: colors.text }}>No colors available.</Text>
        </View>
      ) : (
        <FlatList
          data={allowedColors}
          keyExtractor={(item) => item.color}
          renderItem={renderColorItem}
          numColumns={5}
          contentContainerStyle={styles.colorList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1, // Es crucial que ocupe todo el espacio disponible
    paddingTop: Platform.OS === "android" ? 0 : 50,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  colorList: {
    padding: 20,
    alignItems: "center",
  },
  colorItem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ColorSelectionModal;
