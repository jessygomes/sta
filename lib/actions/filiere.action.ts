"use server";
import { db } from "../db";
import { CreateFiliereProps, FiliereProps } from "../types/filiere";

// Recuperer toutes les filieres
export async function getAllFiliere() {
  try {
    const filieres = await db.filiere.findMany();
    return filieres;
  } catch {
    return null;
  }
}

// Recuperer une filiere par son id
export async function getFiliereById(filiereId: string) {
  try {
    const filiere = await db.filiere.findUnique({
      where: {
        id: filiereId,
      },
    });
    return filiere;
  } catch {
    return null;
  }
}

// Creer une filiere
export async function createFiliere(filiere: CreateFiliereProps) {
  try {
    const newFiliere = await db.filiere.create({
      data: filiere,
    });
    return newFiliere;
  } catch {
    return null;
  }
}

// Modifier une filiere
export async function updateFiliere(filiereId: string, filiere: FiliereProps) {
  try {
    const updatedFiliere = await db.filiere.update({
      where: {
        id: filiereId,
      },
      data: filiere,
    });
    return updatedFiliere;
  } catch {
    return null;
  }
}

// Supprimer une filiere
export async function deleteFiliere(filiereId: string) {
  try {
    const filiere = await db.filiere.delete({
      where: {
        id: filiereId,
      },
    });
    return filiere;
  } catch {
    return null;
  }
}
