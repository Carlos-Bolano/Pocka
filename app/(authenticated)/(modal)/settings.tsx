import { Colors } from "@/constants/Colors";
import { logout } from "@/lib/appwrite";
// import { useAuth } from "@/context/AuthContext";
import Entypo from "@expo/vector-icons/Entypo";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  // const { logout, user } = useAuth();
  const router = useRouter();
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.container}>
        <View style={[styles.section]}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <View style={styles.sectionBody}>
            <TouchableOpacity
              // onPress={() => {
              //   router.push("/(authenticated)/(modal)/profile");
              // }}
              style={styles.profile}
            >
              <Image
                alt=""
                source={{
                  uri: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80",
                }}
                style={styles.profileAvatar}
              />
              <View style={styles.profileBody}>
                <Text style={styles.profileName}>Carlos Bolanos</Text>
                <Text style={styles.profileHandle}>carlosbolanos@gmail.com</Text>
              </View>
              <Entypo name="chevron-right" size={28} color="#858585" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Caracteristica no implementada",
                    "esta caracteristica sera implementada en futuras actualizaciones."
                  );
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Language</Text>
                <View style={styles.rowSpacer} />
                <Text style={styles.rowValue}>English</Text>
                <Entypo name="chevron-right" size={28} color="#858585" />
              </TouchableOpacity>
            </View>

            <View style={styles.rowWrapper}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Email Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch style={{ transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }] }} value={true} />
              </View>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Push Notifications</Text>
                <View style={styles.rowSpacer} />
                <Switch value={false} />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper, styles.rowFirst]}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Caracteristica no implementada",
                    "esta caracteristica sera implementada en futuras actualizaciones."
                  );
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Contact Us</Text>
                <View style={styles.rowSpacer} />
                <Entypo name="chevron-right" size={28} color="#858585" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Caracteristica no implementada",
                    "esta caracteristica sera implementada en futuras actualizaciones."
                  );
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Report Bug</Text>
                <View style={styles.rowSpacer} />
                <Entypo name="chevron-right" size={28} color="#858585" />
              </TouchableOpacity>
            </View>
            <View style={styles.rowWrapper}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Caracteristica no implementada",
                    "esta caracteristica sera implementada en futuras actualizaciones."
                  );
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Rate in App Store</Text>
                <View style={styles.rowSpacer} />
                <Entypo name="chevron-right" size={28} color="#858585" />
              </TouchableOpacity>
            </View>
            <View style={[styles.rowWrapper, styles.rowLast]}>
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(
                    "Caracteristica no implementada",
                    "esta caracteristica sera implementada en futuras actualizaciones."
                  );
                }}
                style={styles.row}
              >
                <Text style={styles.rowLabel}>Terms and Privacy</Text>
                <View style={styles.rowSpacer} />
                <Entypo name="chevron-right" size={28} color="#858585" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.contentFooter}>App Version 0.0.1 - Copyright © 2024</Text>
      <View style={styles.section}>
        <View style={styles.sectionBody}>
          <View
            style={[
              styles.rowWrapper,
              styles.rowFirst,
              styles.rowLast,
              { alignItems: "center", backgroundColor: Colors.light.red },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                Alert.alert("Cerrar Sesión", "Estas seguro de cerrar sesión?", [
                  { text: "Cancelar", style: "destructive" },
                  {
                    text: "Cerrar Sesión",
                    onPress: () => {
                      logout();
                      router.replace("/");
                    },
                  },
                ]);
              }}
              style={styles.row}
            >
              <Text style={[styles.rowLabel, styles.rowLabelLogout]}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.light.background,
  },
  container: {
    marginTop: 24,
  },
  contentFooter: {
    marginTop: 24,
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
  },
  /** Section */
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    fontFamily: "Inika-Bold",
    letterSpacing: 0.33,
    fontWeight: "500",
    color: Colors.light.text,
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
  },
  /** Profile */
  profile: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
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
  profileBody: {
    marginRight: "auto",
  },
  profileName: {
    textTransform: "capitalize",
    fontSize: 18,
    fontFamily: "Inika-Bold",
    fontWeight: "600",
    color: "#292929",
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Cagliostro",
    color: Colors.light.icon,
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
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#f0f0f0",
  },
  rowFirst: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowLabel: {
    fontSize: 16,
    letterSpacing: 0.24,
    fontFamily: "Cagliostro",
    color: "#000",
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
    color: "#ababab",
    marginRight: 4,
  },
  rowLast: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  rowLabelLogout: {
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
    fontFamily: "Inika-Bold",
    color: "#fff",
  },
});
