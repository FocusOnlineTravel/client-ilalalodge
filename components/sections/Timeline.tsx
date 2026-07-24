import { TimelineSection } from '@/types/sections';

interface Props {
  data: TimelineSection;
}

export default function Timeline({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';

  return (
    <section className={`py-20 md:py-32 ${bgClass}`} id={data.anchor_id}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        {(data.eyebrow || data.heading) && (
          <div className="text-center mb-16 md:mb-20">
            {data.eyebrow && (
              <p className="font-script text-4xl md:text-6xl text-brand-gold mb-2">
                {data.eyebrow}
              </p>
            )}
            {data.heading && (
              <h2 className={`font-serif text-2xl md:text-3xl ${textColorClass} uppercase tracking-wider`}>
                {data.heading}
              </h2>
            )}
          </div>
        )}

        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block relative">
          <div className="absolute top-[5px] left-[10%] right-[10%] h-px bg-brand-gold/40" />
          <div className={`grid grid-cols-${data.milestones.length} relative`} style={{ gridTemplateColumns: `repeat(${data.milestones.length}, 1fr)` }}>
            {data.milestones.map((m, index) => (
              <div key={index} className="flex flex-col items-center text-center px-2">
                <div className="w-[11px] h-[11px] rounded-full bg-brand-gold relative z-10" />
                <div className={`font-serif text-2xl lg:text-3xl ${textColorClass} mt-6 mb-2`}>
                  {m.year}
                </div>
                <div className={`text-sm ${textColorClass}/70 max-w-[160px]`}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden">
          {data.milestones.map((m, i) => (
            <div key={i} className="flex gap-5">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-brand-gold mt-3" />
                {i < data.milestones.length - 1 && (
                  <div className="w-px flex-1 bg-brand-gold/40 my-1" />
                )}
              </div>
              <div className="pb-8">
                <div className={`font-serif text-2xl ${textColorClass} mb-1`}>{m.year}</div>
                <div className={`text-sm ${textColorClass}/70`}>{m.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Text */}
        {data.footer_text && (
          <p className={`max-w-3xl mx-auto text-base md:text-lg ${textColorClass}/70 leading-relaxed text-center mt-16 md:mt-20 ${data.footer_style === 'italic' ? 'italic' : ''}`}>
            {data.footer_text}
          </p>
        )}
      </div>
    </section>
  );
}
