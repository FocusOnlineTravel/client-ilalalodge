'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FileText, Download, Play, Lock, ChevronDown, ChevronUp, ExternalLink, FolderOpen, Camera } from 'lucide-react';

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

interface ImageItem {
  ID: number;
  url: string;
  title: string;
  alt: string;
  width: number;
  height: number;
  sizes: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

interface VideoItem {
  video_title: string;
  add_video_4: string;
}

interface LinkItem {
  url_link: {
    title: string;
    url: string;
    target: string;
  };
  image: false | {
    url: string;
    alt: string;
  };
}

interface AgentsPageData {
  text_rates: string;
  files_rates: FileItem[];
  text_hotel: string;
  files_hotel: FileItem[];
  add_accommodation: AccommodationItem[];
  text_accommodation: string;
  updates: UpdateItem[];
  image_slider: ImageItem[];
  videos: VideoItem[];
  dropbox_link: string;
  wetu_link: string;
  links: LinkItem[];
}

// Password for agents area - checked client-side
const AGENT_PASSWORD = process.env.NEXT_PUBLIC_AGENT_PASSWORD || 'ilala2024';

// Tab definitions
const TABS = [
  { id: 'rates', label: 'Rates & Pricing' },
  { id: 'hotel', label: 'Hotel Information' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'media', label: 'Media' },
  { id: 'updates', label: 'Latest Updates' },
] as const;

type TabId = typeof TABS[number]['id'];

// Convert string to sentence case
function toSentenceCase(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Format filename to nice readable name
function formatFileName(filename: string, title?: string): string {
  // If there's a proper title, use it
  if (title && !title.includes('-') && !title.includes('_')) {
    return title;
  }

  // Clean up the filename
  let name = filename
    .replace(/\.[^/.]+$/, '') // Remove extension
    .replace(/[-_]+/g, ' ')   // Replace dashes/underscores with spaces
    .replace(/\s+/g, ' ')     // Normalize multiple spaces
    .trim();

  // Title case
  name = name.replace(/\b\w/g, c => c.toUpperCase());

  // Clean up common patterns
  name = name
    .replace(/Ilh /gi, 'ILH ')
    .replace(/Phg /gi, 'PHG ')
    .replace(/Prh /gi, 'PRH ')
    .replace(/ Sto /gi, ' STO ')
    .replace(/ Rack /gi, ' RACK ')
    .replace(/ Amended /gi, ' (Amended)')
    .replace(/ Final/gi, '')
    .replace(/ 1$/gi, '')
    .replace(/ Onlineversion/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return name;
}

export default function AgentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState<AgentsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('rates');
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
      const res = await fetch('/api/agents');
      if (!res.ok) throw new Error('API request failed');
      const json = await res.json();
      setData(json);
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
      <section className="relative h-[40vh] min-h-[280px] flex items-center justify-center bg-brand-forest">
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

      {/* Welcome Text */}
      <section className="py-8 md:py-12 bg-brand-daisy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div
            className="prose prose-lg max-w-none text-brand-forest/80"
            dangerouslySetInnerHTML={{ __html: data.text_hotel }}
          />
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-white border-b border-brand-stem/20 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center gap-2 py-4 flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-forest text-white'
                    : 'bg-brand-daisy text-brand-forest hover:bg-brand-gold/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-12 md:py-16 bg-white min-h-[50vh]">
        <div className="max-w-4xl mx-auto px-4">

          {/* Rates Tab */}
          {activeTab === 'rates' && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-6">
                Rates & Pricing
              </h2>
              <div
                className="prose max-w-none text-center mb-10 text-brand-forest/80"
                dangerouslySetInnerHTML={{ __html: data.text_rates }}
              />
              <div className="space-y-3">
                {data.files_rates?.map((file, index) => {
                  const fileData = file.add_file_rates;
                  if (!fileData?.url) return null;
                  return (
                    <a
                      key={index}
                      href={fileData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                    >
                      <FileText className="w-6 h-6 text-brand-gold flex-shrink-0" />
                      <span className="flex-1 text-brand-forest group-hover:text-brand-gold transition-colors font-medium">
                        {formatFileName(fileData.filename, fileData.title)}
                      </span>
                      <Download className="w-5 h-5 text-brand-stem group-hover:text-brand-gold transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Hotel Information Tab */}
          {activeTab === 'hotel' && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-6">
                Hotel Information
              </h2>
              {data.text_hotel && (
                <div
                  className="prose max-w-none text-center mb-10 text-brand-forest/80"
                  dangerouslySetInnerHTML={{ __html: data.text_hotel }}
                />
              )}
              <div className="space-y-3">
                {data.files_hotel?.map((file, index) => {
                  const fileData = file.add_file_hotel;
                  if (!fileData?.url) return null;
                  return (
                    <a
                      key={index}
                      href={fileData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                    >
                      <FileText className="w-6 h-6 text-brand-gold flex-shrink-0" />
                      <span className="flex-1 text-brand-forest group-hover:text-brand-gold transition-colors font-medium">
                        {formatFileName(fileData.filename, fileData.title)}
                      </span>
                      <Download className="w-5 h-5 text-brand-stem group-hover:text-brand-gold transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Accommodation Tab */}
          {activeTab === 'accommodation' && (
            <div>
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
                          className="aspect-video rounded-lg overflow-hidden shadow-lg [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:object-cover"
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
                          className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-forest transition-colors font-medium"
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
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-6">
                Media Library
              </h2>
              <p className="text-center text-brand-forest/80 mb-10">
                Download high-resolution images and videos for your marketing materials.
              </p>

              {/* Images Section */}
              {data.image_slider && data.image_slider.length > 0 && (
                <div className="mb-12">
                  <h3 className="font-serif text-2xl text-brand-forest mb-6">Images</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.image_slider.map((image, index) => (
                      <a
                        key={image.ID || index}
                        href={image.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative aspect-square rounded-lg overflow-hidden bg-brand-daisy"
                      >
                        <Image
                          src={image.sizes?.large || image.url}
                          alt={image.alt || image.title || 'Ilala Lodge'}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-brand-forest/0 group-hover:bg-brand-forest/40 transition-colors flex items-center justify-center">
                          <Download className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </a>
                    ))}
                  </div>
                  <p className="text-center text-sm text-brand-stem mt-6">
                    Click on any image to download the full resolution version.
                  </p>
                </div>
              )}

              {/* Image Libraries - Dropbox & WETU */}
              {(data.dropbox_link || data.wetu_link) && (
                <div className="mb-12">
                  <h3 className="font-serif text-2xl text-brand-forest mb-6">Image Libraries</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.dropbox_link && (
                      <a
                        href={data.dropbox_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-6 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-brand-forest/10 rounded-full flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                          <FolderOpen className="w-6 h-6 text-brand-forest" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-brand-forest group-hover:text-brand-gold transition-colors">Dropbox Image Library</h4>
                          <p className="text-sm text-brand-stem">Browse and download high-res images</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-brand-stem group-hover:text-brand-gold transition-colors" />
                      </a>
                    )}
                    {data.wetu_link && (
                      <a
                        href={data.wetu_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-6 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                      >
                        <div className="w-12 h-12 bg-brand-forest/10 rounded-full flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                          <Camera className="w-6 h-6 text-brand-forest" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-brand-forest group-hover:text-brand-gold transition-colors">WETU Gallery</h4>
                          <p className="text-sm text-brand-stem">View our complete image collection</p>
                        </div>
                        <ExternalLink className="w-5 h-5 text-brand-stem group-hover:text-brand-gold transition-colors" />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Resource Links */}
              {data.links && data.links.length > 0 && data.links.some(link => link.url_link?.url) && (
                <div className="mb-12">
                  <h3 className="font-serif text-2xl text-brand-forest mb-6">Additional Resources</h3>
                  <div className="space-y-3">
                    {data.links
                      .filter(link => link.url_link?.url)
                      .map((link, index) => (
                        <a
                          key={index}
                          href={link.url_link.url}
                          target={link.url_link.target || '_blank'}
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 bg-brand-daisy rounded-lg hover:bg-brand-gold/20 transition-colors group"
                        >
                          <ExternalLink className="w-5 h-5 text-brand-gold flex-shrink-0" />
                          <span className="flex-1 text-brand-forest group-hover:text-brand-gold transition-colors font-medium">
                            {link.url_link.title || 'View Resource'}
                          </span>
                        </a>
                      ))}
                  </div>
                </div>
              )}

              {/* Videos Section */}
              {data.videos && data.videos.length > 0 && (
                <div>
                  <h3 className="font-serif text-2xl text-brand-forest mb-6">Videos</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {data.videos.map((video, index) => (
                      <div key={index} className="bg-brand-daisy rounded-lg overflow-hidden">
                        <div
                          className="aspect-video [&_iframe]:w-full [&_iframe]:h-full"
                          dangerouslySetInnerHTML={{ __html: video.add_video_4 }}
                        />
                        <div className="p-4">
                          <h4 className="font-medium text-brand-forest">{video.video_title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(!data.image_slider || data.image_slider.length === 0) &&
               (!data.videos || data.videos.length === 0) &&
               !data.dropbox_link && !data.wetu_link &&
               (!data.links || data.links.length === 0) && (
                <p className="text-center text-brand-stem">No media available.</p>
              )}
            </div>
          )}

          {/* Updates Tab */}
          {activeTab === 'updates' && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-forest text-center mb-10">
                Latest Updates
              </h2>
              {data.updates && data.updates.length > 0 ? (
                <div className="space-y-4">
                  {data.updates.map((update, index) => (
                    <div key={index} className="bg-brand-daisy rounded-lg overflow-hidden">
                      <button
                        onClick={() => toggleUpdate(index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-brand-gold/10 transition-colors"
                      >
                        <div>
                          <span className="text-sm text-brand-gold font-medium">{update.update_date}</span>
                          <h3 className="font-serif text-xl md:text-2xl text-brand-forest mt-1">
                            {toSentenceCase(update.update_title)}
                          </h3>
                        </div>
                        {expandedUpdates.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-brand-stem flex-shrink-0 ml-4" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-brand-stem flex-shrink-0 ml-4" />
                        )}
                      </button>
                      {expandedUpdates.includes(index) && (
                        <div className="px-6 pb-8 pt-4">
                          <div
                            className="prose prose-sm max-w-none text-brand-forest/80 [&_p]:mb-4 [&_p:last-child]:mb-0"
                            dangerouslySetInnerHTML={{ __html: update.update_text }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-brand-stem">No updates available.</p>
              )}
            </div>
          )}
        </div>
      </section>

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
