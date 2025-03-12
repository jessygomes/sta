"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CardWrapper } from "../CardWrapper";

import { toast } from "sonner";
import { userLoginSchema } from "@/lib/zod/validator";
import { login } from "@/lib/authAction/auth.actions";
import { FormError } from "@/components/Shared/Form/FormError";
import { FormSuccess } from "@/components/Shared/Form/FormSucess";

interface LoginFormProps {
  onClose?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OauthAccountNotLinked"
      ? "L'email est déjà utilisé par un autre compte"
      : "";

  //! TVa permettre d'inititer un état de chargement lors de la soumission du formulaire et permettra de désactiver les boutons au submit du formulaire
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  //! Schema de validation
  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //! SUBMIT
  const onSubmit = (values: z.infer<typeof userLoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values)
        .then(
          (data?: {
            error?: string;
            success?: string;
            user?: {
              id: string;
              firstName: string;
              lastName: string;
              email: string;
            };
          }) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }

            if (data?.success) {
              form.reset();
              setSuccess(data.success);
              router.refresh();
              router.push("/");
              toast.success("Vous êtes connecté");
              if (onClose) {
                onClose();
              }
            }
          }
        )
        .catch(() =>
          setError("Une erreur s'est produite. Veuillez réessayer.")
        );
    });
  };

  return (
    <div className="flex flex-col w-full lg:w-2/5 mx-auto">
      <CardWrapper
        headerLabel="Connectez-vous"
        // backButtonLabel="Vous n'avez pas de compte ? Créer un compte"
        // backButtonHref="/creer-mon-compte"
        // showSocial
      >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <>
            <div className="flex flex-col gap-2 font-krub">
              <label className="text-black/70 text-xs" htmlFor="mail">
                Email
              </label>
              <input
                id="mail"
                placeholder="sta@mail.com"
                type="text"
                className="p-2 bg-transparent border-b text-black rounded-2xl"
                {...form.register("email")}
              />
            </div>

            <div className="flex flex-col gap-2 font-krub">
              <label className="text-black/70 text-xs" htmlFor="mail">
                Mot de passe
              </label>
              <input
                id="password"
                placeholder="Mot de passe"
                type="password"
                className="p-2 bg-transparent border-b text-black rounded-2xl"
                {...form.register("password")}
              />
            </div>
          </>

          <FormError message={error || urlError} />
          <FormSuccess message={success} />

          <button
            className="cursor-pointer bg-gradient-to-r px-2 relative group/btn from-primary-700 to-primary-500 block w-full text-white font-krub rounded-md h-10 font-medium font-font1 uppercase tracking-widest"
            type="submit"
            disabled={isPending}
          >
            SE CONNECTER &rarr;
          </button>
        </form>
      </CardWrapper>
      {/* <Link
        className="mt-2 text-center text-noir-100 text-xs hover:text-white/70 transition-all ease-in-out duration-150"
        href="/auth/reset"
      >
        Mot de passe oublié ?
      </Link> */}
    </div>
  );
};
