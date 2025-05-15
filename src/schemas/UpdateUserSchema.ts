import { z } from "zod";

export const updateUserSchema = z.object({
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
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
