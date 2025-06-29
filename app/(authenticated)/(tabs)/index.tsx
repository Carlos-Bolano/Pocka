import Profile from "@/components/auth/Profile";
import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import MiniGoalCard from "@/components/home/MiniGoalCard";
import TransactionCard from "@/components/home/TransactionCard";
import WalletBalanceCard from "@/components/home/WalletBalanceCard";
import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { getCurrentUser, getGoalsForUser, getTransactionsForUser } from "@/lib/appwrite";
import { Goal } from "@/models/GoalSchema"; // Importa el tipo Goal
import { Transaction } from "@/models/TransactionSchema"; // Importa el tipo Transaction
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(true);

  const [goals, setGoals] = useState<Goal[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await getCurrentUser();
      if (!user) {
        router.replace("/auth"); // O la ruta de tu login
        return;
      }
      const userId = user.$id;

      // Obtener Goals
      const fetchedGoals = await getGoalsForUser(userId, []); // Puedes añadir queries si quieres filtrar
      setGoals(fetchedGoals);

      // Obtener Transacciones (las últimas 5, por ejemplo)
      const fetchedTransactions = await getTransactionsForUser(userId, []);
      setTransactions(fetchedTransactions);

      // Calcular Balance Total
      const balance = fetchedTransactions.reduce((acc, transaction) => {
        if (transaction.type === "income") {
          return acc + transaction.amount;
        } else if (transaction.type === "expense") {
          return acc - transaction.amount;
        }
        return acc;
      }, 0);

      setTotalBalance(balance);
    } catch (err: any) {
      console.error("Error fetching home data:", err);
      setError(`Failed to load data: ${err.message || "Network error"}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Recarga los datos cuando la pantalla entra en foco
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  if (error) {
    return (
      <CustomSafeAreaView style={[{ backgroundColor: colors.background }]}>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: colors.text }}>Error: {error}</Text>
        </View>
      </CustomSafeAreaView>
    );
  }

  return (
    <CustomSafeAreaView style={[{ backgroundColor: colors.background }]}>
      <View style={styles.container}>
        {/* Header section */}
        <View
          style={[
            styles.header,
            { paddingHorizontal: 20, alignItems: "center", justifyContent: "space-between" },
          ]}
        >
          <Profile />
          <Pressable onPress={() => router.push("/settings")}>
            <Ionicons name="settings-outline" size={29} color={colors.text} />
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <WalletBalanceCard totalBalance={totalBalance} />
        </View>
        {/* GOALS SECTION */}
        <View style={{ gap: 10 }}>
          {/* HEADER GOALS SECTION */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
            onPress={() => router.push("/(authenticated)/(tabs)/goals")} // Navega a la pantalla de Goals
          >
            <Typography variant="heading2" weight="bold" style={{ color: colors.text }}>
              Goals
            </Typography>
            <Typography variant="body" weight="interRegular" style={{ color: colors.paragrahp }}>
              View All {"->"}
            </Typography>
            {/* <Ionicons name="options-outline" size={28} color={colors.text} /> */}
          </Pressable>
          {/* GOALS CARDS  */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={[styles.goalsScrollViewContent, { paddingLeft: 20 }]}
          >
            <View style={{ flexDirection: "row", gap: 15 }}>
              {goals.length === 0 ? (
                <View style={styles.emptyCardContainer}>
                  <Text style={{ color: colors.paragrahp, textAlign: "center" }}>
                    No goals yet. Create one!
                  </Text>
                </View>
              ) : (
                goals.slice(0, 4).map(
                  (
                    goal // Muestra un máximo de 4 objetivos
                  ) => (
                    <MiniGoalCard key={goal.$id} goal={goal} /> // Pasa el objeto goal completo
                  )
                )
              )}
            </View>
          </ScrollView>
        </View>

        {/* TRANSACTIONS SECTION  */}
        <View style={[styles.transactionsSection, { paddingHorizontal: 20 }]}>
          {/* HEADER TRANSACTIONS SECTION */}
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Typography variant="heading2" weight="bold" style={{ color: colors.text }}>
              Transactions
            </Typography>
            <Typography variant="body" weight="interRegular" style={{ color: colors.paragrahp }}>
              View All {"->"}
            </Typography>
            {/* <Ionicons name="options-outline" size={28} color={colors.text} /> */}
          </Pressable>
          {/* TRANSACTIONS CARDS  */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.transactionsScrollView}
            contentContainerStyle={styles.transactionsContentContainer}
          >
            {isLoading ? (
              <View style={{ alignItems: "center", marginTop: 20 }}>
                <ActivityIndicator size="large" color={colors.yellow} />
                <Text style={{ color: colors.yellow, marginTop: 10 }}>Loading Transactions...</Text>
              </View>
            ) : transactions.length > 0 ? (
              transactions.map((transaction) => {
                const categoryName = transaction.categoryId?.name || "Categoría desconocida";
                const iconName = (transaction.categoryId?.iconName || "help-circle-outline") as string;
                const date = transaction.date;
                return (
                  <TransactionCard
                    key={transaction.$id}
                    title={transaction.description || "No description"}
                    subtitle={categoryName} // Usa el nombre de la categoría incrustada
                    amount={transaction.amount}
                    iconFamily={transaction.categoryId?.iconFamily}
                    iconName={iconName}
                    date={date}
                    type={transaction.type}
                  />
                );
              })
            ) : (
              <Typography variant="body" textAlign="center" style={{ color: colors.text, marginTop: 20 }}>
                No transactions yet
              </Typography>
            )}
          </ScrollView>
        </View>
      </View>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 10,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
  goalsScrollViewContent: {
    paddingRight: 20,
  },
  transactionsSection: {
    flex: 1,
    gap: 10,
  },
  transactionsScrollView: {
    flex: 1,
  },
  transactionsContentContainer: {
    gap: 10,
    paddingBottom: 10,
  },
  emptyCardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "rgba(128,128,128,0.1)", // Un gris suave
    minHeight: 100, // Para que el mensaje sea visible en el scrollview horizontal
    minWidth: 190, // Para el MiniGoalCard
  },
});
