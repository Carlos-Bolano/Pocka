// context/ThemeContext.tsx
import { Colors, ColorTheme } from "@/constants/Colors"; // Importa tus colores
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native"; // Usamos un alias para evitar conflictos

// Define los tipos para tu contexto de tema
type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  colors: ColorTheme;
  setAppTheme: (newTheme: Theme) => void;
  toggleTheme: () => void;
};

// Crea el contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = "appTheme";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Detección del tema del sistema
  const systemColorScheme = useRNColorScheme(); // 'light' | 'dark' | null

  // Estado local para el tema de la aplicación
  const [theme, setTheme] = useState<Theme | null>(null);

  // Carga el tema guardado al iniciar
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === "light" || storedTheme === "dark") {
          setTheme(storedTheme);
        } else {
          // Si no hay tema guardado, usa el del sistema como predeterminado
          setTheme(systemColorScheme || "light"); // Default a 'light' si no hay sistema
        }
      } catch (e) {
        console.error("Failed to load theme from storage", e);
        setTheme(systemColorScheme || "light");
      }
    };
    loadTheme();
  }, [systemColorScheme]); // Recarga si el sistema cambia y no hay preferencia

  // Función para establecer el tema y guardarlo
  const setAppTheme = async (newTheme: Theme) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setTheme(newTheme);
    } catch (e) {
      console.error("Failed to save theme to storage", e);
    }
  };

  // Función para alternar entre temas
  const toggleTheme = () => {
    setAppTheme(theme === "light" ? "dark" : "light");
  };

  // Determinar los colores actuales basados en el tema
  const currentColors = theme === "dark" ? Colors.dark : Colors.light;

  // Si el tema aún no se ha cargado, podemos retornar null o un loader.
  // Es importante que la aplicación no se renderice con colores indefinidos.
  if (theme === null) {
    return null; // O un componente de carga si prefieres
  }

  const contextValue = {
    theme,
    colors: currentColors,
    setAppTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

// Hook personalizado para usar el tema
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
