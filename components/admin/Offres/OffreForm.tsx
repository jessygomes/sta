/* eslint-disable react/no-unescaped-entities */
"use client";

import { createOffre } from "@/lib/actions/offres.action";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "sonner";

export default function OffreForm() {
  const router = useRouter();
  const [nom, setNom] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [access, setAccess] = useState<number>(100);
  const [details, setDetails] = useState({
    adresseMail: true,
    responsable: false,
    adressePostale: true,
    siret: true,
    codeApeNaf: true,
    telephone: true,
    nomTuteur: false,
    adresseMailTuteur: false,
    telephoneTuteur: false,
  });
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleAccessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccess(Number(event.target.value));
  };

  const handleDetailsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: checked,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    startTransition(async () => {
      try {
        const newOffre = await createOffre({
          nom,
          description,
          parametres: { access, details },
        });
        toast.success("Offre créée avec succès");
        console.log("Offre créée:", newOffre);
        // Réinitialiser le formulaire
        setNom("");
        setDescription("");
        setAccess(100);
        setDetails({
          adresseMail: true,
          responsable: false,
          adressePostale: true,
          siret: true,
          codeApeNaf: true,
          telephone: true,
          nomTuteur: false,
          adresseMailTuteur: false,
          telephoneTuteur: false,
        });
        router.refresh();
      } catch (error) {
        console.error("Erreur lors de la création de l'offre", error);
        toast.error("Erreur lors de la création de l'offre");
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="w-full h-auto relative bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 font-krub">Créer une offre</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-krub">
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Nom de l'offre
          </label>
          <input
            type="text"
            value={nom}
            onChange={handleNameChange}
            placeholder="Ex: Pack Starter"
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Description de l'offre
          </label>
          <input
            type="text"
            value={description}
            placeholder="Ex: Idéal pour un premier ciblage efficace"
            onChange={handleDescriptionChange}
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Accès à (nombre d'entreprises)
          </label>
          <input
            type="number"
            value={access}
            onChange={handleAccessChange}
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Paramètres (détails)
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs mt-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="email"
                checked={details.adresseMail}
                onChange={handleDetailsChange}
              />
              Adresse mail de l'entreprise
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="responsable"
                checked={details.responsable}
                onChange={handleDetailsChange}
              />
              Responsable
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="adressePostale"
                checked={details.adressePostale}
                onChange={handleDetailsChange}
              />
              Adresse postale de l’entreprise
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="telephone"
                checked={details.telephone}
                onChange={handleDetailsChange}
              />
              Téléphone de l'entreprise
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="siret"
                checked={details.siret}
                onChange={handleDetailsChange}
              />
              Siret
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="codeApeNaf"
                checked={details.codeApeNaf}
                onChange={handleDetailsChange}
              />
              Code APE/NAF
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="nomTuteur"
                checked={details.nomTuteur}
                onChange={handleDetailsChange}
              />
              Nom du tuteur de l’entreprise
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="adresseMailTuteur"
                checked={details.adresseMailTuteur}
                onChange={handleDetailsChange}
              />
              Adresse mail du tuteur de l’entreprise
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="telephoneTuteur"
                checked={details.telephoneTuteur}
                onChange={handleDetailsChange}
              />
              Numéro de téléphone du tuteur de l’entreprise
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary-500 text-white rounded-2xl px-4 py-2 mt-4 hover:bg-primary-700 transition-colors duration-300"
          disabled={loading}
        >
          {loading ? "Chargement..." : "Valider"}
        </button>
      </form>
    </div>
  );
}
