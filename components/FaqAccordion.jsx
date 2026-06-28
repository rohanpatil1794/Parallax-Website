"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.q}
            className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
              isOpen ? "border-brand-300 bg-white" : "border-brand-100 bg-brand-50/50"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-base font-semibold text-ink"
            >
              <span>{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 flex-shrink-0 text-brand-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink/65">{faq.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
