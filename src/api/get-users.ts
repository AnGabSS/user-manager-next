import userApiClient from "@/lib/UserApiClient";
import { PaginatedUserResponseInterface } from "@/types/PaginatedUserResponseInterface";
import { PaginationInterface } from "@/types/PaginationInterface";

export const getUsers = async (paginationParams?: PaginationInterface, onlyInactive?: boolean): Promise<PaginatedUserResponseInterface> => {
        const response = await userApiClient.get<PaginatedUserResponseInterface>(`/users${onlyInactive && "/inactives"}`, {
                ...(paginationParams && {
                        params: paginationParams
                })
        });
        return response.data;
}