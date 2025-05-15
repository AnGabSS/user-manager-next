import { z } from "zod";

export const signinUserSchema = z.object({
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
});
