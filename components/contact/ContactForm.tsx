'use client';

import { useState, FormEvent } from 'react';
import { Send } from 'lucide-react';
import { TOP_COUNTRIES, OTHER_COUNTRIES } from '@/lib/countries';

type EnquiryType = 'general' | 'accommodation';

const ROOM_TYPES = [
  'Any room type',
  'Classic Rooms',
  'Classic Suites',
  'Deluxe Rooms',
  'Executive Suites',
  'Strathearn Suite',
];

const HOW_FOUND_OPTIONS = [
  'Please select…',
  'Search engine (Google, Bing)',
  'AI assistant (ChatGPT, Claude, Gemini, Perplexity)',
  'Social media',
  'Friend or family recommendation',
  'Travel agent or tour operator',
  'Repeat guest',
  'Travel publication or article',
  'Other',
];

const RECIPIENTS: Record<EnquiryType, { email: string; subject: string }> = {
  general: { email: 'guestrelations@ilalalodge.co.zw', subject: 'General Enquiry' },
  accommodation: { email: 'onlinereservations@ilalalodge.com', subject: 'Accommodation Enquiry' },
};

const inputBase =
  'w-full px-4 py-3 bg-white border border-brand-stem/30 rounded-md text-brand-forest placeholder:text-brand-stem/40 focus:outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold transition-colors';

const labelBase =
  'block text-xs uppercase tracking-wider text-brand-stem mb-2 font-semibold';

export default function ContactForm() {
  const [type, setType] = useState<EnquiryType>('general');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [arrival, setArrival] = useState('');
  const [departure, setDeparture] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomPref, setRoomPref] = useState(ROOM_TYPES[0]);
  const [nationality, setNationality] = useState('');
  const [howFound, setHowFound] = useState(HOW_FOUND_OPTIONS[0]);
  const [newsletter, setNewsletter] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email: recipient, subject } = RECIPIENTS[type];

    const lines: string[] = [];
    lines.push(`Name: ${name}`);
    lines.push(`Email: ${email}`);
    if (phone) lines.push(`Phone: ${phone}`);
    if (type === 'accommodation') {
      if (arrival) lines.push(`Arrival: ${arrival}`);
      if (departure) lines.push(`Departure: ${departure}`);
      lines.push(`Guests: ${guests}`);
      lines.push(`Room preference: ${roomPref}`);
      if (nationality) lines.push(`Nationality: ${nationality}`);
    }
    if (howFound && howFound !== HOW_FOUND_OPTIONS[0]) {
      lines.push(`How they found us: ${howFound}`);
    }
    lines.push(`Newsletter signup: ${newsletter ? 'Yes' : 'No'}`);
    lines.push('');
    lines.push('Message:');
    lines.push(message);

    const body = encodeURIComponent(lines.join('\n'));
    const subjectEncoded = encodeURIComponent(`${subject} from ${name || 'Website Visitor'}`);
    window.location.href = `mailto:${recipient}?subject=${subjectEncoded}&body=${body}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Enquiry Type Toggle */}
      <div>
        <label className={labelBase}>Enquiry Type</label>
        <div className="grid grid-cols-2 gap-3">
          {(['general', 'accommodation'] as EnquiryType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`px-4 py-3 rounded-md border-2 text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                type === t
                  ? 'border-brand-gold bg-brand-gold text-white'
                  : 'border-brand-stem/30 bg-white text-brand-forest hover:border-brand-gold/60'
              }`}
            >
              {t === 'general' ? 'General Enquiry' : 'Accommodation Enquiry'}
            </button>
          ))}
        </div>
      </div>

      {/* Common Fields */}
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelBase}>Full Name *</label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBase}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label htmlFor="email" className={labelBase}>Email *</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputBase}
            placeholder="jane@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelBase}>Phone <span className="font-normal normal-case text-brand-stem/60">(optional)</span></label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputBase}
          placeholder="+44 20 1234 5678"
        />
      </div>

      {/* Accommodation-only fields */}
      {type === 'accommodation' && (
        <div className="space-y-5 p-5 bg-brand-daisy rounded-md border border-brand-stem/15">
          <p className="text-xs uppercase tracking-wider text-brand-stem font-semibold">
            Stay Details
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="arrival" className={labelBase}>Arrival</label>
              <input
                id="arrival"
                type="date"
                value={arrival}
                onChange={(e) => setArrival(e.target.value)}
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="departure" className={labelBase}>Departure</label>
              <input
                id="departure"
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className={inputBase}
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="guests" className={labelBase}>Number of Guests</label>
              <input
                id="guests"
                type="number"
                min="1"
                max="20"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className={inputBase}
              />
            </div>
            <div>
              <label htmlFor="roomPref" className={labelBase}>Room Preference</label>
              <select
                id="roomPref"
                value={roomPref}
                onChange={(e) => setRoomPref(e.target.value)}
                className={inputBase}
              >
                {ROOM_TYPES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="nationality" className={labelBase}>Nationality</label>
            <select
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className={inputBase}
            >
              <option value="">Please select…</option>
              <optgroup label="Most common">
                {TOP_COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
              <optgroup label="All countries">
                {OTHER_COUNTRIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </optgroup>
            </select>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="message" className={labelBase}>Message *</label>
        <textarea
          id="message"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className={inputBase}
          placeholder={
            type === 'accommodation'
              ? 'Tell us about your stay, any special requests, or questions about the rooms…'
              : 'How can we help?'
          }
        />
      </div>

      <div>
        <label htmlFor="howFound" className={labelBase}>How did you hear about us? <span className="font-normal normal-case text-brand-stem/60">(optional)</span></label>
        <select
          id="howFound"
          value={howFound}
          onChange={(e) => setHowFound(e.target.value)}
          className={inputBase}
        >
          {HOW_FOUND_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          className="mt-1 w-4 h-4 accent-brand-gold cursor-pointer flex-shrink-0"
        />
        <span className="text-sm text-brand-forest/80 group-hover:text-brand-forest transition-colors">
          Sign me up to the Ilala Lodge newsletter for updates, special offers, and travel inspiration.
        </span>
      </label>

      <div className="pt-2">
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2.5 h-12 min-w-[200px] px-6 rounded-full bg-brand-forest text-white text-sm font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-all duration-200"
        >
          <Send className="w-4 h-4" strokeWidth={2} />
          Send Enquiry
        </button>
      </div>
    </form>
  );
}
