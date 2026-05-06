'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.299-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const WHATSAPP_NUMBERS = {
  concierge: 'https://wa.me/263832844737',
  reservations: 'https://wa.me/263719384920',
};

export default function WhatsAppButton() {
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const handleOpenWhatsApp = () => setShowOptions(true);
    window.addEventListener('openWhatsAppPopup', handleOpenWhatsApp);
    return () => window.removeEventListener('openWhatsAppPopup', handleOpenWhatsApp);
  }, []);

  return (
    <>
      {/* Main WhatsApp Button */}
      <button
        onClick={() => setShowOptions(true)}
        className="hidden lg:inline-flex fixed bottom-12 right-12 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white h-11 px-5 rounded-full transition-all duration-300 hover:scale-105 items-center justify-center gap-2.5 uppercase tracking-wide shadow-lg"
        aria-label="Contact us on WhatsApp"
      >
        <WhatsAppIcon className="w-5 h-5" />
        <span className="text-sm font-semibold whitespace-nowrap">
          WhatsApp Us
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
                href={WHATSAPP_NUMBERS.reservations}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowOptions(false)}
              >
                <div>
                  <div className="font-semibold">Reservations</div>
                  <div className="text-xs text-white/80">Accommodation Bookings</div>
                </div>
                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href={WHATSAPP_NUMBERS.concierge}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-lg transition-all duration-200 group"
                onClick={() => setShowOptions(false)}
              >
                <div>
                  <div className="font-semibold">Front Desk</div>
                  <div className="text-xs text-white/80">Inhouse enquiries & activities</div>
                </div>
                <WhatsAppIcon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
