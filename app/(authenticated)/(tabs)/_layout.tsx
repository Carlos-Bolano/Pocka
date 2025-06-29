import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          animation: "fade",
          headerShown: false,
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home-sharp" : "home-outline"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: "Goals",
          headerShown: false,
          animation: "fade",
          headerShadowVisible: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "trophy" : "trophy-outline"} size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          headerShown: false,
          animation: "fade",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "wallet" : "wallet-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
