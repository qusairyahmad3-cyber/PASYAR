import { useState } from 'react';
import { 
  Plus, 
  Wallet, 
  ArrowUpRight, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  Star, 
  CheckCircle, 
  Clock, 
  Truck, 
  ExternalLink, 
  Store,
  ChevronRight,
  Package,
  Megaphone,
  Share2,
  Check
} from 'lucide-react';
import { Product, Order, SellerProfile } from '../types';
import { SALES_PERFORMANCE_DATA } from '../data/mockData';
import AddProductModal from './AddProductModal';
import WithdrawModal from './WithdrawModal';

interface SellerDashboardProps {
  sellerProfile: SellerProfile;
  products: Product[];
  orders: Order[];
  onAddProduct: (product: Product) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onToggleProductActive: (productId: string) => void;
  onWithdrawSuccess: (amount: number) => void;
}

export default function SellerDashboard({
  sellerProfile,
  products,
  orders,
  onAddProduct,
  onUpdateOrderStatus,
  onToggleProductActive,
  onWithdrawSuccess,
}: SellerDashboardProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [promoNotice, setPromoNotice] = useState(false);
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'pesanan' | 'produk'>('ringkasan');

  // Filter products for this pesantren seller
  const sellerProducts = products.filter(
    (p) => p.pesantren === sellerProfile.pesantrenName || p.pesantren.includes('At-Toybah')
  );

  const formattedBalance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(sellerProfile.balance);

  const formattedRevenue = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(sellerProfile.totalRevenue);

  const handleSharePromo = () => {
    navigator.clipboard?.writeText(window.location.href);
    setPromoNotice(true);
    setTimeout(() => setPromoNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Greeting Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <span className="text-xs font-semibold text-teal-800">Assalamu'alaikum, Seller!</span>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Semangat berkarya dan berdagang di PASYAR.
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola penjualan produk santri, pesanan, dan keuangan usaha pondok pesantren Anda.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Produk</span>
          </button>
        </div>
      </div>

      {/* Main Seller Identity & Balance Hero Card (Page 4 Design) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Store Profile Box */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white shadow-sm flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-teal-600/60 border border-teal-400/40 flex items-center justify-center font-bold text-lg text-white">
                  AT
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base sm:text-lg font-bold text-white">
                      {sellerProfile.storeName}
                    </h2>
                    <span className="text-[10px] font-semibold bg-emerald-500/30 border border-emerald-400/50 text-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-300" />
                      Penjual Terverifikasi
                    </span>
                  </div>
                  <p className="text-xs text-teal-200 mt-0.5">
                    📍 {sellerProfile.location} · Pembinaan Syariah
                  </p>
                </div>
              </div>

              {/* Tagline Badge */}
              <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-xs font-semibold text-teal-200 italic">
                "Berkah Usaha, Maju Bersama"
              </div>
            </div>

            <p className="text-xs text-teal-100/90 mt-4 max-w-lg leading-relaxed">
              Mewujudkan kemandirian ekonomi pesantren melalui hilirisasi produk santri dan UMKM masyarakat sekitar Balunijuk, Merawang, Bangka.
            </p>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-teal-700/60 flex items-center justify-between text-xs text-teal-200">
            <span>Didampingi: DEKS Bank Indonesia & Univ. Prasetiya Mulya</span>
            <span className="font-semibold text-white">PASYAR Ecosystem</span>
          </div>
        </div>

        {/* Balance & Payout Box */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Saldo Penjualan Anda</span>
              <Wallet className="w-4 h-4 text-teal-700" />
            </div>
            <p className="text-2xl font-black text-slate-900 tabular-nums">
              {formattedBalance}
            </p>
            <p className="text-xs text-emerald-700 font-medium mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Siap dicairkan ke Rekening Syariah
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
            <button
              onClick={() => setIsWithdrawModalOpen(true)}
              className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-2"
            >
              <span>Tarik Saldo ke Rekening</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Mendukung BSI, Muamalat, BCA Syariah tanpa potongan riba.
            </p>
          </div>
        </div>

      </div>

      {/* 4 Stats Cards (Page 4 Exact Figures) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Pesanan */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Pesanan</span>
            <ShoppingBag className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {sellerProfile.totalOrders}
            </span>
            <span className="text-xs font-bold text-emerald-700">+12%</span>
          </div>
          <span className="text-[11px] text-slate-400">Bulan ini</span>
        </div>

        {/* Card 2: Total Pembeli */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Pembeli</span>
            <Users className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {sellerProfile.totalBuyers}
            </span>
            <span className="text-xs font-bold text-emerald-700">+18%</span>
          </div>
          <span className="text-[11px] text-slate-400">Santri & Masyarakat</span>
        </div>

        {/* Card 3: Total Pendapatan */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Total Pendapatan</span>
            <TrendingUp className="w-4 h-4 text-teal-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-black text-slate-900 tabular-nums">
              {formattedRevenue}
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Omzet akumulasi</span>
        </div>

        {/* Card 4: Rating Toko */}
        <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-semibold">Rating Toko</span>
            <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tabular-nums">
              {sellerProfile.rating.toFixed(1)}
            </span>
            <span className="text-xs text-slate-500">({sellerProfile.totalReviews} ulasan)</span>
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">Sangat Memuaskan</span>
        </div>

      </div>

      {/* Two Columns: Recent Orders & Sales Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Pesanan Terbaru (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Pesanan Terbaru</h3>
                <p className="text-xs text-slate-500">Kelola dan update proses pesanan pembeli</p>
              </div>
              <span className="text-xs font-semibold text-teal-800">
                {orders.length} Pesanan Aktif
              </span>
            </div>

            <div className="space-y-3">
              {orders.slice(0, 4).map((order) => {
                const firstItem = order.items[0];
                return (
                  <div
                    key={order.id}
                    className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 transition-colors flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 truncate">
                          {firstItem?.product.name || 'Produk Santri'}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-500">{order.buyerName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 mt-1">
                        <span className="tabular-nums">
                          {order.items.reduce((acc, i) => acc + i.quantity, 0)} pcs
                        </span>
                        <span>·</span>
                        <span className="font-bold text-slate-800 tabular-nums">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.total)}
                        </span>
                        <span>·</span>
                        <span className="text-[11px] text-slate-400">{order.date}</span>
                      </div>
                    </div>

                    {/* Status & Action */}
                    <div className="flex items-center gap-2 shrink-0">
                      {order.status === 'Pesanan Baru' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Diproses')}
                          className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Proses
                        </button>
                      )}
                      {order.status === 'Diproses' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Dikirim')}
                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Kirim
                        </button>
                      )}
                      {order.status === 'Dikirim' && (
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'Selesai')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-[11px] transition-colors"
                        >
                          Selesaikan
                        </button>
                      )}
                      {order.status === 'Selesai' && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          ✓ Selesai
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Transaksi terhubung dengan notifikasi WhatsApp penjual & QRIS</span>
            <span className="text-teal-700 font-semibold cursor-pointer hover:underline">
              Semua Pesanan →
            </span>
          </div>
        </div>

        {/* Right Column: Performa Penjualan & Promosi (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          
          {/* Sales Performance Chart (Page 4 Exact Card) */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-bold text-slate-900">Performa Penjualan</h3>
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  7 Hari Terakhir
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                  Rp 1.250.000
                </span>
                <span className="text-xs text-emerald-700 font-semibold">↑ +14.2%</span>
              </div>

              {/* Bar Chart Representation */}
              <div className="flex items-end justify-between gap-2 h-28 pt-4 border-b border-slate-100">
                {SALES_PERFORMANCE_DATA.map((d) => {
                  const maxSale = 380000;
                  const heightPercent = Math.round((d.sales / maxSale) * 100);
                  return (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="w-full bg-slate-100 hover:bg-teal-100 rounded-t-sm flex items-end h-20 transition-all">
                        <div
                          className="w-full bg-teal-600 group-hover:bg-teal-700 rounded-t-sm transition-all"
                          style={{ height: `${heightPercent}%` }}
                          title={`${d.day}: Rp ${d.sales.toLocaleString('id-ID')} (${d.orders} pesanan)`}
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-medium">{d.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-3 text-center">
              Penjualan puncak tercatat pada hari Minggu & Jumat
            </p>
          </div>

          {/* Promotion Card (Page 4 Bottom Right Card) */}
          <div className="p-5 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/70 rounded-2xl flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs">
                <Megaphone className="w-4 h-4 text-teal-600" />
                <span>Promosikan Toko Anda!</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 max-w-xs">
                Tingkatkan penjualan dengan menyebarkan tautan produk santri ke wali santri, media sosial, dan grup pengajian.
              </p>
            </div>
            <button
              onClick={handleSharePromo}
              className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs shrink-0 flex items-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Bagikan</span>
            </button>
          </div>

          {promoNotice && (
            <p className="text-xs text-emerald-700 font-medium text-center bg-emerald-50 py-1.5 rounded-lg border border-emerald-200 animate-in fade-in">
              ✓ Tautan toko disalin ke clipboard! Bagikan ke WhatsApp atau media sosial.
            </p>
          )}

        </div>
      </div>

      {/* Product Management Section (Page 4 "Produk Anda") */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Produk Anda di Katalog PASYAR</h3>
            <p className="text-xs text-slate-500">Pantau stok, ubah status aktif/nonaktif produk pondok</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sellerProducts.map((prod) => (
            <div
              key={prod.id}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-white transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 w-full rounded-lg overflow-hidden mb-2 bg-slate-100">
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => onToggleProductActive(prod.id)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors ${
                        prod.isActive !== false
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-400 text-white'
                      }`}
                    >
                      {prod.isActive !== false ? 'Aktif' : 'Nonaktif'}
                    </button>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 truncate">{prod.name}</h4>
                <p className="text-xs font-extrabold text-teal-800 tabular-nums mt-0.5">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(prod.price)}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Stok: <strong className="text-slate-800">{prod.stock} {prod.unit}</strong>
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{prod.soldCount} Terjual</span>
                <span className="text-teal-700 font-medium">⭐ {prod.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProduct={onAddProduct}
        pesantrenName={sellerProfile.pesantrenName}
        sellerLocation={sellerProfile.location}
      />

      {/* Withdraw Balance Modal */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        balance={sellerProfile.balance}
        onWithdrawSuccess={onWithdrawSuccess}
      />

    </div>
  );
}
