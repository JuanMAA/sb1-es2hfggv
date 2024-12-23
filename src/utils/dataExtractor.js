import { SELECTORS } from '../config/constants.js';

export function extractAccommodationData(element) {
  return {
    name: extractText(element, SELECTORS.HEADING),
    rating: extractRating(element),
    address: extractAddress(element),
    price: extractPrice(element),
    website: extractWebsite(element),
    phone: extractPhone(element),
    type: determineAccommodationType(element),
    socialLinks: {
      facebook: {
        url: null,
        image: null
      },
      instagram: {
        url: null,
        image: null
      },
      tripadvisor: {
        url: null,
        image: null
      },
      booking: {
        url: null,
        image: null
      }
    },
    timestamp: new Date().toISOString()
  };
}