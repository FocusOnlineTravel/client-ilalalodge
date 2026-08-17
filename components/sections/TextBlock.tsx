import { TextBlockSection } from '@/types/sections';

interface Props {
  data: TextBlockSection;
}

export default function TextBlock({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';
  const bodyTextClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white/80' : 'text-brand-forest/80';

  const maxWidthClass = {
    narrow: 'max-w-2xl',
    medium: 'max-w-3xl',
    wide: 'max-w-4xl',
  }[data.max_width || 'medium'];

  const textAlignClass = data.text_align === 'left' ? 'text-left' : 'text-center';

  return (
    <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
      <div className={`${maxWidthClass} mx-auto px-4 ${textAlignClass}`}>
        {data.eyebrow && (
          data.section_theme === 'dark' || data.section_theme === 'forest' ? (
            <p className="font-script text-4xl md:text-6xl text-brand-gold mb-2">
              {data.eyebrow}
            </p>
          ) : (
            <p className="text-sm uppercase tracking-[0.2em] text-brand-gold mb-3">
              {data.eyebrow}
            </p>
          )
        )}
        {data.heading && (
          <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass} mb-6`}>
            {data.heading}
          </h2>
        )}
        <div
          className={`text-lg ${bodyTextClass} leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0 ${
            textAlignClass === 'text-center' ? '[&>p]:mx-auto' : ''
          }`}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
      </div>
    </section>
  );
}
