"use client";

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

interface Props {
  isEdit: boolean;
  data?: Partial<SignupUserSchema>;
}

const UserForm = ({ isEdit, data }: Props) => {
  const form = useForm<SignupUserSchema>({
    resolver: zodResolver(signupUserSchema),
    defaultValues: data ?? {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = (formData: SignupUserSchema) => {
    console.log("Dados do formulário:", formData);
  };

  return (
    <Card className="w-full rounded-lg h-full p-4 bg-emerald-500/80 text-white shadow-xl border border-emerald-500/80">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">
          {isEdit ? "Editar Usuário" : "Cadastrar Usuário"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-5"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="min-h-[90px]  flex flex-col items-start">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10"
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
                <FormItem className="min-h-[90px]  flex flex-col items-start">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10"
                      placeholder="david@bowie.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="min-h-[90px]  flex flex-col items-start">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10"
                      placeholder="themanwhofelltoearth"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-500 mt-1" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="min-h-[90px]  flex flex-col items-start">
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

            <div className="col-span-2 flex justify-end mt-4">
              <Button
                type="submit"
                className="bg-orange-400 text-white cursor-pointer w-1/6 p-4"
              >
                {isEdit ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
