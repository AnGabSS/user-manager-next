"use client";

import { SignupUser } from "@/api/signup-user";
import { UpdatePassword } from "@/api/update-password";
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
import { useForm } from "react-hook-form";
import UpdatePasswordDialog from "./UpdatePassword";

interface Props {
  isEdit: boolean;
  data?: Partial<SignupUserSchema>;
  id?: string;
}

const UserForm = ({ isEdit, data, id }: Props) => {
  const form = useForm<SignupUserSchema>({
    resolver: zodResolver(signupUserSchema),
    defaultValues: data ?? {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (formData: SignupUserSchema) => {
    try {
      await SignupUser(formData);
      form.reset()
      alert("Usuário criado com sucesso")
    } catch (error) {
      alert(error)
    }
  };

  return (
    <Card className="w-full rounded-lg h-full p-4 bg-emerald-500/80 text-white shadow-xl border border-emerald-500/80">
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
            className="flex flex-row flex-wrap"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10 w-full"
                      placeholder="David Bowie"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
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
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            {isEdit == false && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-zinc-900 h-10 w-full"
                        placeholder="themanwhofelltoearth"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </FormItem>
                )}
              />
            )
            }

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[96px] p-0 md:p-2">
                  <FormLabel>Perfil</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="text-black bg-white w-full h-10">
                        <SelectValue placeholder="Selecione um perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">Usuário</SelectItem>
                        <SelectItem value="ADMIN">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />


          </form>
          <div className="w-full flex justify-end mt-4 gap-2">
            <UpdatePasswordDialog id={"23131"} />

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
