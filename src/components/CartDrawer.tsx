import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Package, Box, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';

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
    hasSampleKit,
    removeSampleKit,
    addSampleKit,
  } = useCart();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 50; // $50 or ₹4,300
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const handleWhatsAppQuickRFQ = () => {
    let text = `*CART ORDER INQUIRY - KANYAKUMARI SAFETY PINS (TAMIL NADU)*\n` +
      `---------------------------------------\n`;
    items.forEach((item, idx) => {
      text += `${idx + 1}. *${item.product.name}*\n   Size: ${item.selectedSize} | ${item.selectedPack.name} | Qty: ${item.quantity} (${(item.quantity * item.selectedPack.count).toLocaleString()} pcs)\n`;
    });
    if (hasSampleKit) {
      text += `+ Free 12-Size Evaluation Sample Box\n`;
    }
    text += `---------------------------------------\n` +
      `• *Total Pieces:* ${totalPieces.toLocaleString()} pcs\n` +
      `• *Subtotal:* ${formatPrice(subtotal)}\n` +
      `Please confirm stock availability & dispatch time from Kanyakumari Mill.`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-background border-l border-foreground/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center bg-foreground text-background text-xs font-mono font-bold rounded-xs">
                {items.length + (hasSampleKit ? 1 : 0)}
              </span>
              <div>
                <h2 id="slide-over-title" className="font-display text-base sm:text-lg font-bold">Your Order Cart</h2>
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  {totalPieces.toLocaleString()} pieces selected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground border border-foreground/10 hover:border-foreground/30 transition-colors rounded-xs"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Freight Progress Bar */}
          <div className="px-4 sm:px-6 py-2.5 bg-secondary/40 border-b border-foreground/10 text-xs">
            {diffToFree === 0 ? (
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Truck size={15} />
                <span>Unlocked: Free Tamil Nadu & All-India Dispatch!</span>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center mb-1 text-[11px] text-muted-foreground font-mono">
                  <span>Free Freight Threshold</span>
                  <span>Add {formatPrice(diffToFree)} more</span>
                </div>
                <div className="w-full bg-foreground/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5">
            {items.length === 0 && !hasSampleKit ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="grid h-16 w-16 place-items-center border border-foreground/20 rounded-full text-muted-foreground mb-4">
                  <Package size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold">Your cart is empty</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                  Browse our safety pin catalogue and select standard packets, workshop boxes, or bunched ring packs.
                </p>
                <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                  <Link
                    href="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="bg-accent text-accent-foreground py-3 px-4 font-bold text-xs uppercase tracking-wider text-center rounded-xs hover:brightness-105"
                  >
                    Explore Pin Catalogue
                  </Link>
                </div>
              </div>
            ) : (
              <>
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-foreground/15 bg-card p-3.5 rounded-xs flex flex-col justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase">{item.product.code}</span>
                        <h4 className="font-display text-sm font-bold text-foreground leading-snug">{item.product.name}</h4>
                        <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
                          Size: <strong className="text-foreground">{item.selectedSize}</strong> • {item.selectedPack.name}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-foreground/10">
                      <div className="flex items-center border border-foreground/20 rounded-xs bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 hover:bg-secondary text-foreground"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 font-mono font-bold text-xs">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 hover:bg-secondary text-foreground"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right font-display text-sm font-bold text-accent">
                        {formatPrice(item.selectedPack.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free Sample Box */}
                {hasSampleKit && (
                  <div className="border border-accent/30 bg-accent/5 p-3.5 rounded-xs space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Box size={16} className="text-accent shrink-0" />
                        <div>
                          <p className="font-bold text-foreground">Free 12-Size Sample Box</p>
                          <p className="text-[10px] text-muted-foreground">Kanyakumari Mill Evaluation Kit</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeSampleKit}
                        className="text-muted-foreground hover:text-destructive p-1"
                        aria-label="Remove sample kit"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-accent/20 text-xs font-mono">
                      <span className="text-accent font-semibold">1 Mill Kit Included</span>
                      <span className="font-bold text-accent">₹0.00 FREE</span>
                    </div>
                  </div>
                )}

                {/* Prompt to add sample kit if not yet added */}
                {!hasSampleKit && (
                  <div className="p-3 border border-dashed border-foreground/20 bg-secondary/30 flex items-center justify-between gap-3 text-xs rounded-xs">
                    <div className="flex items-center gap-2">
                      <Box size={16} className="text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-foreground">Need factory samples?</p>
                        <p className="text-[10px] text-muted-foreground">Add free 12-size evaluation box</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={addSampleKit}
                      className="text-[11px] font-mono font-bold text-accent hover:underline whitespace-nowrap"
                    >
                      + ADD FREE
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer & Checkout CTAs */}
          {items.length > 0 || hasSampleKit ? (
            <div className="p-4 sm:p-6 border-t border-foreground/15 bg-background space-y-3.5">
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Volume</span>
                  <span>{totalPieces.toLocaleString()} pieces</span>
                </div>
                <div className="flex justify-between text-base font-display font-bold text-foreground pt-1.5 border-t border-foreground/10">
                  <span>Order Subtotal</span>
                  <span className="text-accent">{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3.5 px-4 font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-md rounded-xs transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  type="button"
                  onClick={handleWhatsAppQuickRFQ}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 rounded-xs transition-colors"
                >
                  <MessageSquare size={15} />
                  <span>Send Cart Quote to WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-accent" /> ISO 9001:2015
                </span>
                <span>•</span>
                <span>Kanyakumari Dispatch 24h</span>
                <span>•</span>
                <span>GST Invoicing</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
