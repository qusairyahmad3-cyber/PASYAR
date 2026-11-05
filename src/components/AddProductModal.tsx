import { useState } from 'react';
import { X, Plus, Package, ShieldCheck } from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
  pesantrenName: string;
  sellerLocation: string;
}

const CATEGORIES: ProductCategory[] = [
  'Makanan & Minuman',
  'Fashion Muslim',
  'Kerajinan Tangan',
  'Buku & Alat Belajar',
  'Produk Pertanian',
  'Lainnya',
];

const PRESET_IMAGES = [
  { label: 'Camilan / Makanan', url: '/src/assets/images/pasyar_product_keripik_singkong_1793885510034.jpg' },
  { label: 'Minuman Herbal', url: '/src/assets/images/pasyar_product_teh_hijau_1793885510254.jpg' },
  { label: 'Kain / Sarung', url: '/src/assets/images/pasyar_product_sarung_tenun_1793885511251.jpg' },
  { label: 'Madu / Alami', url: '/src/assets/images/pasyar_product_madu_hutan_1793885510433.jpg' },
];

export default function AddProductModal({
  isOpen,
  onClose,
  onAddProduct,
  pesantrenName,
  sellerLocation,
}: AddProductModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Makanan & Minuman');
  const [price, setPrice] = useState<number>(15000);
  const [stock, setStock] = useState<number>(25);
  const [unit, setUnit] = useState('pack');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [isHalalCertified, setIsHalalCertified] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name,
      category,
      price: Number(price),
      rating: 5.0,
      soldCount: 0,
      reviewCount: 0,
      imageUrl,
      pesantren: pesantrenName,
      location: sellerLocation,
      sellerName: 'Santripreneur At-Toybah',
      sellerWhatsapp: '6281234567890',
      description: description || `Produk berkualitas karya mandiri santri dan UMKM mitra ${pesantrenName}.`,
      stock: Number(stock),
      isHalalCertified,
      unit,
      isActive: true,
    };

    onAddProduct(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <span className="text-[10px] font-bold text-teal-700 tracking-wider uppercase">Katalog Penjual</span>
            <h2 className="text-base font-bold text-slate-900">Tambah Produk Santri Baru</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nama Produk *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kopi Robusta Pangkalpinang"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Kategori *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Satuan Kemasan *
              </label>
              <input
                type="text"
                required
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="pack / pouch / botol / helai"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Harga Jual (Rp) *
              </label>
              <input
                type="number"
                required
                min={1000}
                step={500}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Jumlah Stok *
              </label>
              <input
                type="number"
                required
                min={1}
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Photo Preset Selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1.5">
              Pilih Foto Produk
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_IMAGES.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setImageUrl(img.url)}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    imageUrl === img.url
                      ? 'border-teal-600 ring-2 ring-teal-200'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <img src={img.url} alt={img.label} className="w-full h-14 object-cover" />
                  <p className="p-1 text-[9px] text-center truncate bg-slate-50">{img.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Deskripsi Produk
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan keunggulan, bahan baku, dan keunikan produk pesantren..."
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="halal-check"
              checked={isHalalCertified}
              onChange={(e) => setIsHalalCertified(e.target.checked)}
              className="w-4 h-4 text-teal-600 rounded-sm border-slate-300"
            />
            <label htmlFor="halal-check" className="text-xs text-slate-700 flex items-center gap-1 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Produk Halal & Diproses secara Thayyib sesuai Syariah</span>
            </label>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan & Tayangkan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
