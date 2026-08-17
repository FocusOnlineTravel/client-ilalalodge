import Link from 'next/link';
import { RateTableSection } from '@/types/sections';
import { BOOKING_URL } from '@/lib/constants';

interface Props {
  data: RateTableSection;
}

export default function RateTable({ data }: Props) {
  const bgClass = {
    light: 'bg-white',
    dark: 'bg-brand-forest',
    accent: 'bg-brand-daisy',
    forest: 'bg-brand-forest',
  }[data.section_theme];

  const textColorClass = data.section_theme === 'dark' || data.section_theme === 'forest' ? 'text-white' : 'text-brand-forest';
  const rawCurrency = data.currency || 'US$';
  const currencySymbol = rawCurrency === 'USD' ? 'US$' : rawCurrency;
  const formatPrice = (value: number | string | null | undefined) => {
    if (value === null || value === undefined || value === '') return '';
    return `${currencySymbol}${value}`;
  };

  // Flat layout: one room per category, no view/book links -> render as
  // "Room Type | Sharing | Single" table, matching the hardcoded style.
  const isFlatRoomTable =
    data.table_type !== 'simple' &&
    Array.isArray(data.rate_categories) &&
    data.rate_categories.length > 0 &&
    data.show_book_buttons === false &&
    data.rate_categories.every(
      (cat) =>
        Array.isArray(cat.rooms) &&
        cat.rooms.length === 1 &&
        !cat.rooms[0].view_link &&
        !cat.rooms[0].book_link,
    );

  if (isFlatRoomTable) {
    return (
      <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
        <div className="max-w-4xl mx-auto px-4">
          {data.heading && (
            <div className="text-center mb-12">
              <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass}`}>{data.heading}</h2>
            </div>
          )}

          <div className="bg-brand-daisy rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-forest text-white">
                    <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-sm">Room Type</th>
                    <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-sm">
                      Sharing<br />
                      <span className="font-normal text-xs normal-case opacity-80">(Per Person Per Night)</span>
                    </th>
                    <th className="px-6 py-4 text-center font-semibold uppercase tracking-wider text-sm">
                      Single<br />
                      <span className="font-normal text-xs normal-case opacity-80">(Per Person Per Night)</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.rate_categories!.map((cat, index) => {
                    const room = cat.rooms[0];
                    return (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-brand-daisy'}>
                        <td className="px-6 py-4 font-medium text-brand-forest">{cat.category_name}</td>
                        <td className="px-6 py-4 text-center text-brand-forest/80">
                          {formatPrice(room.sharing_price)}
                        </td>
                        <td className="px-6 py-4 text-center text-brand-forest/80">
                          {formatPrice(room.single_price)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Simple table (transfers, etc.)
  if (data.table_type === 'simple' && data.simple_rows) {
    return (
      <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
        <div className="max-w-5xl mx-auto px-4">
          {data.heading && (
            <div className="text-center mb-12">
              <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass}`}>{data.heading}</h2>
            </div>
          )}

          <div className="bg-white rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-forest text-white">
                    <th className="px-6 py-4 text-left font-semibold uppercase tracking-wider text-sm">Transfer</th>
                    <th className="px-6 py-4 text-right font-semibold uppercase tracking-wider text-sm">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {data.simple_rows.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-brand-daisy/50' : 'bg-white'}
                    >
                      <td className="px-6 py-4 text-brand-forest">{row.label}</td>
                      <td className="px-6 py-4 text-right text-brand-forest font-semibold whitespace-nowrap">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Room rates table
  return (
    <section className={`py-16 md:py-24 ${bgClass}`} id={data.anchor_id}>
      <div className="max-w-5xl mx-auto px-4">
        {data.heading && (
          <div className="text-center mb-12">
            <h2 className={`font-serif text-3xl md:text-4xl ${textColorClass}`}>{data.heading}</h2>
          </div>
        )}

        <div className="space-y-8">
          {data.rate_categories?.map((category, catIndex) => (
            <div key={catIndex} className="bg-brand-daisy rounded-lg overflow-hidden">
              {/* Category Header */}
              <div className="bg-brand-forest text-white px-6 py-4">
                <h3 className="font-serif text-xl md:text-2xl">{category.category_name}</h3>
              </div>

              {/* Rates Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-brand-stem/20">
                      <th className="px-6 py-3 text-left text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider">{currencySymbol}</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                      {data.show_book_buttons !== false && (
                        <th className="px-6 py-3 text-center text-sm font-semibold text-brand-forest uppercase tracking-wider"></th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {category.rooms.map((room, roomIndex) => (
                      <>
                        <tr key={`${roomIndex}-sharing`} className="border-b border-brand-stem/10">
                          <td className="px-6 py-4 text-brand-forest">Sharing per person per night</td>
                          <td className="px-6 py-4 text-center text-brand-forest font-semibold">{room.sharing_price}</td>
                          <td className="px-6 py-4 text-center">
                            {room.view_link && (
                              <Link
                                href={room.view_link.url}
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-stem/30 text-brand-forest hover:border-brand-forest hover:bg-white"
                              >
                                {room.view_link.title}
                              </Link>
                            )}
                          </td>
                          {data.show_book_buttons !== false && (
                            <td className="px-6 py-4 text-center">
                              <a
                                href={room.book_link?.url || BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                              >
                                Book Now
                              </a>
                            </td>
                          )}
                        </tr>
                        <tr key={`${roomIndex}-single`} className="border-b border-brand-stem/10 bg-white">
                          <td className="px-6 py-4 text-brand-forest">Single per person per night</td>
                          <td className="px-6 py-4 text-center text-brand-forest font-semibold">{room.single_price}</td>
                          <td className="px-6 py-4 text-center">
                            {room.view_link && (
                              <Link
                                href={room.view_link.url}
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 border border-brand-stem/30 text-brand-forest hover:border-brand-forest hover:bg-white"
                              >
                                {room.view_link.title}
                              </Link>
                            )}
                          </td>
                          {data.show_book_buttons !== false && (
                            <td className="px-6 py-4 text-center">
                              <a
                                href={room.book_link?.url || BOOKING_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 bg-brand-forest text-white hover:bg-brand-forest/90"
                              >
                                Book Now
                              </a>
                            </td>
                          )}
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
