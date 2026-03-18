'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const WHATSAPP_NUMBERS = {
  concierge: 'https://wa.me/263832844737',
  reservations: 'https://wa.me/263719384920',
};

export default function WhatsAppButton() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      {/* Main WhatsApp Button */}
      <button
        onClick={() => setShowOptions(true)}
        className="fixed bottom-12 right-12 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white px-3 pt-1.5 pb-1 lg:px-4 lg:pt-2 lg:pb-1.5 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2 uppercase tracking-wide"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="!h-6 !w-6 !p-1 !bg-transparent" />
        <span className="text-sm font-semibold whitespace-nowrap">
          Chat with us
        </span>
      </button>

      {/* Options Popup */}
      {showOptions && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg p-6 lg:p-8 max-w-md mx-4 shadow-2xl">
            <button
              onClick={() => setShowOptions(false)}
              className="absolute top-4 right-4 text-brand-stem hover:text-brand-forest transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-serif text-2xl text-brand-forest mb-2">
              Choose Department
            </h3>
            <p className="text-brand-stem mb-6 text-sm">
              Select which team you'd like to chat with:
            </p>

            <div className="flex flex-col gap-3">
              <a
                href={WHATSAPP_NUMBERS.concierge}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowOptions(false)}
              >
                <div>
                  <div className="font-semibold">Concierge</div>
                  <div className="text-xs text-white/80">General inquiries & assistance</div>
                </div>
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={WHATSAPP_NUMBERS.reservations}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowOptions(false)}
              >
                <div>
                  <div className="font-semibold">Reservations</div>
                  <div className="text-xs text-white/80">Bookings & room inquiries</div>
                </div>
                <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
