import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("email is required").email("email is invalid"),
  password: z.string().nonempty("password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
