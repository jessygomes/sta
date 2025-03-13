"use client";
import { createCode } from "@/lib/actions/code.action";
import { getAllFiliere } from "@/lib/actions/filiere.action";
import { getOffreById } from "@/lib/actions/offres.action";
import { FiliereProps } from "@/lib/types/filiere";
import { OffreFrontProps } from "@/lib/types/offre";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CodeForm({ offreId }: { offreId: string }) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [filieres, setFilieres] = useState<FiliereProps[]>([]);
  const [offre, setOffre] = useState<OffreFrontProps | null>(null);

  useEffect(() => {
    async function fetchFilieres() {
      const data = await getAllFiliere();
      if (data) {
        setFilieres(data);
      }
    }

    async function fetchOffre() {
      const data = await getOffreById(offreId);
      if (data) {
        setOffre(data);
      }
    }

    fetchOffre();
    fetchFilieres();
  }, [offreId]);

  const parametres =
    offre && typeof offre.parametres === "string"
      ? JSON.parse(offre.parametres)
      : {};

  //! Gestion form
  const [formData, setFormData] = useState({
    userLastname: "",
    userFirstname: "",
    email: "",
    filiereId: "", // Stocke l'ID de la filière choisie
    filiereNom: "", // Stocke le nom de la filière
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFiliere = filieres.find(
      (filiere) => filiere.id === e.target.value
    );
    setFormData({
      ...formData,
      filiereId: selectedFiliere?.id || "",
      filiereNom: selectedFiliere?.nom || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    setSuccessMessage(null);
    setErrorMessage(null);

    if (
      !formData.userFirstname ||
      !formData.userLastname ||
      !formData.email ||
      !formData.filiereId
    ) {
      // setErrorMessage("Tous les champs sont obligatoires.");
      setLoading(false);
      return;
    }

    try {
      const response = await createCode({
        userFirstname: formData.userFirstname,
        userLastname: formData.userLastname,
        email: formData.email,
        offreId,
        filiereId: formData.filiereId,
      });

      if (response.success) {
        setSuccessMessage(`Code généré et envoyé à ${formData.email} !`);
        setFormData({
          userLastname: "",
          userFirstname: "",
          email: "",
          filiereId: "",
          filiereNom: "",
        });

        // Optionnel : Rediriger après confirmation
        setTimeout(() => {
          router.push("/confirmation"); // 🔥 Page de confirmation (à créer si besoin)
        }, 3000);
      } else {
        setErrorMessage(
          "Une erreur est survenue lors de la génération du code."
        );
      }
    } catch {
      setErrorMessage("Erreur : Impossible de générer le code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <form
        onSubmit={handleSubmit}
        className=" col-span-2 flex flex-col gap-4 mt-4 bg-white p-6 rounded-2xl shadow-md"
      >
        <div className="flex items-center justify-between font-krub">
          <h2 className="text-2xl font-bold">Informations de commande</h2>
        </div>

        {/* Affichage des messages de succès ou d'erreur */}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <input
          type="text"
          name="userLastname"
          placeholder="Nom"
          value={formData.userLastname}
          onChange={handleChange}
          className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          required
        />
        <input
          type="text"
          name="userFirstname"
          placeholder="Prénom"
          value={formData.userFirstname}
          onChange={handleChange}
          className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          required
        />

        <select
          name="filiereId"
          value={formData.filiereId}
          onChange={handleSelectChange}
          className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          required
        >
          <option value="">Choisissez une filière</option>
          {filieres.map((filiere) => (
            <option key={filiere.id} value={filiere.id}>
              {filiere.nom}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="bg-primary-500 text-white py-2 px-4 rounded mt-2 hover:bg-primary-700 transition"
        >
          {loading ? "Traitement..." : "Valider et Payer"}
        </button>
      </form>

      {offre && (
        <div className="h-fit flex flex-col gap-4 bg-gradient-to-r from-primary-800 to-primary-700 p-4 rounded-2xl text-white font-krub">
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
        </div>
      )}
    </div>
  );
}
