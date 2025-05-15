import { UserResponseInterface } from "./UserResponseInterface";

export interface PaginatedUserFieldsInterface {
  items: UserResponseInterface[];
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface PaginatedUserResponseInterface {
  data: PaginatedUserFieldsInterface;
}