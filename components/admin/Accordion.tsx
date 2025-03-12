"use client";
import React, { useState } from "react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 rounded-2xl shadow-md">
      <button
        className="cursor-pointer w-full text-left py-2 px-4 bg-primary-500 rounded-2xl text-white font-bold font-krub"
        onClick={toggleAccordion}
      >
        {title}
      </button>
      {isOpen && <div className="p-4 rounded-2xl">{children}</div>}
    </div>
  );
};

export default Accordion;
