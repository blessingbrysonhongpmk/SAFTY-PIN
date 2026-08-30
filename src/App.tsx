import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import {
  ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Factory, Menu,
  Search, ShieldCheck, SlidersHorizontal, Sparkles, X, ShoppingBag, Box, Truck,
  Star, CheckCircle2, Sliders, Layers, Award, Info, FileText, Plus, Minus
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
import { getProduct, products, type Product, type PackOption } from './data/products';
import heroImage from '@assets/safety-pin-hero.png';
import formingImage from '@assets/forming-line.png';

const queryClient = new QueryClient();

const navItems = [
  { href: '/products', label: 'Catalogue & Shop' },
  { href: '/custom-quote', label: 'Custom RFQ' },
  { href: '/samples', label: 'Free Sample Box' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/quality', label: 'Quality & ISO' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { itemCount, setIsCartOpen, currency, setCurrency } = useCart();

  return (
    <div className="noise min-h-[100dvh] bg-background relative selection:bg-accent selection:text-accent-foreground text-foreground">
      <FallingPinsBackground zIndex={0} density="SUBTLE" />
      <CartDrawer />

      {/* Top Utility Announcement Bar */}
      <div className="bg-sidebar text-sidebar-foreground px-5 py-2 text-[11px] font-mono border-b border-sidebar-foreground/15 hidden sm:block">
        <div className="mx-auto max-w-[1440px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-accent font-semibold">
              <ShieldCheck size={13} /> ISO 9001:2015 Precision Forming Mill
            </span>
            <span className="text-sidebar-foreground/40">•</span>
            <span className="text-sidebar-foreground/75">Over 120,000,000 safety pins manufactured annually</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/samples" className="text-accent hover:underline flex items-center gap-1">
              <Box size={12} /> Request Free 16-Size Sample Box
            </Link>
            <span className="text-sidebar-foreground/40">•</span>
            {/* Currency selector */}
            <div className="flex items-center gap-1">
              <span className="text-sidebar-foreground/50">CURRENCY:</span>
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1 font-bold transition-colors ${
                    currency === c ? 'text-accent underline' : 'text-sidebar-foreground/60 hover:text-sidebar-foreground'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" data-testid="link-logo">
            <span className="grid h-9 w-9 place-items-center border border-foreground bg-foreground text-background transition-transform group-hover:rotate-6">
              <span className="h-4 w-4 rounded-full border-[2px] border-background border-r-transparent" />
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-.03em]">
              HOLDFAST <span className="font-mono text-[10px] font-normal tracking-[.1em] text-muted-foreground">/ COMPONENTS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                className={`eyebrow transition-colors hover:text-accent ${
                  location === item.href ? 'text-accent' : 'text-foreground/75'
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
              data-testid="button-header-cart"
              className="relative flex items-center gap-2 border border-foreground/20 bg-card px-3.5 py-2 text-xs font-mono font-bold hover:border-accent hover:text-accent transition-colors"
              aria-label="Open cart drawer"
            >
              <ShoppingBag size={16} />
              <span className="hidden sm:inline">CART</span>
              <span className="grid h-5 w-5 place-items-center bg-accent text-accent-foreground text-[10px] font-bold rounded-full">
                {itemCount}
              </span>
            </button>

            {/* Quick RFQ Action */}
            <Link
              href="/custom-quote"
              data-testid="link-header-rfq"
              className="hidden items-center gap-2 bg-accent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] text-accent-foreground transition-transform hover:-translate-y-0.5 sm:flex shadow-xs"
            >
              Custom RFQ <ArrowUpRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
              data-testid="button-mobile-menu"
              className="grid h-10 w-10 place-items-center border border-foreground/20 lg:hidden"
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
                  data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(' ', '-')}`}
                  className="border-b border-foreground/10 py-3.5 font-display text-lg flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="text-accent" size={16} />
                </Link>
              ))}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Link
                  href="/custom-quote"
                  onClick={() => setMenuOpen(false)}
                  className="bg-accent px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-accent-foreground"
                >
                  Custom RFQ
                </Link>
                <Link
                  href="/samples"
                  onClick={() => setMenuOpen(false)}
                  className="border border-foreground/20 px-4 py-3 text-center text-xs font-bold uppercase tracking-wider"
                >
                  Free Samples
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-sidebar px-5 py-12 text-sidebar-foreground md:px-10 md:py-16 border-t border-sidebar-foreground/15">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center border border-sidebar-foreground">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-sidebar-foreground border-r-transparent" />
              </span>
              <span className="font-display text-sm font-bold">HOLDFAST COMPONENTS</span>
            </div>
            <p className="max-w-xs text-sm leading-6 text-sidebar-foreground/65">
              Precision safety pin manufacturing partner for commercial textiles, retail packaging, laundries, and OEM hardware programs.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] font-mono text-accent">
              <span className="border border-sidebar-foreground/20 px-2 py-1">ISO 9001:2015</span>
              <span className="border border-sidebar-foreground/20 px-2 py-1">RoHS COMPLIANT</span>
              <span className="border border-sidebar-foreground/20 px-2 py-1">REACH CERTIFIED</span>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sidebar-foreground/50">E-Commerce & Orders</p>
            <Link href="/products" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Standard Catalogue
            </Link>
            <Link href="/custom-quote" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Custom Pin Configurator
            </Link>
            <Link href="/samples" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Free Engineering Sample Box
            </Link>
            <Link href="/checkout" className="block text-sm text-sidebar-foreground/75 hover:text-accent">
              Order Checkout & PO
            </Link>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sidebar-foreground/50">Industrial Programs</p>
            <Link href="/applications" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Garment & Apparel Tagging
            </Link>
            <Link href="/applications" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Commercial Laundry & Kilts
            </Link>
            <Link href="/applications" className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">
              Couture Silk & Non-Snag
            </Link>
            <Link href="/manufacturing" className="block text-sm text-sidebar-foreground/75 hover:text-accent">
              Automated Forming Technology
            </Link>
          </div>

          <div>
            <p className="eyebrow mb-5 text-sidebar-foreground/50">Engineering & Support</p>
            <Link href="/contact" className="font-display text-lg hover:text-accent">
              Start an RFQ / Consultation <ArrowUpRight className="ml-1 inline" size={16} />
            </Link>
            <p className="mt-4 text-xs text-sidebar-foreground/60 leading-5">
              Production Mill: Direct manufacturing facility dispatch worldwide.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-sidebar-foreground/15 pt-5 text-[10px] uppercase tracking-[.14em] text-sidebar-foreground/40 md:flex-row">
          <span>© Holdfast Components • Precision Safety Pin Manufacturing</span>
          <span>Technical standards and Mill Test Reports (MTR 3.1) provided with all orders.</span>
        </div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="eyebrow flex items-center gap-3 text-accent">
      <span className="h-px w-7 bg-accent" />
      {children}
    </div>
  );
}

function ButtonLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      data-testid={`link-cta-${href.replaceAll('/', '') || 'home'}`}
      className={`inline-flex items-center gap-3 border px-5 py-3.5 text-xs font-bold uppercase tracking-[.13em] transition-all hover:-translate-y-0.5 ${
        dark
          ? 'border-sidebar-foreground/35 text-sidebar-foreground hover:border-accent hover:text-accent'
          : 'border-foreground/20 text-foreground hover:border-accent hover:text-accent'
      }`}
    >
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}

function PinDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`relative mx-auto aspect-square w-full max-w-[430px] ${compact ? 'max-w-[240px]' : ''}`}>
      {/* Precision Silver Schematic Lines */}
      <div className="absolute inset-[11%] rounded-full border-[2.5px] border-foreground/60 border-r-transparent rotate-[-22deg]" />
      <div className="absolute left-[49%] top-[20%] h-[59%] w-[2.5px] origin-bottom rotate-[16deg] bg-foreground/60" />
      <div className="absolute left-[42%] top-[17%] h-14 w-[23%] rotate-[16deg] border-b-[2.5px] border-foreground/60" />
      <div className="absolute left-[54%] top-[20%] h-8 w-16 rotate-[-10deg] rounded-sm border-[2.5px] border-foreground/60 bg-foreground/5" />
      <div className="absolute bottom-[15%] left-[9%] h-px w-[80%] bg-accent/80" />
      <span className="eyebrow absolute bottom-[8%] left-[10%] text-accent">
        SILVER SPECIFICATION / TOLERANCE ±0.02MM
      </span>
    </div>
  );
}

// ----------------------------------------------------
// HOMEPAGE
// ----------------------------------------------------
function Home() {
  const { addItem, formatPrice } = useCart();
  const [calcVolume, setCalcVolume] = useState<number>(25000);

  // Volume savings calculator logic
  const singleUnitPrice = 0.065;
  const bulkUnitPrice =
    calcVolume >= 250000 ? 0.016 : calcVolume >= 100000 ? 0.0195 : calcVolume >= 50000 ? 0.024 : calcVolume >= 25000 ? 0.029 : 0.045;
  const calculatedTotal = calcVolume * bulkUnitPrice;
  const standardTotal = calcVolume * singleUnitPrice;
  const savings = Math.max(0, standardTotal - calculatedTotal);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
        <div className="mx-auto grid min-h-[calc(100dvh-110px)] max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-[1fr_1fr] md:px-10 md:py-24">
          <div className="relative z-10 reveal">
            <SectionLabel>Direct Mill Supply • ISO 9001:2015</SectionLabel>
            <h1 className="mt-8 max-w-3xl font-display text-[clamp(3.2rem,7.5vw,7.5rem)] font-bold leading-[.90] tracking-[-.065em]">
              ENGINEERED<br />
              <span className="text-accent">TO NEVER FAIL.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-7 text-sidebar-foreground/70 md:text-lg">
              Precision safety pin manufacturing for apparel brands, dry cleaners, packaging leaders, and automated assembly lines. 100% silver chrome and marine stainless standards.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                href="/products"
                className="bg-accent text-accent-foreground px-6 py-4 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-lg hover:brightness-110 transition-transform hover:-translate-y-0.5"
              >
                <span>Shop Standard Catalogue</span>
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/samples"
                className="border border-sidebar-foreground/35 text-sidebar-foreground hover:border-accent hover:text-accent px-5 py-4 font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <span>Order Free Sample Box</span>
                <Box size={15} />
              </Link>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-sidebar-foreground/15 pt-6 text-[10px] uppercase tracking-[.12em] text-sidebar-foreground/50 font-mono">
              <div>
                <strong className="block text-sidebar-foreground text-base font-display font-bold">120M+</strong>
                <span>Annual Output</span>
              </div>
              <div>
                <strong className="block text-sidebar-foreground text-base font-display font-bold">±0.02 mm</strong>
                <span>Wire Tolerance</span>
              </div>
              <div>
                <strong className="block text-sidebar-foreground text-base font-display font-bold">24-48h</strong>
                <span>Global Dispatch</span>
              </div>
            </div>
          </div>

          {/* Hero Media Preview */}
          <div className="relative reveal reveal-delay">
            <div className="absolute -right-20 -top-20 h-[70%] w-[70%] rounded-full bg-accent/10 blur-3xl" />
            <div className="relative aspect-[1.1] overflow-hidden border border-sidebar-foreground/15 bg-[#d4cec0] shadow-2xl">
              <img
                src={heroImage}
                alt="Silver safety pin precision engineering on inspection surface"
                className="h-full w-full object-cover mix-blend-multiply"
              />
              <div className="absolute left-5 top-5 border border-sidebar-foreground/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[.13em] text-sidebar-foreground/80 bg-sidebar/70 backdrop-blur-xs">
                SP-01 / SPEC<br />
                POLISHED SILVER NICKEL
              </div>
              <div className="absolute bottom-5 right-5 font-mono text-[9px] text-sidebar-foreground/70 bg-sidebar/70 px-2 py-1">
                FIG. 1.0 — WIRE FORMING
              </div>
            </div>
            <div className="absolute -bottom-8 -left-5 grid h-24 w-24 place-items-center rounded-full border border-accent/70 bg-sidebar font-mono text-[9px] uppercase leading-4 text-accent shadow-xl">
              hold<br />fast<br />/ 01
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products E-Commerce Showcase */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col justify-between gap-8 border-b border-foreground/15 pb-8 md:flex-row md:items-end">
          <div>
            <SectionLabel>Standard Production Lines</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-.05em] md:text-6xl">
              Popular Specifications.
            </h2>
          </div>
          <Link
            href="/products"
            className="border border-foreground/20 px-5 py-3 text-xs font-bold uppercase tracking-wider hover:border-accent hover:text-accent inline-flex items-center gap-2 self-start md:self-auto"
          >
            <span>View All 8 Product Ranges</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Interactive Volume Tier Savings Calculator */}
      <section className="border-y border-foreground/15 bg-secondary/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <SectionLabel>Direct Mill Economics</SectionLabel>
              <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold tracking-tight">
                Calculate Your Volume Savings.
              </h2>
              <p className="mt-4 text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg">
                Eliminate intermediary distributor markups. Sourcing directly from our automated forming lines provides scaled unit price discounts from 1,000 to 1,000,000+ pieces.
              </p>

              <div className="mt-8 bg-background p-6 border border-foreground/15 shadow-sm space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-muted-foreground uppercase">Target Order Volume:</span>
                  <span className="font-mono text-accent font-bold text-lg">{calcVolume.toLocaleString()} pcs</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={5000}
                  value={calcVolume}
                  onChange={(e) => setCalcVolume(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>1,000 (Box)</span>
                  <span>50,000 (Cartons)</span>
                  <span>250,000 (Pallet)</span>
                  <span>500,000+ (Contract)</span>
                </div>
              </div>
            </div>

            {/* Live Calculation Output Card */}
            <div className="bracket border border-foreground/20 bg-card p-6 md:p-8 shadow-xl">
              <span className="eyebrow text-accent">Direct Factory Quote Preview</span>
              <div className="mt-4 grid grid-cols-2 gap-4 border-b border-foreground/10 pb-6 font-mono text-xs">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Factory Direct Rate:</span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    ${bulkUnitPrice.toFixed(4)} <span className="text-xs text-muted-foreground font-normal">/ pc</span>
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[11px]">Estimated Batch Total:</span>
                  <span className="font-display text-2xl font-bold text-accent">
                    ${calculatedTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="py-4 border-b border-foreground/10 flex justify-between items-center text-xs font-mono">
                <span className="text-muted-foreground">Estimated Sourcing Savings:</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  +${savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Saved
                </span>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/custom-quote"
                  className="flex-1 bg-accent text-accent-foreground py-3 text-center font-bold text-xs uppercase tracking-widest hover:brightness-105"
                >
                  Lock In This Volume Tier
                </Link>
                <Link
                  href="/samples"
                  className="border border-foreground/20 py-3 px-4 font-mono text-xs uppercase tracking-wider text-center hover:border-accent"
                >
                  Request Sample Box First
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Custom Pin Configurator Teaser */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
        <CustomPinConfigurator />
      </section>

      {/* Production & Quality Pillars */}
      <section className="border-t border-foreground/10 bg-sidebar text-sidebar-foreground py-20 px-5 md:px-10">
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-center mb-16">
            <div>
              <SectionLabel>Quality Assurance Protocols</SectionLabel>
              <h2 className="mt-4 font-display text-4xl md:text-6xl font-bold tracking-tight">
                Built Around Repeatability.
              </h2>
            </div>
            <p className="text-sidebar-foreground/70 text-base leading-relaxed max-w-xl">
              Every safety pin must hold with predictable force. Our manufacturing sequence guarantees uniform spring elasticity, razor-sharp needle piercing angles, and corrosion-resistant silver coatings.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                no: '01',
                title: 'High-Tensile Wire',
                desc: 'Cold-drawn C70 spring steel and AISI 316 stainless wire with continuous hardness verification.',
              },
              {
                no: '02',
                title: 'Automated 6-Axis Forming',
                desc: 'Synchronized bending tools shape coils and needle arms without surface stress micro-fractures.',
              },
              {
                no: '03',
                title: 'Deep Clasp Stamping',
                desc: 'Precision hood notch ensures safety pins remain securely locked under 180N+ directional tension.',
              },
              {
                no: '04',
                title: 'Salt Spray Tested',
                desc: 'Certified ASTM B117 salt spray testing confirms 48h to 500h+ rust protection across all finishes.',
              },
            ].map((pillar) => (
              <div key={pillar.no} className="border border-sidebar-foreground/15 p-6 bg-sidebar-foreground/5 space-y-3">
                <span className="font-mono text-xs text-accent font-bold">{pillar.no}</span>
                <h3 className="font-display text-xl font-bold">{pillar.title}</h3>
                <p className="text-xs text-sidebar-foreground/65 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ----------------------------------------------------
// PRODUCT CARD COMPONENT
// ----------------------------------------------------
function ProductCard({ product }: { product: Product }) {
  const { addItem, formatPrice } = useCart();
  const defaultPack = product.packs[1] || product.packs[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  return (
    <div className="bracket border border-foreground/15 bg-card flex flex-col justify-between group transition-all hover:border-accent">
      <div>
        {/* Card Header & Preview */}
        <Link href={`/products/${product.id}`} className="block relative aspect-[1.3] overflow-hidden bg-gradient-to-br from-[#f1f5f9] to-[#d8e2ec]">
          <div className="absolute inset-0 grid-paper opacity-30" />
          <PinDiagram compact={true} />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            <span className="font-mono text-[10px] font-bold text-accent bg-background/90 px-2 py-0.5 border border-foreground/15">
              {product.code}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground bg-background/80 px-2 py-0.5">
              {product.family}
            </span>
          </div>
          <div className="absolute right-3 top-3">
            <span className="grid h-7 w-7 place-items-center bg-background/90 border border-foreground/15 text-foreground/60 group-hover:text-accent transition-colors">
              <ArrowUpRight size={15} />
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-xs text-amber-500 mb-1">
            <Star size={13} fill="currentColor" />
            <span className="font-mono font-bold text-foreground">{product.rating}</span>
            <span className="text-muted-foreground text-[11px]">({product.reviewsCount} reviews)</span>
          </div>

          <Link href={`/products/${product.id}`}>
            <h3 className="font-display text-xl font-bold group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {product.short}
          </p>

          {/* Size Selectors */}
          <div className="mt-4 pt-3 border-t border-foreground/10">
            <span className="eyebrow text-muted-foreground block text-[9px] mb-1.5">Available Sizes</span>
            <div className="flex flex-wrap gap-1.5">
              {product.sizes.slice(0, 4).map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`text-[10px] font-mono px-2 py-1 border transition-colors ${
                    selectedSize === size
                      ? 'border-accent bg-accent text-accent-foreground font-bold'
                      : 'border-foreground/15 bg-background hover:border-foreground/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Buy Action */}
      <div className="p-5 pt-0 border-t border-foreground/10 flex items-center justify-between gap-3 mt-3">
        <div>
          <span className="text-[10px] font-mono text-muted-foreground block">Box of {defaultPack.count.toLocaleString()} pcs</span>
          <span className="font-display text-lg font-bold text-foreground">
            {formatPrice(defaultPack.price)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addItem(product, selectedSize, defaultPack, 1)}
          className="bg-accent text-accent-foreground px-4 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:brightness-105 transition-all active:scale-95 shadow-xs"
        >
          <ShoppingBag size={13} />
          <span>Quick Add</span>
        </button>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// CATALOGUE / SHOP PAGE
// ----------------------------------------------------
function Products() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('All');
  const [sort, setSort] = useState('Featured');

  const families = ['All', ...Array.from(new Set(products.map((p) => p.family)))];

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesFamily = family === 'All' || p.family === family;
        const matchesQuery =
          `${p.name} ${p.code} ${p.short} ${p.finish} ${p.wire} ${p.use.join(' ')}`
            .toLowerCase()
            .includes(query.toLowerCase());
        return matchesFamily && matchesQuery;
      })
      .sort((a, b) => {
        if (sort === 'A–Z') return a.name.localeCompare(b.name);
        if (sort === 'Price: Low') return a.packs[0].price - b.packs[0].price;
        if (sort === 'Price: High') return b.packs[0].price - a.packs[0].price;
        return products.indexOf(a) - products.indexOf(b);
      });
  }, [family, query, sort]);

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
      <div className="max-w-3xl mb-10">
        <SectionLabel>Industrial & Retail Catalogue</SectionLabel>
        <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tight">
          Safety Pins, <span className="text-muted-foreground">Specified.</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground leading-relaxed">
          Order retail cartons, workshop packs, or bulk industrial master crates directly from our automated forming mill. All specifications feature mirror silver nickel or 316 stainless finishes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="mb-10 flex flex-col gap-4 border-y border-foreground/15 py-5 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-3.5 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search code, wire gauge, or application (e.g. SP-01, silk, laundry)..."
            className="h-11 w-full border border-foreground/15 bg-card pl-10 pr-4 text-xs font-mono outline-none focus:border-accent"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 lg:pb-0">
          {families.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setFamily(item)}
              className={`whitespace-nowrap px-3 py-2 text-xs font-semibold font-mono transition-colors ${
                family === item
                  ? 'bg-foreground text-background shadow-xs'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <label className="relative flex items-center gap-2 border-l border-foreground/15 pl-4 text-xs text-muted-foreground shrink-0">
          <span>Sort By</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="appearance-none bg-transparent pr-6 font-semibold text-foreground outline-none font-mono text-xs cursor-pointer"
          >
            <option>Featured</option>
            <option>A–Z</option>
            <option>Price: Low</option>
            <option>Price: High</option>
          </select>
          <ChevronDown size={13} className="pointer-events-none absolute right-0" />
        </label>
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bracket border border-foreground/15 p-12 text-center my-8">
          <SectionLabel>No direct match found</SectionLabel>
          <h3 className="font-display text-2xl font-bold mt-2">Need a custom dimension or bend?</h3>
          <p className="text-xs text-muted-foreground mt-2 max-w-sm mx-auto">
            We build custom tooling for custom safety pins from 10mm to 150mm.
          </p>
          <Link
            href="/custom-quote"
            className="mt-6 inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 font-bold text-xs uppercase tracking-widest"
          >
            Configure Custom Safety Pin <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

// ----------------------------------------------------
// PRODUCT DETAIL PAGE (PDP)
// ----------------------------------------------------
function ProductDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const product = getProduct(id) || products[0];
  const { addItem, formatPrice } = useCart();

  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [selectedPack, setSelectedPack] = useState<PackOption>(product.packs[1] || product.packs[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'compliance' | 'reviews'>('specs');

  const totalPrice = selectedPack.price * quantity;
  const totalPieces = selectedPack.count * quantity;

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-10 md:px-10 md:py-16">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 font-mono text-xs text-muted-foreground">
        <Link href="/products" className="hover:text-accent">Catalogue</Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-start">
        {/* Left: Interactive Visualizer & Blueprints */}
        <div className="space-y-6">
          <div className="bracket relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#f1f5f9] to-[#d8e2ec] border border-foreground/15 shadow-xl">
            <div className="absolute inset-0 grid-paper opacity-40" />
            <PinDiagram />
            <div className="absolute top-4 left-4 font-mono text-xs uppercase bg-background/90 px-3 py-1 border border-foreground/15">
              SPEC CODE: {product.code}
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-muted-foreground bg-background/90 px-3 py-1 border border-foreground/15">
              FINISH: {product.finish}
            </div>
          </div>

          {/* Technical Specs Tabs */}
          <div className="border border-foreground/15 bg-card p-6">
            <div className="flex border-b border-foreground/10 pb-3 gap-6 font-mono text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`pb-2 border-b-2 transition-all ${
                  activeTab === 'specs' ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
                }`}
              >
                Dimensional Matrix
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('compliance')}
                className={`pb-2 border-b-2 transition-all ${
                  activeTab === 'compliance' ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
                }`}
              >
                Material Compliance
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('reviews')}
                className={`pb-2 border-b-2 transition-all ${
                  activeTab === 'reviews' ? 'border-accent text-accent font-bold' : 'border-transparent text-muted-foreground'
                }`}
              >
                Verified Reviews ({product.reviewsCount})
              </button>
            </div>

            {activeTab === 'specs' && (
              <div className="pt-4 grid grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-muted-foreground text-[10px] block">Overall Length</span>
                  <p className="font-bold">{product.dimensions.lengthMm} mm</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Wire Gauge Diameter</span>
                  <p className="font-bold">⌀ {product.dimensions.wireDiaMm} mm</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Clasp Retention Force</span>
                  <p className="font-bold">{product.dimensions.tensileStrengthN}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px] block">Salt Spray Resistance</span>
                  <p className="font-bold">{product.dimensions.corrosionHours}</p>
                </div>
              </div>
            )}

            {activeTab === 'compliance' && (
              <div className="pt-4 space-y-2 font-mono text-xs">
                {product.compliance.map((c) => (
                  <div key={c} className="flex items-center gap-2 text-accent">
                    <CheckCircle2 size={14} />
                    <span className="text-foreground">{c}</span>
                  </div>
                ))}
                <p className="text-[11px] text-muted-foreground pt-2">
                  Full Mill Test Reports (MTR) and RoHS lab spectroscopy certificates provided with every dispatch.
                </p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="pt-4 space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="font-bold">{product.rating} / 5.0</span>
                  <span className="text-muted-foreground">({product.reviewsCount} commercial buyer ratings)</span>
                </div>
                <blockquote className="border-l-2 border-accent pl-3 text-muted-foreground italic">
                  "Consistent wire stiffness and smooth clasp engagement. We use these on 50,000 garments/month with zero failures."
                </blockquote>
              </div>
            )}
          </div>
        </div>

        {/* Right: E-Commerce Product Configuration & Purchase */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="eyebrow text-accent font-bold">{product.code}</span>
              <span className="font-mono text-[10px] text-muted-foreground">•</span>
              <span className="font-mono text-[10px] text-muted-foreground uppercase">{product.family}</span>
            </div>
            <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size Selectors */}
          <div className="border-y border-foreground/10 py-5 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="eyebrow text-muted-foreground">Select Pin Size</span>
              <span className="font-mono text-accent font-bold">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2.5 text-xs font-mono border transition-all ${
                    selectedSize === size
                      ? 'border-accent bg-accent text-accent-foreground font-bold shadow-xs'
                      : 'border-foreground/15 bg-background hover:border-foreground/40'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Package / Volume Tier Selectors */}
          <div className="space-y-3">
            <span className="eyebrow text-muted-foreground block text-xs">Choose Package Quantity</span>
            <div className="grid gap-3">
              {product.packs.map((pack) => (
                <button
                  type="button"
                  key={pack.id}
                  onClick={() => setSelectedPack(pack)}
                  className={`p-4 border text-left flex items-center justify-between transition-all ${
                    selectedPack.id === pack.id
                      ? 'border-accent bg-accent/10 shadow-xs'
                      : 'border-foreground/15 bg-card hover:border-foreground/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm">{pack.name}</span>
                      {pack.popular && (
                        <span className="bg-accent text-accent-foreground text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase">
                          Best Value
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      {formatPrice(pack.unitPrice)} per safety pin
                    </span>
                  </div>
                  <span className="font-display text-lg font-bold text-foreground">
                    {formatPrice(pack.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart Action */}
          <div className="p-6 border border-foreground/15 bg-secondary/30 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground block">Order Quantity</span>
                <div className="flex items-center border border-foreground/20 bg-background mt-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-foreground/70 hover:text-foreground"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-foreground/70 hover:text-foreground"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-muted-foreground block">Total ({totalPieces.toLocaleString()} pcs)</span>
                <span className="font-display text-3xl font-bold text-accent">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => addItem(product, selectedSize, selectedPack, quantity)}
                className="bg-accent text-accent-foreground py-4 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-98 transition-all"
              >
                <ShoppingBag size={16} />
                <span>Add to Cart</span>
              </button>

              <Link
                href="/samples"
                className="border border-foreground/20 py-4 px-6 font-mono text-xs uppercase tracking-wider text-center hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2"
              >
                <Box size={15} />
                <span>Get Free Sample</span>
              </Link>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground border-t border-foreground/10 pt-4">
              <span className="flex items-center gap-1">
                <Truck size={13} className="text-accent" /> Ships in 24h
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck size={13} className="text-accent" /> 100% Quality Guaranteed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// OTHER INFORMATIONAL PAGES
// ----------------------------------------------------
function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24">
      <div className="max-w-4xl reveal">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-7 font-display text-5xl md:text-7xl font-semibold leading-[.95] tracking-[-.06em]">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
      </div>
      <div className="mt-16">{children}</div>
    </div>
  );
}

function Manufacturing() {
  const steps = [
    { no: '01', title: 'High-Tensile Wire Drawing', text: 'Spring steel is drawn and micro-polished to calibrated wire diameters with ±0.015mm cross-sectional consistency.', icon: <ClipboardCheck /> },
    { no: '02', title: 'Needle Point Grinding', text: 'Multi-stage abrasive stones grind razor-sharp 18-degree piercing tapers that glide through textiles with zero burrs.', icon: <Factory /> },
    { no: '03', title: 'Helical Coil Spring Setting', text: 'High-speed rotary forming heads cold-form the tempered spring coil to store consistent mechanical opening tension.', icon: <Sparkles /> },
    { no: '04', title: 'Clasp Hood Stamping & Nickel Plating', text: 'Heavy stamping dies form the protective clasp hood, followed by multi-layer bright silver nickel electro-plating.', icon: <ShieldCheck /> },
  ];

  return (
    <PageIntro eyebrow="Forming Technology / 02" title={<>AUTOMATED FORMING MILL<br /><span className="text-muted-foreground">TO PRECISION COMPONENT</span></>} description="A safety pin requires exacting mechanical discipline. Our automated production line transforms raw spring steel coil into millions of finished components with zero dimensional drift.">
      <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]">
        <div className="relative min-h-[420px] overflow-hidden bg-sidebar shadow-xl">
          <img src={formingImage} alt="Wire safety pin forming machine in motion" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-sidebar/20" />
          <span className="absolute bottom-5 left-5 eyebrow text-sidebar-foreground/70">6-Axis Wire Former • 450 Parts/Min</span>
        </div>
        <div className="flex flex-col justify-center border-y border-foreground/15 py-8 space-y-6">
          <SectionLabel>High-Speed Production Yield</SectionLabel>
          <p className="max-w-md text-2xl leading-9 tracking-[-.03em] font-display font-semibold">
            Zero variation between piece #1 and piece #10,000,000.
          </p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Our CNC tooling maintains continuous automated laser micrometry across all production lines. Defective parts are automatically ejected at high speed.
          </p>
          <Link href="/custom-quote" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-3 font-bold text-xs uppercase tracking-wider w-fit">
            <span>Configure Custom Production Batch</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <div className="mt-16 grid border-t border-foreground/15 md:grid-cols-4">
        {steps.map((step) => (
          <div key={step.no} className="border-b border-foreground/15 px-0 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0">
            <div className="flex items-center justify-between text-accent">
              <span className="font-mono text-xs">{step.no}</span>
              {step.icon}
            </div>
            <h2 className="mt-10 font-display text-xl font-semibold">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p>
          </div>
        ))}
      </div>
    </PageIntro>
  );
}

function Quality() {
  return (
    <PageIntro eyebrow="Quality System / 03" title={<>QUALITY BUILT INTO<br /><span className="text-muted-foreground">EVERY COIL & CLASP.</span></>} description="Our ISO 9001:2015 certified quality system ensures that every batch meets international tensile retention and corrosion resistance standards.">
      <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div className="bracket p-7 md:p-10 border border-foreground/15 bg-card">
          <p className="font-display text-3xl leading-tight tracking-[-.04em]">100% Traceability From Ingot to Dispatch.</p>
          <p className="mt-8 text-sm leading-6 text-muted-foreground">Every coil of spring wire is matched with Mill Test Reports (MTR 3.1) verifying chemical composition and mechanical tensile limits.</p>
        </div>
        <div>
          <div className="border-t border-foreground/15">
            {['Wire Tensile & Elongation Testing', 'Optical Comparator Clasp Notch Verification', 'ASTM B117 Neutral Salt Spray Corrosion Validation', 'Penetration Force Gram-Weight Calibration', 'RoHS / REACH Heavy Metal Spectrometry'].map((item, index) => (
              <div key={item} className="flex items-center gap-6 border-b border-foreground/15 py-5">
                <span className="font-mono text-xs text-accent">0{index + 1}</span>
                <span className="font-display text-lg font-semibold">{item}</span>
                <Check className="ml-auto text-accent" size={18} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageIntro>
  );
}

function Applications() {
  const apps = [
    { title: 'Fashion & Garment Tagging', desc: 'Secure swing-tag fastening for luxury apparel, retail ticketing, and designer label attachment.', tag: 'TEXT / APP' },
    { title: 'Commercial Laundry & Dry Cleaning', desc: 'Heavy-duty 1.4mm pins resist high-temperature detergent baths and high-pressure steam ironing.', tag: 'LAUNDRY / IND' },
    { title: 'Couture Silk & Delicate Knitwear', desc: 'Coil-less and micro-fine profiles glide through cashmere and silk without catching threads.', tag: 'COUTURE / SILK' },
    { title: 'Medical, Marine & Sterile Packs', desc: 'AISI 316 marine-grade stainless steel allows repeated autoclave sterilization without tarnishing.', tag: 'MED / MARINE' },
  ];

  return (
    <PageIntro eyebrow="Applications / 04" title={<>ENGINEERED FOR THE<br /><span className="text-muted-foreground">EXACT POINT OF WORK.</span></>} description="From high-speed fashion tagging to heavy industrial laundry identification, explore our tailored safety pin solutions.">
      <div className="grid gap-4 md:grid-cols-2">
        {apps.map((app, index) => (
          <Link href="/products" key={app.title} className="group relative min-h-[260px] border border-foreground/15 p-8 transition-all hover:border-accent bg-card">
            <span className="eyebrow text-accent">{app.tag}</span>
            <h2 className="absolute bottom-16 font-display text-2xl md:text-3xl font-semibold tracking-[-.04em]">{app.title}</h2>
            <p className="absolute bottom-6 max-w-sm text-xs text-muted-foreground leading-relaxed">{app.desc}</p>
            <ArrowUpRight className="absolute right-7 top-7 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </PageIntro>
  );
}

function About() {
  return (
    <PageIntro eyebrow="Company / 05" title={<>A CRITICAL COMPONENT.<br /><span className="text-muted-foreground">AN INDUSTRIAL STANDARD.</span></>} description="Holdfast Components is a specialized manufacturer of safety pins, coil-less fasteners, and precision wire assemblies serving commercial buyers across 40+ countries.">
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div>
          <PinDiagram />
        </div>
        <div className="space-y-6">
          <SectionLabel>Our Core Principles</SectionLabel>
          <div className="space-y-6">
            <div className="border-l-2 border-accent pl-4">
              <h3 className="font-display text-xl font-bold">Never Compromise Wire Temper</h3>
              <p className="mt-1 text-sm text-muted-foreground">A pin that bends on insertion is useless. We strictly adhere to high-carbon spring temper.</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <h3 className="font-display text-xl font-bold">Clear Technical Transparency</h3>
              <p className="mt-1 text-sm text-muted-foreground">Dimensions, salt-spray ratings, and alloy grades are published openly without vague claims.</p>
            </div>
            <div className="border-l-2 border-accent pl-4">
              <h3 className="font-display text-xl font-bold">Direct Sourcing Economics</h3>
              <p className="mt-1 text-sm text-muted-foreground">We supply direct from our forming lines, passing volume savings to our manufacturing partners.</p>
            </div>
          </div>
        </div>
      </div>
    </PageIntro>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', requirement: '', volume: '' });
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.requirement) {
      setError('Please provide your name, work email, and technical requirement.');
      return;
    }
    setError('');
    setSent(true);
  };

  return (
    <PageIntro eyebrow="Commercial Enquiry" title={<>LET’S BUILD<br /><span className="text-muted-foreground">YOUR REQUIREMENT.</span></>} description="Contact our technical sales team for custom tooling, annual blanket purchase orders, or technical data sheets.">
      <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]">
        <div className="border-t border-foreground/15 pt-6 space-y-6">
          <SectionLabel>Direct Mill Enquiries</SectionLabel>
          <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
            <li className="flex gap-3">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span>Production Lead Times: In-stock standard lines dispatch in 24 hours</span>
            </li>
            <li className="flex gap-3">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span>Custom Tooling: Rapid 5-day prototype turnaround</span>
            </li>
            <li className="flex gap-3">
              <Check size={16} className="mt-1 shrink-0 text-accent" />
              <span>Corporate Terms: Net-30 available for verified corporate accounts</span>
            </li>
          </ul>
        </div>

        <div className="bg-sidebar p-6 text-sidebar-foreground md:p-10 shadow-2xl">
          {sent ? (
            <div className="flex min-h-[380px] flex-col justify-center text-center">
              <div className="grid h-12 w-12 place-items-center border border-accent text-accent mx-auto mb-4">
                <Check />
              </div>
              <h2 className="font-display text-3xl font-bold">Enquiry Logged</h2>
              <p className="mt-3 text-sm text-sidebar-foreground/70 max-w-sm mx-auto">
                Thank you, {form.name}. A technical sales engineer will review your requirement and follow up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block eyebrow text-sidebar-foreground/60 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-sidebar-foreground/60 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block eyebrow text-sidebar-foreground/60 mb-1">Company</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-sidebar-foreground/60 mb-1">Estimated Annual Volume</label>
                  <input
                    type="text"
                    placeholder="e.g. 100,000 pcs / year"
                    value={form.volume}
                    onChange={(e) => setForm({ ...form, volume: e.target.value })}
                    className="w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block eyebrow text-sidebar-foreground/60 mb-1">Requirement Details *</label>
                <textarea
                  rows={4}
                  required
                  value={form.requirement}
                  onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                  placeholder="Describe target pin dimensions, wire gauge, finish, packaging, and application..."
                  className="w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent"
                />
              </div>

              {error && <p className="text-xs text-[#f4a58b]">{error}</p>}

              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3.5 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110"
              >
                <span>Send Technical Enquiry</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </div>
    </PageIntro>
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
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/custom-quote" component={() => (
            <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
              <CustomPinConfigurator />
            </div>
          )} />
          <Route path="/samples" component={SampleKit} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/manufacturing" component={Manufacturing} />
          <Route path="/quality" component={Quality} />
          <Route path="/applications" component={Applications} />
          <Route path="/about" component={About} />
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