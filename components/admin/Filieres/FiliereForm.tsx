"use client";

import { createFiliere } from "@/lib/actions/filiere.action";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { toast } from "sonner";

export default function FiliereForm() {
  const router = useRouter();
  const [nom, setNom] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNom(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    startTransition(async () => {
      try {
        const newFil = await createFiliere({ nom });
        toast.success("Filière créée avec succès");
        console.log("Filière créée:", newFil);

        setNom("");

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
      <h2 className="text-2xl font-bold mb-4">Créer une filière</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Nom de la filière
          </label>
          <input
            type="text"
            value={nom}
            onChange={handleNameChange}
            placeholder="Ex: Informatique"
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
            required
          />
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
