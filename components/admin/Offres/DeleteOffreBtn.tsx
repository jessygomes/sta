"use client";
import { deleteOffre } from "@/lib/actions/offres.action";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

export default function DeleteOffreBtn({ offreId }: { offreId: string }) {
  const router = useRouter();
  //! Supprimer une offre :
  const handleDeleteOffre = async (offreId: string) => {
    try {
      await deleteOffre(offreId);
      toast.success("Offre supprimée avec succès");
      router.refresh();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'offre :", error);
      toast.error("Erreur lors de la suppression de l'offre");
    }
  };

  return (
    <button
      className="cursor-pointer bg-red-900 hover:bg-red-700 px-2 py-1 rounded-2xl text-xs text-white"
      onClick={() => handleDeleteOffre(offreId)}
    >
      Supprimer
    </button>
  );
}
