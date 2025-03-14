import React from "react";

interface FiltreProps {
  filieres: { id: string; nom: string }[];
  selectedFiliere: string;
  onChange: (filiereId: string) => void;
}

const FiltreByFiliere: React.FC<FiltreProps> = ({
  filieres,
  selectedFiliere,
  onChange,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor="filiere"
        className="block text-sm font-medium text-gray-700"
      >
        Filtrer par BTS
      </label>
      <select
        id="filiere"
        name="filiere"
        value={selectedFiliere}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
      >
        <option value="">Tous les BTS</option>
        {filieres.map((filiere) => (
          <option key={filiere.id} value={filiere.id}>
            {filiere.nom}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltreByFiliere;
