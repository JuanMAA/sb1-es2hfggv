# Tourist Accommodations Scraper

This service scrapes accommodation information (hotels, hostels, resorts, etc.) from Google Maps and various social platforms, storing it in a Supabase database.

## Setup

1. Create a Supabase project and create a table named `accommodations` with the following columns:
   - id (int8, primary key)
   - name (text)
   - type (text)
   - rating (float8)
   - price (text)
   - address (text)
   - website (text)
   - phone (text)
   - social_links (jsonb)
   - timestamp (timestamptz)

2. Copy your Supabase URL and anon key from your project settings

3. Create a `.env` file with your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_anon_key
   ```

4. Install dependencies:
   ```
   npm install
   ```

## Usage

Run the scraper with a location:
```
node src/index.js "Barcelona, Spain"
```

The script will:
1. Search for different types of accommodations (hotels, hostels, resorts, etc.)
2. Scrape detailed information including:
   - Name
   - Type of accommodation
   - Rating
   - Price (if available)
   - Address
   - Website
   - Phone number
3. Find social media and booking platform links:
   - Facebook page
   - Instagram profile
   - TripAdvisor listing
   - Booking.com page
4. Save all data to your Supabase database