"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";

export default function NavMobile() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/#cestquoi", label: "C'est quoi ?" },
    { href: "/nos-offres", label: "Nos offres" },
  ];

  return (
    <nav>
      <div className="flex items-center justify-between text-white">
        <button onClick={handleOpen} className="text-2xl">
          <MdMenu size={40} className="text-white" />
        </button>
      </div>

      <div
        ref={navRef}
        className={`fixed top-0 right-0 w-64 h-full bg-gradient-to-l from-primary-500/90 to-primary-700/90 backdrop-blur-lg text-white transform flex flex-col justify-center  transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className=" flex items-center justify-between">
          <div className="absolute top-4 left-4 text-lg font-bold font-krub">
            Menu
          </div>
          <button
            onClick={handleClose}
            className="text-2xl absolute top-4 right-4"
          >
            <MdClose />
          </button>
        </div>

        <ul className="flex flex-col p-4 space-y-8 font-fontb font-bold uppercase text-2xl tracking-widest">
          {links.map((link, index) => {
            const isActive =
              pathname === link.href ||
              (link.href === "#cestquoi" && pathname === "/");

            return (
              <li
                key={index}
                className={`${
                  isActive ? "active text-white font-bold" : "font-thin"
                } pb-1 text-white text-base font-krub pt-1 px-2 tracking-widest hover:text-white/70 transition-all duration-300`}
              >
                <Link
                  href={
                    link.href === "#cestquoi" && pathname !== "/"
                      ? `/#cestquoi`
                      : link.href
                  }
                  onClick={handleClose}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={"/rentrer-son-code"}
              onClick={handleClose}
              className="pl-2 text-white font-krub text-xs underline"
            >
              Rentrer son code
            </Link>
          </li>
        </ul>

        <div className="px-6"></div>
      </div>
    </nav>
  );
}
