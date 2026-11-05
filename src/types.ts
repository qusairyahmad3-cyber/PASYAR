export type ProductCategory = 
  | 'Semua'
  | 'Makanan & Minuman'
  | 'Fashion Muslim'
  | 'Kerajinan Tangan'
  | 'Buku & Alat Belajar'
  | 'Produk Pertanian'
  | 'Lainnya';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  soldCount: number;
  reviewCount: number;
  imageUrl: string;
  pesantren: string;
  location: string;
  sellerName: string;
  sellerWhatsapp: string;
  description: string;
  stock: number;
  isHalalCertified: boolean;
  unit: string;
  isPopular?: boolean;
  isActive?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus = 'Pesanan Baru' | 'Diproses' | 'Dikirim' | 'Selesai' | 'Dibatalkan';

export interface Order {
  id: string;
  buyerName: string;
  buyerPhone: string;
  buyerAddress: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  deliveryMethod: 'pickup' | 'shipping';
  courier?: string;
  total: number;
  status: OrderStatus;
  paymentMethod: 'QRIS' | 'COD' | 'Transfer Bank Syariah';
  paymentStatus: 'Menunggu Pembayaran' | 'Lunas';
  date: string;
  pesantrenStore: string;
}

export interface SellerProfile {
  storeName: string;
  ownerName: string;
  location: string;
  pesantrenName: string;
  isVerified: boolean;
  balance: number;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  totalBuyers: number;
  totalRevenue: number;
}
