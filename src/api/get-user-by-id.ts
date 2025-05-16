import userApiClient from "@/lib/UserApiClient";
import { UserResponseInterface } from "@/types/UserResponseInterface";

export const getUserById = async (
  id: string
): Promise<UserResponseInterface> => {
  const response = await userApiClient.get<{ data: UserResponseInterface }>(
    `/users/${id}`
  );
  return response.data.data;
};
