import React from "react";

export default function page() {
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
        <div className="h-fit flex flex-col gap-4 bg-gradient-to-r from-primary-800 to-primary-700 p-4 rounded-2xl text-white font-krub">
          <div className="flex justify-between border-b-2 border-white pb-2">
            <h3 className="font-bold tracking-widest">Pack Starter</h3>
            <p className="font-bold tracking-widest">99,99 €</p>
          </div>
          <ul className="flex flex-col gap-4 text-xs">
            <li className="font-bold">
              Idéal pour un premier ciblage efficace
            </li>
            <li>✅ Accès à 100 entreprises ciblées</li>
            <li>✅ Adresse postale de l’entreprise</li>
            <li>✅ Siret & Code APE/NAF</li>
            <li>✅ Adresse mail de l’entreprise</li>
          </ul>
          <button className="cursor-pointer border-2 border-white rounded-2xl py-2 font-bold hover:bg-white hover:text-primary-500 transition-colors duration-300">
            SELECTIONNER
          </button>
        </div>

        <div className="h-fit flex flex-col gap-4 bg-gradient-to-r from-primary-700 to-primary-600 p-4 rounded-2xl text-white font-krub">
          <div className="flex justify-between border-b-2 border-white pb-2">
            <h3 className="font-bold tracking-widest">Pack Avancé</h3>
            <p className="font-bold tracking-widest">179,99 €</p>
          </div>
          <ul className="flex flex-col gap-4 text-xs">
            <li className="font-bold">
              Plus d’opportunités pour optimiser vos chances
            </li>
            <li>✅ Accès à 200 entreprises ciblées</li>
            <li>✅ Adresse postale de l’entreprise</li>
            <li>✅ Siret & Code APE/NAF</li>
            <li>✅ Adresse mail de l’entreprise</li>
            <li>✅ Nom du tuteur de l’entreprise </li>
            <li>✅ Adresse mail du tuteur de l’entreprise</li>
          </ul>
          <button className="cursor-pointer border-2 border-white rounded-2xl py-2 font-bold hover:bg-white hover:text-primary-500 transition-colors duration-300">
            SELECTIONNER
          </button>
        </div>

        <div className="h-fit flex flex-col gap-4 bg-gradient-to-r from-primary-600 to-primary-500 p-4 rounded-2xl text-white font-krub">
          <div className="flex justify-between border-b-2 border-white pb-2">
            <h3 className="font-bold tracking-widest">Pack XP</h3>
            <p className="font-bold tracking-widest">259,99 €</p>
          </div>
          <ul className="flex flex-col gap-4 text-xs">
            <li className="font-bold">
              L’option ultime pour maximiser vos chances et décrocher rapidement
              votre alternance !
            </li>
            <li>✅ Accès à 400 entreprises ciblées</li>
            <li>✅ Adresse postale de l’entreprise</li>
            <li>✅ Siret & Code APE/NAF</li>
            <li>✅ Adresse mail de l’entreprise</li>
            <li>✅ Nom du tuteur de l’entreprise </li>
            <li>✅ Adresse mail du tuteur de l’entreprise</li>
            <li>✅ Numéro de téléphone du tuteur de l’entreprise</li>
          </ul>
          <button className="cursor-pointer border-2 border-white rounded-2xl py-2 font-bold hover:bg-white hover:text-primary-500 transition-colors duration-300">
            SELECTIONNER
          </button>
        </div>
      </div>
    </section>
  );
}
