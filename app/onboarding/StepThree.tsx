import StepThree from "@/assets/svgs/step-three.svg";
import Typography from "@/components/ui/Typography";
import { useTheme } from "@/context/ThemeContext";
import { setOnboardingSeen } from "@/utils/onboarding";
import { FontAwesome6 } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function OnboardingStepThree() {
  const { colors } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  const handleNext = async () => {
    await setOnboardingSeen();
    router.replace("/auth");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StepThree width={350} height={350} />
      <View>
        <Typography variant="heading1" style={styles.title}>
          Organize Your Numbers, Boost Your Dreams.
        </Typography>

        <Typography variant="body" style={styles.description}>
          Every transaction is an opportunity to organize, categories, and watch your savings goals
        </Typography>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonTabs}>
          <TouchableOpacity
            onPress={() => router.push("/onboarding")}
            style={[
              styles.tab,
              { backgroundColor: colors.gray },
              pathname === "/onboarding" || pathname === "/onboarding/index"
                ? { backgroundColor: colors.secondary }
                : null,
            ]}
          />
          <TouchableOpacity
            onPress={() => router.push("/onboarding/StepTwo")}
            style={[
              styles.tab,
              { backgroundColor: colors.gray },
              pathname === "/onboarding/StepTwo" ? { backgroundColor: colors.secondary } : null,
            ]}
          />
          <TouchableOpacity
            onPress={() => router.push("/onboarding/StepThree")}
            style={[
              styles.tab,
              { backgroundColor: colors.gray },
              pathname === "/onboarding/StepThree" ? { backgroundColor: colors.secondary } : null,
            ]}
          />
        </View>

        <TouchableOpacity onPress={handleNext} style={[styles.button, { backgroundColor: colors.secondary }]}>
          <FontAwesome6 name="arrow-right" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
    padding: 20,
    paddingVertical: 80,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 35,
    fontFamily: "PlusJakartaSans-SemiBold",
  },
  description: {
    marginTop: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  buttonTabs: {
    flexDirection: "row",
    gap: 10,
  },
  tab: {
    width: 14,
    height: 14,
    borderRadius: 99,
  },
  button: {
    padding: 10,
    borderRadius: 99,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
});
