import { UserResponseInterface } from "./UserResponseInterface";

export interface PaginatedUserResponseInterface {
  data: UserResponseInterface[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}