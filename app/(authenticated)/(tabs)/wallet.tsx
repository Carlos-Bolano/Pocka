import CustomSafeAreaView from "@/components/CustomSafeAreaView";
import HeaderSection from "@/components/HeaderSection";
import TransactionCard from "@/components/home/TransactionCard";
import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { getCurrentUser, getTransactionsForUser } from "@/lib/appwrite";
import { Transaction } from "@/models/TransactionSchema";
import { formatDate } from "@/utils/functions/formatDate";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Wallet() {
  const { colors } = useTheme();

  const [loading, setLoading] = useState(true);
  const [totalBalance, setTotalBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // useFocusEffect para cargar datos cada vez que la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      const fetchWalletData = async () => {
        setLoading(true);

        try {
          // 1. Obtener usuario actual
          const user = await getCurrentUser();
          if (!user || !user.$id) {
            setLoading(false);
            return;
          }

          // 3. Obtener transacciones para el usuario actual
          const userTransactions = await getTransactionsForUser(user.$id);
          setTransactions(userTransactions);

          // 4. Calcular el balance total
          let balance = 0;
          userTransactions.forEach((t) => {
            if (t.type === "income") {
              balance += t.amount;
            } else {
              balance -= t.amount;
            }
          });
          setTotalBalance(balance);
        } catch (err) {
          console.error("Wallet: Error al cargar datos:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchWalletData();
    }, []) // Dependencias vacías para que se ejecute solo al montar y al enfocar
  );

  return (
    <CustomSafeAreaView style={[{ backgroundColor: colors.yellow }]}>
      <View style={[styles.container, { flex: 1 }]}>
        <View style={{ gap: 10, paddingTop: 10, paddingHorizontal: 20 }}>
          <HeaderSection
            title="Wallet"
            textColor={colors.dark}
            onRightPress={() => router.push("/(authenticated)/(modal)/createTransaction")}
          />
          <View style={{ paddingHorizontal: 20, paddingVertical: 40, gap: 10 }}>
            <View>
              <Typography
                variant="bodySmall"
                textAlign="center"
                weight="light"
                style={{ color: colors.dark }}
              >
                {formatDate(new Date())}
              </Typography>
              <Typography
                variant="heading1"
                textAlign="center"
                weight="interBold"
                style={{ color: colors.dark }}
              >
                {formatCurrency(totalBalance)}
              </Typography>
              <Typography
                variant="bodySmall"
                textAlign="center"
                weight="light"
                style={{ color: colors.dark }}
              >
                Available Balance
              </Typography>
            </View>
          </View>
        </View>

        <View style={[{ backgroundColor: colors.background }, styles.transactionsContainer]}>
          <View
            style={{ flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "space-between" }}
          >
            <Typography variant="heading3" weight="bold" style={{ color: colors.text }}>
              Transactions
            </Typography>
            <Typography
              variant="body"
              weight="interRegular"
              style={{ color: colors.paragrahp, marginRight: 10 }}
            >
              View All {"->"}
            </Typography>
          </View>
          {/* TransactionCards */}
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
            {loading ? (
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
                No transactions found
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
    width: "100%",
    flex: 1,
  },
  transactionsContainer: {
    height: "100%",
    gap: 10,
    marginTop: 20,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  scrollViewContent: {
    gap: 15,
    paddingBottom: 15,
  },
});
