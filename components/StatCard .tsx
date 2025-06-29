import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatCard = () => {
  return (
    <View style={styles.card}>
      {/* Income */}
      <View style={styles.section}>
        <AntDesign name="arrowdown" size={32} color="limegreen" />
        <View>
          <Text style={styles.label}>Income</Text>
          <Text style={[styles.amount, { marginTop: -5 }]}>$ 0,00</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Outcome */}
      <View style={styles.section}>
        <AntDesign name="arrowup" size={32} color="tomato" />
        <View>
          <Text style={[styles.label]}>Outcome</Text>
          <Text style={[styles.amount, { marginTop: -5 }]}>$ 27,000</Text>
        </View>
      </View>
    </View>
  );
};

export default StatCard;

const styles = StyleSheet.create({
  title: {
    color: "#888",
    // marginBottom: 8,
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderRadius: 16,
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    flex: 1,
  },
  label: {
    color: "#ccc",
    fontSize: 16,
  },
  amount: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  divider: {
    width: 1,
    backgroundColor: "#444",
    height: "100%",
    marginHorizontal: 10,
  },
});
