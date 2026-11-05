import { useState } from 'react';
import { Product, CartItem, Order, SellerProfile } from './types';
import { INITIAL_PRODUCTS, INITIAL_SELLER_PROFILE, INITIAL_ORDERS } from './data/mockData';
import Header from './components/Header';
import ConsumerView from './components/ConsumerView';
import SellerDashboard from './components/SellerDashboard';
import ProductDetailModal from './components/ProductDetailModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import MyOrdersModal from './components/MyOrdersModal';
import KanvasIdeModal from './components/KanvasIdeModal';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState<'consumer' | 'seller'>('consumer');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [sellerProfile, setSellerProfile] = useState<SellerProfile>(INITIAL_SELLER_PROFILE);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isKanvasIdeOpen, setIsKanvasIdeOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ "${product.name}" ditambahkan ke keranjang`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleBuyNow = (product: Product, quantity: number) => {
    setCartItems([{ product, quantity }]);
    setIsCheckoutOpen(true);
  };

  // Order completed via CheckoutModal (QRIS)
  const handleOrderCompleted = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    setCartItems([]);
    // Update seller profile metrics if order is for this store
    setSellerProfile((prev) => ({
      ...prev,
      balance: prev.balance + newOrder.subtotal,
      totalOrders: prev.totalOrders + 1,
      totalRevenue: prev.totalRevenue + newOrder.subtotal,
    }));
    showToast(`Pesanan ${newOrder.id} berhasil dibayar dengan QRIS!`);
  };

  // Seller Dashboard operations
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Produk "${newProduct.name}" berhasil ditambahkan ke katalog`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
    showToast(`Status pesanan ${orderId} diperbarui: ${status}`);
  };

  const handleToggleProductActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isActive: !p.isActive } : p))
    );
  };

  const handleWithdrawSuccess = (amount: number) => {
    setSellerProfile((prev) => ({
      ...prev,
      balance: Math.max(0, prev.balance - amount),
    }));
    showToast(`Penarikan dana sebesar Rp ${amount.toLocaleString('id-ID')} berhasil diproses`);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Main Top Header */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenKanvasIde={() => setIsKanvasIdeOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* View Switcher: Consumer Storefront or Seller Management */}
      <main className="flex-1">
        {currentView === 'consumer' ? (
          <ConsumerView
            products={products}
            onSelectProduct={setSelectedProduct}
            onAddToCart={(prod, e) => handleAddToCart(prod, 1)}
            searchQuery={searchQuery}
            onOpenKanvasIde={() => setIsKanvasIdeOpen(true)}
          />
        ) : (
          <SellerDashboard
            sellerProfile={sellerProfile}
            products={products}
            orders={orders}
            onAddProduct={handleAddProduct}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onToggleProductActive={handleToggleProductActive}
            onWithdrawSuccess={handleWithdrawSuccess}
          />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & QRIS Payment Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* My Orders Tracking Modal */}
      <MyOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
      />

      {/* Kanvas Ide Innovation Profile Modal */}
      <KanvasIdeModal
        isOpen={isKanvasIdeOpen}
        onClose={() => setIsKanvasIdeOpen(false)}
      />

      {/* Footer */}
      <Footer
        onOpenKanvasIde={() => setIsKanvasIdeOpen(true)}
        onOpenSeller={() => setCurrentView('seller')}
        onOpenConsumer={() => setCurrentView('consumer')}
      />

    </div>
  );
}
