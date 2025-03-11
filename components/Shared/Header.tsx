import React from "react";
import Navbar from "./Navbar/Navbar";
import NavMobile from "./Navbar/NavMobile";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="sm:hidden bg-gradient-to-r from-primary-500 to-primary-700 px-4 rounded-2xl flex justify-between items-center mx-2">
        <Link href={"/"} className="text-xl font-krub font-bold text-white ">
          STA
        </Link>
        <NavMobile />
      </div>
    </>
  );
}
