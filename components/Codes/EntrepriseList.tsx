interface Entreprise {
  id: string;
  nom: string;
  adresse: string;
  siret?: string | null;
  nafApe?: string | null;
  email?: string | null;
  responsable?: string | null;
  telephone?: string | null;
  nomTuteur?: string | null;
  emailTuteur?: string | null;
  telephoneTuteur?: string | null;
}

export default function EntrepriseList({
  entreprises,
  btsNom,
}: {
  entreprises: Entreprise[];
  btsNom: string;
}) {
  return (
    <div className="container mx-auto py-16">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold font-krub">
          <span className="text-primary-500">Votre liste</span> d’entreprises
        </h1>
        <p className="text-gray-600 mt-2">
          🎯 <span className="font-bold">{entreprises.length}</span> entreprises
          ciblées pour{" "}
          <span className="font-bold text-primary-500">{btsNom}</span>.
        </p>
      </div>

      <div className="overflow-x-auto text-xs font-krub rounded-2xl shadow-[0px_8px_4px_0px_rgba(0,0,0,0.35)]">
        <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="px-4 py-2 border-b">Nom</th>
              <th className="px-4 py-2 border-b">SIRET</th>
              <th className="px-4 py-2 border-b">Naf/Ape</th>
              <th className="px-4 py-2 border-b">Adresse</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Téléphone</th>
              <th className="px-4 py-2 border-b">Responsable</th>
              <th className="px-4 py-2 border-b">Nom Tuteur</th>
              <th className="px-4 py-2 border-b">Email Tuteur</th>
              <th className="px-4 py-2 border-b">Téléphone Tuteur</th>
            </tr>
          </thead>
          <tbody>
            {entreprises.map((entreprise) => (
              <tr key={entreprise.id} className="text-left">
                <td className="px-4 py-2 border-b font-bold">
                  {entreprise.nom}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.siret || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.nafApe || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">{entreprise.adresse}</td>
                <td className="px-4 py-2 border-b">
                  {entreprise.email || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.telephone || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.responsable || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.nomTuteur || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.emailTuteur || "N/A"}
                </td>
                <td className="px-4 py-2 border-b">
                  {entreprise.telephoneTuteur || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
