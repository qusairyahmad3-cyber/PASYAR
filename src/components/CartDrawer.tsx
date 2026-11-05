import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 100000;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-teal-700" />
              <h2 className="text-base font-bold text-slate-900">Keranjang Belanja</h2>
              <span className="text-xs font-semibold px-2 py-0.5 bg-teal-50 text-teal-800 rounded-full">
                {items.length} item
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Banner Bar (from PDF Page 4: "Gratis Ongkir Minimal 100K") */}
          <div className="px-6 py-3 bg-teal-50/70 border-b border-teal-100 text-xs">
            <div className="flex items-center justify-between font-medium text-teal-900 mb-1.5">
              <span>
                {remainingForFreeShipping === 0
                  ? '🎉 Selamat! Anda berhak Gratis Ongkir!'
                  : `Tambah ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(remainingForFreeShipping)} lagi untuk Gratis Ongkir!`}
              </span>
              <span className="font-bold">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-teal-200/80 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-teal-700 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <ShoppingBag className="w-12 h-12 text-slate-300 mb-3" />
                <p className="font-semibold text-slate-700">Keranjang Anda masih kosong</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">
                  Ayo dukung ekonomi santri dan UMKM lokal dengan membeli produk halal pilihan di PASYAR!
                </p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-teal-700 text-white text-xs font-semibold rounded-lg hover:bg-teal-800 transition-colors"
                >
                  Mulai Belanja
                </button>
              </div>
            ) : (
              items.map((item) => {
                const itemTotal = item.product.price * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="flex gap-3 pb-4 border-b border-slate-100 last:border-b-0"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-teal-800 font-semibold truncate">
                        {item.product.pesantren}
                      </p>
                      <h4 className="text-sm font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-900 tabular-nums mt-0.5">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.product.price)}
                      </p>

                      {/* Stepper & Delete */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-md bg-slate-50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-l transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-slate-800 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-r transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                          title="Hapus produk"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Total Harga Produk:</span>
                <span className="font-extrabold text-slate-900 text-base tabular-nums">
                  {formattedSubtotal}
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transaksi syariah aman, berkah, & mendukung santri.</span>
              </div>

              <button
                type="button"
                onClick={onCheckout}
                className="w-full py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <span>Lanjut Checkout (QRIS)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
