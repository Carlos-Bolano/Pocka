import React, { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SafeViewProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function CustomSafeAreaView({ children, style }: SafeViewProps) {
  const insets = useSafeAreaInsets();

  const top = typeof insets.top === "number" ? insets.top : 0;
  const bottom = typeof insets.bottom === "number" ? insets.bottom : 0;
  const left = typeof insets.left === "number" ? insets.left : 0;
  const right = typeof insets.right === "number" ? insets.right : 0;

  return (
    <View
      style={[
        {
          paddingTop: top,
          paddingBottom: bottom,
          paddingLeft: left,
          paddingRight: right,
          flex: 1,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
