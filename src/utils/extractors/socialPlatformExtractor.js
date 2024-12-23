import { extractSearchLink } from './googleSearchExtractor.js';
import { extractSocialMediaImage } from '../imageUtils.js';
import { validateSocialData } from '../validators/socialDataValidator.js';

export async function extractFacebookData(page, businessName, location) {
  try {
    const searchQuery = `${businessName} ${location} facebook page`;
    const facebookLink = await extractSearchLink(
      page, 
      searchQuery,
      (href) => href.includes('facebook.com') && !href.includes('facebook.com/share')
    );

    if (!facebookLink) return null;

    await page.goto(facebookLink);
    const image = await extractSocialMediaImage(page, 'facebook', 'meta[property="og:image"]');
    
    return validateSocialData({ url: facebookLink, image });
  } catch (error) {
    console.error(`Error extracting Facebook data: ${error.message}`);
    return null;
  }
}

export async function extractInstagramData(page, businessName) {
  try {
    const searchQuery = `${businessName} instagram`;
    const instagramLink = await extractSearchLink(
      page,
      searchQuery,
      (href) => href.includes('instagram.com') && !href.includes('tags')
    );

    if (!instagramLink) return null;

    await page.goto(instagramLink);
    const image = await extractSocialMediaImage(page, 'instagram', 'meta[property="og:image"]');
    
    return validateSocialData({ url: instagramLink, image });
  } catch (error) {
    console.error(`Error extracting Instagram data: ${error.message}`);
    return null;
  }
}

export async function extractTripadvisorData(page, businessName, location) {
  try {
    const searchQuery = `${businessName} ${location} tripadvisor`;
    const tripadvisorLink = await extractSearchLink(
      page,
      searchQuery,
      (href) => href.includes('tripadvisor') && 
        (href.includes('/Hotel_Review-') || href.includes('/Restaurant_Review-'))
    );

    if (!tripadvisorLink) return null;

    await page.goto(tripadvisorLink);
    const image = await extractSocialMediaImage(page, 'tripadvisor', 'meta[property="og:image"]');
    
    return validateSocialData({ url: tripadvisorLink, image });
  } catch (error) {
    console.error(`Error extracting Tripadvisor data: ${error.message}`);
    return null;
  }
}

export async function extractBookingData(page, businessName, location) {
  try {
    const searchQuery = `${businessName} ${location} booking.com`;
    const bookingLink = await extractSearchLink(
      page,
      searchQuery,
      (href) => href.includes('booking.com/hotel')
    );

    if (!bookingLink) return null;

    await page.goto(bookingLink);
    const image = await extractSocialMediaImage(page, 'booking', '.hotel_image_wrapper img');
    
    return validateSocialData({ url: bookingLink, image });
  } catch (error) {
    console.error(`Error extracting Booking.com data: ${error.message}`);
    return null;
  }
}