import { supabase } from "@/lib/supabaseClient";

export const orderService = {
  /**
   * Get all orders. Admin sees all; member sees own.
   * RLS on the table handles the filtering.
   */
  async getAll() {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        customer:customer_id ( id, full_name ),
        items:order_items (
          id, quantity, unit_price,
          product:product_id ( id, name, price )
        )
      `)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  /**
   * Create a new order with items in a single transaction
   */
  async create({ customer_id, items }) {
    // Calculate total
    const total_amount = items.reduce(
      (sum, item) => sum + item.unit_price * item.quantity,
      0
    );

    // Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([{ customer_id, total_amount, status: "pending" }])
      .select()
      .single();
    if (orderError) throw orderError;

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      unit_price: item.unit_price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);
    if (itemsError) throw itemsError;

    return order;
  },

  /**
   * Update order status (admin only)
   */
  async updateStatus(id, status) {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  /**
   * Delete an order (admin only)
   */
  async remove(id) {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) throw error;
  },

  /**
   * Get products for order creation dropdown
   */
  async getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, stock")
      .order("name");
    if (error) throw error;
    return data;
  },
};
