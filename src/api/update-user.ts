import { userApiClient } from "@/lib/UserApiClient";
import { UpdateUserSchema } from "@/schemas/UpdateUserSchema";
import { UserResponseInterface } from "@/types/UserResponseInterface";

export const UpdateUser = async (
  id: string,
  userData: UpdateUserSchema
): Promise<UserResponseInterface> => {
  const response = await userApiClient.put<UserResponseInterface>(
    `/users/${id}`,
    {
      name: userData.name,
      email: userData.email,
    }
  );
  return response.data;
};
