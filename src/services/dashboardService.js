import { supabase } from "@/lib/supabaseClient";

export const dashboardService = {
  /**
   * Get order statistics
   */
  async getOrderStats() {
    const { data: orders, error } = await supabase
      .from("orders")
      .select("id, total_amount, status");
    if (error) throw error;

    const total = orders.length;
    const completed = orders.filter((o) => o.status === "completed").length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const revenue = orders
      .filter((o) => o.status === "completed")
      .reduce((sum, o) => sum + Number(o.total_amount), 0);

    return { total, completed, cancelled, revenue };
  },

  /**
   * Get recent orders with customer info
   */
  async getRecentOrders(limit = 5) {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        total_amount,
        status,
        created_at,
        customer:customer_id ( full_name )
      `)
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  /**
   * Get user profile with points and tier
   */
  async getUserProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, points, tier, role")
      .eq("id", userId)
      .single();
    if (error) throw error;
    return data;
  },
};
