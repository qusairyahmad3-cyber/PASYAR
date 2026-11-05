import { ShoppingBag, Store, User, BookOpen, Search, Menu, X } from 'lucide-react';
import PasyarLogo from './PasyarLogo';
import { useState } from 'react';

interface HeaderProps {
  currentView: 'consumer' | 'seller';
  onViewChange: (view: 'consumer' | 'seller') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenKanvasIde: () => void;
  onOpenOrders: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  currentView,
  onViewChange,
  cartCount,
  onOpenCart,
  onOpenKanvasIde,
  onOpenOrders,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 md:gap-8 h-18">
          
          {/* Zone 1: Brand Wordmark */}
          <div className="shrink-0 flex items-center gap-3">
            <PasyarLogo onClick={() => onViewChange('consumer')} />
          </div>

          {/* Desktop Search Bar (Mid section in consumer mode) */}
          {currentView === 'consumer' && (
            <div className="hidden lg:flex flex-1 max-w-md mx-2">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari produk santri favoritmu di PASYAR..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-transparent focus:border-teal-500 rounded-full transition-all outline-hidden text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>
          )}

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 shrink-0">
            <button
              onClick={() => onViewChange('consumer')}
              className={`hover:text-teal-700 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'consumer' ? 'text-teal-700 font-semibold' : ''
              }`}
            >
              Belanja Produk
            </button>
            <button
              onClick={() => {
                onViewChange('consumer');
                const el = document.getElementById('section-toko-pilihan');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Toko Pesantren
            </button>
            <button
              onClick={onOpenOrders}
              className="hover:text-teal-700 transition-colors whitespace-nowrap shrink-0"
            >
              Pesanan Saya
            </button>
            <button
              onClick={onOpenKanvasIde}
              className="flex items-center gap-1.5 text-teal-800 hover:text-teal-950 font-medium whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kanvas Ide BI</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* View Mode Switcher Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button
                onClick={() => onViewChange('consumer')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  currentView === 'consumer'
                    ? 'bg-white text-teal-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Konsumen
              </button>
              <button
                onClick={() => onViewChange('seller')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                  currentView === 'seller'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Dashboard Seller</span>
              </button>
            </div>

            {/* Shopping Bag Button (Consumer View) */}
            {currentView === 'consumer' && (
              <button
                onClick={onOpenCart}
                className="relative p-2.5 text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-full transition-colors"
                title="Buka Keranjang Belanja"
                aria-label="Keranjang Belanja"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-teal-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {/* User Indicator */}
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 text-xs font-medium text-slate-700">
              <div className="w-8 h-8 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-800 font-bold">
                {currentView === 'seller' ? 'AT' : 'Z'}
              </div>
              <div className="hidden xl:block text-left leading-tight">
                <p className="font-semibold text-slate-900">
                  {currentView === 'seller' ? 'Ponpes At-Toybah' : 'Zacky'}
                </p>
                <p className="text-[10px] text-slate-500">
                  {currentView === 'seller' ? 'Penjual Terverifikasi' : 'Wali Santri'}
                </p>
              </div>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 md:hidden"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Search input */}
        {currentView === 'consumer' && (
          <div className="py-2.5 pb-3 lg:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari produk santri di PASYAR..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-100 focus:bg-white border border-slate-200 rounded-lg outline-hidden text-slate-800 placeholder:text-slate-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3">
          <button
            onClick={() => {
              onViewChange('consumer');
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm font-semibold text-slate-800 hover:text-teal-700"
          >
            Belanja Produk Santri
          </button>
          <button
            onClick={() => {
              onViewChange('seller');
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm font-semibold text-teal-700"
          >
            <Store className="w-4 h-4" />
            Dashboard Penjual (Pondok At-Toybah)
          </button>
          <button
            onClick={() => {
              onOpenOrders();
              setMobileMenuOpen(false);
            }}
            className="block w-full text-left py-2 text-sm text-slate-700 hover:text-teal-700"
          >
            Pesanan Saya
          </button>
          <button
            onClick={() => {
              onOpenKanvasIde();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2 w-full text-left py-2 text-sm text-teal-800 font-medium"
          >
            <BookOpen className="w-4 h-4" />
            Kanvas Ide Inovasi (BI & Prasetiya Mulya)
          </button>
        </div>
      )}
    </header>
  );
}
