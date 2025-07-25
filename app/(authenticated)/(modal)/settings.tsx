import { Colors } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import React from "react";
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const { user, refetch } = useGlobalContext();
  const { colors, toggleTheme, theme } = useTheme();

  // Handle logout functionality
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "destructive" },
      {
        text: "Logout",
        onPress: async () => {
          const logoutSuccess = await logout();
          if (logoutSuccess) {
            await refetch();
          } else {
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  // Function to show feature not available alert
  const showFeatureNotAvailable = () => {
    Alert.alert("Feature Not Available", "This feature is not available yet.");
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}>
      <View>
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account</Text>
          <View style={[styles.sectionBody, { backgroundColor: colors.backgroundCard }]}>
            <TouchableOpacity style={styles.profileButton} onPress={showFeatureNotAvailable}>
              <Image alt="" source={user?.avatar} style={styles.profileAvatar} />
              <View style={styles.profileInfo}>
                <Text style={[styles.profileName, { color: colors.text }]}>{user?.name}</Text>
                <Text style={[styles.profileHandle, { color: colors.text }]}>{user?.email}</Text>
              </View>
              <Entypo name="chevron-right" size={28} color={colors.icon} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferencias</Text>
          <View style={[styles.sectionBody, { backgroundColor: colors.backgroundCard }]}>
            {/* Language Row */}
            <View style={[styles.rowWrapper, styles.rowFirst, { borderTopWidth: 0 }]}>
              <TouchableOpacity onPress={showFeatureNotAvailable} style={styles.row}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={[styles.rowValue, { color: colors.text }]}>English</Text>
                <Entypo name="chevron-right" size={28} color={colors.icon} />
              </TouchableOpacity>
            </View>

            {/* Dark Mode Row */}
            <View style={[styles.rowWrapper, styles.rowLast, { borderColor: colors.border }]}>
              <TouchableOpacity onPress={toggleTheme} style={styles.row} activeOpacity={1}>
                <Text style={[styles.rowLabel, { color: colors.text }]}>Dark Mode</Text>
                <View style={styles.rowSpacer} />
                {/* Assuming `isDark` state exists in your ThemeContext */}
                <Switch
                  value={theme === "dark"}
                  onValueChange={toggleTheme}
                  trackColor={{ false: Colors.light.gray, true: Colors.light.primary }}
                  thumbColor={colors.tint}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* Footer and Logout Button */}
      <View style={styles.footerSection}>
        <Text style={[styles.contentFooter, { color: colors.text }]}>
          App Version 0.0.1 - Copyright © 2024
        </Text>
        <TouchableOpacity
          onPress={handleLogout}
          style={[styles.logoutButton, { backgroundColor: Colors.light.red }]}
        >
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Use flexGrow for ScrollView contentContainerStyle
    paddingHorizontal: 16,
    paddingVertical: 20,
    justifyContent: "space-between", // Distribute space between sections and footer
  },
  contentFooter: {
    marginBottom: 20,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  /** Section */
  section: {
    marginBottom: 20, // Add margin between sections
  },
  sectionTitle: {
    marginHorizontal: 12,
    marginBottom: 8,
    fontSize: 13,
    fontFamily: "Inika-Bold",
    letterSpacing: 0.33,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: "hidden", // Ensures children respect borderRadius
  },
  /** Profile */
  profileButton: {
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileInfo: {
    marginRight: "auto",
  },
  profileName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontFamily: "Inika-Bold",
    fontWeight: "600",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Cagliostro",
  },
  /** Row */
  row: {
    height: 44,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 12,
  },
  rowWrapper: {
    paddingLeft: 16,
    borderBottomWidth: 1, // Use borderBottomWidth for separation
    borderColor: "#f0f0f0", // Default border color, can be themed
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    fontFamily: "Cagliostro",
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  rowValue: {
    fontSize: 16,
    fontFamily: "Cagliostro",
    fontWeight: "500",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0, // No border at the very bottom
  },
  /** Logout Button */
  footerSection: {
    marginTop: "auto", // Push to the bottom
    alignItems: "center",
    paddingBottom: 20, // Add some padding at the bottom
  },
  logoutButton: {
    width: "100%", // Take full width
    paddingVertical: 12,
    borderRadius: 12, // Rounded corners
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    marginTop: 10, // Space from footer text
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Inika-Bold",
    color: "#fff", // White text
  },
});
