import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import GoalCard from "@/components/goals/GoalCard";
import HeaderSection from "@/components/HeaderSection";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { getCurrentUser, getGoalsForUser } from "@/lib/appwrite"; // Importa las funciones de Appwrite
import { Goal } from "@/models/GoalSchema"; // Importa el tipo Goal

export default function Goals() {
  const { colors } = useTheme();

  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los objetivos
  const loadGoals = useCallback(async () => {
    setIsLoadingGoals(true);
    setError(null);
    try {
      const currentUser = await getCurrentUser();
      if (currentUser && currentUser.$id) {
        const fetchedGoals = await getGoalsForUser(currentUser.$id);
        setGoals(fetchedGoals);
      } else {
        setError("User not logged in or user ID not found.");
        setGoals([]);
      }
    } catch (err: any) {
      console.error("Error loading goals:", err);
      setError(`Failed to load goals: ${err.message || "Network error"}`);
      setGoals([]);
    } finally {
      setIsLoadingGoals(false);
    }
  }, []);

  // Usa useFocusEffect para recargar los objetivos cada vez que la pantalla Goals esté en foco
  useFocusEffect(
    useCallback(() => {
      loadGoals();
    }, [loadGoals])
  );

  if (error) {
    return (
      <CustomSafeAreaView style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <Text style={[styles.errorText, { color: colors.red }]}>{error}</Text>
        <Button onPress={loadGoals} variant="secondary">
          <Text style={{ color: colors.primary }}>Try Again</Text>
        </Button>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView style={[{ backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <HeaderSection
          title="Goals"
          onRightPress={() => router.push("/(authenticated)/(modal)/createGoal")}
          textColor={colors.text} // Pasa los colores al HeaderSection si los necesita
        />
        {/* GOALS CARDS */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 15 }}
          contentContainerStyle={{ gap: 15, paddingBottom: 55 }}
        >
          {isLoadingGoals ? (
            <ActivityIndicator size="large" color={colors.yellow} />
          ) : goals.length === 0 ? (
            <View style={styles.emptyGoalsContainer}>
              <Text style={{ color: colors.text, fontSize: 16, textAlign: "center" }}>
                No goals created yet. Tap the `+` icon to add one goal!
              </Text>
            </View>
          ) : (
            goals.map((goal) => <GoalCard key={goal.$id} goal={goal} />)
          )}
        </ScrollView>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  emptyGoalsContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 200, // Asegura que el mensaje sea visible
  },
});
