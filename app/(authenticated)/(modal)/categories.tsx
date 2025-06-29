import CategoryItem from "@/components/CategoryItem";
import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { getCategories } from "@/lib/appwrite";
import { Category } from "@/models/CategorySchema";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type RootStackParamList = {
  createTransaction: { selectedCategory?: Category } | undefined;
  categories: undefined;
  settings: undefined;
  createGoal: undefined;
  goalIcons: undefined;
};

type AppNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CategorySelector() {
  const [incomeCategories, setIncomeCategories] = useState<Category[]>([]);
  const [expenseCategories, setExpenseCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme();

  const navigation = useNavigation<AppNavigationProp>();

  console.log("CategorySelector: Render iniciado."); // LOG A: Inicio del render

  useFocusEffect(
    useCallback(() => {
      console.log("CategorySelector: useFocusEffect activado."); // LOG B: useFocusEffect activado
      async function fetchCategories() {
        try {
          setLoading(true);
          console.log("CategorySelector: Fetching categories..."); // LOG C: Fetching
          const allCategories = await getCategories();

          const incomeCategories = allCategories.filter((category) => category.type === "income");
          setIncomeCategories(incomeCategories);
          const expenseCategories = allCategories.filter((category) => category.type === "expense");
          setExpenseCategories(expenseCategories);

          setLoading(false);
          console.log(
            "CategorySelector: Categories loaded. Income:",
            incomeCategories.length,
            "Expense:",
            expenseCategories.length
          ); // LOG D: Categorías cargadas
        } catch (err) {
          console.error("CategorySelector: Failed to fetch categories:", err); // LOG E: Error fetching
          setError("Failed to load categories");
          setLoading(false);
        }
      }

      fetchCategories();

      return () => {
        console.log("CategorySelector: Pantalla desenfocada."); // LOG F: Limpieza
      };
    }, [])
  );

  const handleIconSelect = (category: Category) => {
    console.log("CategorySelector: Categoría seleccionada para enviar:", category.name); // LOG G: Categoría seleccionada
    navigation.navigate("createTransaction", { selectedCategory: category });
  };

  if (loading || incomeCategories.length === 0 || expenseCategories.length === 0) {
    console.log(
      "CategorySelector: Mostrando cargador o error. Loading:",
      loading,
      "Income len:",
      incomeCategories.length,
      "Expense len:",
      expenseCategories.length
    ); // LOG I: Mostrar cargador
    return (
      <View style={[{ backgroundColor: colors.background, flex: 1 }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.yellow} />
          <Text style={{ color: colors.text, marginTop: 10 }}>Loading categories...</Text>
        </View>
      </View>
    );
  }

  if (error !== null) {
    console.log("CategorySelector: Mostrando mensaje de error:", error); // LOG J: Mostrar error
    return (
      <View style={[{ backgroundColor: colors.background, flex: 1 }]}>
        <View style={styles.centered}>
          <Text style={{ color: colors.red, marginTop: 10 }}>Error: {error}</Text>
        </View>
      </View>
    );
  }

  console.log("CategorySelector: Renderizando UI de categorías."); // LOG K: Render UI
  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingVertical: 10 }}>
        <View style={styles.categorySection}>
          <Typography
            variant="heading4"
            weight="semiBold"
            style={{ color: colors.text, marginVertical: 10, marginLeft: 20 }}
          >
            Incomes Categories:
          </Typography>
          <FlatList<Category>
            data={incomeCategories}
            keyExtractor={(item: Category) => item.name}
            numColumns={4}
            renderItem={({ item }) => <CategoryItem item={item} onSelectIcon={handleIconSelect} />}
            scrollEnabled={false}
          />
        </View>

        <View style={styles.categorySection}>
          <Typography
            variant="heading4"
            weight="semiBold"
            style={{ color: colors.text, marginVertical: 10, marginLeft: 20 }}
          >
            Expenses Categories:
          </Typography>
          <FlatList<Category>
            data={expenseCategories}
            keyExtractor={(item: Category) => item.name}
            numColumns={4}
            renderItem={({ item }) => <CategoryItem item={item} onSelectIcon={handleIconSelect} />}
            scrollEnabled={false}
          />
        </View>
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
  categorySection: {
    marginBottom: 20,
  },
});
