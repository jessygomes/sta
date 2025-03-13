import Offre from "@/components/Offre";
import { getOffres } from "@/lib/actions/offres.action";
import React from "react";

export default async function page() {
  const offres = await getOffres();

  return (
    <section className="mx-4 lg:mx-24 pt-16 pb-24">
      <article className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="">Nos offres</p>
          <h1 className="text-4xl font-krub">
            <span className="text-primary-500 font-bold">SHOP</span> La
            meilleure offre
          </h1>
        </div>
        <p>
          <span className="font-bold text-primary-500">
            Chaque offre vous donne accès à une liste d’entreprises
            soigneusement sélectionnées en fonction de votre parcours.
          </span>{" "}
          Dès la validation de votre paiement, vous recevrez automatiquement{" "}
          <span className="font-bold">un code unique par e-mail.</span> Ce code
          vous permettra d’accéder directement à votre liste personnalisée
          d’entreprises depuis notre site, sans besoin de créer un compte.{" "}
          <br />
          <span className="font-bold">
            Une solution rapide, simple et efficace pour maximiser vos chances
            de trouver votre alternance !
          </span>
        </p>
      </article>

      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-4 mt-8 lg:mt-16">
        {offres &&
          offres.map((offre) => {
            return <Offre key={offre.id} offre={offre} />;
          })}
      </div>
    </section>
  );
}
