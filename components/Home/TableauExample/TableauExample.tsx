import { dataEntreprises } from "@/lib/companyList";

export default function TableauExample() {
  return (
    <div className="w-full h-auto relative bg-white rounded-2xl shadow-md p-4">
      {/* Dégradé en bas pour l'effet visuel */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white via-white/90" />

      {/* Titre */}
      <div className="text-black text-xs font-bold font-krub mb-4">
        BTS Communication
      </div>

      {/* Conteneur du tableau avec overflow */}
      <div className="overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-9 gap-4 text-black text-xs font-bold font-krub mb-2">
          <div className="w-[150px]">Entreprises</div>
          <div className="w-[150px]">Siret</div>
          <div className="w-[150px]">NAF/APE</div>
          <div className="w-[150px]">Adresse</div>
          <div className="w-[200px]">Adresse mail</div>
          <div className="w-[150px]">Téléphone</div>
          <div className="w-[150px]">Tuteur</div>
          <div className="w-[150px]">N° du tuteur</div>
          <div className="w-[200px]">Mail du tuteur</div>
        </div>

        {dataEntreprises.map((item, index) => (
          <div
            key={index}
            className="min-w-[900px] grid grid-cols-9 gap-4 text-black text-[10px] font-normal font-krub mb-2"
          >
            <div className="w-[150px]">{item.entreprise}</div>
            <div className="w-[150px]">{item.siret}</div>
            <div className="w-[150px]">{item.naf}</div>
            <div className="w-[150px]">{item.adresse}</div>
            <div className="w-[200px]">{item.email}</div>
            <div className="w-[150px]">{item.telephone}</div>
            <div className="w-[150px]">{item.tuteur}</div>
            <div className="w-[150px]">{item.tuteurTel}</div>
            <div className="w-[200px]">{item.tuteurEmail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
