'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Facebook, Instagram, ChevronDown } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStaySubmenuOpen, setIsStaySubmenuOpen] = useState(false);

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
    { label: 'Facilities', href: '#facilities' },
    { label: 'Dining', href: '/dining' },
    { label: 'Location', href: '/location' },
    { label: 'Activities', href: '/activities' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Press & News', href: '#press-news' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setIsStaySubmenuOpen(false);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
    setIsStaySubmenuOpen(false);
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
            className={`absolute right-4 lg:right-8 z-10 px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide ${
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
        className={`fixed inset-0 z-[70] flex bg-brand-forest transition-opacity duration-300 ${
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

        {/* Left Side - Menu (50%) */}
        <div
          className={`w-1/2 bg-brand-forest overflow-y-auto transition-transform duration-300 relative ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Book Now Button - Top Right */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-6 right-8 lg:top-8 lg:right-12 px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 hover:shadow-lg uppercase tracking-wide bg-white hover:bg-white/90 text-brand-forest"
          >
            Book Now
          </a>
        <div className="min-h-full px-12 pt-32 pb-24 lg:px-20">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[300px_1fr] gap-12 lg:gap-16">
            {/* Left Column - Navigation */}
            <nav className="flex flex-col gap-0">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {'subItems' in link && link.subItems ? (
                    <>
                      <div className="flex items-center gap-2">
                        <Link
                          href={link.href}
                          onClick={handleLinkClick}
                          className="text-white/65 hover:text-white transition-colors duration-200 text-2xl font-normal font-serif uppercase"
                        >
                          {link.label}
                        </Link>
                        <button
                          onClick={() => setIsStaySubmenuOpen(!isStaySubmenuOpen)}
                          className="text-white/65 hover:text-white transition-all duration-200 p-1"
                          aria-label="Toggle submenu"
                        >
                          <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isStaySubmenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                      </div>
                      <div className={`flex flex-col gap-0 ml-0 border-l border-white/30 pl-4 overflow-hidden transition-all duration-300 ${
                        isStaySubmenuOpen ? 'max-h-96 mt-1 mb-[15px] opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        {link.subItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={handleLinkClick}
                            className="text-white/80 hover:text-brand-gold transition-colors duration-200 text-lg font-sans"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={handleLinkClick}
                      className="text-white/65 hover:text-white transition-colors duration-200 text-2xl font-normal font-serif uppercase block"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="#agents"
                onClick={handleLinkClick}
                className="text-white hover:text-brand-gold transition-colors duration-200 text-lg font-medium mt-8 uppercase tracking-wider"
              >
                Agents
              </Link>
            </nav>

            {/* Right Column - Contact Information */}
            <div className="flex flex-col gap-8 text-white">
              {/* Direct Bookings */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Direct Bookings</h3>
                <div className="flex flex-col gap-2">
                  <a href="tel:+263719384920" className="hover:text-brand-gold transition-colors">
                    +263 719 384 920
                  </a>
                  <a
                    href="https://wa.me/263719384920"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat with us on Whatsapp
                  </a>
                  <a href="mailto:onlinereservations@ilalalodge.com" className="hover:text-brand-gold transition-colors">
                    onlinereservations@ilalalodge.com
                  </a>
                </div>
              </div>

              {/* Hotel Reception & Restaurant */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Hotel Reception & Restaurant</h3>
                <div className="flex flex-col gap-2">
                  <a href="tel:+263832844737" className="hover:text-brand-gold transition-colors">
                    +263 83 2844737/8/9
                  </a>
                  <a
                    href="https://wa.me/263832844737"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-brand-gold hover:text-brand-gold/80 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Chat to us on Whatsapp
                  </a>
                  <a href="mailto:guestrelations@ilalalodge.co.zw" className="hover:text-brand-gold transition-colors">
                    guestrelations@ilalalodge.co.zw
                  </a>
                </div>
              </div>

              {/* Agent Reservations */}
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold mb-4">Agent Reservations</h3>
                <div className="flex flex-col gap-2">
                  <a href="tel:+263832844737" className="hover:text-brand-gold transition-colors">
                    +263 83 2844737/8/9
                  </a>
                  <a href="tel:+263832842650" className="hover:text-brand-gold transition-colors">
                    +263 83 2842650
                  </a>
                  <a href="tel:+263712401814" className="hover:text-brand-gold transition-colors">
                    +263 712 401 814
                  </a>
                  <a href="mailto:reservations@ilalalodge.co.zw" className="hover:text-brand-gold transition-colors">
                    reservations@ilalalodge.co.zw
                  </a>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-4 mt-4">
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

        {/* Right Side - Image (50%) */}
        <div
          className={`w-1/2 relative transition-all duration-500 delay-100 ${
            isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
          onClick={handleMenuClose}
        >
          <Image
            src="/images/banner-image-2-cropped.png"
            alt="Ilala Lodge"
            fill
            className="object-cover"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
    </>
  );
}
