// utils/styling.ts

import { Dimensions } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Diseño base (por ejemplo, el alto de iPhone 11 Pro como referencia)
const BASE_HEIGHT = 812;

export const verticalScale = (size: number) => {
  return (SCREEN_HEIGHT / BASE_HEIGHT) * size;
};
