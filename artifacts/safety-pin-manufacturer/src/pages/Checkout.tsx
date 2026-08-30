import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'wouter';
import { ShieldCheck, Truck, CreditCard, Building2, CheckCircle2, ArrowLeft, ArrowRight, Printer, FileDown } from 'lucide-react';

export function Checkout() {
  const { items, subtotal, totalPieces, formatPrice, hasSampleKit, clearCart } = useCart();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [paymentMethod, setPaymentMethod] = useState<'po' | 'card' | 'wire'>('po');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    taxId: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    poNumber: '',
    deliveryNotes: '',
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '•••',
  });

  const shippingCost = subtotal >= 150 ? 0 : shippingMethod === 'express' ? 35.00 : 14.50;
  const estimatedTax = subtotal * 0.05; // 5% commercial tax
  const orderTotal = subtotal + (subtotal >= 150 && shippingMethod === 'standard' ? 0 : shippingCost) + estimatedTax;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `HF-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setOrderConfirmed(true);
    // Don't clear immediately so receipt can display items
  };

  if (items.length === 0 && !hasSampleKit && !orderConfirmed) {
    return (
      <div className="mx-auto max-w-[1440px] px-5 py-24 text-center">
        <h1 className="font-display text-4xl font-bold">Your Cart is Empty</h1>
        <p className="text-muted-foreground mt-3">Select safety pin packs to begin checkout.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-bold text-xs uppercase tracking-widest"
        >
          <ArrowLeft size={14} /> Back to Catalogue
        </Link>
      </div>
    );
  }

  if (orderConfirmed) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16">
        <div className="bracket border border-foreground/15 bg-card p-8 md:p-12 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="text-center pb-8 border-b border-foreground/10">
            <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground rounded-full mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <span className="eyebrow text-accent">Order Confirmed & Logged</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Thank you for your order!</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Confirmation and proforma details have been sent to <strong className="text-foreground">{formData.email || 'your email'}</strong>.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-secondary/80 px-4 py-2 font-mono text-xs border border-foreground/15">
              <span>Order Reference:</span>
              <span className="font-bold text-foreground">{orderId}</span>
            </div>
          </div>

          <div className="py-6 border-b border-foreground/10 space-y-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span>Delivery Summary</span>
              <span className="font-mono text-xs text-accent">Status: Processing for dispatch in 24h</span>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 text-xs font-mono bg-background/50 p-4 border border-foreground/10">
              <div>
                <span className="text-muted-foreground block">Shipping To:</span>
                <p className="font-bold mt-0.5">{formData.firstName} {formData.lastName}</p>
                <p className="text-muted-foreground">{formData.company}</p>
                <p className="text-muted-foreground">{formData.address}, {formData.city} {formData.zip}</p>
                <p className="text-muted-foreground">{formData.country}</p>
              </div>
              <div>
                <span className="text-muted-foreground block">Payment & Billing:</span>
                <p className="font-bold mt-0.5">
                  {paymentMethod === 'po' ? `Corporate PO / Net-30 (${formData.poNumber || 'PO-PENDING'})` : paymentMethod === 'card' ? 'Corporate Credit Card' : 'Bank Wire / TT'}
                </p>
                <p className="text-muted-foreground mt-2">Total Volume: {totalPieces.toLocaleString()} pieces</p>
                <p className="text-muted-foreground">Order Total: {formatPrice(orderTotal)}</p>
              </div>
            </div>
          </div>

          <div className="py-6 border-b border-foreground/10">
            <h3 className="font-display font-semibold text-base mb-3">Item Breakdown</h3>
            <div className="space-y-3 font-mono text-xs">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-foreground/5">
                  <div>
                    <span className="font-bold">{item.product.name}</span>
                    <span className="text-muted-foreground block text-[11px]">
                      Size: {item.selectedSize} • {item.selectedPack.name} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-bold">{formatPrice(item.selectedPack.price * item.quantity)}</span>
                </div>
              ))}
              {hasSampleKit && (
                <div className="flex justify-between items-center py-2 text-accent">
                  <span>16-Size Master Engineering Sample Kit</span>
                  <span className="font-bold">FREE ($0.00)</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="border border-foreground/20 px-4 py-2.5 font-mono text-xs uppercase tracking-wider inline-flex items-center gap-2 hover:border-accent hover:text-accent transition-colors"
              >
                <Printer size={14} /> Print Receipt
              </button>
            </div>
            <Link
              href="/"
              onClick={() => clearCart()}
              className="bg-accent text-accent-foreground px-6 py-2.5 font-bold text-xs uppercase tracking-widest text-center"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Link href="/products" className="hover:text-accent">Catalogue</Link>
        <span>/</span>
        <span className="text-foreground">Checkout</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr]">
        {/* Left: Multi-step checkout form */}
        <div>
          {/* Step tabs */}
          <div className="flex border-b border-foreground/15 pb-4 mb-8">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider pb-2 px-3 border-b-2 transition-all ${
                step === 1 ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
              }`}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full border text-[10px]">1</span>
              <span>Shipping & Company</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider pb-2 px-3 border-b-2 transition-all ${
                step === 2 ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
              }`}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full border text-[10px]">2</span>
              <span>Delivery & Freight</span>
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className={`flex items-center gap-2 font-mono text-xs uppercase tracking-wider pb-2 px-3 border-b-2 transition-all ${
                step === 3 ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
              }`}
            >
              <span className="grid h-5 w-5 place-items-center rounded-full border text-[10px]">3</span>
              <span>Payment & Terms</span>
            </button>
          </div>

          <form onSubmit={handleCompleteOrder} className="space-y-8">
            {/* STEP 1: Shipping & Client Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold">1. Shipping & Corporate Details</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter the delivery address for manufacturing supply or sample kit dispatch.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="e.g. Sarah"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="e.g. Jenkins"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">Work Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="buyer@company.com"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">Company / Mill Name</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="e.g. Sterling Garments Ltd"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block eyebrow text-muted-foreground mb-1.5">Street Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="Factory / Office Street Address, Suite or Dock Number"
                    className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="City"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">State / Province</label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="State / Region"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="block eyebrow text-muted-foreground mb-1.5">Postal Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => handleInputChange('zip', e.target.value)}
                      placeholder="Zip code"
                      className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-accent text-accent-foreground py-3.5 px-8 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:brightness-105"
                >
                  <span>Continue to Shipping Method</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* STEP 2: Delivery & Freight Options */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold">2. Freight & Packaging Preference</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Choose standard industrial carrier or priority express air shipment.
                  </p>
                </div>

                <div className="space-y-3">
                  <label
                    className={`p-4 border block cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-accent bg-accent/5'
                        : 'border-foreground/15 hover:border-foreground/40 bg-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'standard'}
                          onChange={() => setShippingMethod('standard')}
                          className="accent-accent"
                        />
                        <div>
                          <p className="font-display font-semibold text-sm">Standard Commercial Ground / Sea</p>
                          <p className="text-xs text-muted-foreground">3–5 Business Days • Tracked pallet or carton</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold">
                        {subtotal >= 150 ? 'FREE' : formatPrice(14.50)}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-4 border block cursor-pointer transition-all ${
                      shippingMethod === 'express'
                        ? 'border-accent bg-accent/5'
                        : 'border-foreground/15 hover:border-foreground/40 bg-card'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          checked={shippingMethod === 'express'}
                          onChange={() => setShippingMethod('express')}
                          className="accent-accent"
                        />
                        <div>
                          <p className="font-display font-semibold text-sm">Priority Express Air Cargo (DHL / FedEx)</p>
                          <p className="text-xs text-muted-foreground">1–2 Business Days • Guaranteed next-flight dispatch</p>
                        </div>
                      </div>
                      <span className="font-mono text-sm font-bold">{formatPrice(35.00)}</span>
                    </div>
                  </label>
                </div>

                <div>
                  <label className="block eyebrow text-muted-foreground mb-1.5">Special Receiving Dock Instructions</label>
                  <textarea
                    rows={2}
                    value={formData.deliveryNotes}
                    onChange={(e) => handleInputChange('deliveryNotes', e.target.value)}
                    placeholder="e.g. Deliver to Gate 4, Loading Dock B (Mon-Fri 8am-4pm)"
                    className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-accent text-accent-foreground py-3.5 px-8 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:brightness-105"
                  >
                    <span>Proceed to Payment</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment & Terms */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold">3. Commercial Terms & Payment</h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Select payment method or request immediate Net-30 invoice.
                  </p>
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('po')}
                    className={`p-4 border text-left transition-all ${
                      paymentMethod === 'po'
                        ? 'border-accent bg-accent/10 shadow-xs'
                        : 'border-foreground/15 bg-card hover:border-foreground/40'
                    }`}
                  >
                    <Building2 className="text-accent mb-2" size={20} />
                    <p className="font-display font-semibold text-sm">Corporate PO / Net-30</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Pay in 30 days upon invoice</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'border-accent bg-accent/10 shadow-xs'
                        : 'border-foreground/15 bg-card hover:border-foreground/40'
                    }`}
                  >
                    <CreditCard className="text-accent mb-2" size={20} />
                    <p className="font-display font-semibold text-sm">Credit / Purchasing Card</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Visa, MC, Amex, Corporate</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-4 border text-left transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-accent bg-accent/10 shadow-xs'
                        : 'border-foreground/15 bg-card hover:border-foreground/40'
                    }`}
                  >
                    <ShieldCheck className="text-accent mb-2" size={20} />
                    <p className="font-display font-semibold text-sm">Wire Transfer (TT)</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Direct bank routing instructions</p>
                  </button>
                </div>

                {paymentMethod === 'po' && (
                  <div className="p-4 border border-foreground/10 bg-background/50 space-y-3">
                    <label className="block eyebrow text-muted-foreground">Internal Purchase Order (PO) Number</label>
                    <input
                      type="text"
                      placeholder="e.g. PO-2026-HOLDFAST-09"
                      value={formData.poNumber}
                      onChange={(e) => handleInputChange('poNumber', e.target.value)}
                      className="w-full border border-foreground/20 bg-background p-3 text-sm font-mono uppercase outline-none focus:border-accent"
                    />
                    <p className="text-[11px] text-muted-foreground">
                      An official tax proforma invoice with standard Net-30 payment terms will be generated upon confirmation.
                    </p>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="p-4 border border-foreground/10 bg-background/50 space-y-4">
                    <div>
                      <label className="block eyebrow text-muted-foreground mb-1.5">Card Number</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full border border-foreground/20 bg-background p-3 text-sm font-mono outline-none focus:border-accent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block eyebrow text-muted-foreground mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => handleInputChange('cardExpiry', e.target.value)}
                          className="w-full border border-foreground/20 bg-background p-3 text-sm font-mono outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="block eyebrow text-muted-foreground mb-1.5">Security Code (CVC)</label>
                        <input
                          type="text"
                          value={formData.cardCvc}
                          onChange={(e) => handleInputChange('cardCvc', e.target.value)}
                          className="w-full border border-foreground/20 bg-background p-3 text-sm font-mono outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-wider"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-accent text-accent-foreground py-4 px-8 font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 hover:brightness-105 shadow-lg active:scale-98"
                  >
                    <span>Place Order ({formatPrice(orderTotal)})</span>
                    <ShieldCheck size={16} />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Right: Order Summary Sticky Card */}
        <div>
          <div className="bracket border border-foreground/15 bg-card p-6 sticky top-28 space-y-5">
            <h3 className="font-display text-lg font-bold border-b border-foreground/10 pb-3">
              Order Summary ({totalPieces.toLocaleString()} pieces)
            </h3>

            <div className="max-h-72 overflow-y-auto space-y-3 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start text-xs border-b border-foreground/5 pb-3">
                  <div>
                    <span className="font-bold text-foreground block">{item.product.name}</span>
                    <span className="text-[11px] text-muted-foreground font-mono">
                      {item.selectedSize} • {item.selectedPack.name} (x{item.quantity})
                    </span>
                  </div>
                  <span className="font-mono font-semibold">
                    {formatPrice(item.selectedPack.price * item.quantity)}
                  </span>
                </div>
              ))}

              {hasSampleKit && (
                <div className="flex justify-between items-start text-xs text-accent border-b border-accent/20 pb-2">
                  <div>
                    <span className="font-bold block">16-Size Master Sample Kit</span>
                    <span className="text-[11px] text-accent/80 font-mono">1 Box Included</span>
                  </div>
                  <span className="font-mono font-bold">$0.00 FREE</span>
                </div>
              )}
            </div>

            <div className="space-y-2 border-t border-foreground/10 pt-4 font-mono text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Cart Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping ({shippingMethod === 'standard' ? 'Standard Ground' : 'Express Air'})</span>
                <span>{subtotal >= 150 && shippingMethod === 'standard' ? 'FREE' : formatPrice(shippingCost)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Commercial Tax</span>
                <span>{formatPrice(estimatedTax)}</span>
              </div>
              <div className="flex justify-between items-center text-base font-display font-bold text-foreground pt-3 border-t border-foreground/15">
                <span>Total Due</span>
                <span className="text-accent">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-foreground/10 text-[11px] text-muted-foreground space-y-1.5">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-accent" />
                <span>Encrypted 256-Bit SSL Checkout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={14} className="text-accent" />
                <span>Direct Mill Dispatch & Full Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
