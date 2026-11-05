import { X, Package, Clock, CheckCircle, Truck, ExternalLink } from 'lucide-react';
import { Order } from '../types';

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

export default function MyOrdersModal({ isOpen, onClose, orders }: MyOrdersModalProps) {
  if (!isOpen) return null;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pesanan Baru':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3" />
            <span>Pesanan Baru</span>
          </span>
        );
      case 'Diproses':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
            <Package className="w-3 h-3" />
            <span>Sedang Diproses Santri</span>
          </span>
        );
      case 'Dikirim':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
            <Truck className="w-3 h-3" />
            <span>Dalam Pengiriman</span>
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
            <CheckCircle className="w-3 h-3" />
            <span>Pesanan Selesai</span>
          </span>
        );
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-base font-bold text-slate-900">Riwayat Pesanan Saya</h2>
            <p className="text-xs text-slate-500">Pantau status pengiriman produk pesantren Anda</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Orders List */}
        <div className="p-6 space-y-4">
          {orders.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">Belum ada riwayat pesanan</p>
              <p className="text-xs text-slate-400 mt-1">
                Pesanan yang Anda buat akan muncul di sini secara real-time.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs">
                  <div>
                    <span className="font-mono font-bold text-slate-800">{order.id}</span>
                    <span className="text-slate-400 mx-1.5">·</span>
                    <span className="text-slate-500">{order.date}</span>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover bg-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {item.product.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {item.quantity} x {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(item.product.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-500">Toko: </span>
                    <span className="font-semibold text-teal-800">{order.pesantrenStore}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 mr-2">Total Belanja:</span>
                    <span className="font-bold text-slate-900 text-sm tabular-nums">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.total)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
