import { supabase } from '../config/supabase.js';

export class TouristService {
  async saveTouristPlaces(places) {
    const { data, error } = await supabase
      .from('tourist_places')
      .insert(places)
      .select();

    if (error) {
      throw new Error(`Error saving tourist places: ${error.message}`);
    }

    return data;
  }

  async getTouristPlaces() {
    const { data, error } = await supabase
      .from('tourist_places')
      .select('*')
      .order('timestamp', { ascending: false });

    if (error) {
      throw new Error(`Error fetching tourist places: ${error.message}`);
    }

    return data;
  }
}