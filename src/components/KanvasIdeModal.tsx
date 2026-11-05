import { X, Award, Building2, Smartphone, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface KanvasIdeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function KanvasIdeModal({ isOpen, onClose }: KanvasIdeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-xs border-b border-slate-100">
          <div>
            <span className="text-xs font-semibold text-teal-700 tracking-wider uppercase">Kanvas Ide & Profil Inovasi</span>
            <h2 className="text-xl font-bold text-slate-900">PASYAR (Pasar Santri Syari'ah)</h2>
            <p className="text-xs text-slate-500">Karya Inovasi: Ahmad Qusairy (Bangka Belitung)</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-700">
          {/* Institutional Endorsement Bar */}
          <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl flex items-center gap-3">
            <Award className="w-8 h-8 text-teal-700 shrink-0" />
            <div>
              <p className="font-semibold text-teal-900">Didampingi & Didukung Oleh:</p>
              <p className="text-xs text-teal-800">
                Departemen Ekonomi dan Keuangan Syariah (DEKS) Bank Indonesia & Universitas Prasetiya Mulya
              </p>
            </div>
          </div>

          {/* Section 1: Latar Belakang */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-teal-600" />
              1. Latar Belakang Masalah & Kebutuhan
            </h3>
            <p className="leading-relaxed text-slate-600">
              Pesantren tidak hanya menjadi tempat pendidikan agama, tetapi juga memiliki potensi ekonomi melalui kreativitas santri, unit usaha pesantren, dan produk UMKM masyarakat sekitar. Namun, sebagian pelaku usaha masih mengandalkan penjualan langsung dan promosi jaringan terbatas. PASYAR hadir mempertemukan penjual dan pembeli secara digital dengan mengedepankan konsep ekosistem halal.
            </p>
          </div>

          {/* Section 2: Ide yang Diusulkan */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-teal-600" />
              2. Ide yang Diusulkan
            </h3>
            <p className="leading-relaxed text-slate-600">
              PASYAR merupakan marketplace digital sebagai pusat perdagangan produk santri, unit usaha pesantren, dan UMKM sekitar berupa makanan, minuman, kerajinan, fashion muslim, hingga produk pertanian. Dilengkapi katalog produk, informasi harga, pemesanan, dan pembayaran QRIS digital.
            </p>
          </div>

          {/* Section 3: Aspek Digital yang Diadaptasi */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              3. 5 Aspek Digital yang Diadaptasi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800 block">1. Marketplace Berbasis Website</span>
                <span className="text-xs text-slate-500">Tempat menampilkan dan menjual produk santri & UMKM.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800 block">2. Integrasi Pembayaran QRIS</span>
                <span className="text-xs text-slate-500">Mempermudah transaksi pembayaran digital non-tunai syariah.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800 block">3. WhatsApp Business</span>
                <span className="text-xs text-slate-500">Komunikasi personal dan akad antara penjual dengan pembeli.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80">
                <span className="font-semibold text-slate-800 block">4. Promosi Digital Media Sosial</span>
                <span className="text-xs text-slate-500">Instagram dan TikTok untuk mengenalkan produk pesantren.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 md:col-span-2">
                <span className="font-semibold text-slate-800 block">5. Dashboard Digital Penjual</span>
                <span className="text-xs text-slate-500">Membantu santri & pengurus memantau pesanan, performa penjualan, dan saldo usaha.</span>
              </div>
            </div>
          </div>

          {/* Section 4: Segmen Penerima Manfaat */}
          <div>
            <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-teal-600" />
              4. Segmen Penerima Manfaat
            </h3>
            <ul className="space-y-1.5 text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Santri:</strong> Pelaku usaha muda yang memasarkan hasil kreativitas dan melatih jiwa kewirausahaan.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Unit Usaha Pesantren:</strong> Sarana memperluas pemasaran produk dan kemandirian finansial pesantren.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>UMKM Sekitar:</strong> Kesempatan memperkenalkan produk lokal ke pasar yang lebih luas.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span><strong>Konsumen & Wali Santri:</strong> Membeli produk halal berkualitas dari pesantren dalam satu platform terpadu.</span>
              </li>
            </ul>
          </div>

          {/* Section 5: Logo Resmi PASYAR (Sesuai Halaman 3 Proposal) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Identitas Visual Resmi (Logo PASYAR)
            </span>
            <div className="bg-white p-4 rounded-xl border border-slate-200/80 inline-block shadow-xs">
              <img 
                src="/assets/aistudio/Pasyar_Islamic_Marketplace_Logo_862bfb5d.png" 
                alt="Logo Resmi PASYAR" 
                className="h-16 sm:h-20 w-auto object-contain mx-auto"
              />
            </div>
          </div>

          {/* Slogan Footer */}
          <div className="p-4 bg-slate-900 text-white rounded-xl text-center">
            <p className="text-xs tracking-wider uppercase text-teal-300">Visi & Slogan Utama</p>
            <p className="text-lg font-bold mt-1">"Dari Pesantren, Tumbuh untuk Umat."</p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex justify-end px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors"
          >
            Tutup & Mulai Eksplorasi
          </button>
        </div>
      </div>
    </div>
  );
}
