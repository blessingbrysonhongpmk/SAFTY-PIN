import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, Truck, Package, CheckCircle2, MessageSquare, MapPin, Building2, Store } from 'lucide-react';
import { Link } from 'wouter';

const KANYAKUMARI_AREAS = [
  'Nagercoil',
  'Kanyakumari',
  'Marthandam',
  'Thuckalay',
  'Colachel',
  'Karungal',
  'Kuzhithurai',
  'Suchindram',
  'Aralvaimozhi',
  'Padmanabhapuram',
  'Kaliyakkavilai',
  'Kulasekharam',
  'Monday Market',
  'Eraniel',
  'Other Area',
];

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotal,
    totalPieces,
    isCartOpen,
    setIsCartOpen,
    formatPrice,
    clearCart,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shop-details' | 'success'>('cart');
  const [shopDetails, setShopDetails] = useState({
    shopName: '',
    customerName: '',
    phone: '',
    area: 'Nagercoil',
    address: '',
    notes: '',
  });
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  if (!isCartOpen) return null;

  const handleProceedToShopDetails = () => {
    setCheckoutStep('shop-details');
  };

  const handleSendWholesaleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopDetails.shopName || !shopDetails.customerName || !shopDetails.phone) return;

    const orderId = `KK-B2B-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedOrderId(orderId);
    setCheckoutStep('success');

    // Build WhatsApp message
    let msg = `*WHOLESALE SAFETY PIN ORDER [${orderId}]*\n` +
      `---------------------------------------\n` +
      `• *Shop Name:* ${shopDetails.shopName}\n` +
      `• *Contact Person:* ${shopDetails.customerName}\n` +
      `• *Phone:* ${shopDetails.phone}\n` +
      `• *Town / Area:* ${shopDetails.area} (Kanyakumari District)\n` +
      `• *Address:* ${shopDetails.address || 'Local Shop Address'}\n` +
      (shopDetails.notes ? `• *Notes:* ${shopDetails.notes}\n` : '') +
      `---------------------------------------\n` +
      `*ORDER ITEMS:*\n`;

    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name.split('(')[0].trim()}\n   Size: ${item.selectedSize} | ${item.selectedPack.name}\n   Quantity: ${item.quantity} ${item.quantity === 1 ? 'Pack' : 'Packs'} (${(item.quantity * item.selectedPack.count).toLocaleString()} pcs) - ${formatPrice(item.selectedPack.price * item.quantity)}\n`;
    });

    msg += `---------------------------------------\n` +
      `• *Total Volume:* ${totalPieces.toLocaleString()} pieces\n` +
      `• *Total Wholesale Value:* ${formatPrice(subtotal)}\n` +
      `---------------------------------------\n` +
      `Please confirm delivery schedule across Kanyakumari.`;

    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  const handleClose = () => {
    setIsCartOpen(false);
    if (checkoutStep === 'success') {
      clearCart();
      setCheckoutStep('cart');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-2.5">
              <span className="grid h-8 w-8 place-items-center bg-orange-600 text-white text-xs font-mono font-bold rounded-md">
                {items.length}
              </span>
              <div>
                <h2 id="slide-over-title" className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {checkoutStep === 'cart'
                    ? 'Your Wholesale Order'
                    : checkoutStep === 'shop-details'
                    ? 'Enter Shop Details'
                    : 'Order Placed!'}
                </h2>
                <p className="text-[11px] font-mono text-slate-500 uppercase">
                  {checkoutStep === 'cart'
                    ? `${totalPieces.toLocaleString()} pieces selected`
                    : 'Kanyakumari Local Supply'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-200 rounded-md transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* STEP 1: CART REVIEW */}
          {checkoutStep === 'cart' && (
            <>
              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="grid h-16 w-16 place-items-center border border-slate-200 bg-slate-50 rounded-full text-slate-400 mb-4">
                      <Package size={28} />
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900">Your order is empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                      Choose safety pin sizes and wholesale pack quantities to start your order.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-5 bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-6 rounded-md font-bold text-xs uppercase tracking-wider shadow-xs"
                    >
                      Browse Safety Pins
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={item.id}
                      className="border border-slate-200 bg-white p-3.5 rounded-lg flex flex-col justify-between gap-2.5 text-xs shadow-xs"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[10px] text-orange-600 font-bold uppercase">{item.product.code}</span>
                          <h4 className="font-display text-sm font-bold text-slate-900 leading-snug">
                            {item.product.name.split('(')[0]}
                          </h4>
                          <p className="text-[11px] font-mono text-slate-600 mt-0.5">
                            Size: <strong className="text-slate-900">{item.selectedSize}</strong> • {item.selectedPack.name}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <div className="flex items-center border border-slate-300 rounded-md bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-slate-600 hover:bg-slate-100"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="px-3 font-mono font-bold text-xs text-slate-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-slate-600 hover:bg-slate-100"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div className="text-right font-display text-sm font-bold text-orange-600">
                          {formatPrice(item.selectedPack.price * item.quantity)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Cart Footer */}
              {items.length > 0 && (
                <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
                  <div className="space-y-1 text-xs font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>Total Volume</span>
                      <span className="font-bold text-slate-900">{totalPieces.toLocaleString()} pieces</span>
                    </div>
                    <div className="flex justify-between text-base font-display font-bold text-slate-900 pt-1.5 border-t border-slate-200">
                      <span>Wholesale Total</span>
                      <span className="text-orange-600">{formatPrice(subtotal)}</span>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <button
                      type="button"
                      onClick={handleProceedToShopDetails}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <span>CONTINUE ORDER (ENTER SHOP DETAILS)</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-mono text-center pt-1">
                    <Truck size={12} className="text-orange-600" />
                    <span>Doorstep supply across all Kanyakumari towns</span>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2: ENTER SHOP DETAILS */}
          {checkoutStep === 'shop-details' && (
            <form onSubmit={handleSendWholesaleOrder} className="flex-1 flex flex-col justify-between overflow-hidden">
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                <div className="bg-orange-50 border border-orange-200 p-3 rounded-lg text-xs font-mono text-orange-950 flex justify-between items-center">
                  <span>Order: {items.length} items ({totalPieces.toLocaleString()} pcs)</span>
                  <span className="font-bold font-display text-sm text-orange-600">{formatPrice(subtotal)}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Shop / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Tailors / Sri Murugan Textiles"
                    value={shopDetails.shopName}
                    onChange={(e) => setShopDetails({ ...shopDetails, shopName: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Customer Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh"
                      value={shopDetails.customerName}
                      onChange={(e) => setShopDetails({ ...shopDetails, customerName: e.target.value })}
                      className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={shopDetails.phone}
                      onChange={(e) => setShopDetails({ ...shopDetails, phone: e.target.value })}
                      className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Town / Area in Kanyakumari *
                  </label>
                  <select
                    value={shopDetails.area}
                    onChange={(e) => setShopDetails({ ...shopDetails, area: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                  >
                    {KANYAKUMARI_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    placeholder="Shop Street / Market / Landmark"
                    value={shopDetails.address}
                    onChange={(e) => setShopDetails({ ...shopDetails, address: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Optional Notes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Deliver after 2 PM / Cash on Delivery / GST invoice needed"
                    value={shopDetails.notes}
                    onChange={(e) => setShopDetails({ ...shopDetails, notes: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-2">
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3.5 px-4 rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare size={16} />
                  <span>SUBMIT WHOLESALE ORDER</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full border border-slate-300 hover:bg-slate-100 text-slate-700 py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  Back to Cart Review
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: ORDER SUCCESS */}
          {checkoutStep === 'success' && (
            <div className="flex-1 overflow-y-auto p-6 text-center flex flex-col justify-center items-center animate-in zoom-in-95 duration-200">
              <div className="grid h-16 w-16 place-items-center bg-emerald-100 text-emerald-700 rounded-full mb-4">
                <CheckCircle2 size={36} />
              </div>

              <span className="eyebrow text-emerald-700 font-bold">Wholesale Order Received</span>
              <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">Thank you!</h3>
              <p className="text-xs text-slate-600 mt-2 max-w-xs leading-relaxed">
                Your order reference <strong className="text-slate-900">{confirmedOrderId}</strong> for{' '}
                <strong className="text-slate-900">{shopDetails.shopName}</strong> ({shopDetails.area}) has been transmitted to our Kanyakumari dispatch desk.
              </p>

              <div className="mt-5 p-4 border border-slate-200 bg-slate-50 rounded-lg text-left w-full max-w-xs text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Order Ref:</span>
                  <span className="font-bold text-slate-900">{confirmedOrderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Shop:</span>
                  <span className="text-slate-800 truncate max-w-[140px]">{shopDetails.shopName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total:</span>
                  <span className="font-bold text-orange-600">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Supply Town:</span>
                  <span className="text-slate-800">{shopDetails.area}</span>
                </div>
              </div>

              <div className="mt-6 w-full max-w-xs space-y-2">
                <a
                  href={`https://wa.me/919876543210?text=Hello%20Kanyakumari%20Safety%20Pins%2C%20following%20up%20on%20my%20order%20${confirmedOrderId}%20for%20${encodeURIComponent(shopDetails.shopName)}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageSquare size={16} />
                  <span>Connect with Dispatch (+91)</span>
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 px-4 rounded-md font-bold text-xs uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
