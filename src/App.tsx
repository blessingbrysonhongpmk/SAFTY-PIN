import { useMemo, useState, useRef, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, Factory, Menu,
  Search, ShieldCheck, Sparkles, X, ShoppingBag, Box, Truck,
  CheckCircle2, Plus, Minus, MessageSquare, Phone, Mail, MapPin,
  Building2, Scissors, Shirt, ShoppingCart, Store, PackageCheck,
  Award, HelpCircle, Layers, Tag, ExternalLink, SlidersHorizontal
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { CartProvider, useCart } from './context/CartContext';
import { CartDrawer } from './components/CartDrawer';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { getProduct, products, INDIAN_SIZE_CHART, PACKAGING_OPTIONS, type Product, type PackOption } from './data/products';

const queryClient = new QueryClient();

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
  'Agasteeswaram',
  'Killiyoor',
  'Other Kanyakumari Area',
];

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount, setIsCartOpen, formatPrice, subtotal } = useCart();

  const navLinks = [
    { href: '/', label: 'Wholesale Shop' },
    { href: '/products', label: 'All Products' },
    { href: '/sizes', label: 'Sizes & Prices' },
    { href: '/delivery', label: 'Kanyakumari Delivery' },
    { href: '/for-businesses', label: 'For Shops & Tailors' },
    { href: '/contact', label: 'Contact Desk' },
  ];

  return (
    <>
      {/* Top Local Delivery Utility Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 text-xs font-mono border-b border-slate-800">
        <div className="mx-auto max-w-[1360px] flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Kanyakumari District Wholesale Desk:</span>
            <span className="text-slate-300 hidden sm:inline">Direct supply to shops, tailors, textile & garment units</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:+919876543210"
              className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone size={13} className="text-orange-400" />
              <span>+91 98765 43210</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <a
              href="https://wa.me/919876543210?text=Hello%20Kanyakumari%20Safety%20Pins%2C%20I%20want%20to%20place%20a%20wholesale%20order%20for%20my%20shop."
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-bold"
            >
              <MessageSquare size={13} />
              <span>WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Commerce Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between px-4 sm:px-6">
          {/* Brand Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center bg-orange-600 text-white rounded-md font-display font-black text-lg shadow-xs">
              KK
            </div>
            <div>
              <div className="font-display text-base font-extrabold tracking-tight text-slate-900 leading-tight">
                KANYAKUMARI SAFETY PINS
              </div>
              <p className="font-mono text-[10px] text-orange-600 font-bold tracking-wider uppercase">
                B2B Wholesale Ordering Platform
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs font-bold uppercase tracking-wider transition-colors hover:text-orange-600 ${
                  location === item.href ? 'text-orange-600 border-b-2 border-orange-600 pb-1' : 'text-slate-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-md text-xs font-bold transition-all shadow-xs"
              aria-label="Open wholesale cart"
            >
              <ShoppingBag size={16} className="text-orange-400" />
              <span>ORDER CART</span>
              <span className="grid h-5 min-w-[20px] px-1 place-items-center bg-orange-600 text-white text-[11px] font-bold rounded-full">
                {itemCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              className="grid h-10 w-10 place-items-center border border-slate-300 rounded-md text-slate-700 lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden animate-in slide-in-from-top-2 duration-200 shadow-lg">
            <nav className="flex flex-col gap-1 text-sm font-medium">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 border-b border-slate-100 text-slate-800 hover:text-orange-600"
                >
                  <span>{item.label}</span>
                  <ArrowRight size={14} className="text-slate-400" />
                </Link>
              ))}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsCartOpen(true);
                  }}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>View Wholesale Order ({itemCount} items)</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-24 md:pb-14 border-t border-slate-800 mt-20">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="grid h-9 w-9 place-items-center bg-orange-600 text-white rounded-md font-display font-extrabold text-base">
                KK
              </div>
              <span className="font-display text-base font-extrabold text-white">
                KANYAKUMARI SAFETY PINS
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated B2B Wholesale Safety Pin supplier for retail shops, tailoring ateliers, garment units, and textile stores across Kanyakumari District, Tamil Nadu.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono text-orange-400">
              <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700">Kanyakumari District</span>
              <span className="bg-slate-800 px-2 py-1 rounded-sm border border-slate-700">Direct Mill Rates</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white mb-3">
              Wholesale Products
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link href="/products" className="hover:text-white transition-colors">Standard Nickel Safety Pins (#000 - #5)</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Pure Brass Golden Pins (100% Rustproof)</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Bunched Ring Packs (12/24 Pins on Master)</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Pear / Bulb Hangtag Pins</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Master Tailor Assorted Boxes</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Heavy-Duty Industrial Laundry Pins</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white mb-3">
              Kanyakumari Delivery Towns
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-400">
              <span>• Nagercoil</span>
              <span>• Marthandam</span>
              <span>• Thuckalay</span>
              <span>• Colachel</span>
              <span>• Karungal</span>
              <span>• Kuzhithurai</span>
              <span>• Suchindram</span>
              <span>• Aralvaimozhi</span>
              <span>• Padmanabhapuram</span>
              <span>• Kaliyakkavilai</span>
              <span>• Kulasekharam</span>
              <span>• Monday Market</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-white mb-3">
              Wholesale Order Helpline
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-orange-400 shrink-0 mt-0.5" />
                <span>Cape Industrial Estate, Nagercoil – Kanyakumari Highway, Kanyakumari District, Tamil Nadu - 629702.</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-orange-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white font-mono">+91 98765 43210 / +91 4652 245678</a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare size={15} className="text-emerald-400 shrink-0" />
                <span>WhatsApp Wholesale: +91 98765 43210</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500 font-mono">
          <span>© {new Date().getFullYear()} Kanyakumari Safety Pins Wholesale. All Rights Reserved.</span>
          <span>B2B Ordering Platform for Kanyakumari District Shops & Tailors.</span>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------
// QUICK WHOLESALE ORDER COMPONENT (RAPID 1-CLICK BUILDER)
// -----------------------------------------------------------------
function QuickWholesaleOrder() {
  const { addItem, formatPrice } = useCart();
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [selectedSize, setSelectedSize] = useState(products[0].sizes[2] || products[0].sizes[0]);
  const [selectedPackId, setSelectedPackId] = useState(products[0].packs[1]?.id || products[0].packs[0].id);
  const [quantityPacks, setQuantityPacks] = useState(5);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const currentPack = currentProduct.packs.find((p) => p.id === selectedPackId) || currentProduct.packs[0];

  const handleProductChange = (productId: string) => {
    setSelectedProductId(productId);
    const prod = products.find((p) => p.id === productId) || products[0];
    setSelectedSize(prod.sizes[0]);
    setSelectedPackId(prod.packs[1]?.id || prod.packs[0].id);
  };

  const handleQuickAdd = () => {
    addItem(currentProduct, selectedSize, currentPack, quantityPacks);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const calculatedTotal = currentPack.price * quantityPacks;
  const calculatedPieces = currentPack.count * quantityPacks;

  return (
    <div className="border border-slate-200 bg-white rounded-xl shadow-md p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5 mb-6">
        <div>
          <span className="eyebrow text-orange-600 font-bold">Fast Wholesale Builder</span>
          <h3 className="font-display text-2xl font-bold text-slate-900 mt-1">
            Quick Wholesale Order
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Select size, pack quantity, and add directly to your wholesale order.
          </p>
        </div>
        <div className="bg-orange-50 border border-orange-200 text-orange-800 text-xs px-3 py-1.5 rounded-md font-mono font-semibold self-start sm:self-auto">
          Instant Cart Addition
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 items-end">
        {/* Step 1: Pin Type */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            1. Pin Type
          </label>
          <select
            value={selectedProductId}
            onChange={(e) => handleProductChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
          >
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name.split('(')[0]}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Size */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            2. Safety Pin Size
          </label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
          >
            {currentProduct.sizes.map((sz) => (
              <option key={sz} value={sz}>
                {sz}
              </option>
            ))}
          </select>
        </div>

        {/* Step 3: Pack Packaging */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            3. Wholesale Packaging
          </label>
          <select
            value={selectedPackId}
            onChange={(e) => setSelectedPackId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 text-xs font-medium text-slate-900 outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
          >
            {currentProduct.packs.map((pk) => (
              <option key={pk.id} value={pk.id}>
                {pk.name} ({formatPrice(pk.price)})
              </option>
            ))}
          </select>
        </div>

        {/* Step 4: Number of Packs */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            4. Number of Packs
          </label>
          <div className="flex items-center border border-slate-300 rounded-md bg-white">
            <button
              type="button"
              onClick={() => setQuantityPacks(Math.max(1, quantityPacks - 1))}
              className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-l-md"
            >
              <Minus size={14} />
            </button>
            <span className="flex-1 text-center font-mono font-bold text-xs text-slate-900">
              {quantityPacks} {quantityPacks === 1 ? 'Pack' : 'Packs'}
            </span>
            <button
              type="button"
              onClick={() => setQuantityPacks(quantityPacks + 1)}
              className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-r-md"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Summary Strip & Add Button */}
      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-lg">
        <div className="text-xs font-mono space-y-0.5 text-center sm:text-left">
          <div className="text-slate-600">
            Selected: <strong className="text-slate-900">{selectedSize}</strong> • {currentPack.name} × {quantityPacks}
          </div>
          <div className="text-slate-500">
            Total Volume: <strong className="text-slate-900">{calculatedPieces.toLocaleString()} pieces</strong> | Total Price:{' '}
            <span className="font-display font-bold text-base text-orange-600">{formatPrice(calculatedTotal)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleQuickAdd}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-98"
        >
          {addedNotice ? (
            <>
              <Check size={16} />
              <span>Added to Order!</span>
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              <span>Add to Wholesale Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// PRODUCT CARD FOR WHOLESALE SHOPPING
// -----------------------------------------------------------------
function WholesaleProductCard({ product }: { product: Product }) {
  const { addItem, formatPrice } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedPackId, setSelectedPackId] = useState<string>(
    product.packs.find((p) => p.popular)?.id || product.packs[0].id
  );
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const currentPack = product.packs.find((p) => p.id === selectedPackId) || product.packs[0];

  const handleAdd = () => {
    addItem(product, selectedSize, currentPack, qty);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  return (
    <div className="border border-slate-200 bg-white rounded-xl shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden">
      <div>
        {/* Image & Badges */}
        <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden border-b border-slate-100">
          <img
            src={product.imageUrl || '/images/indian-safety-pins-hero.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm">
            {product.code}
          </div>
          <div className="absolute top-2.5 right-2.5 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm">
            Wholesale Pack
          </div>
        </div>

        {/* Details */}
        <div className="p-5">
          <h3 className="font-display text-base font-bold text-slate-900 leading-snug">
            {product.name}
          </h3>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {product.short}
          </p>

          {/* Size Selector */}
          <div className="mt-4">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Size:
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {product.sizes.slice(0, 4).map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => setSelectedSize(sz)}
                  className={`px-2 py-1.5 text-left text-xs font-mono rounded-md border transition-all ${
                    selectedSize === sz
                      ? 'border-orange-600 bg-orange-50 font-bold text-orange-950 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50'
                  }`}
                >
                  {sz.split(' ')[0]} {sz.split(' ')[1]}
                </button>
              ))}
            </div>
            {product.sizes.length > 4 && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mt-1.5 w-full bg-slate-50 border border-slate-200 rounded-md p-1.5 text-xs font-mono text-slate-700 outline-none"
              >
                {product.sizes.map((sz) => (
                  <option key={sz} value={sz}>
                    {sz}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Pack Options */}
          <div className="mt-4">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Wholesale Pack:
            </label>
            <div className="space-y-1.5">
              {product.packs.map((pk) => (
                <div
                  key={pk.id}
                  onClick={() => setSelectedPackId(pk.id)}
                  className={`p-2.5 border rounded-md text-xs cursor-pointer flex items-center justify-between transition-all ${
                    currentPack.id === pk.id
                      ? 'border-orange-600 bg-orange-50/60 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-slate-900 block">{pk.name}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {pk.count.toLocaleString()} pcs • {formatPrice(pk.unitPrice)}/pc
                    </span>
                  </div>
                  <div className="font-display font-bold text-slate-900 text-sm">
                    {formatPrice(pk.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Add Action */}
      <div className="p-5 pt-0 border-t border-slate-100 mt-2">
        <div className="pt-3 flex items-center justify-between gap-3">
          {/* Quantity */}
          <div className="flex items-center border border-slate-300 rounded-md bg-white">
            <button
              type="button"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Decrease quantity"
            >
              <Minus size={13} />
            </button>
            <span className="px-3 font-mono font-bold text-xs text-slate-900">{qty}</span>
            <button
              type="button"
              onClick={() => setQty(qty + 1)}
              className="p-2 text-slate-600 hover:bg-slate-100"
              aria-label="Increase quantity"
            >
              <Plus size={13} />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleAdd}
            className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-2.5 px-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-transform active:scale-98"
          >
            {justAdded ? (
              <>
                <Check size={14} />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add to Order ({formatPrice(currentPack.price * qty)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// WHOLESALE SHOPPING / HOMEPAGE
// -----------------------------------------------------------------
function WholesaleShopHome() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const catalogueRef = useRef<HTMLDivElement>(null);
  const sizeChartRef = useRef<HTMLDivElement>(null);

  const scrollToCatalogue = () => {
    catalogueRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSizeChart = () => {
    sizeChartRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const categories = [
    { id: 'ALL', label: 'All Wholesale Pins' },
    { id: 'STANDARD', label: 'Standard Nickel Steel' },
    { id: 'BRASS', label: 'Pure Brass Golden (100% Rustproof)' },
    { id: 'BUNCH', label: 'Bunched Ring Packs' },
    { id: 'HANGTAG', label: 'Pear / Bulb Tag Pins' },
    { id: 'TAILOR', label: 'Tailor Box Combos' },
    { id: 'HEAVY', label: 'Heavy Duty Laundry' },
  ];

  const filtered = useMemo(() => {
    if (activeCategory === 'ALL') return products;
    if (activeCategory === 'STANDARD') return products.filter((p) => p.family.includes('Standard'));
    if (activeCategory === 'BRASS') return products.filter((p) => p.name.includes('Brass') || p.id.includes('brass'));
    if (activeCategory === 'BUNCH') return products.filter((p) => p.id.includes('bunched'));
    if (activeCategory === 'HANGTAG') return products.filter((p) => p.name.includes('Pear') || p.family.includes('Fashion'));
    if (activeCategory === 'TAILOR') return products.filter((p) => p.id.includes('assorted') || p.name.includes('Tailor'));
    if (activeCategory === 'HEAVY') return products.filter((p) => p.family.includes('Heavy') || p.id.includes('heavy'));
    return products;
  }, [activeCategory]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION (COMMERCE-FOCUSED) */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200 py-12 md:py-20">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
            {/* Hero Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-900 border border-orange-200 px-3 py-1 rounded-full text-xs font-mono font-bold mb-5">
                <span>📍</span> KANYAKUMARI DISTRICT WHOLESALE B2B
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
                SAFETY PINS<br />
                <span className="text-orange-600">DELIVERED ACROSS KANYAKUMARI</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Wholesale Safety Pins in multiple sizes for shops, tailors, textile businesses and garment units.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={scrollToCatalogue}
                  className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white px-7 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <ShoppingBag size={16} />
                  <span>ORDER SAFETY PINS</span>
                </button>
                <button
                  type="button"
                  onClick={scrollToSizeChart}
                  className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
                >
                  <span>VIEW SIZES & PRICES</span>
                  <ArrowDown size={14} />
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="mt-10 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6 font-mono text-xs text-slate-600">
                <div>
                  <strong className="block text-slate-900 font-display font-bold text-sm">₹ Direct Rates</strong>
                  <span>Mill Wholesale Prices</span>
                </div>
                <div>
                  <strong className="block text-slate-900 font-display font-bold text-sm">All Pin Sizes</strong>
                  <span>Small, Med, Large, Bunched</span>
                </div>
                <div>
                  <strong className="block text-slate-900 font-display font-bold text-sm">Door Delivery</strong>
                  <span>Across Kanyakumari</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Showcase */}
            <div>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-lg p-2">
                <img
                  src="/images/indian-safety-pins-hero.jpg"
                  alt="Wholesale Safety Pins Kanyakumari Tamil Nadu"
                  className="w-full h-auto object-cover rounded-lg"
                />
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-md mt-2 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    Wholesale Packs Ready for Dispatch
                  </span>
                  <span className="text-orange-600 font-bold">100 / 1,000 / 10,000 Pcs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK WHOLESALE ORDER AREA */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <QuickWholesaleOrder />
      </section>

      {/* 3. SAFETY PIN PRODUCT CATALOGUE (CORE SECTION) */}
      <section ref={catalogueRef} className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div>
            <span className="eyebrow text-orange-600 font-bold">Wholesale Stock Catalogue</span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 mt-1">
              Choose Safety Pin Products & Packs
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select pack quantity and click "ADD TO ORDER" to build your wholesale consignment.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-md transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <WholesaleProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. KANYAKUMARI LOCAL ORDERING & DELIVERY AREA */}
      <section className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="eyebrow text-orange-600 font-bold">District Delivery & Supply</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              ORDER FROM ANYWHERE IN KANYAKUMARI
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              We supply retail shops, tailoring ateliers, garment units, and textile stores across all major taluks and towns of Kanyakumari District.
            </p>
          </div>

          {/* Towns Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-10">
            {KANYAKUMARI_AREAS.slice(0, 12).map((town) => (
              <div
                key={town}
                className="bg-white border border-slate-200 p-3.5 rounded-lg text-center shadow-xs hover:border-orange-500 transition-colors"
              >
                <MapPin size={16} className="text-orange-600 mx-auto mb-1" />
                <strong className="block text-xs font-bold text-slate-900 font-display">{town}</strong>
                <span className="text-[10px] font-mono text-slate-500">Local Delivery</span>
              </div>
            ))}
          </div>

          {/* Delivery Policy Details */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-xl shadow-xs grid sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="flex gap-3 items-start">
              <Truck size={20} className="text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold text-sm font-sans">Shop Doorstep Delivery</strong>
                <p className="text-slate-500 mt-1 font-sans">Direct delivery to retail counters, tailoring shops, and textile units.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <PackageCheck size={20} className="text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold text-sm font-sans">Wholesale Pack Cartons</strong>
                <p className="text-slate-500 mt-1 font-sans">Sealed boxes and master cartons with intact piece count guarantee.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start">
              <Building2 size={20} className="text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-bold text-sm font-sans">Flexible Billing</strong>
                <p className="text-slate-500 mt-1 font-sans">GST Tax Invoice, Cash on Delivery, and UPI / Bank payment options.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BUILT FOR KANYAKUMARI BUSINESSES */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="eyebrow text-orange-600 font-bold">Local Business Solutions</span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            BUILT FOR KANYAKUMARI BUSINESSES
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Tailored wholesale packaging and pin geometries for local industry requirements.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Scissors,
              title: 'TAILORING SHOPS',
              desc: 'Sharp needle-point pins for saree pleating, basting, blouse alterations, and trial fittings without damaging fabric.',
            },
            {
              icon: Shirt,
              title: 'GARMENT SHOPS',
              desc: 'Pear bulb pins and bunched pins for price tag attachments, garment folding, and display hanging.',
            },
            {
              icon: Layers,
              title: 'TEXTILE STORES',
              desc: 'High-strength steel and brass pins for securing fabric bundles, saree draping, and bulk textile bolts.',
            },
            {
              icon: Store,
              title: 'RETAIL SHOPS',
              desc: 'Ready-to-sell 100-piece consumer packets and wholesale master cards with high retail profit margins.',
            },
            {
              icon: Award,
              title: 'UNIFORM MAKERS',
              desc: 'Heavy-gauge pins for multi-layer school, security, and industrial uniform alignment during mass stitching.',
            },
            {
              icon: ShoppingCart,
              title: 'WHOLESALERS',
              desc: 'Bulk corrugated cartons and master ring bunches with tiered distributor discounts across Kanyakumari.',
            },
          ].map((item) => (
            <div key={item.title} className="p-6 border border-slate-200 bg-white rounded-xl shadow-xs">
              <item.icon size={24} className="text-orange-600 mb-3" />
              <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INDIAN SIZE CHART & DIMENSIONS */}
      <section ref={sizeChartRef} className="bg-slate-50 border-y border-slate-200 py-16">
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow text-orange-600 font-bold">Standard Sizing Matrix</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Indian Standard Size Chart & Uses
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Dimensions, wire gauges, approximate pieces per kilogram, and recommended shop applications.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 bg-white rounded-xl shadow-xs">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4 border-b border-slate-800">Size Number</th>
                  <th className="p-4 border-b border-slate-800">Length (MM)</th>
                  <th className="p-4 border-b border-slate-800">Length (Inches)</th>
                  <th className="p-4 border-b border-slate-800">Wire Gauge</th>
                  <th className="p-4 border-b border-slate-800">Pcs / Kg</th>
                  <th className="p-4 border-b border-slate-800">Shop Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INDIAN_SIZE_CHART.map((row, idx) => (
                  <tr key={row.sizeNo} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="p-4 font-bold text-slate-900">{row.sizeNo}</td>
                    <td className="p-4 font-bold text-orange-600">{row.lengthMm} mm</td>
                    <td className="p-4 text-slate-600">{row.lengthInch}</td>
                    <td className="p-4 text-slate-700">{row.wireGauge}</td>
                    <td className="p-4 text-slate-500">{row.pcsPerKg}</td>
                    <td className="p-4 font-sans text-xs text-slate-700">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. RING BUNCHES & PACKAGING FORMATS */}
      <section className="mx-auto max-w-[1360px] px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="eyebrow text-orange-600 font-bold">Fast Garment Assembly</span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Bunched Ring Packs on Master Safety Pin
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              We specialize in bunched safety pins strung neatly on master ring pins (12 or 24 pins per bunch). Ideal for rapid garment tag assembly lines, dry cleaners, and retail wholesale counters with zero tangles.
            </p>

            <div className="mt-6 space-y-3">
              {PACKAGING_OPTIONS.slice(0, 3).map((pkg) => (
                <div key={pkg.title} className="p-3.5 border border-slate-200 bg-white rounded-lg flex gap-3.5 items-center">
                  <div className="w-16 h-16 bg-slate-100 shrink-0 rounded-md overflow-hidden border border-slate-100">
                    <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-slate-900">{pkg.title}</h4>
                    <p className="text-[11px] font-mono text-orange-600 font-semibold">{pkg.subtitle}</p>
                    <p className="text-[11px] text-slate-500 leading-snug">{pkg.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="border border-slate-200 bg-white rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/safety-pin-ring-bunches.jpg"
                alt="Bunched Ring Packs Kanyakumari"
                className="w-full h-auto object-cover"
              />
              <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs font-mono">
                <span>12 / 24 PINS STRUNG ON MASTER PIN</span>
                <span className="text-orange-400 font-bold">Ready Wholesale Stock</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------------------------------------------
// STANDALONE WHOLESALE CATALOGUE PAGE
// -----------------------------------------------------------------
function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      return (
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.finish.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-10 md:py-16">
      <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="eyebrow text-orange-600 font-bold">Full Wholesale Catalogue</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Safety Pin Range & Wholesale Prices
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Select size, choose pack count, and click "ADD TO ORDER" to build your order.
          </p>
        </div>

        <div className="w-full md:w-80 relative">
          <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search pin size, brass, bunch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-slate-300 bg-white pl-9 pr-4 py-2 text-xs rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <WholesaleProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// SIZES & PRICES STANDALONE PAGE
// -----------------------------------------------------------------
function SizesPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-2xl mb-8">
        <span className="eyebrow text-orange-600 font-bold">Technical Size Matrix</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
          Safety Pin Sizes & Wholesale Dimensions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Complete size chart from Size #000 (19mm) micro-pins to Size #6 (75mm) giant industrial pins.
        </p>
      </div>

      <div className="overflow-x-auto border border-slate-200 bg-white rounded-xl shadow-xs mb-10">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-slate-900 text-white uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4 border-b border-slate-800">Size Number</th>
              <th className="p-4 border-b border-slate-800">Length (MM)</th>
              <th className="p-4 border-b border-slate-800">Length (Inches)</th>
              <th className="p-4 border-b border-slate-800">Wire Gauge</th>
              <th className="p-4 border-b border-slate-800">Pcs / Kg</th>
              <th className="p-4 border-b border-slate-800">Recommended Shop Use</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INDIAN_SIZE_CHART.map((row, idx) => (
              <tr key={row.sizeNo} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="p-4 font-bold text-slate-900">{row.sizeNo}</td>
                <td className="p-4 font-bold text-orange-600">{row.lengthMm} mm</td>
                <td className="p-4 text-slate-600">{row.lengthInch}</td>
                <td className="p-4 text-slate-700">{row.wireGauge}</td>
                <td className="p-4 text-slate-500">{row.pcsPerKg}</td>
                <td className="p-4 font-sans text-xs text-slate-700">{row.bestFor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuickWholesaleOrder />
    </div>
  );
}

// -----------------------------------------------------------------
// KANYAKUMARI DELIVERY STANDALONE PAGE
// -----------------------------------------------------------------
function DeliveryPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow text-orange-600 font-bold">Local Coverage</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
          Kanyakumari District Delivery & Supply
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Doorstep delivery to retail counters, tailoring shops, fancy stores, and garment factories across Kanyakumari.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-12">
        {KANYAKUMARI_AREAS.map((town) => (
          <div key={town} className="p-4 border border-slate-200 bg-white rounded-lg shadow-xs flex items-center gap-3">
            <MapPin size={18} className="text-orange-600 shrink-0" />
            <div>
              <strong className="block text-xs font-bold text-slate-900 font-display">{town}</strong>
              <span className="text-[10px] font-mono text-slate-500">Regular Supply Route</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-xl font-bold">Have an immediate shop requirement?</h3>
          <p className="text-xs text-slate-400 mt-1">Call our local wholesale dispatch desk in Kanyakumari for immediate supply.</p>
        </div>
        <a
          href="https://wa.me/919876543210?text=Hello%2C%20I%20need%20safety%20pins%20delivered%20to%20my%20shop%20in%20Kanyakumari."
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap"
        >
          <MessageSquare size={16} />
          <span>WhatsApp Quick Supply</span>
        </a>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// FOR BUSINESSES & SHOPS STANDALONE PAGE
// -----------------------------------------------------------------
function ForBusinessesPage() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-10 md:py-16">
      <div className="max-w-2xl mb-10">
        <span className="eyebrow text-orange-600 font-bold">Business Solutions</span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
          Wholesale Supply for Kanyakumari Businesses
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Tailored pack sizes, trade credit terms, and direct factory pricing for local commerce.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {[
          { title: 'TAILORING SHOPS', desc: 'Precision burr-free needle points for smooth cloth basting and pleat pinning.' },
          { title: 'GARMENT SHOPS', desc: 'Teardrop hangtag pins and bunched pins for quick apparel price ticket attachment.' },
          { title: 'TEXTILE STORES', desc: 'Rustproof brass and nickel pins for saree bundle clipping and fabric rolling.' },
          { title: 'RETAIL & FANCY SHOPS', desc: '100-pc consumer blister packets and wholesale master cards with retail margins.' },
          { title: 'UNIFORM MAKERS', desc: 'Extra gauge steel pins for multi-layer school and industrial uniform stitching.' },
          { title: 'WHOLESALE DISTRIBUTORS', desc: 'Carton volume rates and steady weekly deliveries across Kanyakumari.' },
        ].map((item) => (
          <div key={item.title} className="p-6 border border-slate-200 bg-white rounded-xl shadow-xs">
            <h3 className="font-display text-base font-bold text-slate-900">{item.title}</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <QuickWholesaleOrder />
    </div>
  );
}

// -----------------------------------------------------------------
// CONTACT DESK PAGE
// -----------------------------------------------------------------
function ContactPage() {
  const [form, setForm] = useState({ name: '', shop: '', phone: '', area: 'Nagercoil', notes: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `*WHOLESALE INQUIRY - KANYAKUMARI SAFETY PINS*\n` +
      `• Shop: ${form.shop || 'Retail Shop'}\n` +
      `• Contact: ${form.name}\n` +
      `• Phone: ${form.phone}\n` +
      `• Town: ${form.area}\n` +
      `• Requirement: ${form.notes || 'Please provide wholesale price list.'}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-[1360px] px-4 sm:px-6 py-10 md:py-16">
      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <span className="eyebrow text-orange-600 font-bold">Wholesale Desk</span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1">
            Contact Kanyakumari Sales
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            Get in touch with our local wholesale team for shop visits, sample packs, and bulk consignment booking across Kanyakumari District.
          </p>

          <div className="mt-8 space-y-3 font-mono text-xs">
            <div className="p-4 border border-slate-200 bg-white rounded-lg flex items-start gap-3">
              <MapPin size={18} className="text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-sans font-bold text-sm">Wholesale Mill & Dispatch Center</strong>
                <span className="text-slate-500">Cape Industrial Estate, Nagercoil – Kanyakumari Highway, Kanyakumari District - 629702.</span>
              </div>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-lg flex items-start gap-3">
              <Phone size={18} className="text-orange-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-sans font-bold text-sm">Phone Helpline</strong>
                <span className="text-slate-500">+91 98765 43210 / +91 4652 245678</span>
              </div>
            </div>

            <div className="p-4 border border-slate-200 bg-white rounded-lg flex items-start gap-3">
              <MessageSquare size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 font-sans font-bold text-sm">WhatsApp Orders</strong>
                <span className="text-slate-500">+91 98765 43210 (Direct Shop Order Desk)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-slate-200 bg-white p-6 sm:p-8 rounded-xl shadow-xs">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={44} className="text-emerald-600 mx-auto mb-3" />
              <h3 className="font-display text-xl font-bold text-slate-900">Inquiry Logged!</h3>
              <p className="text-xs text-slate-500 mt-2">
                Thank you, {form.name}. Our Kanyakumari sales representative will connect with your shop shortly.
              </p>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="mt-5 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-md font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <MessageSquare size={15} />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                Shop Order Inquiry
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Shop / Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Tailors"
                    value={form.shop}
                    onChange={(e) => setForm({ ...form, shop: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Town in Kanyakumari</label>
                  <select
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {KANYAKUMARI_AREAS.map((a) => (
                      <option key={a} value={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Order Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Specify safety pin sizes (#0, #1, #2), pack types, or estimated monthly quantity..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded-md p-2.5 text-xs outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider"
                >
                  Submit Inquiry
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={15} />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------
// STICKY MOBILE ORDER BAR
// -----------------------------------------------------------------
function StickyMobileOrderBar() {
  const { itemCount, subtotal, formatPrice, setIsCartOpen } = useCart();
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-slate-900 border-t border-slate-800 p-3 sm:hidden shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
      <div className="text-white text-xs font-mono">
        <div className="font-bold flex items-center gap-1.5">
          <span className="bg-orange-600 text-white px-1.5 py-0.2 rounded-sm text-[10px]">
            {itemCount} {itemCount === 1 ? 'Pack' : 'Packs'}
          </span>
          <span className="text-orange-400 font-display font-bold text-sm">{formatPrice(subtotal)}</span>
        </div>
        <span className="text-[10px] text-slate-400">Wholesale Order</span>
      </div>

      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-md font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
      >
        <ShoppingBag size={14} />
        <span>View Order</span>
      </button>
    </div>
  );
}

function ArrowDown({ size = 16 }: { size?: number }) {
  return <ChevronDown size={size} />;
}

// -----------------------------------------------------------------
// ROOT APP
// -----------------------------------------------------------------
function AppRouter() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
        <SiteHeader />
        <CartDrawer />
        <main className="flex-1">
          <Switch>
            <Route path="/" component={WholesaleShopHome} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/sizes" component={SizesPage} />
            <Route path="/delivery" component={DeliveryPage} />
            <Route path="/for-businesses" component={ForBusinessesPage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
        <StickyMobileOrderBar />
        <SiteFooter />
      </div>
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