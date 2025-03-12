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
