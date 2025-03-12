"use client";
import { deleteFiliere } from "@/lib/actions/filiere.action";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function DeleteFiliereBtn({ filiereId }: { filiereId: string }) {
  const router = useRouter();
  //! Supprimer une offre :
  const handleDeleteFil = async (filiereId: string) => {
    try {
      await deleteFiliere(filiereId);
      toast.success("Filière supprimée avec succès");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la suppression de la Filière :", error);
      toast.error("Erreur lors de la suppression de la Filière");
    }
  };

  return (
    <button
      className="cursor-pointer bg-red-900 hover:bg-red-700 px-2 py-1 rounded-2xl text-xs text-white"
      onClick={() => handleDeleteFil(filiereId)}
    >
      Supprimer
    </button>
  );
}
