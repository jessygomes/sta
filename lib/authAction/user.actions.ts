"use server";

import { db } from "../db";

import { revalidatePath } from "next/cache";

//! GET USER BY ID ----- PRISMA MODE
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
}

//! GET USER BY EMAIL ----- PRISMA MODE
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

//! DELETE USER
export const deleteUser = async ({
  userId,
  path,
}: {
  userId: string;
  path: string;
}) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    if (deletedUser) revalidatePath(path);
  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    throw new Error("Impossible de supprimer l'utilisateur.");
  }
};
