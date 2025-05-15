import axios from "axios";

// User Manager API client
// Cliente da API para gerenciamento de usuários
export const userApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});