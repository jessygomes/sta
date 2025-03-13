"use server";
import { db } from "../db";

//! All codes
export async function getAllCodes() {
  try {
    const codes = await db.code.findMany();
    return codes;
  } catch {
    return null;
  }
}

//! Avoir les codes par type d'offre
export async function getCodeByOffreId(offreId: string) {
  try {
    const codes = await db.code.findMany({
      where: {
        offreId,
      },
    });
    return codes;
  } catch {
    return null;
  }
}

//! Créer un code
export async function createCode({
  userFirstname,
  userLastname,
  email,
  offreId,
  filiereId,
}: {
  userFirstname: string;
  userLastname: string;
  email: string;
  offreId: string;
  filiereId: string;
}) {
  try {
    // Générer un code unique
    const code = Math.random().toString(36).slice(2, 10).toUpperCase();

    // Vérifier si l'offre et la filière existent
    const offre = await db.offre.findUnique({
      where: { id: offreId },
    });

    const filiere = await db.filiere.findUnique({ where: { id: filiereId } });

    if (!offre || !filiere) {
      throw new Error("Offre ou filière invalide.");
    }

    const params =
      typeof offre.parametres === "string"
        ? JSON.parse(offre.parametres)
        : offre.parametres;
    const nombreEntreprises = params.access || 10; // Nombre par défaut si non défini

    // Filtrer les entreprises selon la filière et les paramètres de l'offre
    const entreprisesDispo = await db.entreprise.findMany({
      where: {
        filieres: {
          some: { filiereId: filiereId }, // ✅ Vérifie la relation via EntrepriseFiliere
        },
      },
    });

    if (entreprisesDispo.length === 0) {
      throw new Error("Aucune entreprise trouvée pour cette filière.");
    }

    // Mélanger les entreprises disponibles pour en tirer un échantillon aléatoire
    const entreprisesAleatoires = entreprisesDispo
      .sort(() => 0.5 - Math.random()) // Mélanger
      .slice(0, nombreEntreprises); // Prendre X entreprises

    // Enregistrer le code en base
    const newCode = await db.code.create({
      data: {
        code,
        userFirstname,
        userLastname,
        email,
        offreId,
        filiereId,
        createdAt: new Date(),
      },
    });

    for (const entreprise of entreprisesAleatoires) {
      await db.codeEntreprise.create({
        data: {
          codeId: newCode.id,
          entrepriseId: entreprise.id,
        },
      });
    }

    return {
      success: true,
      code: newCode.code,
      entreprises: entreprisesAleatoires,
    };
  } catch (error) {
    console.error("Erreur lors de la création du code :", error);
    return {
      success: false,
      message: "Une erreur est survenue lors de la création du code.",
    };
  }
}

//! Supprimer un code
export async function deleteCode(codeId: string) {
  try {
    const code = await db.code.delete({
      where: {
        id: codeId,
      },
    });
    return code;
  } catch {
    return null;
  }
}
