import { supabase } from "@/lib/supabaseClient";

export const profileService = {
  /**
   * Get all profiles (admin only — RLS will enforce this)
   */
  async getAll() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  /**
   * Update a profile's role, points, or tier (admin only)
   */
  async update(id, updates) {
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
