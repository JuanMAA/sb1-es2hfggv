import { supabase } from '../config/supabase.js';
import { TABLE_NAME } from '../config/constants.js';

export class AccommodationService {
  async saveAccommodations(accommodations) {
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert(accommodations)
      .select();

    if (error) {
      throw new Error(`Error saving accommodations: ${error.message}`);
    }

    return data;
  }

  async getAccommodations(filters = {}) {
    let query = supabase
      .from(TABLE_NAME)
      .select('*');

    if (filters.type) {
      query = query.eq('type', filters.type);
    }
    
    if (filters.minRating) {
      query = query.gte('rating', filters.minRating);
    }

    const { data, error } = await query.order('timestamp', { ascending: false });

    if (error) {
      throw new Error(`Error fetching accommodations: ${error.message}`);
    }

    return data;
  }

  async getAccommodationsByType(type) {
    return this.getAccommodations({ type });
  }

  async getHighlyRated(minRating = 4.5) {
    return this.getAccommodations({ minRating });
  }
}