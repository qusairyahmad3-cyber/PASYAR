import { useState } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  QrCode, 
  Heart, 
  Truck, 
  Building2, 
  Sparkles, 
  CheckCircle,
  TrendingUp,
  Award,
  Filter
} from 'lucide-react';
import { Product, ProductCategory } from '../types';
import ProductCard from './ProductCard';

interface ConsumerViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  searchQuery: string;
  onOpenKanvasIde: () => void;
}

const CATEGORIES: ProductCategory[] = [
  'Semua',
  'Makanan & Minuman',
  'Fashion Muslim',
  'Kerajinan Tangan',
  'Buku & Alat Belajar',
  'Produk Pertanian',
];

export default function ConsumerView({
  products,
  onSelectProduct,
  onAddToCart,
  searchQuery,
  onOpenKanvasIde,
}: ConsumerViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('Semua');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  // Filter products by category, search query, and active status
  const filteredProducts = products.filter((product) => {
    if (product.isActive === false) return false;
    const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.pesantren.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.soldCount - a.soldCount;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Hero & Promo Section (Page 4 Mockup Structure) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Hero Card (8 cols) */}
          <div className="lg:col-span-8 relative rounded-2xl overflow-hidden bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white min-h-[380px] sm:min-h-[420px] flex flex-col justify-end p-6 sm:p-10 shadow-lg border border-teal-700/50">
            {/* Background Image with Contrast Scrim */}
            <img
              src="/src/assets/images/pasyar_hero_santri_market_1793885508689.jpg"
              alt="Santri berwirausaha di pasar digital PASYAR"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center opacity-45 mix-blend-luminosity scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-teal-950/60 to-transparent" />

            {/* Hero Content */}
            <div className="relative z-10 max-w-xl space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-200 text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                <span>Marketplace Syariah Produk Santri & UMKM</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight text-balance">
                Dari Pesantren, <br className="hidden sm:inline" />
                <span className="text-teal-300">Tumbuh untuk Umat.</span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-lg">
                Belanja produk santri, unit usaha pesantren, dan UMKM lokal secara mandiri. Transaksi aman, higienis, halal, dan penuh berkah.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('katalog-produk');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center gap-2 group"
                >
                  <span>Belanja Sekarang</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onOpenKanvasIde}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-xl border border-white/20 backdrop-blur-xs transition-colors flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-teal-300" />
                  <span>Program Binaan BI</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side Promo Card & Benefit List (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            
            {/* Promo Voucher Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-200 block">
                  Promo Spesial
                </span>
                <h3 className="text-base font-bold mt-1">
                  Gratis Ongkir untuk Pembelian Minimal Rp 100K
                </h3>
                <p className="text-xs text-emerald-100 mt-1">
                  Mendukung pengiriman ke seluruh wilayah Bangka Belitung & Nasional.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-500/40 flex items-center justify-between text-xs font-semibold">
                <span>Ekonomi Pesantren Lebih Maju!</span>
                <span className="text-emerald-100">Gunakan QRIS →</span>
              </div>
            </div>

            {/* "Kenapa Belanja di PASYAR?" (Page 4 Exact Card) */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex-1 flex flex-col justify-center">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-700" />
                <span>Kenapa Belanja di PASYAR?</span>
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">Produk Halal & Berkualitas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">Transaksi Aman dengan QRIS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">Dukung Kemandirian Santri</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                  <span className="font-medium">Pengiriman Cepat & Ambil Langsung</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 text-center">
                <span className="text-[11px] font-semibold text-teal-800">
                  "Belanja Mudah, Berkah Berlimpah"
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Segmented Controls / Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 flex-wrap pb-2 border-b border-slate-200">
          
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === category
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-slate-600 shrink-0 ml-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Urutkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-800 font-medium focus:outline-hidden focus:border-teal-600"
            >
              <option value="popular">Paling Banyak Terjual</option>
              <option value="rating">Rating Tertinggi</option>
              <option value="price-asc">Harga: Terendah ke Tertinggi</option>
              <option value="price-desc">Harga: Tertinggi ke Terendah</option>
            </select>
          </div>

        </div>
      </section>

      {/* Product Catalog Grid */}
      <section id="katalog-produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {selectedCategory === 'Semua' ? 'Produk Pilihan Santri & UMKM' : selectedCategory}
            </h2>
            <p className="text-xs text-slate-500">
              Menampilkan {sortedProducts.length} produk asli binaan pesantren & UMKM
            </p>
          </div>
          {searchQuery && (
            <span className="text-xs text-slate-500">
              Kata kunci: <strong className="text-slate-800">"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {sortedProducts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-700">Tidak ada produk ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci lain atau pilih kategori lain.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={(prod, e) => {
                  e.stopPropagation();
                  onAddToCart(prod, e);
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Pesantren Stores (Toko Pilihan) */}
      <section id="section-toko-pilihan" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Toko Pesantren Pilihan</h2>
            <p className="text-xs text-slate-500">Unit usaha mandiri pesantren terdaftar dan terverifikasi</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Store 1 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 transition-all shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-base shrink-0">
              AT
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-900 truncate">Ponpes At-Toybah</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm shrink-0">Terverifikasi</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Balunijuk, Merawang, Bangka</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <span>⭐ 4.9 (104 ulasan)</span>
                <span>·</span>
                <span>4 Produk</span>
              </div>
            </div>
          </div>

          {/* Store 2 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 transition-all shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-700 text-white flex items-center justify-center font-bold text-base shrink-0">
              AH
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-900 truncate">Ponpes Al-Hikmah</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm shrink-0">Terverifikasi</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Merawang, Bangka Belitung</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <span>⭐ 4.9 (88 ulasan)</span>
                <span>·</span>
                <span>Madu & Herbal</span>
              </div>
            </div>
          </div>

          {/* Store 3 */}
          <div className="p-5 bg-white rounded-xl border border-slate-200 hover:border-teal-400 transition-all shadow-xs flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center font-bold text-base shrink-0">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm text-slate-900 truncate">Ponpes Al-Mu'min</h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-sm shrink-0">Terverifikasi</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Bangka Barat</p>
              <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
                <span>⭐ 4.7 (154 ulasan)</span>
                <span>·</span>
                <span>Kerajinan Santri</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Partnership Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-800 text-teal-200 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-300 tracking-wider uppercase">Inovasi Ekonomi Pesantren</span>
              <h3 className="text-base font-bold text-white">Pendampingan DEKS Bank Indonesia & Universitas Prasetiya Mulya</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Mengintegrasikan produk santri, pembayaran digital QRIS, dan rantai pasok halal berkelanjutan.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenKanvasIde}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-600 text-white text-xs font-bold rounded-lg transition-colors shrink-0 whitespace-nowrap"
          >
            Baca Selengkapnya
          </button>
        </div>
      </section>

    </div>
  );
}
