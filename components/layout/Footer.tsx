import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT, SOCIAL_MEDIA } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-brand-daisy text-brand-forest">
      <div className="border-t-4 border-brand-gold"></div>
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-4">
            <Image
              src="/images/logo-blacl.png"
              alt="Ilala Lodge Hotel"
              width={180}
              height={60}
              className="h-14 w-auto"
            />
            <p className="text-sm text-brand-greenery">
              The closest hotel to Victoria Falls
            </p>
            <p className="text-sm text-brand-stem">
              Offering warm and welcoming true African hospitality since 1989.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-forest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#accommodation"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Accommodation
                </Link>
              </li>
              <li>
                <Link
                  href="#dining"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Dining
                </Link>
              </li>
              <li>
                <Link
                  href="#nature"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Nature
                </Link>
              </li>
              <li>
                <Link
                  href="#activities"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-forest">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#facilities"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="#reviews"
                  className="text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg mb-4 text-brand-forest">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-start gap-2 text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-start gap-2 text-sm text-brand-stem hover:text-brand-gold transition-colors"
                >
                  <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.phone}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-sm text-brand-stem">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{CONTACT.address}</span>
                </div>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-brand-forest">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_MEDIA.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-forest text-white p-2 hover:bg-brand-gold hover:text-brand-forest transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL_MEDIA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-forest text-white p-2 hover:bg-brand-gold hover:text-brand-forest transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href={SOCIAL_MEDIA.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-forest text-white p-2 hover:bg-brand-gold hover:text-brand-forest transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-stem/20 text-center">
          <p className="text-sm text-brand-stem">
            &copy; {currentYear} Ilala Lodge Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
