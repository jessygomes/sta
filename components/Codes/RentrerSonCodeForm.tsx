/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import EntrepriseList from "./EntrepriseList";

export default function RentrerSonCodeForm() {
  const [code, setCode] = useState("");
  const [entreprises, setEntreprises] = useState(null);
  const [btsNom, setBtsNom] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer un cookie
  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const found = cookies.find((c) => c.startsWith(name + "="));
    return found ? found.split("=")[1] : null;
  };

  // Récupérer le code stocké au chargement de la page
  useEffect(() => {
    const storedCode = getCookie("user_code");
    if (storedCode) {
      setCode(storedCode);
      verifyCode(storedCode);
    }
  }, []);

  // Fonction pour vérifier un code et récupérer les entreprises
  const verifyCode = async (codeToVerify: string) => {
    setLoading(true);
    setErrorMessage(null);

    const response = await fetch("/api/verifier-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeToVerify }),
    });

    const data = await response.json();

    if (data.success) {
      setEntreprises(data.entreprises);
      setBtsNom(data.btsNom);
      // Stocker le code en cookie pendant 30 minutes
      document.cookie = `user_code=${codeToVerify}; max-age=1800; path=/`; // 1800 secondes = 30 minutes
    } else {
      setErrorMessage("Code invalide ou expiré.");
    }

    setLoading(false);
  };

  //! SUBMIT LE CODE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(code);
  };

  return (
    <div className="flex flex-col items-center justify-center mx-4 lg:mx-24 py-16">
      {entreprises ? (
        <EntrepriseList entreprises={entreprises} btsNom={btsNom} />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center mx-4 lg:mx-24 py-64">
            <div className="font-krub text-center text-white mb-4">
              <h1 className="text-4xl font-bold mb-4 font-krub">
                Entrez votre code
              </h1>
              <p>
                Rentrez le code secret reçu par mail pour accéder à votre liste
                d'entreprises ciblées.
              </p>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 font-krub"
            >
              <input
                type="text"
                placeholder="Votre code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded-2xl w-64 text-white"
                required
              />
              <button
                type="submit"
                className="cursor-pointer bg-primary-500 text-white py-2 px-4 rounded-2xl hover:bg-primary-700 transition"
                disabled={loading}
              >
                {loading ? "Vérification..." : "Accéder à ma liste"}
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
