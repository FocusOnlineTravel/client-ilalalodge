'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accommodation', href: '#accommodation' },
    { label: 'Dining', href: '#dining' },
    { label: 'Nature', href: '#nature' },
    { label: 'Activities', href: '#activities' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-brand-forest/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 lg:px-8">
        <div className="flex items-center justify-center h-20 lg:h-24 relative">
          {/* Burger Menu Button - Left Side */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="absolute left-4 lg:left-8 z-10 text-white p-2 group"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-10 w-10" />
            ) : (
              <div className="flex flex-col gap-2 w-12">
                <span className="h-1 w-12 bg-white transition-all group-hover:bg-brand-gold"></span>
                <span className="h-1 w-9 bg-white transition-all group-hover:bg-brand-gold"></span>
                <span className="h-1 w-12 bg-white transition-all group-hover:bg-brand-gold"></span>
              </div>
            )}
          </button>

          {/* Logo - Centered */}
          <Link href="/" className="relative z-10">
            <Image
              src="/images/logo-white.png"
              alt="Ilala Lodge Hotel"
              width={216}
              height={72}
              className="h-14 lg:h-20 w-auto"
              priority
            />
          </Link>

          {/* Book Now Button - Right Side */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 lg:right-8 z-10 bg-white hover:bg-white/90 text-brand-forest px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide text-sm"
          >
            Book Now
          </a>
        </div>
      </div>

      {/* Burger Menu */}
      <div
        className={`fixed inset-0 bg-brand-forest/98 backdrop-blur-md transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="text-white hover:text-brand-gold transition-colors duration-200 text-xl font-medium uppercase tracking-wide"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="bg-brand-gold hover:bg-brand-gold/90 text-brand-forest px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide text-lg"
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
