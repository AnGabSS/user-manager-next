import userApiClient from "@/lib/UserApiClient";
import {
  PaginatedUserFieldsInterface,
  PaginatedUserResponseInterface,
} from "@/types/PaginatedUserResponseInterface";
import { SearchInput } from "@/types/SearchInputInterface";

export const getUsers = async (
  paginationParams?: SearchInput,
  onlyInactive?: boolean
): Promise<PaginatedUserFieldsInterface> => {
  const response = await userApiClient.get<PaginatedUserResponseInterface>(
    `/users${onlyInactive ? "/inactive" : ""}`,
    {
      ...(paginationParams && {
        params: paginationParams,
      }),
    }
  );
  return response.data.data;
};
