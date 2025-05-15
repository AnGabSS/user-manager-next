
export type SearchInput<Filter = string> = {
    page?: number
    perPage?: number
    sort?: string | null
    sortDir?: "asc" | "desc" | null
    filter?: Filter | null,
    role?: "ADMIN" | "USER" | null
}


