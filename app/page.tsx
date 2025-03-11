/* eslint-disable react/no-unescaped-entities */
import HeroSection from "@/components/Home/HeroSection";
import TableauExample from "@/components/Home/TableauExample/TableauExample";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { InfiniteMovingCardsTesti } from "@/components/ui/infinite-moving-cardsTesti";
import { btsList } from "@/lib/btsList";
import { testimonials } from "@/lib/testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="mx-2 lg:mx-24">
        <HeroSection />
      </section>

      <section className="relative bg-gradient-to-l from-white via-gray-200 to-white">
        <InfiniteMovingCards items={btsList} direction="right" speed="slow" />
        <div className="absolute top-0 left-0 w-4/10 h-10 bg-gradient-to-r from-white" />
        <div className="absolute top-0 right-0 w-4/10 h-10 bg-gradient-to-l from-white" />
      </section>

      <section className="bg-primary-900  ">
        <div className="mx-4 lg:mx-24 py-20 flex flex-col gap-8 items-center justify-center">
          <article className="flex flex-col gap-4 justify-center items-center">
            <h3 className="text-3xl font-krub font-bold text-white">
              Ne laissez plus le stress gâcher vos vacances !{" "}
            </h3>
            <p className="font-krub text-white">
              Trouvez rapidement votre alternance en contactant directement les
              entreprises qui recrutent dans votre domaine.
            </p>
          </article>
          <Image
            src={"/img/sta.webp"}
            width={1920}
            height={1080}
            alt=""
            className="rounded-2xl h-52 object-cover lg:w-1/2"
          />
        </div>
      </section>

      <section id="cestquoi" className="mx-4 lg:mx-24 py-20">
        <article className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:gap-2 justify-center items-center">
            <h2 className="text-3xl lg:text-4xl font-krub font-bold text-primary-500">
              STA, c'est quoi ?{" "}
            </h2>
            <span className="sm:hidden text-3xl text-center text-black font-medium">
              L'outils pour booster vos recherches ! 🚀
            </span>
            <p className="hidden sm:block text-4xl font-krub">
              L'outils pour booster vos recherches ! 🚀{" "}
            </p>
          </div>
          <p className="font-krub">
            Boostez votre recherche d'alternance !{" "}
            <span className="font-bold">
              Notre plateforme vous donne accès à des informations ultra-ciblées
            </span>{" "}
            : des entreprises ayant déjà recruté des alternants dans votre BTS
            ou de votre Licence.{" "}
            <span className="text-primary-500 font-bold">
              Gagnez du temps, maximisez vos chances et décrochez votre place
              plus facilement !
            </span>
          </p>
          <div className="">
            <TableauExample />
          </div>
          <p className="pt-8 text-center font-krub text-2xl font-bold">
            Maximisez vos chances avec des opportunités ciblées et
            démarquez-vous dès maintenant !
          </p>
        </article>
      </section>

      <section className="relative  pb-24">
        <InfiniteMovingCardsTesti
          items={testimonials}
          direction="right"
          speed="slow"
        />
        {/* <div className="absolute top-0 left-0 w-/10 h-36 bg-gradient-to-r from-white" /> */}
        {/* <div className="absolute top-0 right-0 w-4/10 h-36 bg-gradient-to-l from-white" /> */}
      </section>
    </>
  );
}
