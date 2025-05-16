import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";

import { SigninUser } from "@/api/signin-user";
import { useGoogleSignup } from "@/hooks/useGoogleSignup";
import { signinUserSchema, SigninUserSchema } from "@/schemas/SigninUserSchema";
import { faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

const CardLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninUserSchema>({
    resolver: zodResolver(signinUserSchema),
  });

  const showErrorMessage = (code?: number) => {
    switch (code) {
      case 400:
        return "Senha incorreta.";
      case 404:
        return "Usuário não encontrado.";
      default:
        return "Erro inesperado.";
    }
  };

  const onSubmit = async (data: SigninUserSchema) => {
    try {
      const response = await SigninUser(data);

      if (response.role === "ADMIN") {
        window.location.href = "/users";
      } else {
        window.location.href = `/edit/${response.id}`;
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error("Erro ao fazer login.", {
          description: showErrorMessage(err.response?.status),
          cancel: {
            label: "X",
            onClick: () => {
              toast.dismiss(err.response?.status);
            },
          },
        });
      } else {
        toast.error("Erro inesperado.", {
          description: "Tente novamente mais tarde.",
        });
      }
    }
  };

  const buttonStyle = "bg-orange-400 text-white cursor-pointer w-full p-6";
  const inputStyle = "bg-white text-zinc-900 w-full p-6";

  const googleSignup = useGoogleSignup();

  return (
    <Card className="w-full h-full p-10 bg-emerald-500/80 text-white shadow-xl rounded-lg">
      <Toaster position="bottom-right" richColors />

      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Login</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="david@bowie.com"
                className={inputStyle}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-200 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="rebel123"
                className={inputStyle}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-200 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className={buttonStyle}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-5">
        <article className="flex flex-col items-center justify-center gap-2 w-full">
          <p>ou</p>

          <div className="w-full">
            <Button className={buttonStyle} onClick={() => googleSignup()}>
              <FontAwesomeIcon
                icon={faGooglePlus}
                className="text-emerald-600 mr-2"
              />
              Cadastrar com Google
            </Button>
          </div>
        </article>

        <Label className="ml-2">
          Se você não tem conta,{" "}
          <Link
            href="/signup"
            className="hover:underline text-orange-600 hover:text-green-400"
          >
            clique aqui
          </Link>
        </Label>
      </CardFooter>
    </Card>
  );
};

export default CardLogin;
