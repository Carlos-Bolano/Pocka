import { Models } from "react-native-appwrite";
import { z } from "zod";

export const GoalStatusSchema = z.enum(["inProgress", "achieved", "cancelled", "overdue"]);

export const GoalSchema = z.object({
  userId: z
    .string({
      required_error: "User ID is required.",
    })
    .min(1, "User ID cannot be empty."),

  name: z
    .string({
      required_error: "Goal name is required.",
    })
    .min(3, "Name must be at least 3 characters long.")
    .max(100, "Name is too long."),

  targetAmount: z
    .number({
      required_error: "Target amount is required.",
      invalid_type_error: "Target amount must be a number.",
    })
    .positive("Target amount must be a positive number."),

  currentAmount: z
    .number({
      required_error: "Current amount is required.",
      invalid_type_error: "Current amount must be a number.",
    })
    .nonnegative("Current amount cannot be negative."),

  startDate: z
    .string({
      required_error: "Start date is required.",
    })
    .refine((val) => !isNaN(new Date(val).getTime()), {
      message: "Invalid start date format.",
    }),

  // endDate: z
  //   .string({
  //     required_error: "End date is required.",
  //   })
  //   .refine((val) => !isNaN(new Date(val).getTime()), {
  //     message: "Invalid end date format.",
  //   }),

  status: GoalStatusSchema,

  iconName: z
    .string({
      required_error: "Icon name is required.",
    })
    .min(1, "Icon name cannot be empty."),

  iconFamily: z
    .string({
      required_error: "Icon family is required.",
    })
    .min(1, "Icon family cannot be empty."),

  color: z
    .string({
      required_error: "Color is required.",
    })
    .min(4, "Color must be at least 4 characters (e.g., #FFF)."),

  description: z.string().optional(),
});

export type GoalData = z.infer<typeof GoalSchema>;

export interface Goal extends GoalData, Models.Document {}
