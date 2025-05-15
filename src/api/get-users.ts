import userApiClient from "@/lib/UserApiClient";
import { PaginatedUserFieldsInterface, PaginatedUserResponseInterface } from "@/types/PaginatedUserResponseInterface";
import { SearchInput } from "@/types/SearchInputInterface";

export const getUsers = async (paginationParams?: SearchInput, onlyInactive?: boolean): Promise<PaginatedUserFieldsInterface> => {
        const response = await userApiClient.get<PaginatedUserResponseInterface>(`/users${onlyInactive ? "/inactives" : ""}`, {
                ...(paginationParams && {
                        params: paginationParams
                })
        });
        console.log(response.data)
        return response.data.data;
}