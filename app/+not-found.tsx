import { Stack, router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const NotFoundScreen: React.FC = () => {
  return (
    <>
      {/* Configuración de la cabecera para esta pantalla */}
      <Stack.Screen options={{ title: "Oops!" }} />

      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.message}>Screen not found</Text>
        <Text style={styles.description}>
          The screen you are looking for does not exist or has been removed.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => router.replace("/")} style={styles.button}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>

          {router.canGoBack() && (
            <TouchableOpacity onPress={() => router.back()} style={[styles.button, styles.backButton]}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  title: {
    fontSize: 90,
    fontWeight: "bold",
    color: "#FF6347",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  message: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    maxWidth: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  backButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NotFoundScreen;
