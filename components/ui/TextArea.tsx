import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle, View } from "react-native";

import Typo from "./Typo"; // Asumiendo que tu componente Typo está en el mismo directorio o ruta relativa

interface TextAreaProps extends TextInputProps {
  style?: TextStyle;
  error?: string;
  // Puedes añadir props específicos para TextArea si necesitas,
  // por ejemplo, numberOfLines si quieres sugerir una altura inicial
}

const TextArea: React.FC<TextAreaProps> = ({ style: inputStyle, error, ...rest }) => {
  return (
    <View>
      {error && <Typo style={styles.error}>{error}</Typo>}
      <TextInput
        style={[styles.textAreaInput, inputStyle]}
        placeholderTextColor={Colors.light.text}
        multiline={true} // Habilita múltiples líneas
        {...rest}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textAreaInput: {
    paddingVertical: 15, // Ajustado un poco para mejor apariencia en varias líneas
    paddingHorizontal: 20,
    borderRadius: 10, // Radio de borde más típico para text areas
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: Colors.light.text,
    // Removido height: 50 para que crezca con el contenido o use un alto manual
    fontSize: 16,
    fontFamily: "Cagliostro",
    // Nota: boxShadow en React Native no funciona igual que en CSS web
    // La propiedad equivalente para sombra es 'shadow...' (iOS) o 'elevation' (Android)
    // Si quieres sombra, tendrías que implementarla usando esas props.
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)", // Comentado o remover si da error o no funciona
    textAlignVertical: "top", // Asegura que el texto comience desde arriba en Android
    minHeight: 100, // Opcional: Define una altura mínima
  },
  error: {
    color: "red",
    fontFamily: "Cagliostro",
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 20,
  },
});

export default TextArea;
