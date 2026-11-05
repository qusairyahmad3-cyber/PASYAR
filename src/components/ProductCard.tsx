import { Star, ShoppingCart, MapPin, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isAdded?: boolean;
}

export default function ProductCard({
  product,
  onSelect,
  onAddToCart,
  isAdded = false,
}: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div
      onClick={() => onSelect(product)}
      className="group flex flex-col bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
          onError={(e) => {
            // Stylized CSS fallback
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Halal Guarantee Badge */}
        {product.isHalalCertified && (
          <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-emerald-700/90 backdrop-blur-xs text-white text-[11px] font-medium rounded-md shadow-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            <span>Halal Pesantren</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-4">
        {/* Pesantren Origin Label */}
        <div className="flex items-center gap-1 text-[11px] text-teal-800 font-medium mb-1">
          <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
          <span className="truncate">{product.pesantren}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Rating and Sold Count - Zero-Pill Discipline */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
          <div className="flex items-center text-amber-500">
            <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400 mr-0.5" />
            <span className="font-semibold text-slate-800 tabular-nums">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-slate-300">·</span>
          <span className="tabular-nums">
            {product.soldCount >= 1000 
              ? `${(product.soldCount / 1000).toFixed(1)}rb terjual`
              : `${product.soldCount} terjual`}
          </span>
        </div>

        {/* Spacer to push price and action to bottom */}
        <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-base font-bold text-slate-900 tabular-nums">
              {formattedPrice}
            </span>
            <span className="text-[10px] text-slate-400">
              per {product.unit}
            </span>
          </div>

          {/* Quick Add Button */}
          <button
            onClick={(e) => onAddToCart(product, e)}
            className={`p-2 rounded-lg transition-all flex items-center justify-center shrink-0 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-teal-50 text-teal-800 hover:bg-teal-700 hover:text-white'
            }`}
            title="Tambah ke Keranjang"
            aria-label="Tambah ke Keranjang"
          >
            {isAdded ? (
              <Check className="w-4 h-4" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
