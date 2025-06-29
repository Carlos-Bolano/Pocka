import { Transaction, TransactionData } from "@/models/TransactionSchema";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  OAuthProvider,
  Permission,
  Query,
  Role,
} from "react-native-appwrite";

export const config = {
  platform: "com.calisto.pocka",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  categoriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_CATEGORIES_COLLECTION_ID,
  goalsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GOALS_COLLECTION_ID,
  transactionsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_TRANSACTION_COLLECTION_ID,
};

export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function loginWithGoogle() {
  try {
    const redirect = Linking.createURL("/");
    const response = await account.createOAuth2Token(OAuthProvider.Google, redirect);

    if (!response) throw new Error("Failed to log in with Google");

    const browserResponse = await openAuthSessionAsync(response.toString(), redirect);

    if (browserResponse.type !== "success") throw new Error("Failed to log in with Google");

    const url = new URL(browserResponse.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to log in with Google");

    const session = await account.createSession(userId, secret);

    if (session) return true;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    return null;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const result = await account.get();
    if (result.$id) {
      const userAvatar = avatar.getInitials(result.name || "User");

      return {
        ...result,
        avatar: userAvatar.toString(),
      };
    }

    return null;
  } catch (error) {
    console.log("Error getting current user:", error);
    return null;
  }
}

// --- Métodos para Categorías (Categories) ---

// Tipo para los datos de la categoría
export interface Category {
  $id: string; // Appwrite añade un $id a cada documento
  name: string;
  iconName: string;
  iconFamily: string;
  type: "income" | "expense";
  isUserDefined: boolean;
  // Puedes añadir otros campos de Appwrite si los necesitas, como $createdAt, $updatedAt, etc.
}

export async function getCategories(
  typeFilter?: "income" | "expense",
  isUserDefinedFilter: boolean = false
): Promise<Category[]> {
  try {
    let queries = [];

    // Filtramos por isUserDefined
    queries.push(Query.equal("isUserDefined", isUserDefinedFilter));

    // Si hay un filtro de tipo, lo agregamos
    if (typeFilter) {
      queries.push(Query.equal("type", typeFilter));
    }

    // AGREGAR EL LÍMITE DE DOCUMENTOS AQUÍ
    // Un valor alto como 100 o 200 es común para obtener "todas" las categorías
    // sin necesidad de paginación compleja si el número es manejable.
    // El límite máximo configurable en Appwrite es 100 por solicitud.
    queries.push(Query.limit(100)); // <--- ¡AÑADIDO ESTO!

    // queries.push(Query.orderAsc("name")); // Ordenar por nombre

    const response = await databases.listDocuments(
      config.databaseId!,
      config.categoriesCollectionId!,
      queries
    );

    const categories: Category[] = response.documents.map((doc) => ({
      $id: doc.$id,
      name: doc.name,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      type: doc.type,
      isUserDefined: doc.isUserDefined,
    }));

    return categories;
  } catch (error) {
    console.error("Error al obtener categorías de Appwrite:", error);
    return [];
  }
}
/**
 * Elimina una categoría.
 * Requiere que el usuario autenticado tenga permisos de eliminación sobre el documento.
 */
export async function deleteCategory(categoryId: string) {
  try {
    await databases.deleteDocument(config.databaseId!, config.categoriesCollectionId!, categoryId);
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

export async function createTransaction(transactionData: TransactionData): Promise<Transaction | null> {
  try {
    const doc = await databases.createDocument(
      // Renombramos a 'doc' para mayor claridad
      config.databaseId!,
      config.transactionsCollectionId!,
      ID.unique(), // Appwrite generará un ID único para el documento
      transactionData, // Los datos ya vienen validados por Zod
      [
        // Permisos de lectura y escritura para el usuario que crea la transacción
        Permission.read(Role.user(transactionData.userId)),
        Permission.write(Role.user(transactionData.userId)),
      ]
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Transaction
    const newTransaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // Asegúrate de incluir todos los campos de tu interfaz Transaction
      // y los metadatos de Appwrite ($createdAt, $updatedAt, etc.)
    };

    console.log("Transacción creada con éxito:", newTransaction);
    return newTransaction; // Retornamos el objeto mapeado
  } catch (error) {
    console.error("Error al crear transacción en Appwrite:", error);
    return null;
  }
}
/**
 * Obtiene una transacción específica por su ID.
 * @param transactionId El ID de la transacción.
 * @returns La transacción encontrada, o null si no existe o hay un error.
 */
export async function getTransactionById(transactionId: string): Promise<Transaction | null> {
  try {
    const doc = await databases.getDocument(
      // Renombramos a 'doc' para claridad
      config.databaseId!,
      config.transactionsCollectionId!,
      transactionId
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Transaction
    const transaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId, // Asegúrate que estas propiedades existan en el documento de Appwrite
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // Añade cualquier otra propiedad de Appwrite que necesites ($permissions, $collectionId, etc.)
    };

    return transaction;
  } catch (error) {
    console.error(`Error al obtener transacción ${transactionId} de Appwrite:`, error);
    return null;
  }
}

/**
 * Actualiza una transacción existente en Appwrite.
 * @param transactionId El ID de la transacción a actualizar.
 * @param updatedData Los datos a actualizar de la transacción.
 * @returns La transacción actualizada, o null si falla.
 */
export async function updateTransaction(
  transactionId: string,
  updatedData: Partial<TransactionData> // Partial permite actualizar solo algunos campos
): Promise<Transaction | null> {
  try {
    const doc = await databases.updateDocument(
      // Renombramos a 'doc'
      config.databaseId!,
      config.transactionsCollectionId!,
      transactionId,
      updatedData
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Transaction
    const updatedTransaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // Asegúrate de que todos los campos requeridos por tu interfaz Transaction estén aquí
    };

    console.log("Transacción actualizada con éxito:", updatedTransaction);
    return updatedTransaction; // Retornamos el objeto mapeado
  } catch (error) {
    console.error(`Error al actualizar transacción ${transactionId} en Appwrite:`, error);
    return null;
  }
}
/**
 * Elimina una transacción específica de Appwrite.
 * @param transactionId El ID de la transacción a eliminar.
 * @returns true si se eliminó con éxito, false si falla.
 */
export async function deleteTransaction(transactionId: string): Promise<boolean> {
  try {
    await databases.deleteDocument(config.databaseId!, config.transactionsCollectionId!, transactionId);
    console.log(`Transacción ${transactionId} eliminada con éxito.`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar transacción ${transactionId} de Appwrite:`, error);
    return false;
  }
}

/**
 * Obtiene todas las transacciones de un usuario.
 * @param userId El ID del usuario.
 * @param queries Consultas adicionales (ej. filtrado por tipo, paginación, etc.).
 * @returns Un array de transacciones.
 */
export async function getTransactionsForUser(userId: string, queries: string[] = []): Promise<Transaction[]> {
  try {
    const response = await databases.listDocuments(config.databaseId!, config.transactionsCollectionId!, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
      Query.limit(100),
      ...queries,
    ]);

    const transactions: Transaction[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      // ¡CAMBIO AQUÍ! Asigna el objeto completo si Appwrite lo devuelve así
      categoryId: doc.categoryId, // Appwrite ya te devuelve el objeto Category incrustado
      date: doc.date,
      description: doc.description,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
    }));

    return transactions;
  } catch (error) {
    console.error(`Error al obtener transacciones para el usuario ${userId} de Appwrite:`, error);
    return [];
  }
}
