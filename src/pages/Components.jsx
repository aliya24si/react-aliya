import PageHeader from "../components/PageHeader";

// 1. Basic Components
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";

// 2. Layout Components
import Container from "../components/Container";
import Footer from "../components/Footer";

// 3. Data Display Components
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";

// 4. Form Components
import InputField from "../components/InputField";

// 5. Feedback Components
import Alert from "../components/Alert";

// 6. Section Components
import HeroSection from "../components/HeroSection";

export default function Components() {
  // Data Dummy untuk Table Component (Poin 3)
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];
  const products = [
    { id: 1, name: "Laptop Asus", category: "Elektronik", price: "Rp 8.000.000" },
    { id: 2, name: "Sepatu Sport", category: "Fashion", price: "Rp 450.000" },
    { id: 3, name: "Jam Tangan", category: "Aksesoris", price: "Rp 799.000" },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Halaman */}
      <PageHeader title="Components" breadcrumb="Dashboard / Components" />

      {/* Pembungkus utama menggunakan Layout Component Container */}
      <Container className="mt-8 space-y-12">
        
        {/* ==========================================
            1. BASIC COMPONENT
           ========================================== */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            1. Basic Component
          </h2>
          
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Button Types</p>
              <div className="flex flex-wrap gap-3">
                <Button type="primary">Primary</Button>
                <Button type="secondary">Secondary</Button>
                <Button type="success">Simpan</Button>
                <Button type="danger">Hapus</Button>
                <Button type="warning">Warning</Button>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Badge Labels</p>
              <div className="flex flex-wrap gap-3">
                <Badge type="success">Aktif</Badge>
                <Badge type="warning">Pending</Badge>
                <Badge type="danger">Selesai</Badge>
                <Badge type="primary">Baru</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Avatars</p>
              <div className="flex gap-3">
                <Avatar name="Budi" />
                <Avatar name="Siti" />
                <Avatar name="Aliya" />
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. LAYOUT COMPONENT
           ========================================== */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
            2. Layout Component
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Seluruh konten di halaman ini dibungkus oleh komponen <b>&lt;Container&gt;&lt;/Container&gt;</b> sebagai batas margin luar halaman, dan ditutup dengan komponen <b>&lt;Footer /&gt;</b> di bagian paling bawah.
          </p>
          <div className="p-4 bg-gray-100 rounded-xl border border-dashed border-gray-400 text-center text-sm font-medium text-gray-500">
            [ Area di dalam Container Layout ]
          </div>
        </section>

        {/* ==========================================
            3. DATA DISPLAY COMPONENT
           ========================================== */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            3. Data Display Component
          </h2>

          <div className="space-y-8">
            {/* Sub-bagian Card & Product Card */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Card & Product Card</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <h2 className="text-xl font-bold text-gray-800">Judul Card</h2>
                  <p className="text-gray-600 mt-2">Ini adalah contoh struktur isi di dalam Base Card yang fleksibel.</p>
                </Card>

                <ProductCard
                  image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  title="Sepatu Sport"
                  category="Fashion"
                  price="Rp 450.000"
                  description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
                />

                <ProductCard
                  image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                  title="Smartphone"
                  category="Elektronik"
                  price="Rp 4.500.000"
                  description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
                />
              </div>
            </div>

            {/* Sub-bagian Tabel */}
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Table</p>
              <Table headers={headers}>
                {products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="border px-4 py-3 text-center text-gray-600">{index + 1}</td>
                    <td className="border px-4 py-3 font-medium text-gray-800">{product.name}</td>
                    <td className="border px-4 py-3 text-gray-600">{product.category}</td>
                    <td className="border px-4 py-3 font-semibold text-green-600">{product.price}</td>
                    <td className="border px-4 py-3 text-center">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors">
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. FORM COMPONENT
           ========================================== */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            4. Form Component
          </h2>
          <div className="max-w-xl space-y-4">
            <InputField label="Nama Lengkap" placeholder="Masukkan nama lengkap Anda..." />
            <InputField label="Email Admin" type="email" placeholder="contoh@sedap.com" />
            <InputField label="Password" type="password" placeholder="••••••••" />
          </div>
        </section>

        {/* ==========================================
            5. FEEDBACK COMPONENT
           ========================================== */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
            5. Feedback Component
          </h2>
          <div className="max-w-xl space-y-3">
            <Alert type="success">Berhasil! Data menu restoran telah diperbarui.</Alert>
            <Alert type="info">Informasi Sesi Anda akan berakhir dalam 15 menit.</Alert>
            <Alert type="warning">Peringatan Koneksi internet Anda tidak stabil.</Alert>
            <Alert type="danger">Error Gagal memuat data dari server!</Alert>
          </div>
        </section>

        {/* ==========================================
            6. SECTION COMPONENT
           ========================================== */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            6. Section Component
          </h2>
          <HeroSection 
            title="Selamat Datang di Sedap Playground!"
            subtitle="Ini adalah contoh Section Component berskala besar (Hero Section) yang biasanya digunakan untuk bagian utama atau landing page suatu website."
            buttonText="Pelajari Selengkapnya"
          />
        </section>

      </Container>

      {/* Footer sebagai penutup Layout Component */}
      <Footer />
    </div>
  );
}