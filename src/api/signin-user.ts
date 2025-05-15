import { userApiClient } from "@/lib/UserApiClient";
import { SigninUserSchema } from "@/schemas/SigninUserSchema";
import { TokenInterface } from "@/types/TokenInterface";
import { UserResponseInterface } from "@/types/UserResponseInterface";

export const SigninUser = async(userData: SigninUserSchema) =>{
    const response = await userApiClient.post<TokenInterface>("/users/login", userData)
    sessionStorage.setItem("token", response.data.acessToken)

    if(response.data.role == "ADMIN"){
        window.location.href = "/users"
    } else{
        window.location.href = `/edit/${response.data.id}`
    }

    return response.data
}