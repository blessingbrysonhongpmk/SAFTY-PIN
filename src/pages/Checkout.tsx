import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'wouter';
import { ShieldCheck, Truck, CreditCard, Building2, CheckCircle2, ArrowLeft, ArrowRight, Printer, MessageSquare, MapPin } from 'lucide-react';

export function Checkout() {
  const { items, subtotal, totalPieces, formatPrice, hasSampleKit, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<'po' | 'online' | 'bank'>('po');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
    address: '',
    city: '',
    state: 'Tamil Nadu',
    zip: '',
    country: 'India',
    poNumber: '',
    deliveryNotes: '',
  });

  const shippingCost = subtotal >= 50 ? 0 : shippingMethod === 'express' ? 12.00 : 5.00;
  const estimatedTax = subtotal * 0.18; // 18% GST for industrial fasteners
  const orderTotal = subtotal + (subtotal >= 50 && shippingMethod === 'standard' ? 0 : shippingCost) + estimatedTax;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `KK-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderConfirmed(true);
  };

  const handleWhatsAppOrder = () => {
    const message = `*PURCHASE ORDER INVOICE: ${orderId}*\n` +
      `---------------------------------------\n` +
      `• *Buyer:* ${formData.firstName} ${formData.lastName}\n` +
      `• *Company:* ${formData.company || 'N/A'}\n` +
      `• *GSTIN:* ${formData.gstin || 'N/A'}\n` +
      `• *Phone:* ${formData.phone || 'N/A'}\n` +
      `• *Delivery Address:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.zip}\n` +
      `• *Total Pieces:* ${totalPieces.toLocaleString()} pcs\n` +
      `• *Grand Total (with 18% GST):* ${formatPrice(orderTotal)}\n` +
      `• *Payment Mode:* ${paymentMethod === 'po' ? 'GST Invoice / PO' : paymentMethod === 'online' ? 'UPI / Online' : 'RTGS / Bank Wire'}\n` +
      `---------------------------------------\n` +
      `Please generate final Tax Invoice & dispatch from Kanyakumari Mill.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  if (items.length === 0 && !hasSampleKit && !orderConfirmed) {
    return (
      <div className="mx-auto max-w-[1440px] px-4 py-20 text-center">
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">Your Order Cart is Empty</h1>
        <p className="text-muted-foreground mt-2 text-sm">Select safety pin packets, boxes, or ring bunches to begin checkout.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-bold text-xs uppercase tracking-wider rounded-xs"
        >
          <ArrowLeft size={14} /> Back to Catalogue
        </Link>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <div className="border border-foreground/15 bg-card p-6 sm:p-10 shadow-xl rounded-xs animate-in zoom-in-95 duration-300">
          <div className="text-center pb-6 border-b border-foreground/10">
            <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground rounded-full mx-auto mb-4 shadow-md">
              <CheckCircle2 size={32} />
            </div>
            <span className="eyebrow text-accent">Order Confirmed & Logged</span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-foreground">Thank you for your order!</h1>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Order confirmation & GST Proforma details generated for <strong className="text-foreground">{formData.email || formData.phone || 'your business'}</strong>.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-secondary/80 px-4 py-2 font-mono text-xs border border-foreground/15 rounded-xs">
              <span>Order Reference:</span>
              <span className="font-bold text-foreground">{orderId}</span>
            </div>
          </div>

          <div className="py-6 border-b border-foreground/10 space-y-4 font-mono text-xs">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Delivery Summary</span>
              <span className="text-xs text-accent">Dispatch: Within 24h from Kanyakumari</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 bg-background/50 p-4 border border-foreground/10 rounded-xs">
              <div>
                <span className="text-muted-foreground block font-bold">Shipping To:</span>
                <p className="font-bold mt-0.5 text-foreground">{formData.firstName} {formData.lastName}</p>
                <p className="text-muted-foreground">{formData.company}</p>
                <p className="text-muted-foreground">{formData.address}, {formData.city}, {formData.state} - {formData.zip}</p>
                {formData.gstin && <p className="text-accent font-semibold mt-1">GSTIN: {formData.gstin}</p>}
              </div>
              <div>
                <span className="text-muted-foreground block font-bold">Payment & Billing:</span>
                <p className="font-bold mt-0.5 text-foreground">
                  {paymentMethod === 'po' ? `GST Invoice (PO: ${formData.poNumber || 'PO-DEFAULT'})` : paymentMethod === 'online' ? 'UPI / Online' : 'Bank RTGS / Wire'}
                </p>
                <p className="text-muted-foreground mt-2">Total Volume: {totalPieces.toLocaleString()} pieces</p>
                <p className="text-foreground font-bold mt-1">Grand Total: {formatPrice(orderTotal)}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
            >
              <MessageSquare size={16} />
              <span>Confirm on WhatsApp (+91)</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="border border-foreground/20 py-3 px-6 font-mono text-xs uppercase tracking-wider text-foreground hover:border-accent hover:text-accent rounded-xs"
            >
              Print Tax Proforma
            </button>
            <Link
              href="/products"
              onClick={clearCart}
              className="bg-accent text-accent-foreground py-3 px-6 font-bold text-xs uppercase tracking-wider rounded-xs text-center"
            >
              Back to Store
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-10 md:py-16">
      <div className="mb-8">
        <span className="eyebrow text-accent">Kanyakumari Factory Direct Order</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold mt-1 text-foreground">
          Order Checkout & Proforma Invoice
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          Review your safety pin order, billing details, and GST tax invoice generation.
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr]">
        {/* Form Column */}
        <form onSubmit={handleCompleteOrder} className="space-y-6">
          <div className="border border-foreground/15 bg-card p-5 sm:p-8 rounded-xs space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground border-b border-foreground/10 pb-3">
              1. Delivery & Billing Address
            </h3>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">First Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Last Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kumar"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="buyer@company.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Mobile / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Company / Mill Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tirupur Apparel Exports"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">GSTIN Number (Optional)</label>
                <input
                  type="text"
                  placeholder="33AAAAA0000A1Z5"
                  value={formData.gstin}
                  onChange={(e) => handleInputChange('gstin', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs font-mono uppercase"
                />
              </div>
            </div>

            <div>
              <label className="block eyebrow text-muted-foreground mb-1">Factory / Street Address *</label>
              <input
                type="text"
                required
                placeholder="Building Name, Industrial Area, Street Address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Tirupur"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">State *</label>
                <input
                  type="text"
                  required
                  placeholder="Tamil Nadu"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>
              <div>
                <label className="block eyebrow text-muted-foreground mb-1">PIN Code *</label>
                <input
                  type="text"
                  required
                  placeholder="641604"
                  value={formData.zip}
                  onChange={(e) => handleInputChange('zip', e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="border border-foreground/15 bg-card p-5 sm:p-8 rounded-xs space-y-4">
            <h3 className="font-display text-lg font-bold text-foreground border-b border-foreground/10 pb-3">
              2. Payment & Invoice Preference
            </h3>

            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { id: 'po', label: 'GST Proforma / PO', desc: 'Direct Invoice with Net-15 / Net-30 credit for registered firms' },
                { id: 'online', label: 'UPI / Online', desc: 'GPay / PhonePe / QR / Card payment with instant dispatch' },
                { id: 'bank', label: 'Bank RTGS / NEFT', desc: 'Direct factory mill bank transfer (HDFC / SBI / ICICI)' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3.5 border rounded-xs cursor-pointer transition-all ${
                    paymentMethod === m.id
                      ? 'border-accent bg-accent/5 ring-1 ring-accent font-semibold'
                      : 'border-foreground/15 hover:border-foreground/30 bg-background'
                  }`}
                >
                  <span className="font-bold text-xs sm:text-sm text-foreground block">{m.label}</span>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{m.desc}</p>
                </div>
              ))}
            </div>

            {paymentMethod === 'po' && (
              <input
                type="text"
                placeholder="Purchase Order (PO) Number (Optional)"
                value={formData.poNumber}
                onChange={(e) => handleInputChange('poNumber', e.target.value)}
                className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs font-mono"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-4 font-bold text-xs uppercase tracking-widest rounded-xs flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
          >
            <span>Place Order & Generate Proforma ({formatPrice(orderTotal)})</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Order Summary Sidebar */}
        <div className="border border-foreground/15 bg-card p-5 sm:p-6 rounded-xs h-fit space-y-4">
          <h3 className="font-display text-lg font-bold text-foreground border-b border-foreground/10 pb-3">
            Order Summary ({items.length} Items)
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto divide-y divide-foreground/10 text-xs font-mono">
            {items.map((item) => (
              <div key={item.id} className="pt-2 flex justify-between gap-2">
                <div>
                  <div className="font-bold text-foreground">{item.product.name}</div>
                  <div className="text-[11px] text-muted-foreground">
                    Size: {item.selectedSize} • {item.selectedPack.name} (Qty: {item.quantity})
                  </div>
                </div>
                <div className="font-bold text-accent whitespace-nowrap">
                  {formatPrice(item.selectedPack.price * item.quantity)}
                </div>
              </div>
            ))}
            {hasSampleKit && (
              <div className="pt-2 flex justify-between gap-2 text-accent font-bold">
                <span>Free 12-Size Sample Box</span>
                <span>₹0.00</span>
              </div>
            )}
          </div>

          <div className="border-t border-foreground/15 pt-3 space-y-2 text-xs font-mono">
            <div className="flex justify-between text-muted-foreground">
              <span>Total Volume:</span>
              <span className="text-foreground">{totalPieces.toLocaleString()} pcs</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>GST (18% Fasteners):</span>
              <span className="text-foreground">{formatPrice(estimatedTax)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Freight (Kanyakumari Dispatch):</span>
              <span className="text-emerald-600 font-bold">{subtotal >= 50 ? 'FREE' : formatPrice(shippingCost)}</span>
            </div>

            <div className="border-t border-foreground/15 pt-2 flex justify-between text-base font-display font-bold text-foreground">
              <span>Total Amount:</span>
              <span className="text-accent">{formatPrice(orderTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
