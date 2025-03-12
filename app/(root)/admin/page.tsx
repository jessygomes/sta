import { LogoutBtn } from "@/components/Auth/LogOutBtn";
import { currentRole } from "@/lib/authAction/auth";
import { getNbCodeByOffre, getOffres } from "@/lib/actions/offres.action";
import { redirect } from "next/navigation";
import React from "react";
import { getAllFiliere } from "@/lib/actions/filiere.action";
import CompanyForm from "@/components/admin/CompanyForm";
import {
  getAllCompanies,
  // getCompaniesByFiliere,
} from "@/lib/actions/company.action";
import Accordion from "@/components/admin/Accordion";
import OffreForm from "@/components/admin/Offres/OffreForm";
import DeleteOffreBtn from "@/components/admin/Offres/DeleteOffreBtn";
import FiliereForm from "@/components/admin/Filieres/FiliereForm";
import DeleteFiliereBtn from "@/components/admin/Filieres/DeleteFiliereBtn";

export default async function page() {
  const role = await currentRole();

  if (role !== "admin") {
    redirect("/not-found");
  }

  try {
    const offres = await getOffres();
    const nbCodeByOffre = offres ? await getNbCodeByOffre() : null;

    const filieres = await getAllFiliere();

    const companies = await getAllCompanies();

    {
      /* Voir les codes avec le mail et le nom associé lors de l'achat */
    }
    {
      /* Supprimer le code */
    }
    {
      /* Générer un code manuellemnt en fonction d'une offre */
    }

    return (
      <div className="mx-24 pt-16 pb-24">
        <section className="flex flex-col gap-4 ">
          <div className="flex justify-between items-center border-b-2 border-primary-500 pb-2">
            <h1 className="text-4xl font-krub">
              <span className="text-primary-500 font-bold">Espace</span>{" "}
              Administrateur
            </h1>
            <LogoutBtn>
              <p className="bg-primary-500 text-white rounded-2xl px-2 py-1 text-xs font-krub hover:bg-red-900 transition-colors duration-300">
                Déconnexion
              </p>
            </LogoutBtn>
          </div>

          <div className="flex flex-col gap-4 shadow-md p-4 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <p className="bg-primary-500 p-2 rounded-2xl text-white font-krub">
                Revenu généré :
              </p>
              <p className="bg-primary-500 p-2 rounded-2xl text-white font-krub">
                Total de codes générés :{" "}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {offres &&
                offres.map((offre) => (
                  <p
                    key={offre.id}
                    className="bg-primary-700 p-2 rounded-2xl text-white font-krub"
                  >
                    {offre.nom} :{" "}
                    {nbCodeByOffre && nbCodeByOffre[offre.id]
                      ? nbCodeByOffre[offre.id]
                      : 0}{" "}
                    <span className="text-xs">codes générés</span>
                  </p>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <p className="bg-primary-800 p-2 rounded-2xl text-white font-krub">
                Nb Filière (total) : {filieres?.length}
              </p>
              <p className="flex justify-between items-center bg-primary-800 p-2 rounded-2xl text-white font-krub">
                Nb Entreprises (total) : {companies?.length}
                <span className="text-xs cursor-pointer">Voir tous</span>
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 flex gap-4">
          <div className="flex flex-col gap-4 w-full">
            <CompanyForm filieres={filieres || []} />
            <FiliereForm />
          </div>
          <OffreForm />
        </section>

        <section className="mt-24 flex flex-col gap-2">
          <Accordion title="Voir nos offres">
            <ul>
              {offres &&
                offres.map((offre) => (
                  <li
                    key={offre.id}
                    className="flex justify-between items-center p-2 border-b border-gray-200 font-krub"
                  >
                    {offre.nom}
                    <DeleteOffreBtn offreId={offre.id} />
                  </li>
                ))}
            </ul>
          </Accordion>
          <Accordion title="Voir les filières">
            <ul>
              {filieres &&
                filieres.map((filiere) => (
                  <li
                    key={filiere.id}
                    className="flex justify-between items-center p-2 border-b border-gray-200 font-krub"
                  >
                    {filiere.nom}
                    <DeleteFiliereBtn filiereId={filiere.id} />
                  </li>
                ))}
            </ul>
          </Accordion>
        </section>
      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div className="mx-24 pt-16 pb-24">
        <article className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b-2 border-primary-500 pb-2">
            <h1 className="text-4xl font-krub">
              <span className="text-primary-500 font-bold">Espace</span>{" "}
              Administrateur
            </h1>
            <LogoutBtn>
              <p className="bg-primary-500 text-white rounded-2xl px-2 py-1 text-xs font-krub hover:bg-red-900 transition-colors duration-300">
                Déconnexion
              </p>
            </LogoutBtn>
          </div>

          <p>Erreur lors du chargement de la page admin.</p>
        </article>
      </div>
    );
  }
}
