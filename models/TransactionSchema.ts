// src/models/TransactionSchema.ts

import { z } from "zod";
import { Category } from "./CategorySchema";

// Interfaz para la Transaction como se guarda en Appwrite
export interface Transaction {
  $id: string; // ID del documento en Appwrite
  userId: string;
  amount: number;
  type: "income" | "expense";
  // ¡CAMBIO AQUÍ! categoryId ahora es un objeto Category
  categoryId: Category; // Appwrite te devuelve el objeto Category completo
  date: string; // Formato ISO 8601 (YYYY-MM-DD)
  description?: string; // Opcional
  $createdAt: string; // Appwrite metadata
  $updatedAt: string; // Appwrite metadata
  // Otros campos de Appwrite si los necesitas ($collectionId, $databaseId, $permissions, etc.)
}

// Schema de Zod para validar los datos de entrada del formulario
// NOTA: Para la entrada, categoryId sigue siendo un string, ya que solo envías el ID al crear/actualizar.
// La transformación a objeto ocurre en la lectura desde Appwrite.
export const TransactionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.number().min(0.01, "Amount must be greater than 0"),
  description: z.string().min(1, "Description is required").max(255, "Description too long"),
  type: z.enum(["income", "expense"], { message: "Invalid transaction type" }),
  categoryId: z.string().min(1, "Category is required"), // Sigue siendo string para la entrada del formulario
  date: z.string().refine((val) => !isNaN(new Date(val).getTime()), "Invalid date format"),
});

// Tipo derivado del schema de Zod
export type TransactionData = z.infer<typeof TransactionSchema>;
