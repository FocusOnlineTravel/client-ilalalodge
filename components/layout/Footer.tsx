import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram } from 'lucide-react';
import { CONTACT, SOCIAL_MEDIA } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-white text-brand-forest">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_0.8fr_0.8fr_0.8fr_1fr] gap-8 lg:gap-12">
          {/* Logo */}
          <div>
            <Image
              src="/images/logo-blacl.png"
              alt="Ilala Lodge Hotel"
              width={270}
              height={90}
              className="h-[109px] w-auto"
            />
          </div>

          {/* STAY */}
          <div>
            <h3 className="font-serif text-lg uppercase tracking-wider mb-4 text-brand-forest">
              STAY
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/accommodation/classic-rooms"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Classic Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodation/deluxe-rooms"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Deluxe Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodation/classic-suites"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Classic Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodation/executive-suites"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Executive Suites
                </Link>
              </li>
              <li>
                <Link
                  href="/accommodation/strathearn-suite"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Strathearn Suite
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPERIENCES */}
          <div>
            <h3 className="font-serif text-lg uppercase tracking-wider mb-4 text-brand-forest">
              EXPERIENCES
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/dining"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  href="/activities#day-trips"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Day Trips
                </Link>
              </li>
              <li>
                <Link
                  href="/activities#high-tea"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  High Tea
                </Link>
              </li>
              <li>
                <Link
                  href="/activities"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Activities
                </Link>
              </li>
              <li>
                <Link
                  href="/activities#wildlife"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Game Drives
                </Link>
              </li>
              <li>
                <Link
                  href="/activities#cultural"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Cultural
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="font-serif text-lg uppercase tracking-wider mb-4 text-brand-forest">
              ABOUT
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/our-story"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Location
                </Link>
              </li>
              <li>
                <Link
                  href="/victoria-falls"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Victoria Falls
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="font-serif text-lg uppercase tracking-wider mb-4 text-brand-forest">
              CONTACT
            </h3>
            <ul className="space-y-1">
              <li>
                <p className="text-base font-semibold text-brand-forest">DIRECT BOOKINGS</p>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors underline"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors underline"
                >
                  Chat with us on Whatsapp
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-base text-brand-stem hover:text-brand-gold transition-colors underline"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              <a
                href={SOCIAL_MEDIA.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-forest hover:text-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_MEDIA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-forest hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-stem">
          <p>
            &copy; {currentYear} Ilala Lodge | <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link> | <Link href="#" className="hover:text-brand-gold transition-colors">Terms & Conditions</Link>
          </p>
          <p>
            Website by <a href="https://focusonlinetravel.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">Focus Online Travel</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
