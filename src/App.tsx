import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Factory, Menu,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, X, ShoppingBag, Box, Truck,
  Star, CheckCircle2, Sliders, Layers, Award, Info, FileText, Plus, Minus,
  MessageSquare, Phone, Mail, MapPin, Globe, Download, Eye, ExternalLink, RefreshCw
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { FallingPinsBackground } from '@/components/FallingPinsBackground';
import { CartProvider, useCart, type Currency } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { CustomPinConfigurator } from './components/CustomPinConfigurator';
import { Checkout } from './pages/Checkout';
import { SampleKit } from './pages/SampleKit';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { getProduct, products, INDIAN_SIZE_CHART, PACKAGING_OPTIONS, type Product, type PackOption } from './data/products';

const queryClient = new QueryClient();

const navItems = [
  { href: '/products', label: 'Product Catalogue' },
  { href: '/size-chart', label: 'Indian Size Chart' },
  { href: '/custom-quote', label: 'Bulk RFQ & Pricing' },
  { href: '/packaging', label: 'Ring Bunches & OEM' },
  { href: '/manufacturing', label: 'Kanyakumari Plant' },
  { href: '/quality', label: 'Quality & ISO' },
  { href: '/samples', label: 'Free Sample Box' },
  { href: '/contact', label: 'Contact & Export Desk' },
];

function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount, setIsCartOpen, currency, setCurrency } = useCart();

  return (
    <div className="min-h-[100dvh] bg-background relative text-foreground flex flex-col justify-between selection:bg-accent selection:text-accent-foreground">
      <FallingPinsBackground />
      <CartDrawer />

      {/* Top Utility Announcement Bar */}
      <div className="bg-sidebar text-sidebar-foreground px-4 py-2 text-[11px] font-mono border-b border-sidebar-foreground/15">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-accent font-bold">
              <span className="text-base leading-none">🇮🇳</span> Make in India • Kanyakumari, Tamil Nadu Precision Mill
            </span>
            <span className="hidden sm:inline text-sidebar-foreground/40">•</span>
            <span className="hidden sm:inline text-sidebar-foreground/80">
              Supplying Tirupur Hub & Exporting via Tuticorin Port (INTUT1)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/919876543210?text=Hello%20Kanyakumari%20Safety%20Pins%20Tamil%20Nadu%2C%20I%20would%20like%20to%20inquire%20about%20safety%20pins%20wholesale%20rates%20in%20Rupees."
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
            >
              <MessageSquare size={13} />
              <span className="hidden md:inline">Tamil Nadu Helpline:</span> +91-98765-43210
            </a>

            <span className="text-sidebar-foreground/40">•</span>

            {/* Currency Selector */}
            <div className="flex items-center gap-1">
              <span className="text-sidebar-foreground/60 hidden sm:inline">CURRENCY:</span>
              {(['INR', 'USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded-xs font-bold transition-all ${
                    currency === c
                      ? 'bg-accent text-accent-foreground shadow-xs'
                      : 'text-sidebar-foreground/70 hover:text-sidebar-foreground'
                  }`}
                >
                  {c === 'INR' ? 'INR (₹)' : c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-4 md:px-8">
          <Link href="/" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" data-testid="link-logo">
            <div className="grid h-10 w-10 place-items-center bg-sidebar text-white rounded-xs border border-sidebar-foreground/30 font-display font-extrabold text-lg">
              KK
            </div>
            <div>
              <div className="font-display text-base font-extrabold tracking-tight flex items-center gap-1.5">
                KANYAKUMARI SAFETY PINS <span className="text-[10px] bg-accent/20 text-accent font-mono px-1.5 py-0.5 rounded-xs font-bold">TAMIL NADU</span>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                Precision Pin Manufacturer & Exporter
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold tracking-wider uppercase transition-colors hover:text-accent ${
                  location === item.href ? 'text-accent border-b-2 border-accent pb-1' : 'text-foreground/80'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 border border-foreground/20 bg-card px-3.5 py-2 text-xs font-mono font-bold hover:border-accent hover:text-accent transition-colors rounded-xs shadow-xs"
              aria-label="Open order cart"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">CART / RFQ</span>
              <span className="grid h-5 w-5 place-items-center bg-accent text-accent-foreground text-[10px] font-bold rounded-full">
                {itemCount}
              </span>
            </button>

            {/* Quick RFQ Action */}
            <Link
              href="/custom-quote"
              className="hidden items-center gap-2 bg-accent hover:bg-accent/90 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-accent-foreground transition-transform hover:-translate-y-0.5 sm:flex rounded-xs shadow-sm"
            >
              Instant RFQ <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              className="grid h-10 w-10 place-items-center border border-foreground/20 lg:hidden rounded-xs"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {menuOpen && (
          <div className="border-t border-foreground/10 bg-background px-5 py-5 lg:hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-foreground/10 py-3 font-display text-base flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="text-accent" size={16} />
                </Link>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/custom-quote"
                  onClick={() => setMenuOpen(false)}
                  className="bg-accent px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-accent-foreground rounded-xs"
                >
                  Bulk RFQ
                </Link>
                <Link
                  href="/samples"
                  onClick={() => setMenuOpen(false)}
                  className="border border-foreground/20 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider rounded-xs"
                >
                  Free Samples
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-sidebar px-5 py-12 text-sidebar-foreground md:px-10 md:py-16 border-t border-sidebar-foreground/15 mt-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center bg-accent text-accent-foreground font-display font-black text-base rounded-xs">
                KK
              </div>
              <span className="font-display text-base font-extrabold tracking-tight">
                KANYAKUMARI SAFETY PINS (TAMIL NADU)
              </span>
            </div>
            <p className="max-w-sm text-xs leading-6 text-sidebar-foreground/75">
              Manufacturer & global exporter of high-precision steel, solid brass, pear bulb, and bunched ring safety pins from Kanyakumari District, Tamil Nadu, India. Supplying Tirupur knitwear, dry cleaners, and global garment brands.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-[10px] font-mono text-accent">
              <span className="border border-sidebar-foreground/20 px-2 py-1 bg-sidebar-foreground/5">🇮🇳 MADE IN TAMIL NADU</span>
              <span className="border border-sidebar-foreground/20 px-2 py-1 bg-sidebar-foreground/5">ISO 9001:2015</span>
              <span className="border border-sidebar-foreground/20 px-2 py-1 bg-sidebar-foreground/5">TUTICORIN PORT (INTUT1)</span>
              <span className="border border-sidebar-foreground/20 px-2 py-1 bg-sidebar-foreground/5">OEKO-TEX 100</span>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-4 text-accent font-bold">Product Categories</p>
            <ul className="space-y-2.5 text-xs text-sidebar-foreground/80">
              <li><Link href="/products" className="hover:text-accent transition-colors">Standard Steel Safety Pins</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Pure Brass Golden Pins (100% Rust-Proof)</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Bunched Ring Packs (12/24 Pins on Master)</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Pear / Gourd / Bulb Hangtag Pins</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Coil-less Anti-Snag Silk Pins</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Heavy-Duty Industrial Laundry Pins</Link></li>
              <li><Link href="/products" className="hover:text-accent transition-colors">Marine & Surgical 316 Stainless</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-accent font-bold">Quick Technical Links</p>
            <ul className="space-y-2.5 text-xs text-sidebar-foreground/80">
              <li><Link href="/size-chart" className="hover:text-accent transition-colors">Indian Standard Size Chart (#000 - #6)</Link></li>
              <li><Link href="/custom-quote" className="hover:text-accent transition-colors">Bulk RFQ & Cost Estimator (₹ INR)</Link></li>
              <li><Link href="/packaging" className="hover:text-accent transition-colors">Ring Bunches & OEM Packaging</Link></li>
              <li><Link href="/samples" className="hover:text-accent transition-colors">Order Free 12-Size Sample Box</Link></li>
              <li><Link href="/manufacturing" className="hover:text-accent transition-colors">Kanyakumari Wire Forming Mill</Link></li>
              <li><Link href="/quality" className="hover:text-accent transition-colors">Quality Control & Salt-Spray Tests</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4 text-accent font-bold">Plant Address & Logistics</p>
            <div className="space-y-2 text-xs text-sidebar-foreground/80 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-accent shrink-0 mt-0.5" />
                <span>Plot 18-22, Cape Industrial Estate, Nagercoil – Kanyakumari Highway, Kanyakumari District, Tamil Nadu - 629702, India.</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-accent shrink-0" />
                <span>sales@kanyakumaripins.com / exports@kanyakumaripins.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-accent shrink-0" />
                <span>+91 98765 43210 / +91 4652 245678</span>
              </p>
              <p className="flex items-center gap-2">
                <Globe size={14} className="text-accent shrink-0" />
                <span>Ports: Tuticorin Port (VO Chidambaranar), Cochin Port, Chennai</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-sidebar-foreground/15 pt-6 text-[11px] text-sidebar-foreground/60 md:flex-row font-mono">
          <span>© {new Date().getFullYear()} Kanyakumari Safety Pins & Fasteners (Tamil Nadu, India). All Rights Reserved.</span>
          <span>GST Registered Manufacturer • Direct Dispatch to Tirupur, Karur, Coimbatore, Chennai & Worldwide.</span>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow flex items-center gap-2 text-accent font-bold">
      <span className="h-px w-6 bg-accent" />
      {children}
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT CARD COMPONENT
// ----------------------------------------------------
function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  const { addItem, formatPrice } = useCart();
  const defaultPack = product.packs.find((p) => p.popular) || product.packs[0];

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Kanyakumari Safety Pins (Tamil Nadu),\n` +
      `I would like to inquire about bulk rates in Rupees (₹) for:\n` +
      `• Product: ${product.name} (${product.code})\n` +
      `• Available Sizes: ${product.sizes.join(', ')}\n` +
      `• Finish: ${product.finish}\n` +
      `Please provide factory quotation & dispatch time to our location.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group border border-foreground/15 bg-card hover:border-accent/80 transition-all shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between rounded-xs overflow-hidden"
    >
      <div>
        {/* Product Image Header */}
        <div className="relative aspect-[16/10] bg-secondary/30 overflow-hidden border-b border-foreground/10">
          <img
            src={product.imageUrl || '/images/indian-safety-pins-hero.jpg'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
          />
          <div className="absolute top-2.5 left-2.5 bg-sidebar/85 text-sidebar-foreground px-2 py-1 text-[10px] font-mono font-bold backdrop-blur-xs rounded-xs">
            {product.code}
          </div>
          <div className="absolute top-2.5 right-2.5 bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-xs">
            {product.family.split(' ')[0]}
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-base font-bold group-hover:text-accent transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
            {product.short}
          </p>

          {/* Quick Specs Pill Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono border-t border-foreground/10 pt-3 text-muted-foreground">
            <div>
              <span className="text-[10px] uppercase text-muted-foreground/80 block">Wire Gauge:</span>
              <strong className="text-foreground">{product.wireGauge.split('(')[0]}</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase text-muted-foreground/80 block">Corrosion Salt:</span>
              <strong className="text-foreground">{product.dimensions.corrosionHours.split(' ')[0]}</strong>
            </div>
          </div>

          {/* Sizes Tag Bar */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((s) => (
              <span key={s} className="bg-secondary px-1.5 py-0.5 text-[10px] font-mono rounded-xs text-foreground/80">
                {s.split(' ')[0]} {s.split(' ')[1]}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-[10px] font-mono text-muted-foreground self-center">
                +{product.sizes.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer & Action CTAs */}
      <div className="p-5 pt-0 border-t border-foreground/10 mt-3 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono text-muted-foreground block">Factory Price</span>
          <span className="font-display text-base font-bold text-accent">
            {formatPrice(defaultPack.unitPrice)} <span className="text-[10px] font-mono text-muted-foreground font-normal">/pc</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleWhatsAppInquiry}
            title="Inquire on WhatsApp"
            className="p-2 border border-emerald-600/30 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-xs transition-colors"
          >
            <MessageSquare size={14} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              addItem(product, product.sizes[0], defaultPack, 1);
            }}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-2 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1 shadow-xs transition-transform active:scale-95"
          >
            <ShoppingBag size={13} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL MODAL
// ----------------------------------------------------
function ProductModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedPackId, setSelectedPackId] = useState<string>('');
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0];
  const currentPack = product.packs.find((p) => p.id === selectedPackId) || product.packs[0];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*INQUIRY: ${product.name}*\n` +
      `• Code: ${product.code}\n` +
      `• Selected Size: ${currentSize}\n` +
      `• Selected Pack: ${currentPack.name} (${currentPack.count.toLocaleString()} pcs)\n` +
      `• Quantity: ${qty} pack(s) = ${(qty * currentPack.count).toLocaleString()} pcs\n` +
      `• Finish: ${product.finish}\n` +
      `Please provide GST tax invoice & delivery schedule from Kanyakumari.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-background border border-foreground/20 shadow-2xl rounded-xs overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 hover:bg-background text-foreground border border-foreground/20 rounded-xs"
        >
          <X size={18} />
        </button>

        <div className="grid md:grid-cols-[1.1fr_1.3fr] max-h-[85vh] overflow-y-auto">
          {/* Left Media Column */}
          <div className="p-6 bg-secondary/30 border-r border-foreground/10 flex flex-col justify-between">
            <div>
              <div className="aspect-[4/3] bg-background border border-foreground/15 rounded-xs overflow-hidden mb-4">
                <img
                  src={product.imageUrl || '/images/indian-safety-pins-hero.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between border-b border-foreground/10 pb-1.5">
                  <span className="text-muted-foreground">Product Code:</span>
                  <span className="font-bold text-foreground">{product.code}</span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1.5">
                  <span className="text-muted-foreground">Material Wire:</span>
                  <span className="font-bold text-foreground text-right">{product.wire}</span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1.5">
                  <span className="text-muted-foreground">Wire Gauge:</span>
                  <span className="font-bold text-foreground">{product.wireGauge}</span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1.5">
                  <span className="text-muted-foreground">Surface Finish:</span>
                  <span className="font-bold text-foreground text-right">{product.finish}</span>
                </div>
                <div className="flex justify-between border-b border-foreground/10 pb-1.5">
                  <span className="text-muted-foreground">Tensile Strength:</span>
                  <span className="font-bold text-accent">{product.dimensions.tensileStrengthN}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plant Origin:</span>
                  <span className="font-bold text-foreground">Kanyakumari, Tamil Nadu</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-foreground/10">
              <div className="flex flex-wrap gap-1.5">
                {product.compliance.map((c) => (
                  <span key={c} className="bg-secondary px-2 py-0.5 text-[10px] font-mono rounded-xs text-foreground/80">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Configuration Column */}
          <div className="p-6 md:p-8 space-y-6">
            <div>
              <span className="eyebrow text-accent">{product.family} • Made in Kanyakumari</span>
              <h2 className="font-display text-2xl font-bold text-foreground mt-1">
                {product.name}
              </h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-2">Select Safety Pin Size:</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.sizes.map((sz) => (
                  <button
                    type="button"
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`p-2 text-left border text-xs font-mono rounded-xs transition-all ${
                      currentSize === sz
                        ? 'border-accent bg-accent/10 font-bold text-foreground ring-1 ring-accent'
                        : 'border-foreground/15 hover:border-foreground/40 bg-background'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Options */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-2">Select Packaging Unit:</label>
              <div className="space-y-2">
                {product.packs.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedPackId(p.id)}
                    className={`p-3 border text-xs flex items-center justify-between cursor-pointer rounded-xs transition-all ${
                      currentPack.id === p.id
                        ? 'border-accent bg-accent/5 ring-1 ring-accent font-semibold'
                        : 'border-foreground/15 hover:border-foreground/30'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-foreground flex items-center gap-2">
                        <span>{p.name}</span>
                        {p.popular && (
                          <span className="bg-accent/20 text-accent text-[9px] font-mono px-1.5 py-0.2 rounded-xs">
                            MOST POPULAR
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-muted-foreground font-mono">
                        {p.count.toLocaleString()} pieces • {formatPrice(p.unitPrice)} / pc
                      </span>
                    </div>
                    <div className="text-right font-display text-sm font-bold text-accent">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Order Buttons */}
            <div className="pt-4 border-t border-foreground/10 space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-foreground/20 rounded-xs bg-background">
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-2.5 hover:bg-secondary text-foreground"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-mono font-bold text-xs">{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    className="p-2.5 hover:bg-secondary text-foreground"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="flex-1 text-right">
                  <span className="text-[11px] text-muted-foreground block font-mono">
                    Total: {(qty * currentPack.count).toLocaleString()} pcs
                  </span>
                  <span className="font-display text-xl font-bold text-accent">
                    {formatPrice(currentPack.price * qty)}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addItem(product, currentSize, currentPack, qty);
                    onClose();
                  }}
                  className="bg-accent text-accent-foreground py-3 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 shadow-md hover:brightness-105"
                >
                  <ShoppingBag size={15} />
                  <span>Add to Order Cart</span>
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>WhatsApp Quote</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// HOMEPAGE
// ----------------------------------------------------
function Home() {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const categories = [
    { id: 'ALL', label: 'All Safety Pins' },
    { id: 'STANDARD', label: 'Standard Steel Nickel' },
    { id: 'BRASS', label: 'Pure Brass (Golden)' },
    { id: 'BUNCH', label: 'Bunched Ring Packs' },
    { id: 'HANGTAG', label: 'Pear / Bulb Hangtag' },
    { id: 'HEAVY', label: 'Heavy Duty Laundry' },
    { id: 'STAINLESS', label: 'Stainless 316' },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'ALL') return products;
    if (selectedCategory === 'STANDARD') return products.filter((p) => p.family.includes('Standard'));
    if (selectedCategory === 'BRASS') return products.filter((p) => p.family.includes('Premium') || p.name.includes('Brass'));
    if (selectedCategory === 'BUNCH') return products.filter((p) => p.id.includes('bunched'));
    if (selectedCategory === 'HANGTAG') return products.filter((p) => p.family.includes('Fashion') || p.name.includes('Pear'));
    if (selectedCategory === 'HEAVY') return products.filter((p) => p.family.includes('Heavy'));
    if (selectedCategory === 'STAINLESS') return products.filter((p) => p.id.includes('stainless'));
    return products;
  }, [selectedCategory]);

  return (
    <>
      <ProductModal product={activeProductModal} onClose={() => setActiveProductModal(null)} />

      {/* Hero Section */}
      <section className="bg-sidebar text-sidebar-foreground py-16 md:py-24 border-b border-sidebar-foreground/15 relative overflow-hidden">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8 grid md:grid-cols-[1.1fr_0.9fr] items-center gap-10">
          <div>
            <div className="inline-flex items-center gap-2 bg-sidebar-foreground/10 border border-sidebar-foreground/20 px-3 py-1 text-xs font-mono text-accent rounded-xs mb-6">
              <span>🇮🇳</span>
              <span>KANYAKUMARI, TAMIL NADU • DIRECT MILL RATES (₹ RUPEES)</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
              PRECISION SAFETY PINS<br />
              <span className="text-accent">FROM KANYAKUMARI, TAMIL NADU.</span>
            </h1>

            <p className="mt-6 text-sm sm:text-base text-sidebar-foreground/80 max-w-xl leading-relaxed">
              Precision high-tensile safety pins manufactured in Kanyakumari District, Tamil Nadu. Directly supplying the Tirupur garment export cluster, Karur home textiles, Coimbatore, and global apparel brands across 50+ countries via Tuticorin Port.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-xs shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <span>View Product Catalogue</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/custom-quote"
                className="border border-sidebar-foreground/35 hover:border-accent text-sidebar-foreground hover:text-accent px-6 py-3.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-xs transition-colors"
              >
                <span>Bulk RFQ in Rupees (₹)</span>
                <Sliders size={15} />
              </Link>
              <Link
                href="/samples"
                className="bg-sidebar-foreground/10 hover:bg-sidebar-foreground/20 text-sidebar-foreground px-5 py-3.5 font-bold text-xs uppercase tracking-wider flex items-center gap-2 rounded-xs transition-colors"
              >
                <Box size={15} className="text-accent" />
                <span>Free Sample Box</span>
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-sidebar-foreground/15 pt-6 font-mono text-xs">
              <div>
                <strong className="block text-xl font-bold font-display text-white">500M+</strong>
                <span className="text-[10px] text-sidebar-foreground/60 uppercase">Annual Pin Output</span>
              </div>
              <div>
                <strong className="block text-xl font-bold font-display text-white">Tuticorin</strong>
                <span className="text-[10px] text-sidebar-foreground/60 uppercase">Export Port Hub</span>
              </div>
              <div>
                <strong className="block text-xl font-bold font-display text-white">±0.015 mm</strong>
                <span className="text-[10px] text-sidebar-foreground/60 uppercase">Wire Tolerance</span>
              </div>
              <div>
                <strong className="block text-xl font-bold font-display text-accent">ISO 9001</strong>
                <span className="text-[10px] text-sidebar-foreground/60 uppercase">Tamil Nadu Quality</span>
              </div>
            </div>
          </div>

          {/* Hero Image Showcase */}
          <div className="relative">
            <div className="border border-sidebar-foreground/20 rounded-xs overflow-hidden shadow-2xl bg-sidebar/50">
              <img
                src="/images/indian-safety-pins-hero.jpg"
                alt="Kanyakumari Tamil Nadu manufactured safety pins silver nickel and golden brass"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-sidebar border-t border-sidebar-foreground/15 flex items-center justify-between text-xs font-mono">
                <span className="text-sidebar-foreground/80 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Kanyakumari Plant • Direct Factory Rates
                </span>
                <span className="text-accent font-bold">₹ Prices Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase & Catalogue Section */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/15 pb-6 mb-10">
          <div>
            <SectionLabel>Manufactured in Kanyakumari, Tamil Nadu</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
              Safety Pin Range & Pricing (₹)
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Precision cold-drawn spring wire safety pins for garment tagging, retail packaging, laundries, and textile export.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-xs transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-accent text-accent-foreground shadow-xs'
                    : 'bg-secondary text-foreground/80 hover:bg-secondary/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setActiveProductModal} />
          ))}
        </div>
      </section>

      {/* Indian Standard Size Chart Matrix Section */}
      <section className="bg-secondary/40 border-y border-foreground/10 py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <SectionLabel>Tamil Nadu Standard Engineering Matrix</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">
              Indian Standard Safety Pin Size Chart
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Standard Indian size numbering (#000 to #6), lengths in millimeters, SWG wire diameters, and pieces per kilogram.
            </p>
          </div>

          <div className="overflow-x-auto border border-foreground/15 bg-card shadow-sm rounded-xs">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-sidebar text-sidebar-foreground text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="p-4 border-b border-sidebar-foreground/20">Indian Size No.</th>
                  <th className="p-4 border-b border-sidebar-foreground/20">Length (MM)</th>
                  <th className="p-4 border-b border-sidebar-foreground/20">Length (Inches)</th>
                  <th className="p-4 border-b border-sidebar-foreground/20">Wire Gauge (SWG / Dia)</th>
                  <th className="p-4 border-b border-sidebar-foreground/20">Approx Pcs / Kg</th>
                  <th className="p-4 border-b border-sidebar-foreground/20">Recommended Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {INDIAN_SIZE_CHART.map((row, idx) => (
                  <tr key={row.sizeNo} className={idx % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                    <td className="p-4 font-bold text-foreground flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      <span>{row.sizeNo}</span>
                    </td>
                    <td className="p-4 font-bold text-accent">{row.lengthMm} mm</td>
                    <td className="p-4 text-muted-foreground">{row.lengthInch}</td>
                    <td className="p-4 text-foreground">{row.wireGauge}</td>
                    <td className="p-4 text-muted-foreground">{row.pcsPerKg}</td>
                    <td className="p-4 font-sans text-xs text-foreground/80">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
            <span>* Fast dispatch across Tirupur, Karur, Coimbatore, Madurai, Chennai and global shipment via Tuticorin Port.</span>
            <Link href="/custom-quote" className="text-accent hover:underline flex items-center gap-1 font-bold">
              Calculate Bulk Quote in Rupees (₹) <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Packaging & OEM Solutions (Ring Bunches as shown in user image) */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
          <div>
            <SectionLabel>Tirupur & Export Line Ready</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
              Bunched Ring Packs on Master Safety Pin
            </h2>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
              We specialize in traditional South Indian bunched safety pins strung neatly on master ring pins (12, 24, or 36 pins per bunch). Ideal for rapid garment tag assembly lines in Tirupur, commercial laundries, and retail wholesale counters with zero tangles.
            </p>

            <div className="mt-8 space-y-4">
              {PACKAGING_OPTIONS.map((pkg) => (
                <div key={pkg.title} className="p-4 border border-foreground/15 bg-card rounded-xs flex gap-4">
                  <div className="w-20 h-20 bg-secondary shrink-0 rounded-xs overflow-hidden border border-foreground/10">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-foreground">{pkg.title}</h4>
                      <span className="text-[10px] font-mono bg-accent/15 text-accent px-1.5 py-0.5 rounded-xs font-bold">
                        MOQ: {pkg.moq}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-accent font-semibold mt-0.5">{pkg.subtitle}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{pkg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="border border-foreground/20 rounded-xs overflow-hidden shadow-xl bg-card">
              <img
                src="/images/safety-pin-ring-bunches.jpg"
                alt="Kanyakumari safety pin bunches on master safety pin ring"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-secondary/40 border-t border-foreground/10 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-foreground">FIG. 2.0 — MASTER RING PIN BUNCH PACK</span>
                <span className="text-accent font-bold">12 / 24 / 36 Pins per Bunch</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded RFQ Estimator */}
      <section className="bg-sidebar py-16 md:py-24 border-t border-sidebar-foreground/15">
        <div className="mx-auto max-w-[1440px] px-4 md:px-8">
          <CustomPinConfigurator />
        </div>
      </section>

      {/* Manufacturing Process & Quality Assurance */}
      <section className="mx-auto max-w-[1440px] px-4 md:px-8 py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>Kanyakumari Manufacturing Plant</SectionLabel>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-foreground">
            Precision Tamil Nadu Manufacturing Process
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Every safety pin undergoes a rigorous 6-stage automated forming, point-grinding, electroplating, and optical inspection cycle.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'High-Tensile Wire Drawing', desc: 'Cold-drawn high carbon steel (C70) & solid brass wire calibrated to strict ±0.015mm diameter tolerances.' },
            { step: '02', title: 'High-Speed Multi-Slide Forming', desc: 'Automatic pin-forming machines coil the spring helical base and form the protective clasp hood at 250 pcs/min.' },
            { step: '03', title: 'Needle Point Grinding & Polishing', desc: 'Ultra-sharp burr-free needle tip grinding ensures smooth fiber penetration without tearing textile threads.' },
            { step: '04', title: 'Multi-Layer Electro-Plating', desc: '8µm mirror nickel plating, brass lacquering, or electro-black coating with 72h+ ASTM B117 salt-spray resistance.' },
            { step: '05', title: 'Tempering & Spring Tension Test', desc: 'Computerized stress-testing guarantees 1,500+ open-close cycles without plastic deformation or clasp slippage.' },
            { step: '06', title: 'Optical Sorting & Export Packing', desc: 'Automated vision cameras inspect clasp alignment before bunching into master rings or bulk cartons.' },
          ].map((item) => (
            <div key={item.step} className="p-6 border border-foreground/15 bg-card rounded-xs shadow-xs">
              <div className="font-mono text-2xl font-bold text-accent mb-2">{item.step}</div>
              <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Free Sample Box CTA Banner */}
      <section className="bg-accent text-accent-foreground py-14 px-4 md:px-8">
        <div className="mx-auto max-w-[1440px] flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="eyebrow bg-black/20 text-white px-2 py-0.5 rounded-xs">NO COMMERCIAL OBLIGATION</span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold mt-2 text-white">
              Request a Free 12-Size Sample Box
            </h2>
            <p className="text-sm text-white/90 mt-1 max-w-xl">
              Inspect wire temper, clasp retention, and electroplating finish firsthand. Shipped across Tamil Nadu, India, and internationally.
            </p>
          </div>
          <Link
            href="/samples"
            className="bg-sidebar hover:bg-sidebar/90 text-white px-8 py-4 font-bold text-xs uppercase tracking-widest rounded-xs whitespace-nowrap shadow-xl flex items-center justify-center gap-2"
          >
            <Box size={16} />
            <span>Order Free Sample Box</span>
          </Link>
        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------
// CATALOGUE PAGE (PRODUCTS)
// ----------------------------------------------------
function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.finish.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });
  }, [searchTerm]);

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <ProductModal product={activeProductModal} onClose={() => setActiveProductModal(null)} />

      <div className="border-b border-foreground/15 pb-8 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <SectionLabel>Kanyakumari, Tamil Nadu Collection</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
            Safety Pins Catalogue & Rupee Rates
          </h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl">
            Browse our complete line of industrial, apparel, brass, laundry, and specialized safety pins manufactured in Tamil Nadu.
          </p>
        </div>

        <div className="w-full md:w-80 relative">
          <Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by code, size, finish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-foreground/20 bg-card pl-9 pr-4 py-2.5 text-xs outline-none focus:border-accent rounded-xs"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} onQuickView={setActiveProductModal} />
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL PAGE (DYNAMIC ROUTE)
// ----------------------------------------------------
function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || '');

  if (!product) {
    return <NotFound />;
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <ProductModal product={product} onClose={() => window.history.back()} />
    </div>
  );
}

// ----------------------------------------------------
// SIZE CHART STANDALONE PAGE
// ----------------------------------------------------
function SizeChartPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Technical Reference Guide</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
          Indian Standard Safety Pin Size Chart
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Standardized dimensional matrix for safety pins produced in Kanyakumari, Tamil Nadu from Size #000 (19mm) micro-pins to Size #6 (75mm/100mm) giant industrial pins.
        </p>
      </div>

      <div className="overflow-x-auto border border-foreground/15 bg-card shadow-sm rounded-xs">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-sidebar text-sidebar-foreground text-[11px] uppercase tracking-wider">
            <tr>
              <th className="p-4 border-b border-sidebar-foreground/20">Size No.</th>
              <th className="p-4 border-b border-sidebar-foreground/20">Length (MM)</th>
              <th className="p-4 border-b border-sidebar-foreground/20">Length (Inches)</th>
              <th className="p-4 border-b border-sidebar-foreground/20">Wire Gauge</th>
              <th className="p-4 border-b border-sidebar-foreground/20">Approx Pcs / Kg</th>
              <th className="p-4 border-b border-sidebar-foreground/20">Application</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-foreground/10">
            {INDIAN_SIZE_CHART.map((row, idx) => (
              <tr key={row.sizeNo} className={idx % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                <td className="p-4 font-bold text-foreground">{row.sizeNo}</td>
                <td className="p-4 font-bold text-accent">{row.lengthMm} mm</td>
                <td className="p-4 text-muted-foreground">{row.lengthInch}</td>
                <td className="p-4 text-foreground">{row.wireGauge}</td>
                <td className="p-4 text-muted-foreground">{row.pcsPerKg}</td>
                <td className="p-4 font-sans text-xs text-foreground/80">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 bg-secondary/40 border border-foreground/15 p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl font-bold text-foreground">Need Custom Sizing or Non-Standard Wire?</h3>
          <p className="text-xs text-muted-foreground mt-1">We engineer bespoke wire geometries from 0.50mm to 2.00mm wire diameter at our Kanyakumari mill.</p>
        </div>
        <Link href="/custom-quote" className="bg-accent text-accent-foreground px-6 py-3.5 font-bold text-xs uppercase tracking-wider rounded-xs whitespace-nowrap">
          Open RFQ Generator
        </Link>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// PACKAGING & OEM STANDALONE PAGE
// ----------------------------------------------------
function PackagingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-10">
        <SectionLabel>Private Label & Bulk Supply</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
          Packaging Formats & OEM Services
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          From traditional South Indian bunched ring packs to custom-printed retail blister cards and heavy-duty 7-ply export master cartons.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {PACKAGING_OPTIONS.map((pkg) => (
          <div key={pkg.title} className="border border-foreground/15 bg-card rounded-xs overflow-hidden shadow-sm flex flex-col justify-between">
            <div className="aspect-[16/9] bg-secondary border-b border-foreground/10 overflow-hidden">
              <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-display text-xl font-bold text-foreground">{pkg.title}</h3>
                  <span className="bg-accent/15 text-accent text-xs font-mono font-bold px-2 py-0.5 rounded-xs">
                    MOQ: {pkg.moq}
                  </span>
                </div>
                <p className="font-mono text-xs text-accent font-semibold">{pkg.subtitle}</p>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{pkg.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-foreground/10 flex justify-between items-center">
                <span className="text-[11px] font-mono text-muted-foreground">Custom Logo & Barcode Available</span>
                <Link href="/custom-quote" className="text-accent hover:underline text-xs font-bold font-mono flex items-center gap-1">
                  Inquire Packing <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// MANUFACTURING PLANT PAGE
// ----------------------------------------------------
function Manufacturing() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <SectionLabel>Plant Infrastructure</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
          Kanyakumari Manufacturing Plant
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Our advanced production facility in Kanyakumari District, Tamil Nadu operates 48 automated multi-slide cam forming lines, automated needle point grinders, and a zero-effluent electroplating facility.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="p-6 border border-foreground/15 bg-card rounded-xs">
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Factory className="text-accent" size={20} /> High-Speed Automatic Forming Lines
            </h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Operating precision high-speed pin forming machines designed to produce up to 250 safety pins per minute per line with repeatable spring tension.
            </p>
          </div>

          <div className="p-6 border border-foreground/15 bg-card rounded-xs">
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="text-accent" size={20} /> Coastal Humidity & Salt-Spray Resistance
            </h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Engineered in coastal Tamil Nadu with thick 8µm electro-nickel and solid brass alloys that withstand humidity, detergent wash cycles, and ocean shipping.
            </p>
          </div>

          <div className="p-6 border border-foreground/15 bg-card rounded-xs">
            <h3 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="text-accent" size={20} /> Strategic Port & Highway Logistics
            </h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Same-day truck dispatch to Tirupur garment hub, and direct container export shipping via Tuticorin Port (VO Chidambaranar Port) and Cochin Port.
            </p>
          </div>
        </div>

        <div>
          <div className="border border-foreground/20 rounded-xs overflow-hidden shadow-2xl bg-card">
            <img
              src="/images/indian-safety-pins-hero.jpg"
              alt="Kanyakumari Tamil Nadu safety pin manufacturing facility"
              className="w-full h-auto object-cover"
            />
            <div className="p-4 bg-sidebar text-sidebar-foreground text-xs font-mono flex justify-between">
              <span>Plant Capacity: 500M Pins/Year</span>
              <span className="text-accent font-bold">Kanyakumari, Tamil Nadu 🇮🇳</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// QUALITY & CERTIFICATIONS PAGE
// ----------------------------------------------------
function Quality() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-2xl mb-12">
        <SectionLabel>Quality Assurance</SectionLabel>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
          ISO 9001:2015 & Global Compliance
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Our products comply with strict international regulatory standards for heavy metals, chemical safety, tensile strength, and corrosion resistance.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { title: 'ISO 9001:2015', desc: 'Certified Quality Management System covering wire procurement, precision tooling, and packaging.' },
          { title: 'REACH (EC 1907/2006)', desc: 'Full compliance with European Union SVHC chemical restrictions for textile accessories.' },
          { title: 'RoHS Compliant', desc: 'Lead-free, cadmium-free, and mercury-safe plating chemistries tested via lab spectrometry.' },
          { title: 'Nickel-Safe EN 1811', desc: 'Compliant with low-release nickel migration standards for prolonged direct skin contact.' },
        ].map((item) => (
          <div key={item.title} className="p-6 border border-foreground/15 bg-card rounded-xs">
            <ShieldCheck className="text-accent mb-3" size={24} />
            <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border border-foreground/15 bg-secondary/30 p-8 rounded-xs font-mono text-xs space-y-3">
        <h3 className="font-display text-lg font-bold text-foreground font-sans">Mill Test Reports (MTR 3.1) Included</h3>
        <p className="text-muted-foreground leading-relaxed">
          With every export consignment from our Kanyakumari plant, we provide complete chemical composition analysis, wire tensile test data, and ASTM B117 salt-spray test certificates.
        </p>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CONTACT & EXPORT DESK PAGE
// ----------------------------------------------------
function Contact() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', destination: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setSent(true);
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(
      `Hello Kanyakumari Safety Pins (Tamil Nadu),\n` +
      `I would like to discuss an order in Rupees (₹):\n` +
      `• Name: ${form.name || 'Direct Buyer'}\n` +
      `• Company: ${form.company || 'N/A'}\n` +
      `• Location: ${form.destination || 'Tamil Nadu / India / Global'}\n` +
      `• Message: ${form.message || 'Please send catalogue and pricing in Rupees.'}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div>
          <SectionLabel>Tamil Nadu Sales & Export Desk</SectionLabel>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold mt-2 text-foreground">
            Contact Kanyakumari Mill
          </h1>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Our Tamil Nadu sales and international export team provides fast quotes in Rupees (₹) and international currencies. Direct truck delivery to Tirupur, Coimbatore, Chennai, and vessel loading at Tuticorin Port.
          </p>

          <div className="mt-8 space-y-4 text-xs font-mono">
            <div className="p-4 border border-foreground/15 bg-card rounded-xs flex items-start gap-3">
              <MapPin className="text-accent shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-foreground text-sm font-sans font-bold">Kanyakumari Manufacturing Plant</strong>
                <span className="text-muted-foreground">Plot 18-22, Cape Industrial Estate, Nagercoil – Kanyakumari Highway, Kanyakumari District, Tamil Nadu - 629702, India.</span>
              </div>
            </div>

            <div className="p-4 border border-foreground/15 bg-card rounded-xs flex items-start gap-3">
              <MessageSquare className="text-emerald-600 shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-foreground text-sm font-sans font-bold">WhatsApp Direct (+91)</strong>
                <span className="text-muted-foreground">+91 98765 43210 (Direct Factory Helpline)</span>
              </div>
            </div>

            <div className="p-4 border border-foreground/15 bg-card rounded-xs flex items-start gap-3">
              <Mail className="text-accent shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-foreground text-sm font-sans font-bold">Email Inquiries</strong>
                <span className="text-muted-foreground">sales@kanyakumaripins.com / exports@kanyakumaripins.com</span>
              </div>
            </div>

            <div className="p-4 border border-foreground/15 bg-card rounded-xs flex items-start gap-3">
              <Globe className="text-accent shrink-0 mt-0.5" size={18} />
              <div>
                <strong className="block text-foreground text-sm font-sans font-bold">Ports & Hubs</strong>
                <span className="text-muted-foreground">Tuticorin Port (INTUT1) • Cochin Port (INCOK1) • Chennai (INMAA1) • Tirupur Hub</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-foreground/15 bg-card p-6 md:p-10 rounded-xs shadow-xl">
          {sent ? (
            <div className="py-12 text-center">
              <CheckCircle2 size={48} className="text-emerald-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl font-bold text-foreground">Inquiry Sent Successfully!</h3>
              <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
                Thank you, {form.name}. Our Kanyakumari sales manager will reply with technical data and GST / Proforma rates in Rupees (₹) within 2 business hours.
              </p>
              <button
                type="button"
                onClick={handleWhatsAppDirect}
                className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xs inline-flex items-center gap-2"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground mb-1">Send Factory Inquiry (Rupees ₹)</h3>
              <p className="text-xs text-muted-foreground mb-4">Direct mill response within 2 hours</p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Murugan / Senthil / Ramesh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Company / Mill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tirupur Garments / Apex Textiles"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
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
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Delivery Destination / City</label>
                <input
                  type="text"
                  placeholder="e.g. Tirupur, Karur, Coimbatore, Chennai, Bangalore, Export via Tuticorin"
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Your Requirements / Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Please specify safety pin size (#00 to #5), wire gauge, finish (Silver/Golden/Black), ring bunches or boxes, and quantity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground py-3.5 px-4 font-bold text-xs uppercase tracking-widest rounded-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleWhatsAppDirect}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-4 font-bold text-xs uppercase tracking-widest rounded-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare size={15} />
                  <span>Inquire via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// ROUTER & ROOT APP
// ----------------------------------------------------
function AppRouter() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <SiteShell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/products" component={Products} />
          <Route path="/products/:id" component={ProductDetailPage} />
          <Route path="/size-chart" component={SizeChartPage} />
          <Route path="/packaging" component={PackagingPage} />
          <Route path="/custom-quote" component={() => (
            <div className="mx-auto max-w-[1440px] px-4 md:px-8 py-12 md:py-20">
              <CustomPinConfigurator />
            </div>
          )} />
          <Route path="/samples" component={SampleKit} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/manufacturing" component={Manufacturing} />
          <Route path="/quality" component={Quality} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </SiteShell>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <AppRouter />
          </WouterRouter>
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;