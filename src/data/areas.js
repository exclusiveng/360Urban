export const areas = [
  {
    name: 'Jabi',
    slug: 'jabi',
    description: 'A fast-growing district known for upscale residences, shopping centres, and proximity to the city centre. Popular with young professionals and families.',
    image: '/areas/jabi.jpg',
  },
  {
    name: 'Lugbe',
    slug: 'lugbe',
    description: 'One of Abuja\'s most affordable satellite towns with rapid development. Great for budget-conscious renters and first-time buyers.',
    image: '/areas/lugbe.jpg',
  },
  {
    name: 'Katampe',
    slug: 'katampe',
    description: 'A prestigious hill-top neighbourhood offering serenity, views, and high-end properties. Ideal for executives and diplomats.',
    image: '/areas/katampe.jpg',
  },
  {
    name: 'Maitama',
    slug: 'maitama',
    description: 'Abuja\'s premier district — home to embassies, luxury estates, and top-tier amenities. The gold standard of urban living.',
    image: '/areas/maitama.jpg',
  },
  {
    name: 'Gwarinpa',
    slug: 'gwarinpa',
    description: 'Africa\'s largest housing estate, known for residential comfort, family-friendly layouts, and vibrant community life.',
    image: '/areas/gwarinpa.jpg',
  },
  {
    name: 'Wuse',
    slug: 'wuse',
    description: 'A bustling commercial and residential hub at the heart of Abuja. Close to markets, offices, and nightlife.',
    image: '/areas/wuse.jpg',
  },
];

export function getAreaBySlug(slug) {
  return areas.find((a) => a.slug === slug);
}
