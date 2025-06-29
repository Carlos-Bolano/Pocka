// src/hooks/useCurrencyInput.ts
import { useCallback } from "react";
import { Platform } from "react-native";

interface UseCurrencyFormatterOptions {
  locale?: string;
  currencySymbol?: string;
  decimalPlaces?: number;
}

interface UseCurrencyFormatterReturn {
  format: (numericValue: number) => string; // Para formatear un número a string
  getFormattedText: (rawText: string) => string; // Para obtener el string formateado mientras se escribe
  cleanAndParse: (text: string) => number; // Para obtener el número puro de un string formateado/crudo
}

/**
 * Custom hook que proporciona utilidades para formatear y parsear valores de moneda.
 * No mantiene estado interno del valor del TextInput.
 * @param options Opciones de configuración (locale, currencySymbol, decimalPlaces).
 * @returns format, getFormattedText, cleanAndParse
 */
export const useCurrencyFormatter = ({
  // Cambiado a useCurrencyFormatter
  locale = "es-CO",
  currencySymbol = "$",
  decimalPlaces = 2,
}: UseCurrencyFormatterOptions = {}): UseCurrencyFormatterReturn => {
  // Determinar los separadores basados en el locale
  const decimalSeparator = new Intl.NumberFormat(locale).format(1.1).charAt(1);
  const thousandsSeparator = new Intl.NumberFormat(locale).format(1000).charAt(1);

  // Función interna para formatear un número a su representación de moneda.
  const format = useCallback(
    (num: number): string => {
      if (isNaN(num)) return "";
      const options: Intl.NumberFormatOptions = {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
        useGrouping: true,
      };
      const formatted = new Intl.NumberFormat(locale, options).format(num);
      return `${currencySymbol}${formatted}`;
    },
    [locale, currencySymbol, decimalPlaces]
  );

  // Función para limpiar el texto de entrada y obtener el número parseado.
  // Es la que usarás en tu setValue.
  const cleanAndParse = useCallback(
    (text: string): number => {
      let cleanedText = text
        .replace(currencySymbol, "")
        .replace(new RegExp(`\\${thousandsSeparator}`, "g"), "");
      if (decimalSeparator !== ".") {
        cleanedText = cleanedText.replace(decimalSeparator, ".");
      }
      const parts = cleanedText.split(".");
      if (parts.length > 2) {
        cleanedText = parts[0] + "." + parts.slice(1).join("");
      }
      cleanedText = cleanedText.replace(/[^0-9.]/g, "");
      return parseFloat(cleanedText) || 0;
    },
    [currencySymbol, thousandsSeparator, decimalSeparator]
  );

  // Función que toma el texto CRUNDO del TextInput y devuelve un texto formateado
  // para mostrar mientras el usuario escribe.
  const getFormattedText = useCallback(
    (rawText: string): string => {
      if (rawText === "" || rawText === currencySymbol) {
        return "";
      }

      const numericValue = cleanAndParse(rawText);

      // Lógica para manejar la entrada de decimales y los ceros a la derecha
      if (rawText.endsWith(decimalSeparator) && Platform.OS !== "android") {
        const integerPart = Math.floor(numericValue);
        // Formatear solo la parte entera si el separador decimal está al final
        return `${currencySymbol}${new Intl.NumberFormat(locale, {
          useGrouping: true,
          minimumFractionDigits: 0,
        }).format(integerPart)}${decimalSeparator}`;
      } else if (rawText.endsWith(`${decimalSeparator}0`) && Platform.OS !== "android") {
        // Si termina en ",0", formatear con al menos un decimal
        return `${currencySymbol}${new Intl.NumberFormat(locale, {
          useGrouping: true,
          minimumFractionDigits: 1,
          maximumFractionDigits: decimalPlaces,
        }).format(numericValue)}`;
      } else if (
        rawText.endsWith(`${decimalSeparator}00`) &&
        Platform.OS !== "android" &&
        decimalPlaces >= 2
      ) {
        // Si termina en ",00", formatear con al menos dos decimales
        return `${currencySymbol}${new Intl.NumberFormat(locale, {
          useGrouping: true,
          minimumFractionDigits: 2,
          maximumFractionDigits: decimalPlaces,
        }).format(numericValue)}`;
      } else if (rawText === decimalSeparator) {
        // Si solo se ha escrito el separador decimal
        return `${currencySymbol}${decimalSeparator}`;
      } else if (!isNaN(numericValue)) {
        // Formateo general de un número ya parseado
        return format(numericValue);
      } else {
        // Si el texto no es un número válido (ej. "abc"), lo mostramos tal cual
        return rawText;
      }
    },
    [cleanAndParse, format, locale, currencySymbol, decimalSeparator, decimalPlaces]
  );

  return {
    format,
    getFormattedText,
    cleanAndParse,
  };
};
