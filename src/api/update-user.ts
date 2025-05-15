import { userApiClient } from "@/lib/UserApiClient"
import { SignupUserSchema } from "@/schemas/SignupUserSchema"
import { UpdateUserSchema } from "@/schemas/UpdateUserSchema"
import { UserResponseInterface } from "@/types/UserResponseInterface"


export const SignupUser = async (id: string, userData: UpdateUserSchema): Promise<UserResponseInterface> => {
    const response = await userApiClient.put<UserResponseInterface>(`/users/${id}`, userData)
    return response.data
}
