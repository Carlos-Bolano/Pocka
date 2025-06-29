import CategoryInputSelector from "@/components/CategoryInputSelector";
import CategorySelectionModal from "@/components/CategorySelector";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/Input";
import { useTheme } from "@/context/ThemeContext";
import { createTransaction, getCategories, getCurrentUser } from "@/lib/appwrite";
import { Category } from "@/models/CategorySchema";
import { TransactionSchema } from "@/models/TransactionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ActivityIndicator, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";

export default function CreateTransaction() {
  const { colors } = useTheme();

  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof TransactionSchema>>({
    resolver: zodResolver(TransactionSchema),
    defaultValues: {
      userId: "",
      amount: 0,
      description: "",
      type: "expense",
      categoryId: "",
      date: new Date().toISOString(),
    },
  });

  const transactionType = watch("type");
  const selectedCategoryId = watch("categoryId");

  // Encuentra la categoría completa basada en el ID seleccionado
  const selectedCategoryObject = selectedCategoryId
    ? allCategories.find((cat) => cat.$id === selectedCategoryId) || null
    : null;

  // Carga todas las categorías y el userId al montar el componente
  useEffect(() => {
    const loadFormData = async () => {
      setIsLoadingInitialData(true);

      try {
        const categoriesData = await getCategories();
        setAllCategories(categoriesData);

        const currentUser = await getCurrentUser();
        if (currentUser && currentUser.$id) {
          setValue("userId", currentUser.$id);
        } else {
          console.warn("No se pudo obtener el userId. La transacción no se podrá asociar.");
        }
      } catch (err) {
        console.error("Error al cargar datos iniciales:", err);
      } finally {
        setIsLoadingInitialData(false);
      }
    };
    loadFormData();
  }, [setValue]);

  // useEffect para establecer la categoría por defecto basada en el tipo de transacción
  useEffect(() => {
    const filteredCategoriesForType = allCategories.filter((cat) => cat.type === transactionType);

    const isCurrentCategoryAvailable =
      selectedCategoryObject && selectedCategoryObject.type === transactionType;

    if (!isCurrentCategoryAvailable && filteredCategoriesForType.length > 0) {
      setValue("categoryId", filteredCategoriesForType[0].$id);
    } else if (filteredCategoriesForType.length === 0) {
      setValue("categoryId", "");
    } else if (isCurrentCategoryAvailable) {
      // No hacer nada si la categoría actual es válida para el tipo
    }
  }, [transactionType, allCategories, setValue, selectedCategoryObject]);

  const onSubmit = async (data: z.infer<typeof TransactionSchema>) => {
    if (!data.userId) {
      console.error("Error: User ID no está disponible. No se puede crear la transacción.");
      return;
    }

    if (!data.categoryId) {
      console.error("Error: La categoría no ha sido seleccionada.");
      return;
    }

    if (data.amount <= 0) {
      console.error("Error: El monto debe ser mayor que cero.");
      return;
    }

    try {
      const newTransaction = await createTransaction(data);

      if (newTransaction) {
        router.back();
      } else {
        console.error("Falló la creación de la transacción en Appwrite.");
      }
    } catch (error) {
      console.error("Error inesperado al intentar crear la transacción:", error);
    } finally {
      // isSubmitting volverá a ser false automáticamente por react-hook-form al terminar
    }
  };

  // Manejador de selección de categoría desde la modal
  const handleCategorySelectedFromModal = useCallback(
    (category: Category) => {
      setValue("categoryId", category.$id);
      setShowCategoryModal(false); // Cierra la modal
    },
    [setValue]
  );

  if (isLoadingInitialData) {
    return (
      <CustomSafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.yellow} />
        <Text style={{ color: colors.text, marginTop: 10 }}>Loading...</Text>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView style={[{ backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.container]}>
          {/* Selector de Tipo (Income/Expense) */}
          <View style={styles.inputSpacing}>
            <Text style={[styles.label, { color: colors.text }]}>Transaction Type</Text>
            <View
              style={[
                styles.radioGroup,
                { borderColor: colors.border, backgroundColor: colors.backgroundCard },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.radioButton,
                  { borderColor: colors.border },
                  transactionType === "income" && { backgroundColor: colors.green },
                ]}
                onPress={() => setValue("type", "income")}
              >
                <Text
                  style={[
                    styles.radioText,
                    { color: transactionType === "income" ? colors.white : colors.text },
                  ]}
                >
                  Income +
                </Text>
              </TouchableOpacity>
              <View style={styles.separator} />

              <TouchableOpacity
                style={[
                  styles.radioButton,
                  { borderColor: colors.border },
                  transactionType === "expense" && { backgroundColor: colors.red },
                ]}
                onPress={() => setValue("type", "expense")}
              >
                <Text
                  style={[
                    styles.radioText,
                    { color: transactionType === "expense" ? colors.white : colors.text },
                  ]}
                >
                  Expense -
                </Text>
              </TouchableOpacity>
            </View>
            {errors.type && (
              <Text style={[styles.errorText, { color: colors.red }]}>{errors.type.message}</Text>
            )}
          </View>

          {/* Campo de Monto */}
          <FormInput
            name="amount"
            control={control}
            errors={errors}
            label="Amount"
            placeholder="0.00"
            keyboardType="numeric"
            autoCapitalize="none"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
            onChangeText={(text) => {
              const parsedAmount = parseFloat(text.replace(",", "."));
              setValue("amount", isNaN(parsedAmount) ? 0 : parsedAmount);
            }}
            value={watch("amount")?.toString()}
          />

          {/* Campo de Descripción */}
          <FormInput
            name="description"
            control={control}
            errors={errors}
            label="Descripction"
            placeholder="ej: Coffee, Groceries, etc."
            autoCapitalize="sentences"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
          />

          {/* Selector de Categoría PERSONALIZADO */}
          <CategoryInputSelector
            label="Select Category"
            selectedCategory={selectedCategoryObject}
            onPress={() => setShowCategoryModal(true)}
            error={errors.categoryId?.message}
          />

          {/* Botón de Enviar */}
          <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} variant="secondary">
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={[{ color: colors.primary }]}>Create Transaction</Text>
            )}
          </Button>
        </View>
      </ScrollView>

      {/* Modal para la selección de categorías */}
      <Modal
        visible={showCategoryModal}
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <CategorySelectionModal
          onSelectCategory={handleCategorySelectedFromModal}
          onClose={() => setShowCategoryModal(false)}
          initialType={transactionType}
        />
      </Modal>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputSpacing: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  errorText: {
    fontSize: 13,
    marginTop: 6,
    color: "red",
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    padding: 10,
  },
  radioButton: {
    flex: 1,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  radioText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  separator: {
    height: "100%",
    width: 1,
    backgroundColor: "#ccc",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 5,
  },
  submitButton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
