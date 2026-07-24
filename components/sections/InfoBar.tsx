import { InfoBarSection } from '@/types/sections';
import { Maximize2, Users, Bed, DollarSign, LucideIcon } from 'lucide-react';

interface Props {
  data: InfoBarSection;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  size: Maximize2,
  guests: Users,
  sleeps: Users,
  bed: Bed,
  beds: Bed,
  price: DollarSign,
};

export default function InfoBar({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';

  const columns = data.columns || '4';
  const columnClass = {
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-2 md:grid-cols-4',
  }[columns];

  return (
    <section className={`py-8 ${bgClass}`} id={data.anchor_id}>
      <div className="max-w-4xl mx-auto px-4">
        <div className={`grid ${columnClass} gap-6`}>
          {data.items.map((item, index) => {
            const Icon = iconMap[item.icon] || Maximize2;
            const isNotLast = index < data.items.length - 1;

            return (
              <div
                key={index}
                className={`flex flex-col items-center text-center py-4 ${
                  data.show_dividers !== false && isNotLast ? 'md:border-r md:border-brand-stem/20' : ''
                }`}
              >
                <Icon className={`w-6 h-6 ${textColorClass === 'text-white' ? 'text-brand-gold' : 'text-brand-gold'} mb-2`} />
                <span className={`text-sm ${textColorClass}/70 uppercase tracking-wider mb-1`}>
                  {item.label}
                </span>
                <span className={`text-lg font-semibold ${textColorClass}`}>
                  {item.value}
                  {item.unit && <span className="text-sm font-normal ml-1">{item.unit}</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
