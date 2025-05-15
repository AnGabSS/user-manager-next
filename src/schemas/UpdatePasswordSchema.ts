import { z } from "zod";

export const updatePasswordSchema = z.object({
    password: z
        .string({
            required_error: "Senha é obrigatória",
            invalid_type_error: "Senha deve ser uma string",
        })
        .min(1, "Senha é obrigatória"),
    oldPassword: z
        .string({
            required_error: "Senha antiga é obrigatória",
            invalid_type_error: "Senha antiga deve ser uma string",
        })
        .min(1, "Senha antiga é obrigatória"),
});

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>
