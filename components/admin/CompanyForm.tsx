/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { FiliereProps } from "@/lib/types/filiere";
import React, { useState } from "react";
import { toast } from "sonner";

interface CompanyFormProp {
  filieres: FiliereProps[];
}

export default function CompanyForm({ filieres }: CompanyFormProp) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jsonData, setJsonData] = useState<any>(null);
  const [filiereId, setFiliereId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsedData = JSON.parse(event.target?.result as string);
          setJsonData(parsedData);
        } catch (error) {
          console.error("Invalid JSON file");
          alert("Le fichier JSON est invalide.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleFiliereChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFiliereId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!jsonData || !filiereId) {
      toast.warning("Veuillez sélectionner un fichier et une filière.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/companyJson", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companies: jsonData, filiereId }),
    });

    setLoading(false);

    if (response.ok) {
      const data = await response.json();
      toast.success("Entreprises ajoutées avec succès");
      console.log("Created Companies:", data.createdCompanies);
    } else {
      console.error("Error creating companies");
      toast.error("Erreur lors de l'ajout des entreprises");
    }
  };

  return (
    <div className="w-full h-auto relative bg-white rounded-2xl shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4 font-krub">
        Ajouter des entreprises
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-krub">
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Fichier JSON
          </label>
          <input
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700">
            Filière
          </label>
          <select
            value={filiereId}
            onChange={handleFiliereChange}
            className="mt-1 block w-full border-b-[1px] pb-1 border-primary-500 text-sm"
          >
            <option value="">Sélectionnez une filière</option>
            {filieres.map((filiere) => (
              <option key={filiere.id} value={filiere.id}>
                {filiere.nom}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="cursor-pointer bg-primary-500 text-white rounded-2xl px-4 py-2 mt-4 hover:bg-primary-700 transition-colors duration-300"
        >
          {loading ? "Chargement..." : "Valider"}
        </button>
      </form>
    </div>
  );
}
