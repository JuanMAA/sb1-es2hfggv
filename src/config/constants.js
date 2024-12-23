export const ACCOMMODATION_TYPES = [
  'hotel',
  'hostel',
  'resort',
  'bed and breakfast',
  'vacation rental',
  'guesthouse'
];

export const TABLE_NAME = 'accommodations';

export const SELECTORS = {
  ARTICLE: 'div[role="article"]',
  HEADING: 'div[role="heading"]',
  RATING: 'span[role="img"]',
  FEED: 'div[role="feed"]',
  PRICE: '[aria-label*="Price:"]',
  WEBSITE: 'a[data-item-id*="authority"]',
  PHONE: '[data-item-id*="phone"]'
};

export const SOCIAL_PLATFORMS = {
  FACEBOOK: {
    name: 'facebook',
    imageSelector: 'meta[property="og:image"]'
  },
  INSTAGRAM: {
    name: 'instagram',
    imageSelector: 'meta[property="og:image"]'
  },
  TRIPADVISOR: {
    name: 'tripadvisor',
    imageSelector: 'meta[property="og:image"]'
  },
  BOOKING: {
    name: 'booking',
    imageSelector: '.hotel_image_wrapper img'
  }
};