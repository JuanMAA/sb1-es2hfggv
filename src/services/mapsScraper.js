import puppeteer from 'puppeteer';
import { ACCOMMODATION_TYPES, SELECTORS } from '../config/constants.js';
import { autoScroll } from '../utils/scrollHelper.js';
import { extractAccommodationData } from '../utils/dataExtractor.js';
import { SocialMediaScraper } from './socialMediaScraper.js';

export class MapsScraper {
  constructor() {
    this.browser = null;
    this.page = null;
    this.socialMediaScraper = new SocialMediaScraper();
  }

  async initialize() {
    this.browser = await puppeteer.launch({
      headless: 'new'
    });
    this.page = await this.browser.newPage();
    await this.socialMediaScraper.initialize();
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
    }
    await this.socialMediaScraper.close();
  }

  async searchAccommodations(location) {
    const allResults = [];
    
    for (const type of ACCOMMODATION_TYPES) {
      console.log(`Searching for ${type}s in ${location}...`);
      const results = await this.searchSingleType(location, type);
      
      // Enhance each result with social media links
      for (const result of results) {
        console.log(`Finding social media links for ${result.name}...`);
        const socialLinks = await this.socialMediaScraper.findSocialMediaLinks(result.name, location);
        result.socialLinks = socialLinks;
      }
      
      allResults.push(...results);
    }

    return allResults;
  }

  async searchSingleType(location, type) {
    const searchQuery = `${type}s in ${location}`;
    await this.page.goto(`https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`);
    
    await this.page.waitForSelector(SELECTORS.ARTICLE);
    await autoScroll(this.page);

    return this.page.evaluate((selectors) => {
      const items = document.querySelectorAll(selectors.ARTICLE);
      return Array.from(items).map(item => extractAccommodationData(item));
    }, SELECTORS);
  }
}