import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import ColorInputSelector from "@/components/ColorInputSelector";
import ColorSelectionModal from "@/components/ColorSelectionModal";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import GoalIconInputSelector from "@/components/GoalIconInputSelector";
import GoalIconSelectionModal from "@/components/GoalIconSelectionModal";
import Button from "@/components/ui/Button";
import { FormInput } from "@/components/ui/Input";
import { Colors, getGoalColors } from "@/constants/Colors";
import { GoalIcon, goalIconCategories } from "@/constants/goalIconCategories";
import { createGoal, getCurrentUser } from "@/lib/appwrite"; // Asumiendo que necesitas el ID de usuario
import { GoalData, GoalSchema } from "@/models/GoalSchema"; // Importa tu esquema de Zod
import { router } from "expo-router";

export default function CreateGoal() {
  // Determina el esquema de color del sistema
  const colorScheme = useColorScheme(); // 'light' o 'dark'
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [isLoadingInitialData, setIsLoadingInitialData] = useState(true);
  const [showColorModal, setShowColorModal] = useState(false);
  const [showIconModal, setShowIconModal] = useState(false);

  const allowedColors = useMemo(() => getGoalColors(colors), [colors]);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<GoalData>({
    resolver: zodResolver(GoalSchema),
    defaultValues: {
      userId: "",
      name: "",
      targetAmount: 0,
      currentAmount: 0,
      status: "inProgress",
      iconName: "trophy",
      startDate: new Date().toISOString(),
      iconFamily: "Ionicons",
      color: colors.blue,
      description: "",
    },
  });

  const selectedGoalColor = watch("color");
  const colorName = allowedColors.find((color) => color.color === selectedGoalColor)?.name || "N/A";

  // Observa el icono y la familia de icono seleccionados
  const selectedGoalIcon: GoalIcon | null = useMemo(() => {
    const name = watch("iconName");
    const family = watch("iconFamily");
    if (name && family) {
      // Busca el icono en tus categorías para reconstruir el objeto GoalIcon completo
      for (const category of goalIconCategories) {
        const foundIcon = category.icons.find((icon) => icon.iconName === name && icon.iconFamily === family);
        if (foundIcon) {
          return foundIcon;
        }
      }
    }
    return null; // Retorna null si no se encuentra o no hay valores
  }, [watch("iconName"), watch("iconFamily")]);

  useEffect(() => {
    const loadUserId = async () => {
      setIsLoadingInitialData(true);
      try {
        const currentUser = await getCurrentUser();
        if (currentUser && currentUser.$id) {
          setValue("userId", currentUser.$id);
        } else {
          console.warn("No se pudo obtener el userId. El objetivo no se podrá asociar.");
        }
      } catch (err) {
        console.error("Error al cargar userId:", err);
      } finally {
        setIsLoadingInitialData(false);
      }
    };
    loadUserId();
  }, [setValue]);

  const onSubmit = async (data: GoalData) => {
    const newGoal = await createGoal(data);
    if (newGoal) {
      Alert.alert("Success", "Goal created successfully!"); // Mensaje de éxito
      router.back(); // Volver a la pantalla anterior
    } else {
      console.error("Falló la creación del objetivo en Appwrite.");
    }
  };

  // Manejador de selección de color desde la modal
  const handleColorSelectedFromModal = useCallback(
    (color: string) => {
      setValue("color", color);
      setShowColorModal(false); // Cierra la modal
    },
    [setValue]
  );

  const handleIconSelectedFromModal = useCallback(
    (icon: GoalIcon) => {
      setValue("iconName", icon.iconName);
      setValue("iconFamily", icon.iconFamily);
      setShowIconModal(false); // Cierra la modal de iconos
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
    <View style={[{ backgroundColor: colors.background, flex: 1 }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={[styles.container]}>
          {/* Campo Nombre */}
          <FormInput
            name="name"
            control={control}
            errors={errors}
            label="Goal Name"
            placeholder="e.g., Save for a new car"
            autoCapitalize="sentences"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
          />

          {/* Campo Monto Objetivo */}
          <FormInput
            name="targetAmount"
            control={control}
            errors={errors}
            label="Target Amount"
            placeholder="0.00"
            keyboardType="numeric"
            autoCapitalize="none"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
            onChangeText={(text) => {
              const parsedAmount = parseFloat(text.replace(",", "."));
              setValue("targetAmount", isNaN(parsedAmount) ? 0 : parsedAmount);
            }}
            value={watch("targetAmount")?.toString()}
          />

          {/* Campo Monto Actual (editable si el usuario quiere precargar) */}
          <FormInput
            name="currentAmount"
            control={control}
            errors={errors}
            label="Current Amount"
            placeholder="0.00"
            keyboardType="numeric"
            autoCapitalize="none"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
            onChangeText={(text) => {
              const parsedAmount = parseFloat(text.replace(",", "."));
              setValue("currentAmount", isNaN(parsedAmount) ? 0 : parsedAmount);
            }}
            value={watch("currentAmount")?.toString()}
          />

          {/* Campo Descripción */}
          <FormInput
            name="description"
            control={control}
            errors={errors}
            label="Description (Optional)"
            placeholder="Add details about your goal"
            autoCapitalize="sentences"
            isErrorDown={true}
            containerStyle={styles.inputSpacing}
            multiline={true} // Permitir múltiples líneas
            numberOfLines={4} // Altura inicial de 4 líneas
          />

          {/* Selector de Color */}
          <ColorInputSelector
            label="Select Color"
            selectedColor={selectedGoalColor}
            colorName={colorName}
            onPress={() => setShowColorModal(true)}
            error={errors.color?.message}
            // PASA LAS PROPS DE COLOR EXPLÍCITAMENTE
            textColor={colors.text}
            borderColor={colors.border}
            backgroundColor={colors.backgroundCard}
            errorColor={colors.red}
          />

          <GoalIconInputSelector // <-- NUEVO SELECTOR
            label="Select Goal Icon"
            selectedIcon={selectedGoalIcon}
            onPress={() => setShowIconModal(true)}
            error={errors.iconName?.message || errors.iconFamily?.message}
          />

          {/* Botón de Enviar */}
          <Button onPress={handleSubmit(onSubmit)} disabled={isSubmitting} variant="secondary">
            {isSubmitting ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={[{ color: colors.primary }]}>Create Goal</Text>
            )}
          </Button>
        </View>
      </ScrollView>

      {/* Modal para la selección de colores */}
      <Modal
        visible={showColorModal}
        animationType="slide"
        onRequestClose={() => setShowColorModal(false)}
        transparent={false}
      >
        <ColorSelectionModal
          onSelectColor={handleColorSelectedFromModal}
          onClose={() => setShowColorModal(false)}
          allowedColors={allowedColors}
        />
      </Modal>

      {/* Modal para la selección de iconos */}
      <Modal
        visible={showIconModal} // <-- Controla la visibilidad de la modal de iconos
        animationType="slide"
        onRequestClose={() => setShowIconModal(false)}
        transparent={false}
      >
        <GoalIconSelectionModal // <-- RENDERIZA TU MODAL DE ICONOS
          onSelectIcon={handleIconSelectedFromModal}
          onClose={() => setShowIconModal(false)}
        />
      </Modal>
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
});
