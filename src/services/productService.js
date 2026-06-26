import { supabase } from "@/lib/supabaseClient";

export const productService = {
  async getAll() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  async create({ name, description, price, stock }) {
    const { data, error } = await supabase
      .from("products")
      .insert([{ name, description, price, stock }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, { name, description, price, stock }) {
    const { data, error } = await supabase
      .from("products")
      .update({ name, description, price, stock })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },
};
