"use client";
import { useRouter } from "next/navigation";

import { OffreFrontProps } from "@/lib/types/offre";

export default function Offre({ offre }: { offre: OffreFrontProps }) {
  const router = useRouter(); // Initialiser le router

  const parametres =
    typeof offre.parametres === "string" ? JSON.parse(offre.parametres) : {};
  return (
    <div
      key={offre.id}
      className="h-fit flex flex-col gap-4 bg-gradient-to-r from-primary-800 to-primary-700 p-4 rounded-2xl text-white font-krub shadow-[0px_8px_4px_0px_rgba(0,0,0,0.35)]"
    >
      <div className="flex justify-between border-b-2 border-white pb-2">
        <h3 className="font-bold tracking-widest">{offre.nom}</h3>
        <p className="font-bold tracking-widest">{offre.price} €</p>
      </div>
      <ul className="flex flex-col gap-4 text-xs">
        <li className="font-bold">{offre.description}</li>
        {parametres.access && (
          <li>✅ {parametres.access} entreprises ciblées</li>
        )}
        {parametres.details.adressePostale && (
          <li>✅ Adresse postale de l’entreprise</li>
        )}
        {parametres.details.siret && <li>✅ Siret & Code APE/NAF</li>}
        {parametres.details.adresseMail && (
          <li>✅ Adresse mail de l’entreprise</li>
        )}
        {parametres.details.responsable && <li>✅ Nom du responsable</li>}
        {parametres.details.nomTuteur && (
          <li>✅ Nom du tuteur de l’entreprise</li>
        )}
        {parametres.details.adresseMailTuteur && (
          <li>✅ Adresse mail du tuteur de l’entreprise</li>
        )}
        {parametres.details.telephoneTuteur && (
          <li>✅ Numéro de téléphone du tuteur de l’entreprise</li>
        )}
      </ul>
      <button
        onClick={() => router.push(`/votre-panier?id=${offre.id}`)}
        className="cursor-pointer border-2 border-white rounded-2xl py-2 font-bold hover:bg-white hover:text-primary-500 transition-colors duration-300"
      >
        SELECTIONNER
      </button>
    </div>
  );
}
