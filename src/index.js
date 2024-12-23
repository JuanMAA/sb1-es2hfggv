import { MapsScraper } from './services/mapsScraper.js';
import { AccommodationService } from './services/accommodationService.js';

async function main() {
  const location = process.argv[2];
  if (!location) {
    console.error('Please provide a location as an argument');
    process.exit(1);
  }

  const scraper = new MapsScraper();
  const accommodationService = new AccommodationService();

  try {
    console.log(`Starting to scrape accommodations in ${location}...`);
    
    await scraper.initialize();
    const accommodations = await scraper.searchAccommodations(location);
    console.log(`Found ${accommodations.length} accommodations`);

    const savedAccommodations = await accommodationService.saveAccommodations(accommodations);
    console.log(`Successfully saved ${savedAccommodations.length} accommodations to Supabase`);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await scraper.close();
  }
}

main();