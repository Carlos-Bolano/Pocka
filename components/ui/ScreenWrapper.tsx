// components/SafeAreaContainer.tsx
import React, { ReactNode } from "react";
import { View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SafeAreaContainerProps {
  children: ReactNode;
  style?: ViewStyle;
}

export default function ScreenWrapper({ children, style }: SafeAreaContainerProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
