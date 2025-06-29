import { Category } from "@/models/CategorySchema";
import { Goal, GoalData } from "@/models/GoalSchema";
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

// --- Métodos de Autenticación y Usuario ---

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

export async function getCategories(
  typeFilter?: "income" | "expense",
  isUserDefinedFilter: boolean = false
): Promise<any[]> {
  // Usamos 'any' temporalmente si Category no está importada, idealmente debería ser Category[]
  try {
    let queries = [];

    queries.push(Query.equal("isUserDefined", isUserDefinedFilter));

    if (typeFilter) {
      queries.push(Query.equal("type", typeFilter));
    }

    queries.push(Query.limit(100));

    const response = await databases.listDocuments(
      config.databaseId!,
      config.categoriesCollectionId!,
      queries
    );

    // Mapeo genérico, adapta esto a tu tipo Category si no está ya en tu archivo appwrite.ts
    const categories: Category[] = response.documents.map((doc) => ({
      $id: doc.$id,
      name: doc.name,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      type: doc.type,
      isUserDefined: doc.isUserDefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      $databaseId: doc.$databaseId,
      $collectionId: doc.$collectionId,
    }));

    return categories;
  } catch (error) {
    console.error("Error al obtener categorías de Appwrite:", error);
    return [];
  }
}

export async function deleteCategory(categoryId: string) {
  try {
    await databases.deleteDocument(config.databaseId!, config.categoriesCollectionId!, categoryId);
    return true;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
}

// --- Métodos para Transacciones (Transactions) ---

export async function createTransaction(transactionData: TransactionData): Promise<Transaction | null> {
  try {
    const doc: any = await databases.createDocument(
      // Usa 'any' temporalmente para Document si no se infiere bien
      config.databaseId!,
      config.transactionsCollectionId!,
      ID.unique(),
      transactionData,
      [
        Permission.read(Role.user(transactionData.userId)),
        Permission.write(Role.user(transactionData.userId)),
      ]
    );

    const newTransaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId, // Asumiendo que categoryId es un string/ID directo
      date: doc.date,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // $permissions: doc.$permissions,
      // $databaseId: doc.$databaseId,
      // $collectionId: doc.$collectionId,
    };

    return newTransaction;
  } catch (error) {
    console.error("Error al crear transacción en Appwrite:", error);
    return null;
  }
}

export async function getTransactionById(transactionId: string): Promise<Transaction | null> {
  try {
    const doc: any = await databases.getDocument(
      // Usa 'any' temporalmente para Document
      config.databaseId!,
      config.transactionsCollectionId!,
      transactionId
    );

    const transaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // $permissions: doc.$permissions,
      // $databaseId: doc.$databaseId,
      // $collectionId: doc.$collectionId,
    };

    return transaction;
  } catch (error) {
    console.error(`Error al obtener transacción ${transactionId} de Appwrite:`, error);
    return null;
  }
}

export async function updateTransaction(
  transactionId: string,
  updatedData: Partial<TransactionData>
): Promise<Transaction | null> {
  try {
    const doc: any = await databases.updateDocument(
      // Usa 'any' temporalmente para Document
      config.databaseId!,
      config.transactionsCollectionId!,
      transactionId,
      updatedData
    );

    const updatedTransaction: Transaction = {
      $id: doc.$id,
      userId: doc.userId,
      amount: doc.amount,
      type: doc.type,
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      // $permissions: doc.$permissions,
      // $databaseId: doc.$databaseId,
      // $collectionId: doc.$collectionId,
    };

    return updatedTransaction;
  } catch (error) {
    console.error(`Error al actualizar transacción ${transactionId} en Appwrite:`, error);
    return null;
  }
}

export async function deleteTransaction(transactionId: string): Promise<boolean> {
  try {
    await databases.deleteDocument(config.databaseId!, config.transactionsCollectionId!, transactionId);

    return true;
  } catch (error) {
    console.error(`Error al eliminar transacción ${transactionId} de Appwrite:`, error);
    return false;
  }
}

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
      categoryId: doc.categoryId,
      date: doc.date,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      $databaseId: doc.$databaseId,
      $collectionId: doc.$collectionId,
    }));

    return transactions;
  } catch (error) {
    console.error(`Error al obtener transacciones para el usuario ${userId} de Appwrite:`, error);
    return [];
  }
}

// --- Métodos para Objetivos (Goals) ---

/**
 * Crea un nuevo objetivo en Appwrite.
 * @param goalData Los datos del objetivo a crear.
 * @returns El objetivo creado (con su $id, $createdAt, etc.) o null si falla.
 */
export async function createGoal(goalData: GoalData): Promise<Goal | null> {
  try {
    const doc: any = await databases.createDocument(
      // Usamos 'any' temporalmente para Document
      config.databaseId!,
      config.goalsCollectionId!,
      ID.unique(),
      goalData,
      [Permission.read(Role.user(goalData.userId)), Permission.write(Role.user(goalData.userId))]
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Goal
    const newGoal: Goal = {
      $id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      targetAmount: doc.targetAmount,
      currentAmount: doc.currentAmount,
      startDate: doc.startDate,
      status: doc.status,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      color: doc.color,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions, // Asegúrate de que Goal incluye estas
      $databaseId: doc.$databaseId, // Asegúrate de que Goal incluye estas
      $collectionId: doc.$collectionId, // Asegúrate de que Goal incluye estas
    };

    return newGoal;
  } catch (error) {
    console.error("Error al crear objetivo en Appwrite:", error);
    return null;
  }
}

/**
 * Obtiene un objetivo específico por su ID.
 * @param goalId El ID del objetivo.
 * @returns El objetivo encontrado, o null si no existe o hay un error.
 */
export async function getGoalById(goalId: string): Promise<Goal | null> {
  try {
    const doc: any = await databases.getDocument(
      // Usamos 'any' temporalmente para Document
      config.databaseId!,
      config.goalsCollectionId!,
      goalId
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Goal
    const goal: Goal = {
      $id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      targetAmount: doc.targetAmount,
      currentAmount: doc.currentAmount,
      startDate: doc.startDate,
      status: doc.status,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      color: doc.color,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      $databaseId: doc.$databaseId,
      $collectionId: doc.$collectionId,
    };

    return goal;
  } catch (error) {
    console.error(`Error al obtener objetivo ${goalId} de Appwrite:`, error);
    return null;
  }
}

/**
 * Actualiza un objetivo existente en Appwrite.
 * @param goalId El ID del objetivo a actualizar.
 * @param updatedData Los datos a actualizar del objetivo (pueden ser parciales).
 * @returns El objetivo actualizado, o null si falla.
 */
export async function updateGoal(goalId: string, updatedData: Partial<GoalData>): Promise<Goal | null> {
  try {
    const doc: any = await databases.updateDocument(
      // Usamos 'any' temporalmente para Document
      config.databaseId!,
      config.goalsCollectionId!,
      goalId,
      updatedData
    );

    // Mapear explícitamente el Documento de Appwrite a tu interfaz Goal
    const updatedGoal: Goal = {
      $id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      targetAmount: doc.targetAmount,
      currentAmount: doc.currentAmount,
      startDate: doc.startDate,
      status: doc.status,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      color: doc.color,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      $databaseId: doc.$databaseId,
      $collectionId: doc.$collectionId,
    };

    console.log("Objetivo actualizado con éxito:", updatedGoal);
    return updatedGoal;
  } catch (error) {
    console.error(`Error al actualizar objetivo ${goalId} en Appwrite:`, error);
    return null;
  }
}

/**
 * Elimina un objetivo específico de Appwrite.
 * @param goalId El ID del objetivo a eliminar.
 * @returns true si se eliminó con éxito, false si falla.
 */
export async function deleteGoal(goalId: string): Promise<boolean> {
  try {
    await databases.deleteDocument(config.databaseId!, config.goalsCollectionId!, goalId);
    console.log(`Objetivo ${goalId} eliminado con éxito.`);
    return true;
  } catch (error) {
    console.error(`Error al eliminar objetivo ${goalId} de Appwrite:`, error);
    return false;
  }
}

/**
 * Obtiene todos los objetivos de un usuario.
 * @param userId El ID del usuario.
 * @param queries Consultas adicionales (ej. filtrado por estado, paginación, etc.).
 * @returns Un array de objetivos.
 */
export async function getGoalsForUser(userId: string, queries: string[] = []): Promise<Goal[]> {
  try {
    const response = await databases.listDocuments(config.databaseId!, config.goalsCollectionId!, [
      Query.equal("userId", userId),
      Query.orderDesc("$createdAt"),
      Query.limit(100),
      ...queries,
    ]);

    const goals: Goal[] = response.documents.map((doc: any) => ({
      $id: doc.$id,
      userId: doc.userId,
      name: doc.name,
      targetAmount: doc.targetAmount,
      currentAmount: doc.currentAmount,
      startDate: doc.startDate,
      status: doc.status,
      iconName: doc.iconName,
      iconFamily: doc.iconFamily,
      color: doc.color,
      description: doc.description || undefined,
      $createdAt: doc.$createdAt,
      $updatedAt: doc.$updatedAt,
      $permissions: doc.$permissions,
      $databaseId: doc.$databaseId,
      $collectionId: doc.$collectionId,
    }));

    return goals;
  } catch (error) {
    console.error(`Error al obtener objetivos para el usuario ${userId} de Appwrite:`, error);
    return [];
  }
}
