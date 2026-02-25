# Ilala Lodge Hotel Website

A luxury hotel website built with Next.js 15, TypeScript, and Tailwind CSS for Ilala Lodge Hotel in Victoria Falls, Zimbabwe.

## Project Overview

This is the frontend website for **Ilala Lodge Hotel** - the closest hotel to Victoria Falls. The site is built with Next.js 15 (App Router) and is ready for future integration with WordPress as a headless CMS using ACF (Advanced Custom Fields) and WPGraphQL.

- **Repository**: `https://github.com/FocusOnlineTravel/client-ilalalodge.git`
- **Booking Engine**: `https://direct-book.com/ilalalodge`
- **Local Dev**: `http://localhost:3001`

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type-safe development |
| **Tailwind CSS 4** | Utility-first styling |
| **Lucide React** | Icon library |
| **next/image** | Optimized image loading |
| **next/font** | Custom font optimization |

## Brand Colors

From the Ilala Lodge Brand Guide:

```css
--brand-forest: #222715    /* Primary dark green/black */
--brand-greenery: #393127  /* Olive/greenish brown */
--brand-stem: #636449      /* Muted green */
--brand-daisy: #eaeadb     /* Cream/off-white */
--brand-gold: #d0a44f      /* Golden accent */
```

## Typography

- **Script Font**: Thesignature (for elegant script headings)
- **Serif Font**: Garamond (for headings and body text)

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage
│   └── globals.css         # Global styles and fonts
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Sticky navigation
│   │   └── Footer.tsx      # Site footer
│   └── sections/
│       ├── HeroSection.tsx
│       ├── IntroSection.tsx
│       ├── StaySection.tsx
│       ├── DiningSection.tsx
│       ├── WildlifeSection.tsx
│       ├── ReviewsSection.tsx
│       ├── ActivitiesSection.tsx
│       └── CtaBannerSection.tsx
├── data/
│   └── homepage.ts         # Static content (ACF-schema-ready)
├── types/
│   └── acf.ts              # TypeScript interfaces for ACF fields
├── lib/
│   └── constants.ts        # Booking URL and constants
└── public/
    ├── images/             # Design assets
    └── fonts/              # Custom fonts
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The site will be available at `http://localhost:3001` (or 3000 if available).

## Development

### Adding New Content

All content is stored in `/data/homepage.ts` following the ACF schema. To add or modify content:

1. Open `data/homepage.ts`
2. Edit the `acf_blocks` array
3. Each block follows its type definition from `types/acf.ts`

### Adding New Images

1. Add images to `/public/images/`
2. Reference them in the data file with `/images/your-image.png`

### Component Structure

Each section component receives its data via props:

```typescript
interface Props {
  data: SectionBlock; // From types/acf.ts
}
```

This structure makes the future WordPress integration seamless - just swap the data source from static imports to GraphQL queries.

## WordPress Integration (Future)

When connecting WordPress:

1. Install ACF Pro and create flexible content fields matching `types/acf.ts`
2. Install WPGraphQL and WPGraphQL for ACF
3. Replace `data/homepage.ts` imports with GraphQL queries
4. No component changes required - they already accept the correct prop types

Example future implementation:

```typescript
// Future: app/page.tsx
import { fetchHomePage } from '@/lib/wordpress';

export default async function HomePage() {
  const page = await fetchHomePage();

  return (
    <>
      {page.acf_blocks.map((block, index) => {
        switch (block.acf_fc_layout) {
          case 'hero_section': return <HeroSection key={index} data={block} />;
          // ... other cases
        }
      })}
    </>
  );
}
```

## Features

### Header
- Sticky navigation with scroll effects
- Transparent over hero, solid on scroll
- Mobile hamburger menu with full-screen overlay
- Book Now CTA links to booking engine

### Sections
- **Hero**: Full-viewport with background image and CTA
- **Intro**: Two-column layout with image
- **Stay**: Room cards with pricing and booking CTAs
- **Dining**: Asymmetric image grid with text
- **Wildlife**: 2×2 image grid
- **Reviews**: Carousel on mobile, grid on desktop
- **Activities**: Icon grid with 12 activities
- **CTA Banner**: Full-width banner with overlay

### Footer
- Quick links navigation
- Contact information
- Social media links
- Responsive grid layout

## Responsive Design

The site is fully responsive across breakpoints:
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1280px+
- Large: 1920px+

## SEO

- Comprehensive metadata in `app/layout.tsx`
- OpenGraph tags for social sharing
- Twitter card meta tags
- Semantic HTML structure
- Image alt text throughout

## Booking Integration

All booking CTAs link to:
```
https://direct-book.com/ilalalodge/properties/ilaladirect?locale=en&items[0][adults]=2&items[0][children]=0&items[0][infants]=0&currency=USD
```

## Performance

- Image optimization with `next/image`
- Font optimization with `next/font`
- Static generation for homepage
- Code splitting by route
- Tailwind CSS purging for minimal bundle size

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contact

For issues or questions about this website, contact Focus Online Travel.

## License

Proprietary - © 2026 Ilala Lodge Hotel. All rights reserved.
