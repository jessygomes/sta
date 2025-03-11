/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-primary-500 to-primary-700">
      <ul className="text-xs text-white font-krub flex flex-col lg:flex-row gap-2 lg:gap-8 justify-center items-center mx-2 lg:mx-24 py-4">
        <li>2025 © STA - ShopTonAlternance - Tous droits réservés </li>
        <li className="flex flex-row gap-1">
          <Link href={"/conditions-utilisation"}>
            Conditions d'utilisation -{" "}
          </Link>
          <Link href={"/politique-de-confidentialite"}>
            Politique de confidentialité
          </Link>
        </li>
        <li></li>
      </ul>
    </div>
  );
}
