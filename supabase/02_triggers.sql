-- ============================================================
-- Migration 02: Triggers & Functions
-- ============================================================

-- -----------------------------------------------------------
-- A. Auto-create profile when a new user signs up
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, points, tier)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'member',
    0,
    'Bronze'
  );
  RETURN NEW;
END;
$$;

-- Drop the trigger if it already exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------
-- B. Function: Add points when order is completed
-- Formula: 1 point per Rp 10.000 spent
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.add_points_on_order_completed()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
    UPDATE public.profiles
    SET points = points + FLOOR(NEW.total_amount / 10000)::INTEGER
    WHERE id = NEW.customer_id;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_order_completed ON public.orders;

CREATE TRIGGER on_order_completed
  AFTER INSERT OR UPDATE OF status ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.add_points_on_order_completed();

-- -----------------------------------------------------------
-- C. Function: Update tier based on points
-- Bronze: < 100 points
-- Silver: 100 - 499 points
-- Gold:   >= 500 points
-- -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.update_tier_based_on_points()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  IF NEW.points >= 500 THEN
    NEW.tier := 'Gold';
  ELSIF NEW.points >= 100 THEN
    NEW.tier := 'Silver';
  ELSE
    NEW.tier := 'Bronze';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_points_update ON public.profiles;

CREATE TRIGGER on_profile_points_update
  BEFORE UPDATE OF points ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_tier_based_on_points();
