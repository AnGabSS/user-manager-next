import userApiClient from "@/lib/UserApiClient";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/schemas/UpdatePasswordSchema";
import { UserResponseInterface } from "@/types/UserResponseInterface";

export const UpdatePassword = async (id: string, oldData: UpdatePasswordSchema): Promise<UserResponseInterface> => {
    const response = await userApiClient.patch<UserResponseInterface>(`/users/${id}`, oldData)
    return response.data
    
}