import { getCategories, getCurrentUser, getGoalsForUser, getTransactionsForUser } from "@/lib/appwrite";
import { Category } from "@/models/CategorySchema";
import { Goal } from "@/models/GoalSchema";
import { Transaction } from "@/models/TransactionSchema";
import { Models } from "react-native-appwrite";
import { create } from "zustand";

export interface AppState {
  // --- Estado Global ---
  currentUser: Models.User<Models.Preferences> | null;
  goals: Goal[];
  transactions: Transaction[];
  categories: Category[];
  totalBalance: number;
  isLoadingInitialData: boolean; // Indica si la carga inicial de todos los datos está en curso
  error: string | null; // Almacena mensajes de error de la carga inicial o refetches

  // --- Almacén para las funciones de desuscripción de Realtime ---
  // Esto es crucial para limpiar las suscripciones cuando el usuario cierra sesión o la app se cierra.
  _unsubscribe: {
    goals: (() => void) | null;
    transactions: (() => void) | null;
    categories: (() => void) | null;
  };

  // --- Acciones / Métodos ---

  // 1. Inicialización y Carga Principal
  initializeData: () => Promise<void>;
  resetStore: () => void; // Para limpiar el estado al cerrar sesión

  // 2. Manejo de Suscripciones en Tiempo Real
  subscribeToRealtimeUpdates: (userId: string) => void;
  unsubscribeFromRealtimeUpdates: () => void;

  // 3. Acciones de Mutación Local (para actualizar el estado después de operaciones CRUD exitosas)
  // Estas acciones son llamadas DESPUÉS de que Appwrite haya confirmado una operación (ej. crear una meta)
  // y la respuesta del Realtime de Appwrite también actualizará el store, pero estas son para consistencia inmediata.

  // Goals
  addGoalLocally: (goal: Goal) => void;
  updateGoalLocally: (goal: Goal) => void;
  deleteGoalLocally: (goalId: string) => void;

  // Transactions
  addTransactionLocally: (transaction: Transaction) => void;
  updateTransactionLocally: (transaction: Transaction) => void;
  deleteTransactionLocally: (transactionId: string) => void;

  // Categories (si son mutables por el usuario y se necesita actualización local)
  addCategoryLocally: (category: Category) => void;
  updateCategoryLocally: (category: Category) => void;
  deleteCategoryLocally: (categoryId: string) => void;

  // 4. Acciones de Re-fetch Manual (para "Pull-to-Refresh" o resincronización explícita)
  refetchGoals: () => Promise<void>;
  refetchTransactions: () => Promise<void>;
  refetchCategories: () => Promise<void>;

  // --- Funciones de Utilidad Internas (no exportadas, prefijo _) ---
  _calculateTotalBalance: (transactions: Transaction[]) => number;
}

export const useAppStore = create<AppState>((set, get) => ({
  // --- Estado Inicial ---
  currentUser: null,
  goals: [],
  transactions: [],
  categories: [],
  totalBalance: 0,
  isLoadingInitialData: true,
  error: null,
  _unsubscribe: {
    goals: null,
    transactions: null,
    categories: null,
  },

  // --- Funciones de Utilidad Internas ---
  _calculateTotalBalance: (transactions: Transaction[]) => {
    return transactions.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      } else if (transaction.type === "expense") {
        return acc - transaction.amount;
      }
      return acc;
    }, 0);
  },

  // --- 1. Inicialización y Carga Principal ---
  initializeData: async () => {
    set({ isLoadingInitialData: true, error: null });
    try {
      const user = await getCurrentUser();
      if (!user) {
        // No hay usuario logueado, limpiar y salir. La navegación al login debe ser manejada por _layout.tsx
        set({
          currentUser: null,
          goals: [],
          transactions: [],
          categories: [],
          totalBalance: 0,
          isLoadingInitialData: false,
        });
        return;
      }

      set({ currentUser: user });
      const userId = user.$id;

      // Carga paralela de todas las colecciones necesarias
      const [goals, transactions, categories] = await Promise.all([
        getGoalsForUser(userId), // Asegúrate de que esta función obtiene los goals del usuario
        getTransactionsForUser(userId), // Asegúrate de que esta función obtiene las transacciones del usuario
        getCategories(), // Asume que esta función obtiene todas las categorías (podrían ser globales o personalizadas)
      ]);

      const totalBalance = get()._calculateTotalBalance(transactions);

      set({
        goals,
        transactions,
        categories,
        totalBalance,
        isLoadingInitialData: false,
      });

      // Suscribirse a las actualizaciones en tiempo real después de la carga inicial exitosa
      get().subscribeToRealtimeUpdates(userId);
    } catch (err: any) {
      console.error("Failed to initialize app data:", err);
      set({ error: err.message || "Failed to load initial data", isLoadingInitialData: false });
      // Si la carga inicial falla, el _layout.tsx puede mostrar una pantalla de error.
    }
  },

  resetStore: () => {
    get().unsubscribeFromRealtimeUpdates(); // Desuscribirse al limpiar
    set({
      currentUser: null,
      goals: [],
      transactions: [],
      categories: [],
      totalBalance: 0,
      isLoadingInitialData: false, // O true si quieres que reinicie la carga al volver a entrar
      error: null,
    });
  },

  // --- 2. Manejo de Suscripciones en Tiempo Real ---
  subscribeToRealtimeUpdates: (userId: string) => {
    const { _unsubscribe, _calculateTotalBalance } = get();

    // Primero, desuscribe cualquier suscripción activa para evitar duplicados
    get().unsubscribeFromRealtimeUpdates();

    // Suscripción a Goals

    // Suscripción a Categories (solo si tus usuarios pueden modificar categorías o si cambian a menudo globalmente)

    set({ _unsubscribe }); // Guarda las referencias a las funciones de desuscripción
  },

  unsubscribeFromRealtimeUpdates: () => {
    const { _unsubscribe } = get();
    if (_unsubscribe.goals) {
      _unsubscribe.goals();
      _unsubscribe.goals = null;
    }
    if (_unsubscribe.transactions) {
      _unsubscribe.transactions();
      _unsubscribe.transactions = null;
    }
    if (_unsubscribe.categories) {
      _unsubscribe.categories();
      _unsubscribe.categories = null;
    }
    set({ _unsubscribe }); // Asegúrate de limpiar las referencias en el estado
  },

  // --- 3. Acciones de Mutación Local (para usar después de realizar CRUD con Appwrite) ---
  addGoalLocally: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  updateGoalLocally: (updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.$id === updatedGoal.$id ? updatedGoal : g)),
    })),
  deleteGoalLocally: (goalId) => set((state) => ({ goals: state.goals.filter((g) => g.$id !== goalId) })),

  addTransactionLocally: (transaction) =>
    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      const newBalance = get()._calculateTotalBalance(newTransactions);
      return {
        transactions: newTransactions,
        totalBalance: newBalance,
      };
    }),
  updateTransactionLocally: (updatedTransaction) =>
    set((state) => {
      const newTransactions = state.transactions.map((t) =>
        t.$id === updatedTransaction.$id ? updatedTransaction : t
      );
      const newBalance = get()._calculateTotalBalance(newTransactions);
      return {
        transactions: newTransactions,
        totalBalance: newBalance,
      };
    }),
  deleteTransactionLocally: (transactionId) =>
    set((state) => {
      const newTransactions = state.transactions.filter((t) => t.$id !== transactionId);
      const newBalance = get()._calculateTotalBalance(newTransactions);
      return {
        transactions: newTransactions,
        totalBalance: newBalance,
      };
    }),

  addCategoryLocally: (category) => set((state) => ({ categories: [...state.categories, category] })),
  updateCategoryLocally: (updatedCategory) =>
    set((state) => ({
      categories: state.categories.map((c) => (c.$id === updatedCategory.$id ? updatedCategory : c)),
    })),
  deleteCategoryLocally: (categoryId) =>
    set((state) => ({ categories: state.categories.filter((c) => c.$id !== categoryId) })),

  // --- 4. Acciones de Re-fetch Manual ---
  refetchGoals: async () => {
    const currentUser = get().currentUser;
    if (currentUser) {
      try {
        const fetchedGoals = await getGoalsForUser(currentUser.$id);
        set({ goals: fetchedGoals });
      } catch (err: any) {
        console.error("Error refetching goals:", err);
        // Puedes añadir un estado de error específico o una notificación aquí
      }
    }
  },
  refetchTransactions: async () => {
    const currentUser = get().currentUser;
    if (currentUser) {
      try {
        const fetchedTransactions = await getTransactionsForUser(currentUser.$id);
        const totalBalance = get()._calculateTotalBalance(fetchedTransactions);
        set({ transactions: fetchedTransactions, totalBalance });
      } catch (err: any) {
        console.error("Error refetching transactions:", err);
        // Puedes añadir un estado de error específico o una notificación aquí
      }
    }
  },
  refetchCategories: async () => {
    // Solo si las categorías son mutables por el usuario o cambian a menudo en el backend
    try {
      const fetchedCategories = await getCategories();
      set({ categories: fetchedCategories });
    } catch (err: any) {
      console.error("Error refetching categories:", err);
      // Puedes añadir un estado de error específico o una notificación aquí
    }
  },
}));
