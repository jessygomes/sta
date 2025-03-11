import React from "react";
import { dataEntreprises } from "@/lib/companyList";

export default function TableauExampleMobile() {
  return (
    <div className="w-full h-auto relative bg-white rounded-2xl shadow-md p-4">
      <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-white via-white/90" />
      <div className="text-black text-xs font-bold font-krub mb-4">
        BTS Communication
      </div>
      <div className="grid grid-cols-1 gap-4 text-black text-xs font-bold font-krub mb-2">
        <div>Entreprises</div>
        <div>Siret</div>
        <div>NAF/APE</div>
        <div>Adresse</div>
        <div>Adresse mail</div>
        <div>Téléphone</div>
        <div>Tuteur</div>
        <div>N° du tuteur</div>
        <div>Mail du tuteur</div>
      </div>
      {dataEntreprises.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-4 text-black text-[10px] font-normal font-krub mb-2"
        >
          <div className="font-bold">Entreprise:</div>
          <div>{item.entreprise}</div>
          <div className="font-bold">Siret:</div>
          <div>{item.siret}</div>
          <div className="font-bold">NAF/APE:</div>
          <div>{item.naf}</div>
          <div className="font-bold">Adresse:</div>
          <div>{item.adresse}</div>
          <div className="font-bold">Adresse mail:</div>
          <div>{item.email}</div>
          <div className="font-bold">Téléphone:</div>
          <div>{item.telephone}</div>
          <div className="font-bold">Tuteur:</div>
          <div>{item.tuteur}</div>
          <div className="font-bold">N° du tuteur:</div>
          <div>{item.tuteurTel}</div>
          <div className="font-bold">Mail du tuteur:</div>
          <div>{item.tuteurEmail}</div>
        </div>
      ))}
    </div>
  );
}
