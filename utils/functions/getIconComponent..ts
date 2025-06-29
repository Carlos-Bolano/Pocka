import {
  AntDesign,
  Entypo,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
} from "@expo/vector-icons";

export const getIconComponent = (family: string) => {
  switch (family) {
    case "FontAwesome":
      return FontAwesome;
    case "MaterialCommunityIcons":
      return MaterialCommunityIcons;
    case "MaterialIcons":
      return MaterialIcons;
    case "FontAwesome5":
      return FontAwesome5;
    case "Ionicons":
      return Ionicons;
    case "Octicons":
      return Octicons;
    case "FontAwesome6":
      return FontAwesome6;
    case "Entypo":
      return Entypo;
    case "AntDesign":
      return AntDesign;
    default:
      return FontAwesome; // Icono por defecto
  }
};
