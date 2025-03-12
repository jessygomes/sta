"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import { CardWrapper } from "../CardWrapper";
import { toast } from "sonner";
import { userRegisterSchema } from "@/lib/zod/validator";
import { register } from "@/lib/authAction/auth.actions";
import { FormError } from "@/components/Shared/Form/FormError";
import { FormSuccess } from "@/components/Shared/Form/FormSucess";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userRegisterSchema>>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  //! Fonction de soumission du formulaire
  const onSubmit = (values: z.infer<typeof userRegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data: { error?: string; success?: string }) => {
        setError(data.error);
        setSuccess(data.success);
        toast.success("Votre compte a été créé avec succès !");
      });
    });
  };

  return (
    <CardWrapper headerLabel="Inscrivez-vous">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-2 font-krub">
          <div className="flex flex-col gap-2">
            <label className="text-black/70 text-xs" htmlFor="firstName">
              Prénom
            </label>
            <input
              id="firstName"
              placeholder="Tyler"
              type="text"
              {...form.register("firstName")}
              className="p-2 bg-transparent border-b text-black rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black/70 text-xs" htmlFor="lastName">
              Nom
            </label>
            <input
              id="lastName"
              placeholder="Brown"
              type="text"
              {...form.register("lastName")}
              className="p-2 bg-transparent border-b text-black rounded-2xl"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 font-krub">
          <label className="text-black/70 text-xs" htmlFor="mail">
            Email
          </label>
          <input
            id="mail"
            placeholder="Tyler"
            type="text"
            {...form.register("email")}
            className="p-2 bg-transparent border-b text-black rounded-2xl"
          />
        </div>

        <div className="flex gap-2 font-krub">
          <div className="flex flex-col gap-2">
            <label className="text-black/70 text-xs" htmlFor="password">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              {...form.register("password")}
              className="p-2 bg-transparent border-b text-black rounded-2xl"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-black/70 text-xs"
              htmlFor="passwordConfirmation"
            >
              Confirmer le mot de passe
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              {...form.register("passwordConfirmation")}
              className="p-2 bg-transparent border-b text-black rounded-2xl"
            />
          </div>
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          className="cursor-pointer bg-gradient-to-l px-2 relative group/btn from-primary-700 to-primary-500 block w-full text-white rounded-md h-10 font-medium font-font1 uppercase tracking-widest"
          type="submit"
          disabled={isPending}
        >
          Créer mon compte &rarr;
        </button>
      </form>
    </CardWrapper>
  );
};
