"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const navRef = useRef<HTMLUListElement>(null);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/#cestquoi", label: "C'est quoi ?" },
    { href: "/nos-offres", label: "Nos offres" },
  ];

  return (
    <nav className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-2xl py-2 px-4 mx-24 flex justify-between items-center shadow-[0px_8px_4px_0px_rgba(0,0,0,0.35)]">
      <Link href={"/"} className="font-krub font-bold text-4xl text-white">
        STA
      </Link>
      <ul ref={navRef} className="flex font-krub gap-8">
        {links.map((link, index) => {
          const isActive =
            pathname === link.href ||
            (link.href === "#cestquoi" && pathname === "/");

          return (
            <li
              key={index}
              className={`${
                isActive
                  ? "active font-font1 text-white font-bold"
                  : "font-thin"
              } pb-1 text-white text-sm font-krub pt-1 px-2 tracking-widest hover:text-white/70 transition-all duration-300`}
            >
              <Link
                href={
                  link.href === "#cestquoi" && pathname !== "/"
                    ? `/#cestquoi`
                    : link.href
                }
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div>
        <Link
          href={"/rentrer-son-code"}
          className="text-white font-krub text-xs underline"
        >
          Rentrer son code
        </Link>
      </div>
    </nav>
  );
}
