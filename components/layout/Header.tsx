'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Facebook, Instagram } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);

  // Show Stay submenu by default when menu opens
  useEffect(() => {
    if (isMobileMenuOpen) {
      setHoveredMenuItem('Stay');
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      label: 'Stay',
      href: '/accommodation',
      subItems: [
        { label: 'Classic Rooms', href: '/accommodation/classic-rooms' },
        { label: 'Classic Suites', href: '/accommodation/classic-suites' },
        { label: 'Deluxe Rooms', href: '/accommodation/deluxe-rooms' },
        { label: 'Executive Suites', href: '/accommodation/executive-suites' },
        { label: 'Strathearn Suite', href: '/accommodation/strathearn-suite' },
        { label: 'Rates', href: '#rates' },
        { label: 'Specials', href: '#specials' },
      ]
    },
    {
      label: 'The Hotel',
      href: '/our-story',
      subItems: [
        { label: 'Our Story', href: '/our-story' },
        { label: 'Facilities', href: '/facilities' },
      ]
    },
    {
      label: 'Overview',
      href: '/facilities',
      subItems: [
        { label: 'Activities Desk', href: '/facilities#activities-desk' },
        { label: 'Conferencing', href: '/facilities#conferencing' },
        { label: 'Spa', href: '/facilities#spa' },
      ]
    },
    { label: 'Dining', href: '/dining' },
    {
      label: 'Location',
      href: '/location',
      subItems: [
        { label: 'Victoria Falls', href: '/location' },
        { label: 'Map', href: '/map' },
        { label: 'Activities', href: '/activities' },
      ]
    },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
    { label: 'Agents', href: '#agents' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setHoveredMenuItem(null);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
    setHoveredMenuItem(null);
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 lg:px-8">
        <div className={`flex items-center justify-center relative transition-all duration-300 ${
          isScrolled ? 'h-16 lg:h-20' : 'h-24 lg:h-32'
        }`}>
          {/* Burger Menu Button - Left Side */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`absolute left-4 lg:left-8 z-10 p-2 group transition-colors flex items-center gap-3 ${
              isMobileMenuOpen ? 'opacity-0 pointer-events-none' : ''
            } ${
              isScrolled ? 'text-brand-forest' : 'text-white'
            }`}
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5 w-7">
              <span className={`h-0.5 w-7 transition-all group-hover:bg-brand-gold ${
                isScrolled ? 'bg-brand-forest' : 'bg-white'
              }`}></span>
              <span className={`h-0.5 w-5 transition-all group-hover:bg-brand-gold ${
                isScrolled ? 'bg-brand-forest' : 'bg-white'
              }`}></span>
              <span className={`h-0.5 w-7 transition-all group-hover:bg-brand-gold ${
                isScrolled ? 'bg-brand-forest' : 'bg-white'
              }`}></span>
            </div>
            <span className={`text-lg font-semibold uppercase tracking-wider transition-colors ${
              isScrolled ? 'text-brand-forest' : 'text-white'
            } group-hover:text-brand-gold`}>
              Menu
            </span>
          </button>

          {/* Logo - Centered */}
          <Link href="/" className="relative z-10">
            <Image
              src={isScrolled ? '/images/logo-blacl.png' : '/images/logo-white.png'}
              alt="Ilala Lodge Hotel"
              width={248}
              height={83}
              className={`w-auto transition-all duration-300 ${
                isScrolled ? 'h-12 lg:h-16' : 'h-16 lg:h-24'
              }`}
              priority
            />
          </Link>

          {/* Book Now Button - Right Side */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute right-4 lg:right-8 z-10 px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide ${
              isScrolled
                ? 'bg-brand-forest hover:bg-brand-forest/90 text-white'
                : 'bg-white hover:bg-white/90 text-brand-forest'
            }`}
          >
            Book Now
          </a>
        </div>
      </div>
    </header>

      {/* Burger Menu Overlay */}
      <div
        className={`fixed inset-0 z-[70] bg-brand-forest transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button - Top Left */}
        <button
          onClick={handleMenuClose}
          className="absolute top-6 left-4 lg:top-8 lg:left-8 z-10 p-2 text-white hover:text-brand-gold transition-colors"
          aria-label="Close menu"
        >
          <X className="h-10 w-10" />
        </button>

        {/* Book Now Button - Top Right */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-6 right-8 lg:top-10 lg:right-20 z-10 px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide bg-white hover:bg-white/90 text-brand-forest"
        >
          Book Now
        </a>

        {/* Full Width Menu with Two Columns */}
        <div
          className={`w-full h-full overflow-y-auto transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="min-h-full px-8 pt-24 pb-24 lg:pt-28 lg:px-20">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-4 lg:gap-[250px]">

                {/* Left Column - Main Navigation */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div
                      key={link.href}
                      onMouseEnter={() => setHoveredMenuItem(link.subItems ? link.label : null)}
                    >
                      <Link
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`text-2xl lg:text-3xl font-normal font-serif uppercase transition-colors duration-200 block ${
                          link.label === 'Agents'
                            ? 'text-white/50 hover:text-brand-gold text-lg lg:text-xl mt-4 tracking-widest'
                            : hoveredMenuItem === link.label ? 'text-brand-gold' : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </div>
                  ))}
                </nav>

                {/* Right Column - Sub Items (appears on hover) */}
                <div
                  className="flex flex-col gap-6"
                  onMouseLeave={() => setHoveredMenuItem(null)}
                >
                  {navLinks.map((link) => (
                    link.subItems && hoveredMenuItem === link.label && (
                      <div
                        key={`${link.href}-sub`}
                        className="flex flex-col gap-3 animate-fade-in"
                      >
                        {link.subItems.map((subItem: any) => (
                          <div key={subItem.href}>
                            <Link
                              href={subItem.href}
                              onClick={handleLinkClick}
                              className="text-white/90 hover:text-brand-gold transition-colors duration-200 text-xl lg:text-2xl font-sans block"
                            >
                              {subItem.label}
                            </Link>
                            {subItem.subSubItems && (
                              <div className="ml-6 mt-2 flex flex-col gap-2">
                                {subItem.subSubItems.map((subSubItem: any) => (
                                  <Link
                                    key={subSubItem.href}
                                    href={subSubItem.href}
                                    onClick={handleLinkClick}
                                    className="text-white/70 hover:text-brand-gold transition-colors duration-200 text-base lg:text-lg font-sans"
                                  >
                                    {subSubItem.label}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  ))}
                </div>

              </div>

              {/* Contact Information - Bottom Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/20 text-white">
                {/* Direct Bookings */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Direct Bookings</h3>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+263719384920" className="hover:text-brand-gold transition-colors text-sm">
                      +263 719 384 920
                    </a>
                    <a
                      href="https://wa.me/263719384920"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Chat with us on Whatsapp
                    </a>
                    <a href="mailto:onlinereservations@ilalalodge.com" className="hover:text-brand-gold transition-colors text-sm">
                      onlinereservations@ilalalodge.com
                    </a>
                  </div>
                </div>

                {/* Front Desk & Restaurant */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Front Desk & Restaurant</h3>
                  <div className="flex flex-col gap-2">
                    <a href="tel:+263832844737" className="hover:text-brand-gold transition-colors text-sm">
                      +263 83 2844737/8/9
                    </a>
                    <a
                      href="https://wa.me/263832844737"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition-colors text-sm"
                    >
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat to us on Whatsapp
                  </a>
                    <a href="mailto:guestrelations@ilalalodge.co.zw" className="hover:text-brand-gold transition-colors text-sm">
                      guestrelations@ilalalodge.co.zw
                    </a>
                  </div>
                </div>

                {/* Agent Reservations & Social */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Agent Reservations</h3>
                  <div className="flex flex-col gap-2 mb-6">
                    <a href="tel:+263832844737" className="hover:text-brand-gold transition-colors text-sm">
                      +263 83 2844737/8/9
                    </a>
                    <a href="mailto:reservations@ilalalodge.co.zw" className="hover:text-brand-gold transition-colors text-sm">
                      reservations@ilalalodge.co.zw
                    </a>
                  </div>

                  {/* Social Media */}
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com/ilalalodge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-gold transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6" />
                    </a>
                    <a
                      href="https://instagram.com/ilalalodge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand-gold transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
