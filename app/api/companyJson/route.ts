import { NextRequest, NextResponse } from "next/server";
import { createCompaniesFromJson } from "@/lib/actions/company.action";
// import formidable from "formidable";
// import fs from "fs/promises";
// import path from "path";
// import { Readable } from "stream";
// import { promisify } from "util";

export async function POST(req: NextRequest) {
  try {
    // 🔥 Lire le JSON envoyé
    const body = await req.json();
    const { companies, filiereId } = body;

    if (!companies || !filiereId) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 });
    }

    // 🔥 Insérer les entreprises en base de données
    const createdCompanies = await createCompaniesFromJson(
      companies,
      filiereId
    );

    return NextResponse.json({ createdCompanies }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la création des entreprises :", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
