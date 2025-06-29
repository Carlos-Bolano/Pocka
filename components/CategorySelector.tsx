// src/components/CategorySelectionModal.tsx
import CategoryItem from "@/components/CategoryItem";
import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { Category, getCategories } from "@/lib/appwrite";
import { Ionicons } from "@expo/vector-icons"; // Importamos Ionicons para el botón de cerrar
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Define las props que recibirá la modal
interface CategorySelectionModalProps {
  onSelectCategory: (category: Category) => void; // Función para pasar la categoría seleccionada
  onClose: () => void; // Función para cerrar la modal
  initialType: "income" | "expense"; // Para filtrar inicialmente las categorías
}

export default function CategorySelectionModal({
  onSelectCategory,
  onClose,
  initialType,
}: CategorySelectionModalProps) {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<"income" | "expense">(initialType);

  const { colors } = useTheme();

  useEffect(() => {
    async function fetchCategories() {
      try {
        setLoading(true);

        const allCategories = await getCategories();

        const incomeCats = allCategories.filter((category) => category.type === "income");
        setIncomeCategories(incomeCats);
        const expenseCats = allCategories.filter((category) => category.type === "expense");
        setExpenseCategories(expenseCats);

        setLoading(false);
      } catch (err) {
        console.error("CategorySelectionModal: Failed to fetch categories:", err);
        setError("Failed to load categories");
        setLoading(false);
      }
    }

    fetchCategories();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función interna para manejar la selección y notificar al padre
  const handleCategoryItemSelect = useCallback(
    (category: Category) => {
      onSelectCategory(category); // Pasa la categoría seleccionada al padre
      onClose(); // Cierra la modal
    },
    [onSelectCategory, onClose]
  );

  if (
    loading ||
    (selectedType === "income" && incomeCategories.length === 0 && !error) ||
    (selectedType === "expense" && expenseCategories.length === 0 && !error)
  ) {
    return (
      <View style={[{ backgroundColor: colors.background, flex: 1 }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.yellow} />
          <Text style={{ color: colors.text, marginTop: 10 }}>Cargando categorías...</Text>
        </View>
      </View>
    );
  }

  if (error !== null) {
    return (
      <View style={[{ backgroundColor: colors.background, flex: 1 }]}>
        <View style={styles.centered}>
          <Text style={{ color: colors.red, marginTop: 10 }}>Error: {error}</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={30} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: colors.background, flex: 1, paddingTop: 20 }}>
      {/* Header de la modal */}
      <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
        <Typography variant="heading3" weight="interSemiBold" style={{ color: colors.text }}>
          Select a Category
        </Typography>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-circle-outline" size={30} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        {selectedType === "income" && (
          <View style={styles.categorySection}>
            {incomeCategories.length > 0 ? (
              <FlatList<Category>
                data={incomeCategories}
                keyExtractor={(item: Category) => item.$id} // Usar $id para keyExtractor
                numColumns={4}
                renderItem={({ item }) => (
                  <CategoryItem item={item} onSelectIcon={handleCategoryItemSelect} />
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Typography style={{ color: colors.text, marginLeft: 20 }}>
                There are no income categories available
              </Typography>
            )}
          </View>
        )}

        {selectedType === "expense" && (
          <View style={styles.categorySection}>
            {expenseCategories.length > 0 ? (
              <FlatList<Category>
                data={expenseCategories}
                keyExtractor={(item: Category) => item.$id} // Usar $id para keyExtractor
                numColumns={4}
                renderItem={({ item }) => (
                  <CategoryItem item={item} onSelectIcon={handleCategoryItemSelect} />
                )}
                scrollEnabled={false}
                contentContainerStyle={styles.flatListContent}
              />
            ) : (
              <Typography style={{ color: colors.text, marginLeft: 20 }}>
                There are no expense categories available
              </Typography>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    paddingBottom: 15,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  typeSelectorContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
  },
  typeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  categorySection: {
    marginBottom: 20,
  },
  flatListContent: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
});
