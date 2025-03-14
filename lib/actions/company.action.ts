"use server";
import { currentRole } from "../authAction/auth";
import { db } from "../db";
import { CompanyProps } from "../types/company";
// import fs from "fs";
// import path from "path";

// Voir toutes les entreprises
export async function getAllCompanies(
  page: number,
  query: string,
  limit: number
) {
  try {
    const role = await currentRole();
    if (role !== "admin") {
      return null;
    }

    const skipAmount = (Number(page) - 1) * limit;

    const companies = await db.entreprise.findMany({
      where: {
        OR: [
          { nom: { contains: query, mode: "insensitive" } },
          // { siret: { contains: query, mode: "insensitive" } },
          // { nafApe: { contains: query, mode: "insensitive" } },
          // { email: { contains: query, mode: "insensitive" } },
          // { responsable: { contains: query, mode: "insensitive" } },
          // { nomTuteur: { contains: query, mode: "insensitive" } },
          // { telephone: { contains: query, mode: "insensitive" } },
          // { emailTuteur: { contains: query, mode: "insensitive" } },
          // { telephoneTuteur: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        filieres: true,
      },
      skip: skipAmount,
      take: limit,
    });

    const totalCompanies = await db.entreprise.count({
      where: {
        OR: [
          { nom: { contains: query, mode: "insensitive" } },
          // { siret: { contains: query, mode: "insensitive" } },
          // { nafApe: { contains: query, mode: "insensitive" } },
          // { email: { contains: query, mode: "insensitive" } },
          // { responsable: { contains: query, mode: "insensitive" } },
          // { nomTuteur: { contains: query, mode: "insensitive" } },
          // { telephone: { contains: query, mode: "insensitive" } },
          // { emailTuteur: { contains: query, mode: "insensitive" } },
          // { telephoneTuteur: { contains: query, mode: "insensitive" } },
        ],
      },
    });

    return {
      data: companies,
      totalPages: Math.ceil(totalCompanies / limit),
    };
  } catch {
    return null;
  }
}

// Voir les entreprises par filière
export async function getCompaniesByFiliere(filiereId: string) {
  try {
    const companies = await db.entreprise.findMany({
      where: {
        filieres: {
          some: {
            filiereId: filiereId,
          },
        },
      },
      include: {
        filieres: true,
      },
    });
    return companies;
  } catch {
    return null;
  }
}

// Créer une entreprise relié à une filière
export async function createCompany(
  company: CompanyProps,
  filiereIds: string[]
) {
  try {
    const newCompany = await db.entreprise.create({
      data: {
        ...company,
        filieres: {
          create: filiereIds.map((filiereId) => ({
            filiereId: filiereId,
          })),
        },
      },
    });
    return newCompany;
  } catch {
    return null;
  }
}

//! Créer plusieurs entreprises à partir d'un fichier JSON
export async function createCompaniesFromJson(
  companies: CompanyProps[],
  filiereId: string
) {
  try {
    if (!Array.isArray(companies)) {
      throw new Error(
        "Le fichier JSON doit contenir un tableau d'entreprises."
      );
    }

    const createdCompanies = [];

    for (const company of companies) {
      // 🔥 Étape 1 : Créer l'entreprise en premier
      const newCompany = await db.entreprise.create({
        data: {
          nom: company.nom,
          adressePostale: company.adressePostale,
          siret: company.siret,
          nafApe: company.nafApe,
          email: company.email,
          responsable: company.responsable,
          nomTuteur: company.nomTuteur,
          telephone: company.telephone,
          emailTuteur: company.emailTuteur,
          telephoneTuteur: company.telephoneTuteur,
        },
      });

      // 🔥 Étape 2 : Utiliser l'ID généré pour créer la relation
      await db.entrepriseFiliere.create({
        data: {
          entrepriseId: newCompany.id, // ✅ Utilisation de l'ID généré
          filiereId: filiereId, // ✅ Liaison avec la filière sélectionnée
        },
      });
      createdCompanies.push(newCompany);
    }

    return createdCompanies;
  } catch (error) {
    console.error("Erreur lors de l'insertion des entreprises :", error);
    throw error;
  }
}

// Modifier une entreprise
export async function updateCompany(companyId: string, company: CompanyProps) {
  try {
    const updatedCompany = await db.entreprise.update({
      where: {
        id: companyId,
      },
      data: company,
    });
    return updatedCompany;
  } catch {
    return null;
  }
}

// Supprimer une entreprise
export async function deleteCompany(companyId: string) {
  try {
    const company = await db.entreprise.delete({
      where: {
        id: companyId,
      },
    });
    return company;
  } catch {
    return null;
  }
}
