-- ============================================================
-- Migration 03: Row Level Security (RLS) Policies
-- ============================================================

-- -----------------------------------------------------------
-- Helper function: Check if user has admin role
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

-- ============================================================
-- 1. RLS: profiles
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- SELECT: Users can see own profile; admins can see all
CREATE POLICY "profiles_select_own_or_admin"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_admin()
  );

-- Users can update their own profile (but cannot change role, points, or tier)
CREATE POLICY "profiles_update_self"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid())
    AND points = (SELECT p.points FROM public.profiles p WHERE p.id = auth.uid())
    AND tier = (SELECT p.tier FROM public.profiles p WHERE p.id = auth.uid())
  );

-- Admins can update any profile (including role, points, tier)
CREATE POLICY "profiles_update_admin"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- INSERT: Only admins can insert profiles manually
CREATE POLICY "profiles_insert_admin_only"
  ON public.profiles
  FOR INSERT
  WITH CHECK (public.is_admin());

-- DELETE: Only admins can delete profiles
CREATE POLICY "profiles_delete_admin_only"
  ON public.profiles
  FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 2. RLS: products
-- ============================================================
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- SELECT: Everyone (authenticated users) can view products
CREATE POLICY "products_select_all_authenticated"
  ON public.products
  FOR SELECT
  USING (auth.role() = 'authenticated');

-- INSERT: Only admins
CREATE POLICY "products_insert_admin_only"
  ON public.products
  FOR INSERT
  WITH CHECK (public.is_admin());

-- UPDATE: Only admins
CREATE POLICY "products_update_admin_only"
  ON public.products
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins
CREATE POLICY "products_delete_admin_only"
  ON public.products
  FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 3. RLS: orders
-- ============================================================
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- SELECT: Users see their own orders; admins see all
CREATE POLICY "orders_select_own_or_admin"
  ON public.orders
  FOR SELECT
  USING (
    customer_id = auth.uid()
    OR public.is_admin()
  );

-- INSERT: Authenticated users can create orders for themselves
CREATE POLICY "orders_insert_own"
  ON public.orders
  FOR INSERT
  WITH CHECK (
    customer_id = auth.uid()
    AND auth.role() = 'authenticated'
  );

-- UPDATE: Only admins can update order status
CREATE POLICY "orders_update_admin_only"
  ON public.orders
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins
CREATE POLICY "orders_delete_admin_only"
  ON public.orders
  FOR DELETE
  USING (public.is_admin());

-- ============================================================
-- 4. RLS: order_items
-- ============================================================
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- SELECT: Users see items from their own orders; admins see all
CREATE POLICY "order_items_select_own_or_admin"
  ON public.order_items
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND (orders.customer_id = auth.uid() OR public.is_admin())
    )
  );

-- INSERT: Authenticated users can add items to their own orders
CREATE POLICY "order_items_insert_own"
  ON public.order_items
  FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_items.order_id
      AND orders.customer_id = auth.uid()
    )
  );

-- UPDATE: Only admins
CREATE POLICY "order_items_update_admin_only"
  ON public.order_items
  FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- DELETE: Only admins
CREATE POLICY "order_items_delete_admin_only"
  ON public.order_items
  FOR DELETE
  USING (public.is_admin());
