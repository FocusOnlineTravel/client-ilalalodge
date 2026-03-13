'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-12 right-12 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 lg:h-6 lg:w-6" />
      <span className="text-sm lg:text-base font-semibold whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
