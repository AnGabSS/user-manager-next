import { userApiClient } from "@/lib/UserApiClient";
import { SigninUserSchema } from "@/schemas/SigninUserSchema";
import { TokenInterface } from "@/types/TokenInterface";

export const SigninUser = async (userData: SigninUserSchema) => {
  const response = await userApiClient.post<TokenInterface>(
    "/users/auth/login",
    userData
  );
  sessionStorage.setItem("token", response.data.accessToken);
  return response.data;
};
