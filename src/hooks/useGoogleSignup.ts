import { SigupGoogle } from "@/api/signup-google";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export const useGoogleSignup = () => {
  return useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (!accessToken) {
        toast.error("Token do Google não encontrado.");
        return;
      }

      await SigupGoogle(accessToken);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Erro ao fazer login com o Google.", {
        description: "Tente novamente mais tarde.",
      });
    },
  });
};
