import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/schemas/UpdatePasswordSchema";
import { UpdatePassword } from "@/api/update-password";
import { useState } from "react";

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
            alert("Senha atualizada com sucesso");
            setOpen(false);
        } catch (error: any) {
            alert(error?.message || "Erro ao atualizar a senha");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-orange-600 text-white cursor-pointer w-full md:w-1/6 p-4 min-w-[100px]">Alterar Senha</Button>
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
                            className="bg-white"
                        />
                        {errors.oldPassword && (
                            <span className="text-sm text-red-500">{errors.oldPassword.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Nova senha</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Nova senha"
                            {...register("password")}
                            className="bg-white"
                        />
                        {errors.password && (
                            <span className="text-sm text-red-500">{errors.password.message}</span>
                        )}
                    </div>

                    <DialogFooter className="bg-orange-500 mt-4">
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Salvando..." : "Salvar"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdatePasswordDialog;
