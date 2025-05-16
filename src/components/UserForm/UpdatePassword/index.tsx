import { UpdatePassword } from "@/api/update-password";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "@/schemas/UpdatePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

interface Props {
  id: string;
}

const UpdatePasswordDialog = ({ id }: Props) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordSchema) => {
    try {
      await UpdatePassword(id, data);
      reset();
      toast.success("Senha alterada com sucesso.");
      onChangeShow(false);
    } catch (error) {
      toast.error("Erro ao alterar senha.", {
        description: isAxiosError(error)
          ? error.response?.data.message
          : "Houve um erro ao alterar a senha.",
        cancel: {
          label: "X",
          onClick: () => {
            toast.dismiss();
          },
        },
      });
    }
  };

  const onChangeShow = (show: boolean) => {
    setOpen(show);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onChangeShow}>
      <Toaster position="bottom-right" richColors />

      <DialogTrigger asChild>
        <Button className="bg-orange-600 text-white cursor-pointer w-full md:w-1/6 p-4 min-w-[100px]">
          Alterar Senha
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-emerald-400/95 text-white shadow-xl rounded-lg">
        <DialogHeader>
          <DialogTitle>Atualizar Senha</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="oldPassword">Senha atual</Label>
            <Input
              id="oldPassword"
              type="password"
              placeholder="Senha atual"
              {...register("oldPassword")}
              className="bg-white text-zinc-900"
            />
            {errors.oldPassword && (
              <span className="text-sm text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Nova senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nova senha"
              {...register("password")}
              className="bg-white text-zinc-900"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="submit"
              className="bg-orange-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePasswordDialog;
