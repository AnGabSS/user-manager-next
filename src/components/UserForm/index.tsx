"use client"; // se necessário no Next.js

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster, toast } from "sonner";
import { useUserForm } from "@/hooks/useUserForm";
import { handleUserSubmit } from "@/lib/handleUserSubmit";
import UpdatePasswordDialog from "./UpdatePassword";
import { SignupUserSchema } from "@/schemas/SignupUserSchema";
import { useState } from "react";

interface Props {
  isEdit: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  data?: { id: string; values: Partial<SignupUserSchema> };
}

const UserForm = ({ isEdit, setIsEdit, data }: Props) => {
  const form = useUserForm(data);
  const [isLoading, setIsLoading] = useState(false);


  const onSubmit = (formData: SignupUserSchema) =>
    handleUserSubmit({
      formData,
      form,
      isEdit,
      data,
      setIsEdit,
      setIsLoading,
    });

  const showButtonMessage = () => {
    if (isLoading) return "Salvando...";
    if (isEdit) return "Salvar Alterações";
    return "Cadastrar";
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
                  <p className="min-h-[16px]">
                    <FormMessage className="text-xs text-red-500 mt-1" />
                  </p>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full md:w-1/2 min-h-[120px] p-0 md:p-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white text-zinc-900 h-10 w-full"
                      placeholder="david@bowie.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <p className="min-h-[16px]">
                    <FormMessage className="text-xs text-red-500" />
                  </p>
                </FormItem>
              )}
            />

            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 min-h-[120px] p-0 md:p-2 self-start">
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white text-zinc-900 h-10 w-full"
                        placeholder="themanwhofelltoearth"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <p className="min-h-[0.75rem]">
                      <FormMessage className="text-xs text-red-500 mt-1" />
                    </p>
                  </FormItem>
                )}
              />
            )}
          </form>

          <div className="w-full flex flex-wrap justify-end mt-4 gap-2">
            {isEdit && data?.id && <UpdatePasswordDialog id={data.id} />}
            <Button
              type="submit"
              form="user-form"
              disabled={isLoading}
              className="bg-orange-400 text-white cursor-pointer w-full md:w-1/6 p-4 min-w-[120px]"
            >
              {showButtonMessage()}
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
