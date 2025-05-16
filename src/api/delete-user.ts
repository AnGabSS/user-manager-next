import userApiClient from "@/lib/UserApiClient";

export const deleteUser = async (id: string) => {
  await userApiClient.delete(`/users/${id}`);
};
