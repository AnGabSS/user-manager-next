import axios from "axios";
import { toast } from "sonner";

export const SigupGoogle = async (accessToken: string) => {
  try {
    sessionStorage.setItem("google_token", accessToken);

    const res = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = res.data;

    if (!user || !user.name || !user.email) {
      throw new Error("Usuário do Google inválido.");
    }

    const { name, email } = user;
    sessionStorage.setItem("google_name", name);
    sessionStorage.setItem("google_email", email);

    window.location.href = "/signup";
  } catch (error) {
    console.error("Erro ao obter dados do Google:", error);
    toast.error("Falha no login via Google. Tente novamente.");
  }
};
