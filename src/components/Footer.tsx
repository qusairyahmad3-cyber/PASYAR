import { Heart, Building2, MapPin, Mail, Phone, Award } from 'lucide-react';
import PasyarLogo from './PasyarLogo';

interface FooterProps {
  onOpenKanvasIde: () => void;
  onOpenSeller: () => void;
  onOpenConsumer: () => void;
}

export default function Footer({ onOpenKanvasIde, onOpenSeller, onOpenConsumer }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-3 md:col-span-1">
            <div className="bg-white p-2 rounded-xl inline-block">
              <PasyarLogo showTagline={false} />
            </div>
            <p className="text-slate-300 font-semibold text-sm">
              "Dari Pesantren, Tumbuh untuk Umat."
            </p>
            <p className="text-slate-400 leading-relaxed text-xs">
              Pusat marketplace digital produk santri, unit usaha pesantren, dan UMKM lokal berbasis syariah yang mandiri dan berkah.
            </p>
          </div>

          {/* Col 2: Inovator & Pendamping */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Inisiatif & Pendampingan</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <span className="text-slate-200 font-medium">Penggagas Inovasi:</span>
                <p className="text-slate-400">Ahmad Qusairy (Bangka Belitung)</p>
              </li>
              <li>
                <span className="text-slate-200 font-medium">Didampingi Oleh:</span>
                <p className="text-slate-400">DEKS Bank Indonesia</p>
                <p className="text-slate-400">Universitas Prasetiya Mulya</p>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenKanvasIde}
                  className="text-teal-400 hover:text-teal-300 font-semibold underline"
                >
                  Lihat Kanvas Ide & Profil Lengkap →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Ekosistem Syariah */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Navigasi Platform</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={onOpenConsumer} className="hover:text-white transition-colors">
                  Katalog Produk Santri
                </button>
              </li>
              <li>
                <button onClick={onOpenSeller} className="hover:text-white transition-colors">
                  Dashboard Penjual (Santripreneur)
                </button>
              </li>
              <li>
                <button onClick={onOpenKanvasIde} className="hover:text-white transition-colors">
                  Prinsip Transaksi Halal
                </button>
              </li>
              <li>
                <a 
                  href="https://wa.me/6281234567890?text=Assalamu%27alaikum%20Admin%20PASYAR"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Pusat Bantuan & Layanan
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Lokasi & Kontak */}
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm tracking-wide">Pusat Koordinasi</h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Balunijuk, Kec. Merawang, Kabupaten Bangka, Kepulauan Bangka Belitung</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+62 812-3456-7890 (WA Business)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>kontak@pasyar.id</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 PASYAR (Pasar Santri Syariah). Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1">
            <span>Diberdayakan untuk kemandirian ekonomi pesantren & umat</span>
            <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
