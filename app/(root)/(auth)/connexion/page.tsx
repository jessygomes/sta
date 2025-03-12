import { LoginForm } from "@/components/Auth/Form/LoginForm";
import { currentUser } from "@/lib/authAction/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Connexion | Shop Ton Alternance",
  description:
    "Connectez-vous à votre compte Téléphone du Monde pour gérer vos commandes, consulter vos informations personnelles et accéder à vos offres exclusives. Une expérience simple et rapide.",
  keywords: [
    "se connecter",
    "compte utilisateur",
    "gestion de compte",
    "offres exclusives",
  ],
};

export default async function page() {
  const user = await currentUser();
  if (user) {
    redirect("/");
  }

  return (
    <section className="bg-primary-900 -mt-18 px-4 h-screen flex justify-center items-center">
      <Suspense>
        <LoginForm />
      </Suspense>
    </section>
  );
}
