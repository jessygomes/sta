"use server";
import { db } from "../db";
import { OffreProps } from "../types/offre";

// Recuperer toutes les offres
export async function getOffres() {
  try {
    const offres = await db.offre.findMany();
    return offres;
  } catch {
    return null;
  }
}

// Recuperer une offre par son id
export async function getOffreById(offreId: string) {
  try {
    const offre = await db.offre.findUnique({
      where: {
        id: offreId,
      },
    });
    return offre;
  } catch {
    return null;
  }
}

// Récupérer le nombres de code généré par une offre
export async function getNbCodeByOffre(): Promise<Record<string, number>> {
  const data = await db.offre.findMany({
    select: {
      id: true,
      _count: {
        select: { codes: true },
      },
    },
  });

  // 🔥 Transformer en objet indexé par ID
  const result: Record<string, number> = {};
  data.forEach((offre) => {
    result[offre.id] = offre._count.codes || 0;
  });

  return result;
}

// Creer une offre
export async function createOffre(offre: OffreProps) {
  try {
    const newOffre = await db.offre.create({
      data: {
        nom: offre.nom,
        description: offre.description,
        price: offre.price,
        parametres: JSON.stringify(offre.parametres), // Convertir les paramètres en JSON
      },
    });
    return newOffre;
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    return null;
  }
}

// Modifier une offre
export async function updateOffre(offreId: string, offre: OffreProps) {
  try {
    const updatedOffre = await db.offre.update({
      where: {
        id: offreId,
      },
      data: offre,
    });
    return updatedOffre;
  } catch {
    return null;
  }
}

// Supprimer une offre
export async function deleteOffre(offreId: string) {
  try {
    const offre = await db.offre.delete({
      where: {
        id: offreId,
      },
    });
    return offre;
  } catch {
    return null;
  }
}
