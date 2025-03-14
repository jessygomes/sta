"use client";
import { Search } from "@/components/Shared/Search";
import { getCodesFiltreByOffreId } from "@/lib/actions/code.action";
import { getOffreById } from "@/lib/actions/offres.action";
import { CodeProps } from "@/lib/types/code";
import { OffreFrontProps } from "@/lib/types/offre";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const [offre, setOffre] = useState<OffreFrontProps>({} as OffreFrontProps);
  const [codesWithFiliereNames, setCodesWithFiliereNames] = useState<
    CodeProps[]
  >([]);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchText = searchParams.get("query") || "";
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    try {
      const fetchOffre = async () => {
        const data = await getOffreById(params.id);
        if (data) {
          setOffre(data);
        } else {
          console.error("Offre data is null");
        }
      };
      fetchOffre();

      const fetchCodes = async () => {
        const codes = await getCodesFiltreByOffreId(
          params.id,
          page,
          searchText,
          20
        );
        if (codes) {
          setCodesWithFiliereNames(codes.data);
          setTotalPages(codes.totalPages);
        }
      };
      fetchCodes();
    } catch {
      console.error("An error occurred while fetching data");
    } finally {
      console.log("Data fetched");
    }
  }, [params, page, searchText]);

  console.log(offre, codesWithFiliereNames);

  return (
    <div className="mx-24 pt-16 pb-24">
      {" "}
      <h1 className="text-4xl font-krub">
        <span className="text-primary-500 font-bold">Offre</span> {offre?.nom}
      </h1>
      <div className="flex justify-between items-baseline border-b-2 border-primary-500 pb-2">
        <h2 className="text-l font-krub mt-8">
          Codes générés : {codesWithFiliereNames.length}
        </h2>
        <Search />
      </div>
      <div className="overflow-x-auto mt-4 rounded-2xl">
        <table className="min-w-full bg-white border border-gray-300 text-xs rounded-2xl">
          <thead>
            <tr className="text-left bg-gray-300">
              <th className="px-4 py-2 border-b">Nom</th>
              <th className="px-4 py-2 border-b">Prénom</th>
              <th className="px-4 py-2 border-b">Email</th>
              <th className="px-4 py-2 border-b">Filière</th>
              <th className="px-4 py-2 border-b">Code</th>
              <th className="px-4 py-2 border-b">Date de création</th>
              <th className="px-4 py-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {codesWithFiliereNames.map((code) => (
              <tr key={code.id}>
                <td className="px-4 py-2 border-b">{code.userLastname}</td>
                <td className="px-4 py-2 border-b">{code.userFirstname}</td>
                <td className="px-4 py-2 border-b">{code.email}</td>
                <td className="px-4 py-2 border-b">{code.filiere.nom}</td>
                <td className="px-4 py-2 border-b">{code.code}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(code.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 border-b">
                  <button className="cursor-pointer">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages && totalPages > 1 && (
        <div className="bg-gradient-to-l from-noir-800 to-noir-900 flex justify-end p-1 rounded-md">
          <div className="">
            {/* <Pagination page={page} totalPages={totalPages} /> */}
          </div>
        </div>
      )}
    </div>
  );
}
