import { userApiClient } from "@/lib/UserApiClient"
import { SignupUserSchema } from "@/schemas/SignupUserSchema"
import { UserResponseInterface } from "@/types/UserResponseInterface"


export const SignupUser = async(userData: SignupUserSchema): Promise<UserResponseInterface> =>{
    const response = await userApiClient.post<UserResponseInterface>("/users/auth/register", userData)
    return response.data
}
