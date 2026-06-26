-- ============================================================
-- Migration 04: Seed Data
-- ============================================================

-- -----------------------------------------------------------
-- Seed: Sample Products (menu kuliner)
-- -----------------------------------------------------------
INSERT INTO public.products (name, description, price, stock) VALUES
  ('Nasi Goreng Spesial Sedap', 'Nasi goreng dengan telur, ayam suwir, dan kerupuk', 35000, 50),
  ('Mie Goreng Jawa Seafood', 'Mie goreng dengan udang, cumi, dan bakso ikan', 38000, 40),
  ('Ayam Bakar Madu Srimanganti', 'Ayam bakar dengan saus madu dan sambal terasi', 45000, 25),
  ('Bebek Goreng Kremes Crispy', 'Bebek goreng dengan kremes renyah dan sambal', 52000, 20),
  ('Sate Ayam Madura (10 Tusuk)', 'Sate ayam dengan bumbu kacang dan kecap', 30000, 60),
  ('Soto Betawi Daging Sapi', 'Soto betawi dengan daging sapi dan santan', 42000, 15),
  ('Sup Iga Sapi Garang Asam', 'Sup iga sapi dengan kuah asam pedas segar', 65000, 12),
  ('Gado-Gado Penggilingan', 'Gado-gado dengan sayuran segar dan bumbu kacang', 25000, 30),
  ('Rendang Daging Minang Asli', 'Rendang daging sapi khas Padang', 48000, 18),
  ('Gurame Asam Manis (Porsi Besar)', 'Gurame goreng dengan saus asam manis', 85000, 10),
  ('Es Teh Manis Jumbo', 'Es teh manis dengan gelas jumbo', 8000, 150),
  ('Es Jeruk Peras Murni', 'Es jeruk peras segar tanpa pengawet', 15000, 80),
  ('Jus Alpukat Kocok Legit', 'Jus alpukat dengan susu kocok', 18000, 45),
  ('Jus Mangga Thailand', 'Jus mangga Thailand segar', 20000, 40),
  ('Es Lychee Tea Segar', 'Lychee tea dengan es batu', 22000, 55),
  ('Kopi Susu Gula Aren Sedap', 'Kopi susu dengan gula aren asli', 19000, 70),
  ('Matcha Latte Ice Premium', 'Matcha latte dengan susu premium', 24000, 35),
  ('Es Cendol Durian Bandung', 'Es cendol dengan durian asli', 25000, 30),
  ('Es Campur Spesial Mess', 'Es campur dengan aneka topping', 23000, 40),
  ('Wedang Jahe Susu Hangat', 'Wedang jahe dengan susu hangat', 12000, 50),
  ('Pisang Goreng Keju Susu', 'Pisang goreng dengan keju dan susu coklat', 18000, 45),
  ('Roti Bakar Cokelat Lumer', 'Roti bakar dengan cokelat lumer', 20000, 35),
  ('Kentang Goreng French Fries', 'Kentang goreng crispy dengan saus', 15000, 65),
  ('Cireng Bumbu Rujak Pedas', 'Cireng dengan bumbu rujak pedas', 14000, 80),
  ('Singkong Goreng Garlic', 'Singkong goreng dengan garlic butter', 16000, 40),
  ('Pancake Vanilla Ice Cream', 'Pancake vanilla dengan ice cream', 28000, 20),
  ('Churros Saus Cokelat', 'Churros crispy dengan saus cokelat', 22000, 25),
  ('Klepon Gula Merah Melt', 'Klepon dengan gula merah meleleh', 15000, 50),
  ('Puding Mangga Vla Vanilla', 'Puding mangga dengan vla vanilla', 17000, 30),
  ('Salad Buah Saus Mayo Premium', 'Salad buah dengan saus mayo premium', 26000, 24)
ON CONFLICT (id) DO NOTHING;

-- -----------------------------------------------------------
-- Note: Cara Membuat Admin
-- Setelah registrasi user biasa via aplikasi, 
-- jalankan query berikut di Supabase SQL Editor:
--
-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE id = '<UUID_DARI_USER>';
-- -----------------------------------------------------------
