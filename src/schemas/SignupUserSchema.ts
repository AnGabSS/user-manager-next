import { z } from "zod";

export const signupUserSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
      invalid_type_error: "Nome deve ser uma string",
    })
    .min(1, "Nome é obrigatório"),

  email: z
    .string({
      required_error: "Email é obrigatório",
      invalid_type_error: "Email deve ser uma string",
    })
    .min(1, "Email é obrigatório")
    .email("Email inválido"),

  password: z
    .string({
      required_error: "Senha é obrigatória",
      invalid_type_error: "Senha deve ser uma string",
    })
    .min(1, "Senha é obrigatória"),

  role: z.nativeEnum(
    {
      ADMIN: "ADMIN",
      USER: "USER",
    },
    {
      errorMap: () => ({ message: "Perfil inválido" }),
    }
  ),
});

export type SignupUserSchema = z.infer<typeof signupUserSchema>;
