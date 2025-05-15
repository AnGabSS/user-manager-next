import axios from "axios";

// User Manager API client
// Cliente da API para gerenciamento de usuários
export const userApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

userApiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }

    return Promise.reject(error)
  }
)

export default userApiClient