'use client';

interface WhatsAppTriggerButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function WhatsAppTriggerButton({ className, children }: WhatsAppTriggerButtonProps) {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent('openWhatsAppPopup'));
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
