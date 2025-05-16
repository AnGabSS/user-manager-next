import { SignupUser } from "@/api/signup-user";
import { UpdateUser } from "@/api/update-user";
import { AxiosError, isAxiosError } from "axios";
import { SignupUserSchema } from "@/schemas/SignupUserSchema";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface HandleUserSubmitParams {
    formData: SignupUserSchema;
    form: UseFormReturn<SignupUserSchema>;
    isEdit: boolean;
    data?: { id: string; values: Partial<SignupUserSchema> };
    setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handleUserSubmit = async ({
    formData,
    form,
    isEdit,
    data,
    setIsEdit,
    setIsLoading,
}: HandleUserSubmitParams) => {
    const showAxiosError = (error: AxiosError): string => {
        const status = error?.response?.status;
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

    try {
        setIsLoading?.(true);

        if (!isEdit && !data?.id) {
            await SignupUser(formData);
            form.reset();
            toast.success("Usuário criado com sucesso.");
            window.location.href = "/";
        } else {
            await UpdateUser(data!.id, formData);
            setIsEdit?.(true);
            toast.success("Usuário alterado com sucesso.");

            if (sessionStorage.getItem("token") && data?.values.role === "ADMIN") {
                window.location.href = "/users";
            }
            window.location.href = "/";

        }
    } catch (error) {
        toast.error("Erro ao salvar usuário.", {
            description: isAxiosError(error)
                ? showAxiosError(error)
                : "Houve um erro ao salvar o usuário.",
            cancel: {
                label: "X",
                onClick: () => toast.dismiss(),
            },
        });
    } finally {
        setIsLoading?.(false);
    }
};
