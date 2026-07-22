'use client';

import { useState, ReactNode } from 'react';
import { Plus } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-brand-forest text-white text-left group"
      >
        <span className="font-serif text-xl md:text-2xl">{title}</span>
        <span className="flex-shrink-0">
          <Plus
            className={`w-6 h-6 text-brand-gold transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
            strokeWidth={2}
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
