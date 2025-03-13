import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    // Vérifier si le code existe en base
    const codeData = await db.code.findUnique({
      where: { code },
      include: {
        entreprises: { include: { entreprise: true } }, // Récupère les entreprises associées
        offre: true, // Récupère l'offre pour voir ses paramètres
        filiere: true, // Inclure la filière pour récupérer le nom du BTS
      },
    });

    if (!codeData) {
      return NextResponse.json({ success: false, message: "Code invalide." });
    }

    // Analyser les paramètres JSON de l'offre
    const parametres =
      typeof codeData.offre.parametres === "string"
        ? JSON.parse(codeData.offre.parametres)
        : codeData.offre.parametres ?? {}; // Si null, renvoie un objet vide

    // Récupérer les entreprises associées
    const entreprises = codeData.entreprises.map((e) => ({
      id: e.entreprise.id,
      nom: e.entreprise.nom,
      adresse: e.entreprise.adressePostale,
      siret: parametres.details?.siret ? e.entreprise.siret : null,
      email: parametres.details?.adresseMail ? e.entreprise.email : null,
      responsable: parametres.details?.responsable
        ? e.entreprise.responsable
        : null,
      telephone: parametres.details?.telephone ? e.entreprise.telephone : null,
      nomTuteur: parametres.details?.nomTuteur ? e.entreprise.nomTuteur : null,
      emailTuteur: parametres.details?.adresseMailTuteur
        ? e.entreprise.emailTuteur
        : null,
      telephoneTuteur: parametres.details?.telephoneTuteur
        ? e.entreprise.telephoneTuteur
        : null,
      nafApe: parametres.details?.codeApeNaf ? e.entreprise.nafApe : null,
    }));

    const btsNom = codeData.filiere.nom;

    return NextResponse.json({ success: true, entreprises, btsNom });
  } catch (error) {
    console.error("Erreur lors de la vérification du code :", error);
    return NextResponse.json({ success: false, message: "Erreur serveur." });
  }
}
