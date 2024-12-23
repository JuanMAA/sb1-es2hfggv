import {
  extractFacebookData,
  extractInstagramData,
  extractTripadvisorData,
  extractBookingData
} from '../utils/extractors/socialPlatformExtractor.js';

export class SocialMediaScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async initialize() {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new'
      });
      this.page = await this.browser.newPage();
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  async findSocialMediaLinks(businessName, location) {
    const socialData = {
      facebook: await extractFacebookData(this.page, businessName, location),
      instagram: await extractInstagramData(this.page, businessName),
      tripadvisor: await extractTripadvisorData(this.page, businessName, location),
      booking: await extractBookingData(this.page, businessName, location)
    };

    // Ensure null values for platforms where no data was found
    Object.keys(socialData).forEach(platform => {
      if (!socialData[platform]) {
        socialData[platform] = {
          url: null,
          image: null
        };
      }
    });

    return socialData;
  }
}