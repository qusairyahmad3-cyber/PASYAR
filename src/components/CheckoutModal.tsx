import { useState, useEffect } from 'react';
import { X, CheckCircle, QrCode, Building, Truck, ShieldCheck, Copy, Check, MessageCircle } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderCompleted: (order: Order) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  items,
  onOrderCompleted,
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'qris' | 'success'>('details');
  const [buyerName, setBuyerName] = useState('Zacky Al-Faruq');
  const [buyerPhone, setBuyerPhone] = useState('081399887766');
  const [buyerAddress, setBuyerAddress] = useState('Jl. Ahmad Yani No. 45, Sungailiat, Bangka');
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');
  const [courier, setCourier] = useState('J&T Express Bangka');
  const [isCopied, setIsCopied] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Reset step on modal open
  useEffect(() => {
    if (isOpen) {
      setStep('details');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const isFreeShipping = subtotal >= 100000;
  const baseShippingFee = deliveryMethod === 'pickup' ? 0 : isFreeShipping ? 0 : 10000;
  const grandTotal = subtotal + baseShippingFee;

  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(subtotal);

  const formattedShipping = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(baseShippingFee);

  const formattedGrandTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(grandTotal);

  const handleProceedToQRIS = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('qris');
  };

  const handleSimulatePaymentSuccess = () => {
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      buyerName,
      buyerPhone,
      buyerAddress: deliveryMethod === 'pickup' ? 'Ambil di Pondok Pesantren' : buyerAddress,
      items: [...items],
      subtotal,
      shippingFee: baseShippingFee,
      deliveryMethod,
      courier: deliveryMethod === 'shipping' ? courier : undefined,
      total: grandTotal,
      status: 'Pesanan Baru',
      paymentMethod: 'QRIS',
      paymentStatus: 'Lunas',
      date: 'Baru saja',
      pesantrenStore: items[0]?.product.pesantren || 'Pondok Pesantren At-Toybah',
    };

    setCreatedOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div>
            <span className="text-[11px] font-semibold text-teal-700 tracking-wider uppercase">
              {step === 'details' && 'Langkah 1/2: Pengiriman & Pemesan'}
              {step === 'qris' && 'Langkah 2/2: Pembayaran QRIS Digital'}
              {step === 'success' && 'Transaksi Berhasil'}
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              {step === 'details' && 'Konfirmasi Pemesanan'}
              {step === 'qris' && 'Scan QRIS untuk Membayar'}
              {step === 'success' && 'Alhamdulillah, Pembayaran Berhasil!'}
            </h2>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* STEP 1: Details */}
        {step === 'details' && (
          <form onSubmit={handleProceedToQRIS} className="p-6 space-y-5">
            {/* Delivery Method Option */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Metode Penerimaan Produk
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    deliveryMethod === 'shipping'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-950 ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Truck className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Pengiriman Ekspedisi</p>
                    <p className="text-xs text-slate-500">Dikirim via J&T / SiCepat ke rumah</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('pickup')}
                  className={`p-3 rounded-xl border text-left flex items-start gap-3 transition-all ${
                    deliveryMethod === 'pickup'
                      ? 'border-teal-600 bg-teal-50/50 text-teal-950 ring-1 ring-teal-600'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <Building className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm">Ambil di Pesantren</p>
                    <p className="text-xs text-slate-500">Langsung di koperasi pondok (Gratis)</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Buyer Contact Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Pemesan *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
                  placeholder="Contoh: Zacky Al-Faruq"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
                  placeholder="081399887766"
                />
              </div>
            </div>

            {deliveryMethod === 'shipping' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Alamat Pengiriman Lengkap *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={buyerAddress}
                    onChange={(e) => setBuyerAddress(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden"
                    placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kabupaten"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pilihan Ekspedisi
                  </label>
                  <select
                    value={courier}
                    onChange={(e) => setCourier(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:border-teal-600 focus:outline-hidden bg-white"
                  >
                    <option value="J&T Express Bangka">J&T Express Bangka (1-2 hari)</option>
                    <option value="SiCepat Express">SiCepat Express (1-2 hari)</option>
                    <option value="Kurir Santri Lokal">Kurir Santri Lokal (Hari yang sama)</option>
                  </select>
                </div>
              </>
            )}

            {/* Order Summary Box */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} item)</span>
                <span className="font-semibold text-slate-800 tabular-nums">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Ongkos Kirim {isFreeShipping && '(Promo Gratis Ongkir)'}</span>
                <span className="font-semibold text-slate-800 tabular-nums">{formattedShipping}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Total Pembayaran QRIS:</span>
                <span className="text-teal-800 tabular-nums">{formattedGrandTotal}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              <span>Lanjut ke Pembayaran QRIS ({formattedGrandTotal})</span>
            </button>
          </form>
        )}

        {/* STEP 2: QRIS Payment Simulation */}
        {step === 'qris' && (
          <div className="p-6 flex flex-col items-center">
            {/* QRIS Header branding */}
            <div className="w-full max-w-sm bg-white border border-slate-300 rounded-2xl p-5 shadow-sm text-center">
              {/* QRIS Official Logo Style */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="text-left">
                  <span className="text-[13px] font-black tracking-tight text-red-600">QRIS</span>
                  <span className="text-[9px] block text-slate-500 -mt-1">STANDAR PEMBAYARAN NASIONAL</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-teal-800">PASYAR INDONESIA</span>
                  <span className="text-[9px] block text-slate-400">NMID: ID1020261105</span>
                </div>
              </div>

              {/* Merchant Title */}
              <div className="py-2 flex items-center justify-center gap-2">
                <img 
                  src="/assets/aistudio/Pasyar_Islamic_Marketplace_Logo_862bfb5d.png" 
                  alt="PASYAR" 
                  className="h-7 w-auto object-contain"
                />
                <div className="text-left">
                  <h3 className="font-bold text-slate-900 text-xs">
                    {items[0]?.product.pesantren || 'Pondok Pesantren At-Toybah'}
                  </h3>
                  <p className="text-[10px] text-slate-500">Unit Usaha Syariah Santri</p>
                </div>
              </div>

              {/* QR Code Graphic Box */}
              <div className="my-2 p-3 bg-white border border-slate-200 rounded-xl flex flex-col items-center justify-center shadow-inner">
                {/* SVG QR Code Simulation */}
                <div className="w-48 h-48 bg-slate-900 p-2 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
                    {/* Corner 1 */}
                    <rect x="5" y="5" width="28" height="28" fill="white" />
                    <rect x="9" y="9" width="20" height="20" fill="#0f172a" />
                    <rect x="13" y="13" width="12" height="12" fill="white" />
                    {/* Corner 2 */}
                    <rect x="67" y="5" width="28" height="28" fill="white" />
                    <rect x="71" y="9" width="20" height="20" fill="#0f172a" />
                    <rect x="75" y="13" width="12" height="12" fill="white" />
                    {/* Corner 3 */}
                    <rect x="5" y="67" width="28" height="28" fill="white" />
                    <rect x="9" y="71" width="20" height="20" fill="#0f172a" />
                    <rect x="13" y="75" width="12" height="12" fill="white" />
                    {/* Data Points */}
                    <rect x="38" y="10" width="8" height="8" fill="white" />
                    <rect x="50" y="10" width="8" height="8" fill="white" />
                    <rect x="38" y="24" width="6" height="6" fill="white" />
                    <rect x="48" y="24" width="10" height="6" fill="white" />
                    {/* Center Motif (Islamic Dome silhouette in QR center) */}
                    <rect x="40" y="40" width="20" height="20" rx="3" fill="#0d9488" />
                    <path d="M50 43 C46 48 44 52 44 55 C44 58 46 60 50 60 C54 60 56 58 56 55 C56 52 54 48 50 43Z" fill="white" />
                    {/* Bottom random blocks */}
                    <rect x="38" y="68" width="6" height="12" fill="white" />
                    <rect x="48" y="68" width="8" height="6" fill="white" />
                    <rect x="60" y="68" width="6" height="8" fill="white" />
                    <rect x="70" y="68" width="10" height="12" fill="white" />
                    <rect x="85" y="68" width="8" height="8" fill="white" />
                    <rect x="48" y="78" width="18" height="6" fill="white" />
                  </svg>
                </div>
                <span className="text-[10px] text-slate-500 mt-2 font-mono">
                  REF: PASYAR-QRIS-9921820
                </span>
              </div>

              {/* Nominal Highlight */}
              <div className="pt-2">
                <span className="text-xs text-slate-500">Total Nominal Pembayaran:</span>
                <p className="text-xl font-black text-slate-900 tabular-nums">
                  {formattedGrandTotal}
                </p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Bebas biaya admin perbankan
                </p>
              </div>
            </div>

            {/* Instruction & Simulation Trigger */}
            <div className="w-full max-w-sm mt-4 space-y-2">
              <button
                type="button"
                onClick={handleSimulatePaymentSuccess}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Simulasikan Pembayaran Berhasil</span>
              </button>

              <button
                type="button"
                onClick={() => setStep('details')}
                className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                ← Kembali ke Data Pengiriman
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Success Invoice */}
        {step === 'success' && createdOrder && (
          <div className="p-6 space-y-5 text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Pesanan Berhasil Dibuat & Terbayar!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kode Pesanan: <strong className="font-mono text-slate-800">{createdOrder.id}</strong>
              </p>
            </div>

            {/* Invoice Breakdown */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Penerima:</span>
                <span className="font-semibold text-slate-800">{createdOrder.buyerName} ({createdOrder.buyerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Metode Pengiriman:</span>
                <span className="font-semibold text-slate-800">
                  {createdOrder.deliveryMethod === 'pickup' ? 'Ambil di Pesantren' : `${createdOrder.courier}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status Pembayaran:</span>
                <span className="font-semibold text-emerald-700">Lunas via QRIS (Syariah)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold">
                <span>Total:</span>
                <span className="text-teal-800 tabular-nums">
                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(createdOrder.total)}
                </span>
              </div>
            </div>

            {/* WhatsApp Business Action (PDF core feature) */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <a
                href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Assalamu'alaikum Pengurus Pesantren At-Toybah, saya sudah melakukan pembayaran pesanan ${createdOrder.id} sebesar ${formattedGrandTotal} via QRIS di PASYAR. Mohon diproses.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Bukti ke WhatsApp Penjual</span>
              </a>

              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                Selesai & Tutup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
