'use client';

import WhatsAppTriggerButton from './WhatsAppTriggerButton';

const PHONE_TEL = '+263832844737';
const PHONE_DISPLAY = '+263 83 2844737';
const EMAIL = 'guestrelations@ilalalodge.co.zw';

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    fillRule="evenodd"
    clipRule="evenodd"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.299-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const PhoneIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.07 15.07 0 0 1-6.59-6.58l2.2-2.21c.27-.27.35-.65.24-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
  </svg>
);

const MailIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className="flex-shrink-0"
    aria-hidden="true"
  >
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

interface Props {
  theme?: 'dark' | 'light';
  align?: 'center' | 'start';
  className?: string;
}

export default function ServiceCTAs({ theme = 'light', align = 'center', className = '' }: Props) {
  const isDark = theme === 'dark';
  // Same height + minimum width on every button for visual balance
  const base =
    'inline-flex items-center justify-center gap-2.5 h-11 min-w-[160px] px-5 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-200';
  const whatsapp = `${base} bg-[#25D366] text-white hover:bg-[#20BA5A]`;
  const call = isDark
    ? `${base} bg-white text-brand-forest hover:bg-brand-gold hover:text-white`
    : `${base} bg-brand-forest text-white hover:bg-brand-forest/90`;
  const email = isDark
    ? `${base} border border-white/60 text-white hover:bg-white hover:text-brand-forest`
    : `${base} border border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white`;
  const justify = align === 'start' ? 'justify-start' : 'justify-center';

  return (
    <div className={`flex flex-wrap gap-3 ${justify} ${className}`}>
      <WhatsAppTriggerButton className={whatsapp}>
        <WhatsAppIcon size={20} />
        <span>WhatsApp</span>
      </WhatsAppTriggerButton>
      <a href={`tel:${PHONE_TEL}`} className={call} aria-label={`Call us on ${PHONE_DISPLAY}`}>
        <PhoneIcon size={22} />
        <span>Call Us</span>
      </a>
      <a
        href={`mailto:${EMAIL}`}
        className={email}
        aria-label={`Email ${EMAIL}`}
        title="Office hours only"
      >
        <MailIcon size={22} />
        <span>Email Us</span>
      </a>
    </div>
  );
}
