import { HomePage } from '@/types/acf';
import { BOOKING_URL } from '@/lib/constants';

export const homePage: HomePage = {
  title: 'Ilala Lodge Hotel | The Closest Hotel to Victoria Falls',
  slug: 'home',
  seo_title: 'Ilala Lodge Hotel | The Closest Hotel to Victoria Falls',
  seo_description:
    'Ilala Lodge Hotel is a family-run luxury hotel offering accommodation in the heart of Victoria Falls, Zimbabwe. Just an 8-minute walk from the Falls.',
  acf_blocks: [
    {
      acf_fc_layout: 'hero_section',
      hero_heading: 'The Closest Hotel to Victoria Falls',
      hero_subheading: 'The perfect location from which to explore Africa\'s adventure capital',
      hero_background_image: {
        url: '/images/banner-image.png',
        alt: 'Victoria Falls view from Ilala Lodge Hotel',
        width: 1920,
        height: 1080,
      },
      hero_cta: {
        label: 'Explore',
        url: '#about',
        target: '_self',
      },
      hero_scroll_label: 'Discover More',
    },
    {
      acf_fc_layout: 'intro_section',
      intro_eyebrow: 'Closest Hotel to the Falls',
      intro_heading: 'A family-run hotel that offers luxury and comfort in the heart of Victoria Falls',
      intro_body_copy:
        'Nestled in attractive gardens, the well-appointed hotel is a mere eight-minute walk from Victoria Falls, one of the Seven Natural Wonders of the World.',
      intro_cta: {
        label: 'Offers',
        url: '#about',
        target: '_self',
      },
      intro_image: {
        url: '/images/intr0-image.png',
        alt: 'Ilala Lodge Hotel gardens',
        width: 800,
        height: 600,
      },
    },
    {
      acf_fc_layout: 'stay_section',
      stay_eyebrow: 'Stay with us',
      stay_heading: 'At Ilala Lodge Hotel',
      stay_subheading: 'Choose from our selection of 67 beautifully appointed rooms',
      stay_rooms: [
        {
          room_name: 'Classic Rooms',
          room_count: 32,
          room_description:
            'The Twin Classic Rooms at Ilala Lodge Hotel are complete with two comfortable ¾ beds set within an expansive space, and an en-suite bathroom with a separate shower. The King Classic Rooms are ideal for couples, as they have one cosy king-size bed.',
          room_price_from: 'From $180',
          room_price_suffix: 'per night',
          room_image: {
            url: '/images/accommodation-classic.png',
            alt: 'Classic Room at Ilala Lodge Hotel',
            width: 600,
            height: 400,
          },
          room_cta: {
            label: 'Book Room',
            url: BOOKING_URL,
            target: '_blank',
          },
        },
        {
          room_name: 'Deluxe Rooms',
          room_count: 24,
          room_description:
            'Situated in the stylish West Wing, the Deluxe Rooms at Ilala Lodge Hotel ooze old-world charm and sophistication. All Deluxe rooms are complete with a private patio overlooking the hotel\'s lush gardens that merge with the wildlife National park.',
          room_price_from: 'From $240',
          room_price_suffix: 'per night',
          room_image: {
            url: '/images/Deluxe-Room-King-ILH--1500x1000.jpeg',
            alt: 'Deluxe Room at Ilala Lodge Hotel',
            width: 1500,
            height: 1000,
          },
          room_cta: {
            label: 'Book Room',
            url: BOOKING_URL,
            target: '_blank',
          },
        },
        {
          room_name: 'Classic Suites',
          room_count: 6,
          room_description:
            'Our Classic Suites offer spacious elegance with separate living areas, premium furnishings, and stunning views. Each suite features modern amenities while maintaining the timeless sophistication that defines Ilala Lodge.',
          room_price_from: 'From $320',
          room_price_suffix: 'per night',
          room_image: {
            url: '/images/Classic-Suite-ILH--1334x1000.jpg',
            alt: 'Classic Suite at Ilala Lodge Hotel',
            width: 1334,
            height: 1000,
          },
          room_cta: {
            label: 'Book Room',
            url: BOOKING_URL,
            target: '_blank',
          },
        },
        {
          room_name: 'Executive Suites',
          room_count: 4,
          room_description:
            'Experience elevated luxury in our Executive Suites. These expansive accommodations feature separate living areas, premium bathrooms, private balconies, and breathtaking views of the surrounding wilderness and gardens.',
          room_price_from: 'From $450',
          room_price_suffix: 'per night',
          room_image: {
            url: '/images/Executive-Suite-Bedroom-ILH-1500x1000.jpeg',
            alt: 'Executive Suite at Ilala Lodge Hotel',
            width: 1500,
            height: 1000,
          },
          room_cta: {
            label: 'Book Room',
            url: BOOKING_URL,
            target: '_blank',
          },
        },
        {
          room_name: 'Strathearn Suite',
          room_count: 1,
          room_description:
            'The crown jewel of Ilala Lodge, the Strathearn Suite offers unparalleled luxury and space. This exclusive suite features a master bedroom, spacious living area, luxurious bathroom, and private outdoor space with panoramic views.',
          room_price_from: 'From $650',
          room_price_suffix: 'per night',
          room_image: {
            url: '/images/Strathern-Suite-Bedroom.jpeg',
            alt: 'Strathearn Suite at Ilala Lodge Hotel',
            width: 1500,
            height: 1000,
          },
          room_cta: {
            label: 'Book Room',
            url: BOOKING_URL,
            target: '_blank',
          },
        },
      ],
    },
    {
      acf_fc_layout: 'dining_section',
      dining_eyebrow: 'Cassia Restaurant',
      dining_heading: 'Elevated Comfort Food',
      dining_subheading: '',
      dining_body_copy:
        'The Cassia Restaurant, located at Ilala Lodge Hotel, offers an unmatched menu and an extensive wine list featuring carefully selected wines from South Africa\'s top vineyards. The calming and tranquil ambience sets the stage for a truly unforgettable dining experience at one of the finest Victoria Falls restaurants, within earshot of the gentle rumble of Victoria Falls.',
      dining_cta: {
        label: 'Dining Options',
        url: '#dining',
        target: '_self',
      },
      dining_cta_secondary: {
        label: 'Book a table',
        url: BOOKING_URL,
        target: '_blank',
      },
      dining_images: [
        {
          url: '/images/dining-1.png',
          alt: 'Cassia Restaurant outdoor dining',
          width: 400,
          height: 300,
        },
        {
          url: '/images/dining-2.png',
          alt: 'Gourmet dish at Cassia Restaurant',
          width: 400,
          height: 300,
        },
        {
          url: '/images/dining-3.png',
          alt: 'Cassia Restaurant ambience',
          width: 400,
          height: 300,
        },
        {
          url: '/images/dining-4.png',
          alt: 'Fine dining experience',
          width: 400,
          height: 300,
        },
        {
          url: '/images/dining-5.png',
          alt: 'Restaurant setting',
          width: 400,
          height: 300,
        },
      ],
    },
    {
      acf_fc_layout: 'wildlife_section',
      wildlife_eyebrow: 'The Victoria Falls',
      wildlife_heading: 'Nature on Your Doorstep',
      wildlife_body_copy:
        'The Victoria Falls National Park borders the front of the property and, as such, wild animals often graze on the hotel lawns. Warthogs, in particular, are common visitors and they are sure to delight and entertain you. You might even be lucky enough to witness a herd of elephants feasting on the trees while you relax on your private balcony.',
      wildlife_cta: {
        label: 'Explore Wildlife',
        url: '#nature',
        target: '_self',
      },
      wildlife_images: [
        {
          url: '/images/wildlife-1.png',
          alt: 'Elephants at Ilala Lodge',
          width: 400,
          height: 300,
        },
        {
          url: '/images/wildlife-2.png',
          alt: 'Warthogs on hotel lawn',
          width: 400,
          height: 300,
        },
        {
          url: '/images/wildlife-3.png',
          alt: 'Victoria Falls National Park',
          width: 400,
          height: 300,
        },
        {
          url: '/images/wildlife-4.png',
          alt: 'Wildlife viewing',
          width: 400,
          height: 300,
        },
      ],
    },
    {
      acf_fc_layout: 'activities_section',
      activities_eyebrow: 'Plenty to do',
      activities_heading: 'Victoria Falls Activities',
      activities_items: [
        { activity_label: 'Helicopter Flights' },
        { activity_label: 'Bungee Jumping' },
        { activity_label: 'White Water Rafting' },
        { activity_label: 'Game Drives' },
        { activity_label: 'River Cruises' },
        { activity_label: 'Cultural Tours' },
        { activity_label: 'Gorge Swing' },
        { activity_label: 'Zip Lining' },
        { activity_label: 'Big Five Safari' },
        { activity_label: 'Chobe Day Trip' },
      ],
      activities_cta: {
        label: 'View All Activities',
        url: '#activities',
        target: '_self',
      },
    },
    {
      acf_fc_layout: 'reviews_section',
      reviews_eyebrow: 'Testimonials',
      reviews_heading: 'What Our Guests Say',
      reviews_items: [
        {
          review_title: 'Amazing Experience',
          review_body:
            'We had the most amazing stay at Ilala Lodge. The location is perfect, the staff are wonderful, and the food at Cassia Restaurant is exceptional. We will definitely be back!',
          review_author: 'Sarah & John M.',
          review_source: 'TripAdvisor',
        },
        {
          review_title: 'Perfect Location',
          review_body:
            'You cannot beat this location for Victoria Falls. Just a short walk to the falls, beautiful gardens, and we saw elephants right from our balcony. Truly unforgettable.',
          review_author: 'David R.',
          review_source: 'Google Reviews',
        },
        {
          review_title: 'Exceptional Service',
          review_body:
            'The level of service at Ilala Lodge is outstanding. Every member of staff went above and beyond to make our stay special. The attention to detail is remarkable.',
          review_author: 'Emma L.',
          review_source: 'Booking.com',
        },
        {
          review_title: 'Unforgettable Safari',
          review_body:
            'The game drives organized by the hotel were spectacular. We saw the Big Five and the guides were incredibly knowledgeable. Combined with the luxury accommodations, this was a dream trip.',
          review_author: 'Michael T.',
          review_source: 'TripAdvisor',
        },
        {
          review_title: 'Best Hotel in Victoria Falls',
          review_body:
            'After visiting several hotels in the area, Ilala Lodge stands out for its authentic African hospitality, prime location, and beautiful grounds. The proximity to the falls is unbeatable.',
          review_author: 'Jennifer & Mark S.',
          review_source: 'Expedia',
        },
        {
          review_title: 'Magical Atmosphere',
          review_body:
            'From the moment we arrived, we felt welcomed. The gardens are stunning, rooms are spacious and comfortable, and dining under the stars was a highlight of our African adventure.',
          review_author: 'Lisa H.',
          review_source: 'Google Reviews',
        },
        {
          review_title: 'Wildlife Paradise',
          review_body:
            'Waking up to elephants grazing outside our window was surreal. The staff made sure we had everything we needed, and the sunset cruise they arranged was breathtaking.',
          review_author: 'Robert & Anne K.',
          review_source: 'TripAdvisor',
        },
        {
          review_title: 'Luxury Meets Nature',
          review_body:
            'The perfect blend of luxury accommodation and raw African nature. The rooms are beautifully appointed, the restaurant serves excellent cuisine, and the location cannot be beaten.',
          review_author: 'James W.',
          review_source: 'Booking.com',
        },
        {
          review_title: 'Highly Recommended',
          review_body:
            'This was our first trip to Africa and Ilala Lodge exceeded all expectations. The staff were attentive without being intrusive, and they helped arrange all our activities. Cannot recommend enough!',
          review_author: 'Patricia D.',
          review_source: 'Google Reviews',
        },
      ],
    },
    {
      acf_fc_layout: 'cta_banner_section',
      cta_banner_heading: 'Ready to Experience Victoria Falls?',
      cta_banner_subheading: 'Book your stay at the closest hotel to the Falls',
      cta_banner_image: {
        url: '/images/pool.png',
        alt: 'Ilala Lodge Hotel pool area',
        width: 1200,
        height: 600,
      },
      cta_banner_cta: {
        label: 'BOOK NOW',
        url: BOOKING_URL,
        target: '_blank',
      },
    },
  ],
};
