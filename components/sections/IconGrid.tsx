import Image from 'next/image';
import Link from 'next/link';
import { IconGridSection } from '@/types/sections';
import FadeInView from '@/components/animations/FadeInView';

interface Props {
  data: IconGridSection;
}

export default function IconGrid({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';

  return (
    <section className={`py-16 lg:py-24 ${bgClass} ${textColorClass}`} id={data.anchor_id || 'activities'}>
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        {(data.eyebrow || data.heading) && (
          <FadeInView>
            <div className="text-center mb-12 lg:mb-16">
              {data.eyebrow && (
                <span className="text-brand-script font-script text-6xl lg:text-8xl block mb-2">
                  {data.eyebrow}
                </span>
              )}
              {data.heading && (
                <h2 className={`font-serif text-3xl lg:text-5xl ${textColorClass} mb-8`}>
                  {data.heading}
                </h2>
              )}
            </div>
          </FadeInView>
        )}

        {/* Icons Grid */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-12 my-16 max-w-6xl mx-auto">
          {data.icons.map((item, index) => {
            const inner = (
              <>
                <div className="transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt || item.label}
                    width={60}
                    height={60}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <span className={`text-sm font-medium ${textColorClass} group-hover:text-brand-gold transition-colors duration-200`}>
                  {item.label}
                </span>
              </>
            );

            const wrapperClass = 'flex flex-col items-center text-center gap-3 w-32 group cursor-pointer';

            return (
              <FadeInView key={index} delay={index * 80}>
                {item.link ? (
                  <Link href={item.link.url} className={wrapperClass}>
                    {inner}
                  </Link>
                ) : (
                  <div className={wrapperClass}>{inner}</div>
                )}
              </FadeInView>
            );
          })}
        </div>

        {/* Download Button */}
        {data.show_download && data.download_file && (
          <FadeInView delay={data.icons.length * 80 + 200} className="text-center">
            <a
              href={data.download_file}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block border ${
                data.section_theme === 'dark' || data.section_theme === 'forest'
                  ? 'border-white text-white hover:bg-white hover:text-brand-forest'
                  : 'border-brand-forest text-brand-forest hover:bg-brand-forest hover:text-white'
              } px-4 pt-1.5 pb-1 lg:px-6 lg:pt-2 lg:pb-1.5 rounded-full font-semibold transition-all duration-200 uppercase tracking-wide`}
            >
              {data.download_label || 'Download'}
            </a>
          </FadeInView>
        )}
      </div>
    </section>
  );
}
