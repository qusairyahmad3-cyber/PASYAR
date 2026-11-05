import { useState } from 'react';
import { X, Star, ShoppingCart, MessageCircle, MapPin, ShieldCheck, Truck, Store, Minus, Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}: ProductDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice
    ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0,
      }).format(product.originalPrice)
    : null;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity);
    onClose();
  };

  // WhatsApp Business Direct Message link
  const waMessage = encodeURIComponent(
    `Assalamu'alaikum ${product.sellerName} (${product.pesantren}), saya tertarik dengan produk "${product.name}" di platform PASYAR. Apakah stok tersedia?`
  );
  const waUrl = `https://wa.me/${product.sellerWhatsapp}?text=${waMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 hover:bg-white rounded-full shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Left Column: Product Image & Trust Badges */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 w-full bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <img
                src={product.imageUrl}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {product.isHalalCertified && (
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Jaminan Halal & Thayyib</span>
                </div>
              )}
            </div>

            {/* Pesantren & Seller Card */}
            <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{product.pesantren}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {product.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp direct contact (PDF aspect: WhatsApp Business) */}
              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600">Santripreneur: <strong>{product.sellerName}</strong></span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Delivery Note */}
            <div className="p-3 bg-teal-50/60 border border-teal-100 rounded-lg flex items-center gap-2.5 text-xs text-teal-900">
              <Truck className="w-4 h-4 text-teal-700 shrink-0" />
              <span>Dapat dikirim via ekspedisi atau diambil langsung di pondok pesantren.</span>
            </div>
          </div>

          {/* Right Column: Product Info & Purchase Module */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">
                {product.category}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {product.name}
              </h2>
            </div>

            {/* Ratings & Sold */}
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 stroke-amber-400 mr-1" />
                <span className="font-bold text-slate-800 text-sm">{product.rating.toFixed(1)}</span>
              </div>
              <span>·</span>
              <span>{product.reviewCount} ulasan santri & pembeli</span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold">{product.soldCount} terjual</span>
            </div>

            {/* Price Box */}
            <div className="p-4 bg-slate-50 rounded-xl mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formattedOriginalPrice}
                  </span>
                )}
                <span className="text-xs text-slate-500 ml-auto">
                  Satuan: {product.unit}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tersedia stok: <strong className="text-slate-800">{product.stock} {product.unit}</strong>
              </p>
            </div>

            {/* Description */}
            <div className="mb-6 flex-1">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Deskripsi Produk
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-semibold text-slate-700">Jumlah Beli:</span>
              <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 text-sm font-bold text-slate-800 tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Subtotal: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(product.price * quantity)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-teal-700 text-teal-800 hover:bg-teal-50 font-semibold text-sm transition-all shadow-xs"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Tambah ke Keranjang</span>
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm transition-all shadow-sm"
              >
                <span>Beli Sekarang</span>
              </button>
            </div>

            {addedNotice && (
              <p className="text-xs text-emerald-700 font-medium text-center mt-2 animate-in fade-in">
                ✓ Berhasil ditambahkan ke keranjang belanja
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
