import Link from "next/link";
import React from "react";
import { TypingAnimation } from "../magicui/typing-animation";

export default function HeroSection() {
  return (
    <div className="py-32 w-full lg:w-2/4 mx-auto flex flex-col justify-center items-center lg:space-y-4">
      <h1 className="text-xl lg:h-16 font-krub lg:text-6xl text-center font-medium">
        <TypingAnimation highlightLength={4}>SHOPTONALTERNANCE</TypingAnimation>
        {/* TONALTERNANCE */}
      </h1>
      <article className="text-center">
        <p className="text-lg w-full">
          <span className="text-primary-500 font-bold">
            Trouvez votre alternance sans stress !
          </span>{" "}
          Contactez les entreprises qui recrutent dans votre domaine et profitez
          pleinement de vos vacances.
        </p>
      </article>
      <Link
        href={"nos-offres"}
        className="px-8 py-2 rounded-2xl mt-4  bg-gradient-to-l from-primary-500 to-primary-700 shadow-[0px_8px_4px_0px_rgba(0,0,0,0.35)] hover:shadow-[0px_12px_6px_0px_rgba(0,0,0,0.)] transition-all duration-300"
      >
        <button className="cursor-pointer text-white font-krub font-bold tracking-widest uppercase">
          Voir nos offres
        </button>
      </Link>
    </div>
  );
}
