import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().nonempty("first name is required"),
  lastName: z.string().nonempty("last name is required"),
  email: z.string().nonempty("email is required").email("email is invalid"),
  password: z.string().nonempty("password is required"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
