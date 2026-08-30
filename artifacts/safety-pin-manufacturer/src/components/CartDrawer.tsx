import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Package, Box } from 'lucide-react';
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

  const FREE_SHIPPING_THRESHOLD = 150;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const diffToFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-background border-l border-foreground/15 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-foreground/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center bg-foreground text-background text-xs font-mono font-bold">
                {items.length + (hasSampleKit ? 1 : 0)}
              </span>
              <div>
                <h2 id="slide-over-title" className="font-display text-lg font-bold">Your Order Cart</h2>
                <p className="text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
                  {totalPieces.toLocaleString()} pieces selected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground border border-foreground/10 hover:border-foreground/30 transition-colors"
              aria-label="Close cart"
            >
              <X size={18} />
            </button>
          </div>

          {/* Free Freight Progress Bar */}
          <div className="px-6 py-3 bg-secondary/40 border-b border-foreground/10 text-xs">
            {diffToFree === 0 ? (
              <div className="flex items-center gap-2 text-accent font-semibold">
                <Truck size={15} />
                <span>Unlocked: Free Express Freight Shipping!</span>
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
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 && !hasSampleKit ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="grid h-16 w-16 place-items-center border border-foreground/20 rounded-full text-muted-foreground mb-4">
                  <Package size={28} />
                </div>
                <h3 className="font-display text-xl font-semibold">Your cart is empty</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                  Browse our safety pin catalogue and select standard packages or workshop crates.
                </p>
                <div className="mt-6 flex flex-col gap-2 w-full max-w-xs">
                  <Link
                    href="/products"
                    onClick={() => setIsCartOpen(false)}
                    className="bg-accent text-accent-foreground py-3 px-4 font-bold text-xs uppercase tracking-widest text-center hover:brightness-105 transition-transform active:scale-98"
                  >
                    Explore Pin Catalogue
                  </Link>
                  <button
                    type="button"
                    onClick={() => addSampleKit()}
                    className="border border-foreground/20 py-2.5 px-4 font-mono text-xs uppercase tracking-wider text-center hover:border-accent hover:text-accent transition-colors"
                  >
                    + Add Free Sample Box
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Standard items */}
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border border-foreground/15 bg-card/60 flex flex-col gap-3 relative group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">
                          {item.product.code}
                        </span>
                        <h4 className="font-display text-base font-semibold leading-snug">
                          {item.product.name}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span className="border border-foreground/15 px-1.5 py-0.5 bg-background font-mono text-[11px]">
                            {item.selectedSize}
                          </span>
                          <span>•</span>
                          <span>{item.selectedPack.name}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-foreground/10">
                      <div className="flex items-center border border-foreground/20 bg-background">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 py-1 font-mono text-xs font-bold min-w-[2.2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="font-display text-base font-bold">
                          {formatPrice(item.selectedPack.price * item.quantity)}
                        </p>
                        <p className="text-[10px] font-mono text-muted-foreground">
                          {formatPrice(item.selectedPack.unitPrice)} / piece
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Free Sample Kit Card if Added */}
                {hasSampleKit && (
                  <div className="p-4 border border-accent/40 bg-accent/5 flex flex-col gap-2 relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="grid h-6 w-6 place-items-center bg-accent text-accent-foreground text-[10px] font-mono font-bold rounded-sm">
                          FREE
                        </span>
                        <div>
                          <h4 className="font-display text-sm font-bold">Master Engineering Sample Kit</h4>
                          <p className="text-[11px] text-muted-foreground">
                            Complete 16-size silver specification pack (all wire gauges)
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeSampleKit}
                        className="text-muted-foreground hover:text-destructive p-1"
                        title="Remove sample kit"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-accent/20 text-xs font-mono">
                      <span className="text-accent font-semibold">1 Business Kit Included</span>
                      <span className="font-bold text-accent">$0.00 FREE</span>
                    </div>
                  </div>
                )}

                {/* Prompt to add sample kit if not yet added */}
                {!hasSampleKit && (
                  <div className="p-3 border border-dashed border-foreground/20 bg-secondary/30 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <Box size={16} className="text-accent shrink-0" />
                      <div>
                        <p className="font-bold text-foreground">Need engineering samples?</p>
                        <p className="text-[10px] text-muted-foreground">Add free 16-size trial box to this order</p>
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
            <div className="p-6 border-t border-foreground/15 bg-background space-y-4">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Volume</span>
                  <span>{totalPieces.toLocaleString()} pieces</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Freight</span>
                  <span>{diffToFree === 0 ? 'FREE' : formatPrice(12.50)}</span>
                </div>
                <div className="flex justify-between text-base font-display font-bold text-foreground pt-2 border-t border-foreground/10">
                  <span>Order Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <div className="grid gap-2">
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  data-testid="button-cart-checkout"
                  className="w-full bg-accent text-accent-foreground py-3.5 px-4 font-bold text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full border border-foreground/20 py-2.5 px-4 font-mono text-[11px] uppercase tracking-wider text-center text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  Request Official Corporate Proforma (Net-30)
                </Link>
              </div>

              <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={12} className="text-accent" /> ISO 9001:2015
                </span>
                <span>•</span>
                <span>Dispatch within 24h</span>
                <span>•</span>
                <span>RoHS / REACH</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CartDrawer;
