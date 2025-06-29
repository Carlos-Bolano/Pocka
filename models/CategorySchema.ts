import { Models } from "react-native-appwrite";

export interface CategoryData {
  name: string;
  iconName: string;
  iconFamily: string;
  type: "income" | "expense" | "both"; // O los tipos que uses para categorías
  isUserDefined: boolean; // Si el usuario puede crear sus propias categorías
  // Añade aquí cualquier otra propiedad que tu Category tenga en Appwrite
}

export interface Category extends CategoryData, Models.Document {
  // Models.Document ya incluye $id, $createdAt, $updatedAt, $collectionId, $databaseId, $permissions
}
