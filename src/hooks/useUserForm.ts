import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupUserSchema, signupUserSchema } from "@/schemas/SignupUserSchema";

export const useUserForm = (data?: { id: string; values: Partial<SignupUserSchema> }) => {
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
      form.reset({ ...form.getValues(), ...data.values });
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

  return form;
};
