const tintColorLight = "#0a7ea4";
const tintColorDark = "#0a7ea4";
const blue = "#377CC8";
const red = "#E0533D";
const green = "#469B88";
const yellow = "#EED868";
const strongYellow = "#FFCC00";
const dark = "#11181C";
const black = "#000000";
const light = "#7D7D91";
const white = "#FFFFFF";

export const Colors = {
  light: {
    text: "#11181C",
    gray: "#A0A0A0",
    paragrahp: "#687076",
    background: "#F3F3F3",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    primary: "#ECEDEE",
    secondary: "#242424",
    border: "#ACB5BB",
    blue,
    red,
    green,
    yellow,
    dark,
    black,
    light,
    strongYellow,
    white,
  },
  dark: {
    text: "#ECEDEE",
    paragrahp: "#CFCFCF",
    background: "#11181C",
    gray: "#A0A0A0",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    primary: "#242424",
    secondary: "#ECEDEE",
    border: "#ACB5BB",
    blue,
    red,
    green,
    yellow,
    dark,
    black,
    light,
    strongYellow,
    white,
  },
};

export type ColorTheme = typeof Colors.light;
