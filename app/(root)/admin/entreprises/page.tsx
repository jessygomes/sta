/* eslint-disable react/no-unescaped-entities */
"use client";
// import FiltreByFiliere from "@/components/admin/Filieres/FiltreByFiliere";
import { Pagination } from "@/components/Shared/Pagination";
import { Search } from "@/components/Shared/Search";
import { getAllCompanies } from "@/lib/actions/company.action";
// import { getAllFiliere } from "@/lib/actions/filiere.action";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [companies, setCompanies] = useState<
    Array<{
      filieres: { filiereId: string; entrepriseId: string }[];
      id: string;
      email: string | null;
      nom: string;
      adressePostale: string;
      siret: string | null;
      nafApe: string | null;
      responsable: string | null;
      nomTuteur: string | null;
      telephone: string | null;
      emailTuteur: string | null;
      telephoneTuteur: string | null;
    }>
  >([]);
  // const [filieres, setFilieres] = useState<string>("");
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchText = searchParams.get("query") || "";
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    try {
      const fetchCodes = async () => {
        const companies = await getAllCompanies(page, searchText, 20);
        if (companies) {
          setCompanies(companies.data);
          setTotalPages(companies.totalPages);
        }
      };

      // const fetchFilieres = async () => {
      //   const filieres = await getAllFiliere();
      //   if (filieres) {
      //     setFilieres(filieres);
      //   }
      // };
      fetchCodes();
      // fetchFilieres();
    } catch {
      console.error("An error occurred while fetching data");
    } finally {
      console.log("Data fetched");
    }
  }, [page, searchText]);

  return (
    <div className="mx-24 pt-16 pb-24">
      <section className="flex flex-col gap-8 ">
        <div className="flex justify-between items-center border-b-2 border-primary-500 pb-2">
          <h1 className="text-4xl font-krub">
            <span className="text-primary-500 font-bold">Liste</span>{" "}
            d'entreprises recensées{" "}
            <span className="text-xs">({companies.length})</span>
          </h1>
          <Search />
          {/* <FiltreByFiliere filieres={filieres} /> */}
        </div>

        <div className="overflow-x-auto text-xs font-krub rounded-2xl shadow-[0px_8px_4px_0px_rgba(0,0,0,0.35)]">
          <table className="min-w-full bg-white border border-gray-300 rounded-2xl">
            <thead className="bg-gray-200">
              <tr className="text-left">
                <th className="px-4 py-2 border-b">Nom</th>
                <th className="px-4 py-2 border-b">SIRET</th>
                <th className="px-4 py-2 border-b">Naf/Ape</th>
                <th className="px-4 py-2 border-b">Adresse</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Téléphone</th>
                <th className="px-4 py-2 border-b">Responsable</th>
                <th className="px-4 py-2 border-b">Nom Tuteur</th>
                <th className="px-4 py-2 border-b">Email Tuteur</th>
                <th className="px-4 py-2 border-b">Téléphone Tuteur</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id} className="text-left">
                  <td className="px-4 py-2 border-b font-bold">
                    {company.nom}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.siret || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.nafApe || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.adressePostale}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.email || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.telephone || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.responsable || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.nomTuteur || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.emailTuteur || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {company.telephoneTuteur || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages && totalPages > 1 && (
          <div className="bg-gradient-to-l from-primary-800 to-primary-600 flex justify-end p-1 rounded-md">
            <div className="">
              <Pagination page={page} totalPages={totalPages} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
