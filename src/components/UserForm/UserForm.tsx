import { SignupUser } from "@/api/signup-user";
import { UpdateUser } from "@/api/update-user";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupUserSchema, signupUserSchema } from "@/schemas/SignupUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, isAxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import UpdatePasswordDialog from "./UpdatePassword";

interface Props {
  isEdit: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  data?: { id: string; values: Partial<SignupUserSchema> };
}

const UserForm = ({ isEdit, setIsEdit, data }: Props) => {
  const form = useForm<SignupUserSchema>({
    resolver: zodResolver(signupUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  useEffect(() => {
    const googleEmail = sessionStorage.getItem("google_email");
    const googleName = sessionStorage.getItem("google_name");
    if (data?.values) {
      form.reset({
        ...form.getValues(),
        ...data.values,
      });
    } else if (googleEmail && googleName) {
      form.reset({
        name: googleName,
        email: googleEmail,
        role: "USER",
      });
      sessionStorage.removeItem("google_token");
      sessionStorage.removeItem("google_name");
    }
  }, [data, form]);

  const showAxiosError = (error: AxiosError): string => {
    const status = error.response?.status;
    switch (status) {
      case 409:
        form.setError("email", {
          type: "manual",
          message: "Email já cadastrado.",
        });
        return "Email já cadastrado.";
      case 422:
        return "Dados inválidos.";
      default:
        return "Erro inesperado.";
    }
  };

  const onSubmit = async (formData: SignupUserSchema) => {
    try {
      if (!isEdit && !data?.id) {
        await SignupUser(formData);
        form.reset();
        toast.success("Usuário criado com sucesso.");
        window.location.href = "/";
      } else {
        await UpdateUser(data!.id, formData);
        if (setIsEdit) setIsEdit(true);
        toast.success("Usuário alterado com sucesso.");
        if (sessionStorage.getItem("token")) {
          window.location.href = "/users";
        }
      }
    } catch (error) {
      toast.error("Erro ao salvar usuário.", {
        description: isAxiosError(error)
          ? showAxiosError(error)
          : "Houve um erro ao salvar o usuário.",
        cancel: {
          label: "X",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  return (
    <Card className="w-full rounded-lg h-full p-4 bg-emerald-500/80 text-white shadow-xl border border-emerald-500/80">
      <Toaster position="bottom-right" richColors />

      <CardHeader className="text-center">
        <CardTitle className="text-3xl">
          {isEdit ? "Editar Usuário" : "Cadastrar Usuário"}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-1 md:p-6">
        <Form {...form}>
          <form
            id="user-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row flex-wrap items-end"
          >
            {/* Campos */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[120px] p-0 md:p-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10 w-full"
                      placeholder="David Bowie"
                      {...field}
                    />
                  </FormControl>
                  <p>
                    <FormMessage className="text-xs text-red-500 min-h-[20px] mt-1" />
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10 w-full"
                      placeholder="david@bowie.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <p>
                    <FormMessage className="text-xs text-red-500 min-h-[20px] mt-1" />
                  </p>
                </FormItem>
              )}
            />

            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2 self-start">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-zinc-900 h-10 w-full"
                        placeholder="themanwhofelltoearth"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <p>
                      <FormMessage className="text-xs text-red-500 min-h-[20px] mt-1" />
                    </p>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2 self-start">
                  <FormLabel>Perfil</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="text-black bg-white w-full h-10">
                        <SelectValue placeholder="Selecione um perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">Usuário</SelectItem>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <p>
                    <FormMessage className="text-xs text-red-500 min-h-[20px] mt-1" />
                  </p>
                </FormItem>
              )}
            />
          </form>

          <div className="w-full flex flex-wrap justify-end mt-4 gap-2">
            {isEdit && data?.id && <UpdatePasswordDialog id={data?.id} />}
            <Button
              type="submit"
              className="bg-orange-400 text-white cursor-pointer w-full md:w-1/6 p-4 min-w-[100px]"
              form="user-form"
            >
              {isEdit ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
