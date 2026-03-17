'use client';

import { MessageCircle } from 'lucide-react';
import { CONTACT } from '@/lib/constants';

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-12 right-12 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 pt-1.5 pb-1 lg:px-4 lg:pt-2 lg:pb-1.5 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 uppercase tracking-wide"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="!h-6 !w-6 !p-1 !bg-transparent" />
      <span className="text-sm font-semibold whitespace-nowrap">
        Chat with us
      </span>
    </a>
  );
}
