"use client";
import { useSearchParams } from "next/navigation";
import CodeForm from "@/components/Codes/CodeForm";

export default function Page() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const idOffre = searchParams.get("id");

  return (
    <section className="mx-4 lg:mx-24 pt-16 pb-24">
      <article className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="">Panier</p>
          <h1 className="text-4xl font-krub">
            <span className="text-primary-500 font-bold">VOTRE</span> Panier
          </h1>
        </div>
        <p>
          <span className="font-bold text-primary-500">
            Indiquez votre nom et prénom, votre mail et la filière de votre
            alternance afin de ciblée vos recherches.
          </span>{" "}
          Dès la validation de votre paiement, vous recevrez automatiquement{" "}
          <span className="font-bold">un code unique par e-mail.</span> Ce code
          vous permettra d’accéder directement à votre liste personnalisée
        </p>
      </article>

      <div className="mt-16">
        <CodeForm offreId={idOffre ?? ""} />
      </div>
    </section>
  );
}
