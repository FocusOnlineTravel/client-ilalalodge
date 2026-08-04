'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileText, Download, Play, Lock, ChevronDown, ChevronUp } from 'lucide-react';

// Types for the agents page data
interface FileItem {
  add_file_rates?: {
    url: string;
    title: string;
    filename: string;
  };
  add_file_hotel?: {
    url: string;
    title: string;
    filename: string;
  };
}

interface AccommodationItem {
  accommodation_name: string;
  accommodation_text: string;
  add_video_3: string;
  accommodation_factsheet?: {
    url: string;
    title: string;
  };
}

interface UpdateItem {
  update_date: string;
  update_title: string;
  update_text: string;
}

interface AgentsPageData {
  text_rates: string;
  files_rates: FileItem[];
  text_hotel: string;
  files_hotel: FileItem[];
  add_accommodation: AccommodationItem[];
  text_accommodation: string;
  updates: UpdateItem[];
}

// Password for agents area - checked client-side
const AGENT_PASSWORD = process.env.NEXT_PUBLIC_AGENT_PASSWORD || 'ilala2024';

export default function AgentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<AgentsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedUpdates, setExpandedUpdates] = useState<number[]>([]);

  // Check if already authenticated
  useEffect(() => {
    const auth = sessionStorage.getItem('agents_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchAgentsData();
    }
  }, [isAuthenticated]);

  const fetchAgentsData = async () => {
    try {
      const res = await fetch('https://backend-ilalalodge.focusonlinetravel.co.za/wp-json/ilala/v1/page/agents');
      const json = await res.json();
      setData(json.acf);
    } catch (err) {
      console.error('Failed to fetch agents data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === AGENT_PASSWORD) {
      sessionStorage.setItem('agents_auth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  const toggleUpdate = (index: number) => {
    setExpandedUpdates(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-daisy flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-forest/10 rounded-full mb-4">
              <Lock className="w-8 h-8 text-brand-forest" />
            </div>
            <h1 className="font-serif text-3xl text-brand-forest mb-2">Agent Portal</h1>
            <p className="text-brand-stem">Please enter your password to access the agent area.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 border border-brand-stem/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm mb-4">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-brand-forest text-white py-3 rounded-lg font-semibold uppercase tracking-wide hover:bg-brand-forest/90 transition-colors"
            >
              Enter
            </button>
          </form>

          <p className="text-center text-sm text-brand-stem mt-6">
            Need access?{' '}
            <a href="mailto:marketing@palmhospitality.co.zw" className="text-brand-gold hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-brand-daisy flex items-center justify-center">
        <div className="text-brand-forest">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-brand-daisy flex items-center justify-center">
        <div className="text-brand-forest">Failed to load data. Please refresh.</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[300px] flex items-center justify-center bg-brand-forest">
        <div className="absolute inset-0">
          <Image
            src="/images/Ilala-Lodge-Exteriors-09.jpg"
            alt="Ilala Lodge Hotel"
            fill
            className="object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Agent Portal</h1>
          <p className="text-lg md:text-xl text-white/90">
            Welcome to the Ilala Lodge Hotel trade area
          </p>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-12 md:py-16 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="prose prose-lg max-w-none text-brand-forest/80"
            dangerouslySetInnerHTML={{ __html: data.text_hotel }}
          />
        </div>
      </section>

      {/* Rates Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-6">
            Rates & Pricing
          </h2>
          <div
            className="prose max-w-none text-center mb-8 text-brand-forest/80"
            dangerouslySetInnerHTML={{ __html: data.text_rates }}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.files_rates?.map((file, index) => {
              const fileData = file.add_file_rates;
              if (!fileData?.url) return null;
              return (
                <a
                  key={index}
                  href={fileData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                >
                  <FileText className="w-8 h-8 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-forest group-hover:text-brand-gold transition-colors">
                    {fileData.title || fileData.filename}
                  </span>
                  <Download className="w-4 h-4 text-brand-stem ml-auto" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hotel Information */}
      <section className="py-12 md:py-16 bg-brand-daisy">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-8">
            Hotel Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.files_hotel?.map((file, index) => {
              const fileData = file.add_file_hotel;
              if (!fileData?.url) return null;
              return (
                <a
                  key={index}
                  href={fileData.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:bg-brand-gold/20 transition-colors group"
                >
                  <FileText className="w-8 h-8 text-brand-gold flex-shrink-0" />
                  <span className="text-brand-forest group-hover:text-brand-gold transition-colors">
                    {fileData.title || fileData.filename}
                  </span>
                  <Download className="w-4 h-4 text-brand-stem ml-auto" />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-12">
            Accommodation
          </h2>
          <div className="space-y-12">
            {data.add_accommodation?.map((room, index) => (
              <div key={index} className="grid md:grid-cols-2 gap-8 items-start">
                {/* Video */}
                <div className="order-2 md:order-1">
                  {room.add_video_3 ? (
                    <div
                      className="aspect-video rounded-lg overflow-hidden"
                      dangerouslySetInnerHTML={{ __html: room.add_video_3 }}
                    />
                  ) : (
                    <div className="aspect-video bg-brand-daisy rounded-lg flex items-center justify-center">
                      <Play className="w-12 h-12 text-brand-stem/50" />
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="order-1 md:order-2">
                  <h3 className="font-serif text-2xl text-brand-forest mb-4">
                    {room.accommodation_name}
                  </h3>
                  <div
                    className="text-brand-forest/80 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: room.accommodation_text }}
                  />
                  {room.accommodation_factsheet?.url && (
                    <a
                      href={room.accommodation_factsheet.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-forest transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      Download Fact Sheet
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updates */}
      {data.updates && data.updates.length > 0 && (
        <section className="py-12 md:py-16 bg-brand-daisy">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-8">
              Latest Updates
            </h2>
            <div className="space-y-4">
              {data.updates.map((update, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleUpdate(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-brand-gold/10 transition-colors"
                  >
                    <div>
                      <span className="text-sm text-brand-gold">{update.update_date}</span>
                      <h3 className="font-serif text-lg text-brand-forest">
                        {update.update_title}
                      </h3>
                    </div>
                    {expandedUpdates.includes(index) ? (
                      <ChevronUp className="w-5 h-5 text-brand-stem" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-brand-stem" />
                    )}
                  </button>
                  {expandedUpdates.includes(index) && (
                    <div className="px-4 pb-4">
                      <div
                        className="prose prose-sm max-w-none text-brand-forest/80"
                        dangerouslySetInnerHTML={{ __html: update.update_text }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="py-12 md:py-16 bg-brand-forest text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">Need Assistance?</h2>
          <p className="text-white/80 mb-6">
            Our marketing team is here to help with any questions.
          </p>
          <a
            href="mailto:marketing@palmhospitality.co.zw"
            className="inline-block bg-white text-brand-forest px-6 py-3 rounded-full font-semibold uppercase tracking-wide hover:bg-brand-gold hover:text-white transition-colors"
          >
            Contact Marketing Team
          </a>
        </div>
      </section>
    </>
  );
}
