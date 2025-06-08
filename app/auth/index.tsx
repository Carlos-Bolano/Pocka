import AuthTabSelector from "@/components/auth/AuthTabSelector";
import { StyleSheet, View } from "react-native";

export default function AuthScreen() {
  return (
    <View style={styles.container}>
      <AuthTabSelector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
