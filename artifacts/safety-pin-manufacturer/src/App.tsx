import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Link, Route, Switch, Router as WouterRouter, useLocation, useParams } from 'wouter';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Factory, Menu, Search, ShieldCheck, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { FallingPinsBackground } from '@/components/FallingPinsBackground';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { getProduct, products, type Product } from './data/products';
import heroImage from '../attached_assets/safety-pin-hero.png';
import formingImage from '../attached_assets/forming-line.png';

const queryClient = new QueryClient();

const navItems = [
  { href: '/products', label: 'Products' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/quality', label: 'Quality' },
  { href: '/applications', label: 'Applications' },
  { href: '/about', label: 'About' },
];

function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  return (
    <div className="noise min-h-[100dvh] bg-background relative selection:bg-accent selection:text-accent-foreground">
      <FallingPinsBackground zIndex={0} density="SUBTLE" />
      <header className="sticky top-0 z-40 border-b border-foreground/10 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-[74px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          <Link href="/" onClick={() => setMenuOpen(false)} className="group flex items-center gap-3" data-testid="link-logo">
            <span className="grid h-9 w-9 place-items-center border border-foreground bg-foreground text-background transition-transform group-hover:rotate-6">
              <span className="h-4 w-4 rounded-full border-[2px] border-background border-r-transparent" />
            </span>
            <span className="font-display text-[15px] font-bold tracking-[-.03em]">HOLDFAST <span className="font-mono text-[10px] font-normal tracking-[.1em] text-muted-foreground">/ COMPONENTS</span></span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} data-testid={`link-nav-${item.label.toLowerCase()}`} className={`eyebrow transition-colors hover:text-accent ${location === item.href ? 'text-accent' : 'text-foreground/70'}`}>{item.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/contact" data-testid="link-header-rfq" className="hidden items-center gap-2 bg-accent px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.12em] text-accent-foreground transition-transform hover:-translate-y-0.5 sm:flex">Request a quote <ArrowUpRight size={14} /></Link>
            <button type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} data-testid="button-mobile-menu" className="grid h-10 w-10 place-items-center border border-foreground/20 md:hidden">{menuOpen ? <X size={18} /> : <Menu size={18} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-foreground/10 bg-background px-5 py-5 md:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`} className="border-b border-foreground/10 py-4 font-display text-xl">{item.label}<ArrowUpRight className="float-right mt-1 text-accent" size={18} /></Link>)}
              <Link href="/contact" onClick={() => setMenuOpen(false)} data-testid="link-mobile-rfq" className="mt-4 bg-accent px-4 py-4 text-center text-xs font-bold uppercase tracking-[.14em] text-accent-foreground">Request a quote</Link>
            </nav>
          </div>
        )}
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-sidebar px-5 py-12 text-sidebar-foreground md:px-10 md:py-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div><div className="mb-5 flex items-center gap-3"><span className="grid h-8 w-8 place-items-center border border-sidebar-foreground"><span className="h-3.5 w-3.5 rounded-full border-2 border-sidebar-foreground border-r-transparent" /></span><span className="font-display text-sm font-bold">HOLDFAST</span></div><p className="max-w-xs text-sm leading-6 text-sidebar-foreground/60">Safety-pin components engineered for the moments that cannot come loose.</p></div>
          <div><p className="eyebrow mb-5 text-sidebar-foreground/50">Explore</p>{navItems.slice(0, 3).map((item) => <Link key={item.href} href={item.href} data-testid={`link-footer-${item.label.toLowerCase()}`} className="mb-3 block text-sm text-sidebar-foreground/75 hover:text-accent">{item.label}</Link>)}</div>
          <div><p className="eyebrow mb-5 text-sidebar-foreground/50">Applications</p><Link href="/applications" className="mb-3 block text-sm text-sidebar-foreground/75" data-testid="link-footer-textiles">Textiles & apparel</Link><Link href="/applications" className="mb-3 block text-sm text-sidebar-foreground/75" data-testid="link-footer-packaging">Packaging & identification</Link><Link href="/applications" className="block text-sm text-sidebar-foreground/75" data-testid="link-footer-industrial">Industrial assembly</Link></div>
          <div><p className="eyebrow mb-5 text-sidebar-foreground/50">Start a conversation</p><Link href="/contact" data-testid="link-footer-contact" className="font-display text-lg hover:text-accent">Let’s build your requirement <ArrowUpRight className="ml-1 inline" size={16} /></Link><p className="mt-4 text-xs text-sidebar-foreground/50">Contact details available on request.</p></div>
        </div>
        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-sidebar-foreground/15 pt-5 text-[10px] uppercase tracking-[.14em] text-sidebar-foreground/40 md:flex-row"><span>© Holdfast Components</span><span>Technical information marked “Available on request” is confirmed during quotation.</span></div>
      </div>
    </footer>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="eyebrow flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" />{children}</div>;
}

function ButtonLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return <Link href={href} data-testid={`link-cta-${href.replaceAll('/', '') || 'home'}`} className={`inline-flex items-center gap-3 border px-5 py-3.5 text-xs font-bold uppercase tracking-[.13em] transition-all hover:-translate-y-0.5 ${dark ? 'border-sidebar-foreground/35 text-sidebar-foreground hover:border-accent hover:text-accent' : 'border-foreground/20 text-foreground hover:border-accent hover:text-accent'}`}>{children}<ArrowRight size={15} /></Link>;
}

function PinDiagram({ compact = false }: { compact?: boolean }) {
  return <div className={`relative mx-auto aspect-square w-full max-w-[430px] ${compact ? 'max-w-[250px]' : ''}`}>
    <div className="absolute inset-[11%] rounded-full border-[3px] border-foreground/70 border-r-transparent rotate-[-22deg]" />
    <div className="absolute left-[49%] top-[20%] h-[59%] w-[3px] origin-bottom rotate-[16deg] bg-foreground/70" />
    <div className="absolute left-[42%] top-[17%] h-14 w-[23%] rotate-[16deg] border-b-[3px] border-foreground/70" />
    <div className="absolute left-[54%] top-[20%] h-8 w-16 rotate-[-10deg] rounded-sm border-[3px] border-foreground/70" />
    <div className="absolute bottom-[15%] left-[9%] h-px w-[80%] bg-accent/80" />
    <span className="eyebrow absolute bottom-[8%] left-[10%] text-accent">working geometry / reference</span>
  </div>;
}

function Home() {
  return <>
    <section className="relative overflow-hidden bg-sidebar text-sidebar-foreground">
      <div className="mx-auto grid min-h-[calc(100dvh-74px)] max-w-[1440px] items-center gap-10 px-5 py-16 md:grid-cols-[.9fr_1.1fr] md:px-10 md:py-24">
        <div className="relative z-10 reveal">
          <SectionLabel>Precision components / established process</SectionLabel>
          <h1 className="mt-8 max-w-3xl font-display text-[clamp(3.5rem,8.5vw,8.5rem)] font-bold leading-[.88] tracking-[-.075em]">ENGINEERED<br /><span className="text-accent">TO HOLD.</span></h1>
          <p className="mt-8 max-w-md text-base leading-7 text-sidebar-foreground/65 md:text-lg">Safety pins made for buyers who measure twice. Consistent geometry, considered material choices, and a process built around repeatability.</p>
          <div className="mt-10 flex flex-wrap gap-3"><ButtonLink href="/products" dark>Explore the range</ButtonLink><ButtonLink href="/contact" dark>Talk specification</ButtonLink></div>
          <div className="mt-16 flex gap-10 border-t border-sidebar-foreground/15 pt-5 text-[10px] uppercase tracking-[.12em] text-sidebar-foreground/45"><span><strong className="block text-sidebar-foreground/85">01</strong> Select</span><span><strong className="block text-sidebar-foreground/85">02</strong> Specify</span><span><strong className="block text-sidebar-foreground/85">03</strong> Scale</span></div>
        </div>
        <div className="relative reveal reveal-delay">
          <div className="absolute -right-20 -top-20 h-[70%] w-[70%] rounded-full bg-accent/10 blur-3xl" />
          <div className="relative aspect-[1.1] overflow-hidden border border-sidebar-foreground/15 bg-[#d4cec0]">
            <img src={heroImage} alt="Safety pin on an engineering surface" className="h-full w-full object-cover mix-blend-multiply" />
            <div className="absolute left-5 top-5 border border-sidebar-foreground/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[.13em] text-sidebar-foreground/70">SP / 001<br />functional form</div>
            <div className="absolute bottom-5 right-5 font-mono text-[9px] text-sidebar-foreground/60">FIG. A — PIN ASSEMBLY</div>
          </div>
          <div className="absolute -bottom-8 -left-5 grid h-24 w-24 place-items-center rounded-full border border-accent/70 bg-sidebar font-mono text-[9px] uppercase leading-4 text-accent">hold<br />fast<br />/ 01</div>
        </div>
      </div>
      <div className="absolute bottom-7 right-10 hidden items-center gap-3 font-mono text-[9px] uppercase tracking-[.16em] text-sidebar-foreground/35 md:flex"><span className="h-12 w-px bg-accent" />Scroll to inspect</div>
    </section>
    <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-[.7fr_1.3fr] md:px-10 md:py-32">
      <div><SectionLabel>The small part, taken seriously</SectionLabel></div>
      <div><h2 className="max-w-4xl font-display text-4xl font-semibold leading-[.98] tracking-[-.055em] md:text-7xl">A safety pin is simple.<br /><span className="text-muted-foreground">Making one dependable is not.</span></h2><p className="mt-8 max-w-2xl text-base leading-7 text-muted-foreground">Every turn in the wire has a job. Every point, clasp, and spring has a consequence in the hands of the person using it. We make that consequence predictable.</p><ButtonLink href="/manufacturing" >See how it is made</ButtonLink></div>
    </section>
    <section className="border-y border-foreground/10 bg-secondary/50">
      <div className="mx-auto grid max-w-[1440px] gap-0 md:grid-cols-3">
        {[{ no: '01', title: 'Material intent', text: 'Wire and finish choices begin with the application, not a catalogue default.' }, { no: '02', title: 'Controlled forming', text: 'A repeatable sequence protects the working geometry from batch to batch.' }, { no: '03', title: 'Clear handover', text: 'Your requirement stays visible from first conversation through dispatch.' }].map((item) => <div key={item.no} className="border-b border-foreground/10 px-5 py-10 last:border-0 md:border-b-0 md:border-r md:px-10 md:py-14 md:last:border-r-0"><span className="font-mono text-xs text-accent">{item.no}</span><h3 className="mt-8 font-display text-2xl font-semibold">{item.title}</h3><p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{item.text}</p></div>)}
      </div>
    </section>
    <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-8 border-b border-foreground/15 pb-8 md:flex-row md:items-end"><div><SectionLabel>Product families</SectionLabel><h2 className="mt-5 font-display text-4xl font-semibold tracking-[-.05em] md:text-6xl">Start with the right hold.</h2></div><ButtonLink href="/products">View all products</ButtonLink></div>
      <div className="mt-10 grid gap-5 md:grid-cols-[1.4fr_1fr_1fr]">
        {products.slice(0, 3).map((product, i) => <ProductCard key={product.id} product={product} featured={i === 0} />)}
      </div>
    </section>
    <section className="bg-accent px-5 py-16 text-accent-foreground md:px-10 md:py-24">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><SectionLabel>Built for the brief</SectionLabel><h2 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[.92] tracking-[-.06em] md:text-8xl">NEED<br />MILLIONS?</h2></div><div className="max-w-sm"><p className="text-lg leading-7">We build for scale without losing sight of the part. Share the requirement; we will show you the route.</p><ButtonLink href="/contact" dark>Start an RFQ</ButtonLink></div></div>
    </section>
  </>;
}

function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  return <Link href={`/products/${product.id}`} data-testid={`card-product-${product.id}`} className={`group relative block overflow-hidden border border-foreground/15 bg-card ${featured ? 'md:row-span-2' : ''}`}>
    <div className={`relative ${featured ? 'aspect-[1.2] md:aspect-auto md:h-full md:min-h-[475px]' : 'aspect-[1.25]'} overflow-hidden bg-gradient-to-br ${product.imageTone}`}><div className="absolute inset-0 grid-paper opacity-30" /><PinDiagram compact={featured} /><span className="absolute left-4 top-4 eyebrow text-foreground/55">{product.code}</span><ArrowUpRight className="absolute right-5 top-5 text-foreground/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={20} /></div>
    <div className="border-t border-foreground/15 p-5"><p className="eyebrow text-accent">{product.family}</p><h3 className="mt-2 font-display text-2xl font-semibold tracking-[-.04em]">{product.name}</h3><p className="mt-2 text-sm text-muted-foreground">{product.short}</p></div>
  </Link>;
}

function Products() {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('All');
  const [sort, setSort] = useState('Featured');
  const filtered = useMemo(() => products.filter((product) => (family === 'All' || product.family === family) && `${product.name} ${product.code} ${product.short}`.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sort === 'A–Z' ? a.name.localeCompare(b.name) : products.indexOf(a) - products.indexOf(b)), [family, query, sort]);
  const families = ['All', ...Array.from(new Set(products.map((product) => product.family)))];
  return <PageIntro eyebrow="Catalogue / 01" title={<>The range, <span className="text-muted-foreground">specified.</span></>} description="Start with a proven profile or bring us a requirement that does not fit a standard line. Product details are structured for a clear first conversation.">
    <div className="mb-8 flex flex-col gap-3 border-y border-foreground/10 py-4 md:flex-row md:items-center">
      <div className="relative flex-1"><Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product code or application" data-testid="input-product-search" className="h-11 w-full border border-foreground/15 bg-card pl-10 pr-3 text-sm outline-none focus:border-accent" /></div>
      <div className="flex gap-2 overflow-auto"><SlidersHorizontal size={16} className="mt-3 text-muted-foreground" />{families.map((item) => <button type="button" key={item} onClick={() => setFamily(item)} data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`} className={`whitespace-nowrap px-3 py-2 text-xs font-semibold ${family === item ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>{item}</button>)}</div>
      <label className="relative flex items-center gap-2 border-l border-foreground/10 pl-4 text-xs text-muted-foreground"><span className="hidden md:inline">Sort</span><select value={sort} onChange={(event) => setSort(event.target.value)} data-testid="select-product-sort" className="appearance-none bg-transparent pr-5 font-semibold text-foreground outline-none"><option>Featured</option><option>A–Z</option></select><ChevronDown size={13} className="pointer-events-none absolute right-0" /></label>
    </div>
    {filtered.length ? <div className="grid gap-5 md:grid-cols-2">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="bracket grid min-h-64 place-items-center p-10 text-center"><div><p className="eyebrow text-accent">No exact match</p><h3 className="mt-3 font-display text-2xl">Bring us the requirement.</h3><p className="mt-2 text-sm text-muted-foreground">A custom route may be the right route.</p><ButtonLink href="/contact">Talk to engineering</ButtonLink></div></div>}
  </PageIntro>;
}

function ProductDetail() {
  const { id = '' } = useParams<{ id: string }>();
  const product = getProduct(id) || products[0];
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  return <div className="mx-auto max-w-[1440px] px-5 py-12 md:px-10 md:py-20">
    <Link href="/products" data-testid="link-back-products" className="eyebrow text-muted-foreground hover:text-accent">← Product catalogue</Link>
    <div className="mt-10 grid gap-12 md:grid-cols-[.95fr_1.05fr] md:gap-20">
      <div className={`bracket relative min-h-[420px] overflow-hidden bg-gradient-to-br ${product.imageTone} md:min-h-[590px]`}><div className="absolute inset-0 grid-paper opacity-30" /><PinDiagram /><div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[.12em] text-foreground/50">Product study / {product.code}</div></div>
      <div className="flex flex-col justify-center"><SectionLabel>{product.code} / {product.family}</SectionLabel><h1 className="mt-7 max-w-xl font-display text-6xl font-semibold leading-[.9] tracking-[-.07em] md:text-8xl">{product.name}</h1><p className="mt-8 max-w-lg text-lg leading-8 text-muted-foreground">{product.description}</p><div className="mt-10 border-y border-foreground/15 py-5"><p className="eyebrow mb-4 text-muted-foreground">Select size to inspect</p><div className="flex flex-wrap gap-2">{product.sizes.map((size) => <button type="button" key={size} onClick={() => setSelectedSize(size)} data-testid={`button-size-${size.replaceAll(' ', '-')}`} className={`border px-4 py-2.5 text-sm transition-colors ${selectedSize === size ? 'border-accent bg-accent text-accent-foreground' : 'border-foreground/15 hover:border-accent'}`}>{size}</button>)}</div></div>
        <div className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5 border-b border-foreground/15 pb-7"><Spec label="Selected size" value={selectedSize} /><Spec label="Wire material" value={product.wire} /><Spec label="Surface finish" value={product.finish} /><Spec label="Data status" value={product.availability} /></div><div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/contact">Request this specification</ButtonLink><ButtonLink href="/manufacturing">View the process</ButtonLink></div>
      </div>
    </div>
    <div className="mt-20 border-t border-foreground/15 pt-8"><SectionLabel>Typical applications</SectionLabel><div className="mt-6 flex flex-wrap gap-3">{product.use.map((use) => <span key={use} className="border border-foreground/15 px-4 py-3 text-sm">{use}</span>)}</div></div>
  </div>;
}

function Spec({ label, value }: { label: string; value: string }) { return <div><p className="eyebrow text-muted-foreground">{label}</p><p className="mt-2 text-sm leading-5">{value}</p></div>; }

function PageIntro({ eyebrow, title, description, children }: { eyebrow: string; title: ReactNode; description: string; children: ReactNode }) {
  return <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24"><div className="max-w-4xl reveal"><SectionLabel>{eyebrow}</SectionLabel><h1 className="mt-7 font-display text-6xl font-semibold leading-[.9] tracking-[-.07em] md:text-8xl">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p></div><div className="mt-16">{children}</div></div>;
}

function Manufacturing() {
  const steps = [{ no: '01', title: 'Material intake', text: 'Wire enters the process against an agreed material requirement. The lot stays traceable through the forming sequence.', icon: <ClipboardCheck /> }, { no: '02', title: 'Forming & pointing', text: 'Straight wire becomes a working component through a measured series of bends, cuts, and point-forming operations.', icon: <Factory /> }, { no: '03', title: 'Clasp & spring', text: 'The functional heart of the pin is shaped and set to create a positive, repeatable closure.', icon: <Sparkles /> }, { no: '04', title: 'Pack & handover', text: 'Finished pieces are prepared to the agreed pack format, with the requirement visible at the point of dispatch.', icon: <ShieldCheck /> }];
  return <PageIntro eyebrow="Production floor / 02" title={<>FROM RAW MATERIAL<br /><span className="text-muted-foreground">TO PRECISION PRODUCT</span></>} description="A safety pin moves through more decisions than its size suggests. We keep those decisions visible, repeatable, and connected to the use case.">
    <div className="grid gap-8 md:grid-cols-[1.1fr_.9fr]"><div className="relative min-h-[420px] overflow-hidden bg-sidebar"><img src={formingImage} alt="Wire being guided through a forming machine" className="h-full w-full object-cover opacity-80" /><div className="absolute inset-0 bg-sidebar/20" /><span className="absolute bottom-5 left-5 eyebrow text-sidebar-foreground/70">forming line / detail view</span></div><div className="flex flex-col justify-center border-y border-foreground/15 py-8"><SectionLabel>How the line works</SectionLabel><p className="mt-6 max-w-md text-2xl leading-9 tracking-[-.03em]">The best production line is the one that leaves fewer questions behind.</p><p className="mt-5 max-w-md text-sm leading-6 text-muted-foreground">Exact equipment, line configuration, and production capacity are confirmed against the product and volume requirement.</p><span className="mt-8 inline-flex w-fit border border-accent/50 px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-accent">Technical details available on request</span></div></div>
    <div className="mt-16 grid border-t border-foreground/15 md:grid-cols-4">{steps.map((step) => <div key={step.no} className="border-b border-foreground/15 px-0 py-8 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0"><div className="flex items-center justify-between text-accent"><span className="font-mono text-xs">{step.no}</span>{step.icon}</div><h2 className="mt-10 font-display text-xl font-semibold">{step.title}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{step.text}</p></div>)}</div>
    <div className="mt-20 bg-sidebar px-6 py-12 text-sidebar-foreground md:px-14 md:py-16"><div className="grid gap-10 md:grid-cols-[1fr_1.5fr]"><SectionLabel>Scale without noise</SectionLabel><div><h2 className="font-display text-4xl font-semibold leading-none tracking-[-.05em] md:text-6xl">NEED MILLIONS?<br /><span className="text-accent">WE BUILD FOR SCALE.</span></h2><p className="mt-6 max-w-xl text-sidebar-foreground/60">Volume, pack architecture, and delivery cadence are not afterthoughts. Bring the whole brief and we will define what needs to be true.</p><ButtonLink href="/contact" dark>Discuss your volume</ButtonLink></div></div></div>
  </PageIntro>;
}

function Quality() {
  return <PageIntro eyebrow="Quality system / 03" title={<>QUALITY IS NOT<br /><span className="text-muted-foreground">INSPECTED IN.</span><br />IT IS BUILT IN.</>} description="Quality is the sum of the choices made before a finished pin ever reaches inspection. Our job is to make those choices legible.">
    <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div className="bracket p-7 md:p-10"><p className="font-display text-3xl leading-tight tracking-[-.04em]">A clear requirement is the first quality control.</p><p className="mt-8 text-sm leading-6 text-muted-foreground">We start by translating application, handling, material, finish, pack, and volume into an agreed working specification.</p></div><div><div className="border-t border-foreground/15">{['Requirement review', 'Material and finish alignment', 'In-process checks', 'Finished product review', 'Pack and dispatch confirmation'].map((item, index) => <div key={item} className="flex items-center gap-6 border-b border-foreground/15 py-6"><span className="font-mono text-xs text-accent">0{index + 1}</span><span className="font-display text-xl">{item}</span><Check className="ml-auto text-accent" size={18} /></div>)}</div></div></div>
    <div className="mt-20 grid gap-5 md:grid-cols-3">{[{ title: 'Measurement', body: 'Critical dimensions and functional points are aligned to the product requirement. Detailed tolerances are available on request.' }, { title: 'Material', body: 'Material grade and surface expectation are discussed before production. No assumed defaults in a custom brief.' }, { title: 'Documentation', body: 'The documents required for your internal process can be discussed as part of the quotation.' }].map((item) => <div key={item.title} className="bg-secondary/60 p-7"><h3 className="font-display text-2xl">{item.title}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground">{item.body}</p></div>)}</div>
    <div className="mt-20 flex flex-col justify-between gap-6 border-t border-foreground/15 pt-8 md:flex-row md:items-center"><p className="font-display text-3xl tracking-[-.04em]">Need a specific quality pack?</p><ButtonLink href="/contact">Specify what you need</ButtonLink></div>
  </PageIntro>;
}

function Applications() {
  const apps = [{ title: 'Textiles & apparel', desc: 'For the point where material handling, secure closure, and presentation meet.', tag: 'TEXT / APP' }, { title: 'Packaging & identification', desc: 'A small physical marker for bundles, labels, samples, and product stories.', tag: 'PACK / ID' }, { title: 'Industrial assembly', desc: 'Dependable temporary holds and component handling across a working process.', tag: 'IND / ASM' }, { title: 'Custom programs', desc: 'If the use case does not fit a line item, the brief becomes the starting point.', tag: 'CUSTOM' }];
  return <PageIntro eyebrow="Applications / 04" title={<>THE RIGHT PIN<br /><span className="text-muted-foreground">FOR THE JOB.</span></>} description="The same familiar mechanism behaves differently in a garment, a bale, a sample room, or an assembly line. Start with the moment it needs to perform.">
    <div className="grid gap-4 md:grid-cols-2">{apps.map((app, index) => <Link href={index === 3 ? '/contact' : '/products'} key={app.title} data-testid={`card-application-${index}`} className={`group relative min-h-[255px] border border-foreground/15 p-7 transition-colors hover:border-accent md:min-h-[320px] ${index === 0 ? 'bg-sidebar text-sidebar-foreground' : 'bg-card'}`}><span className={`eyebrow ${index === 0 ? 'text-accent' : 'text-muted-foreground'}`}>{app.tag}</span><h2 className="absolute bottom-16 font-display text-3xl font-semibold tracking-[-.04em] md:text-4xl">{app.title}</h2><p className={`absolute bottom-7 max-w-sm text-sm ${index === 0 ? 'text-sidebar-foreground/60' : 'text-muted-foreground'}`}>{app.desc}</p><ArrowUpRight className="absolute right-7 top-7 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>)}</div>
    <div className="mt-20 grid gap-10 border-t border-foreground/15 pt-10 md:grid-cols-[1fr_1fr]"><div><SectionLabel>Not sure where to start?</SectionLabel><h2 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-none tracking-[-.05em]">Describe the moment it needs to hold.</h2></div><div><p className="max-w-md text-base leading-7 text-muted-foreground">Tell us what the pin touches, how it is handled, and what cannot go wrong. We will help you identify a sensible route through the range.</p><ButtonLink href="/contact">Talk through the use case</ButtonLink></div></div>
  </PageIntro>;
}

function About() {
  return <PageIntro eyebrow="Company / 05" title={<>A TINY COMPONENT.<br /><span className="text-muted-foreground">A SERIOUS STANDARD.</span></>} description="Holdfast Components is an editable company profile for a manufacturing partner focused on safety-pin production. The details below are deliberately specific in tone and open in fact.">
    <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]"><div><PinDiagram /></div><div><SectionLabel>How we work</SectionLabel><div className="mt-8 space-y-8">{[{ title: 'We listen for the failure point.', body: 'Before we discuss a product, we discuss the moment it needs to perform.' }, { title: 'We keep the language exact.', body: 'When a detail is not yet confirmed, it is marked Available on request—not quietly guessed.' }, { title: 'We make the handover easy.', body: 'A good manufacturing relationship should make the next decision clearer than the last.' }].map((item) => <div key={item.title} className="border-l-2 border-accent pl-5"><h2 className="font-display text-2xl">{item.title}</h2><p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">{item.body}</p></div>)}</div></div></div>
    <div className="mt-20 border-y border-foreground/15 py-10"><div className="grid gap-8 md:grid-cols-3"><Spec label="Company details" value="Editable placeholder" /><Spec label="Manufacturing location" value="Available on request" /><Spec label="Established" value="Available on request" /></div></div>
    <div className="mt-20 flex flex-col items-start justify-between gap-8 bg-accent p-8 text-accent-foreground md:flex-row md:items-center md:p-12"><div><SectionLabel>Next step</SectionLabel><h2 className="mt-5 font-display text-4xl tracking-[-.05em]">LET’S BUILD YOUR REQUIREMENT.</h2></div><ButtonLink href="/contact" dark>Start a conversation</ButtonLink></div>
  </PageIntro>;
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', company: '', requirement: '', volume: '' });
  const [error, setError] = useState('');
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const submit = (event: FormEvent) => { event.preventDefault(); if (!form.name || !form.email || !form.requirement) { setError('Please add your name, work email, and requirement.'); return; } setError(''); setSent(true); };
  return <PageIntro eyebrow="Contact / RFQ" title={<>LET’S BUILD<br /><span className="text-muted-foreground">YOUR REQUIREMENT.</span></>} description="Send the useful first version of the brief. We will use it to understand the component, the context, and the conversation that should follow.">
    <div className="grid gap-12 md:grid-cols-[.8fr_1.2fr]"><div className="border-t border-foreground/15 pt-6"><SectionLabel>What helps us respond</SectionLabel><ul className="mt-7 space-y-5 text-sm leading-6 text-muted-foreground">{['Product family or reference', 'Target size, material, and finish', 'Where the pin is used', 'Indicative volume or pack requirement'].map((item) => <li key={item} className="flex gap-3"><Check size={16} className="mt-1 shrink-0 text-accent" />{item}</li>)}</ul><div className="mt-12 border-t border-foreground/15 pt-6"><p className="eyebrow text-muted-foreground">Direct contact</p><p className="mt-3 font-display text-xl">Details available on request.</p><p className="mt-2 text-sm text-muted-foreground">We keep the first response human and specific.</p></div></div>
      <div className="bg-sidebar p-6 text-sidebar-foreground md:p-10">{sent ? <div className="flex min-h-[430px] flex-col justify-center"><div className="grid h-12 w-12 place-items-center border border-accent text-accent"><Check /></div><h2 className="mt-7 font-display text-4xl tracking-[-.05em]">Brief received.</h2><p className="mt-4 max-w-md leading-7 text-sidebar-foreground/60">Thank you, {form.name.split(' ')[0] || 'there'}. Your requirement is ready for a considered response. A team member will follow up using the details provided.</p><button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', company: '', requirement: '', volume: '' }); }} data-testid="button-send-another" className="mt-8 w-fit border border-sidebar-foreground/30 px-5 py-3 text-xs font-bold uppercase tracking-[.13em] hover:border-accent hover:text-accent">Send another brief</button></div> : <form onSubmit={submit} noValidate><div className="mb-8 flex items-center justify-between"><p className="eyebrow text-accent">Request for quotation</p><span className="font-mono text-[10px] text-sidebar-foreground/40">FORM / 001</span></div><div className="grid gap-5 md:grid-cols-2"><Field label="Name *" value={form.name} onChange={(value) => update('name', value)} placeholder="Your name" testId="input-contact-name" /><Field label="Work email *" type="email" value={form.email} onChange={(value) => update('email', value)} placeholder="you@company.com" testId="input-contact-email" /><Field label="Company" value={form.company} onChange={(value) => update('company', value)} placeholder="Company name" testId="input-contact-company" /><Field label="Indicative volume" value={form.volume} onChange={(value) => update('volume', value)} placeholder="Available on request" testId="input-contact-volume" /></div><label className="mt-5 block"><span className="eyebrow text-sidebar-foreground/55">Requirement *</span><textarea value={form.requirement} onChange={(event) => update('requirement', event.target.value)} placeholder="Tell us about the pin, application, size, material, finish, and pack." data-testid="input-contact-requirement" className="mt-2 min-h-32 w-full resize-y border border-sidebar-foreground/20 bg-sidebar-foreground/5 p-3 text-sm text-sidebar-foreground outline-none placeholder:text-sidebar-foreground/30 focus:border-accent" /></label>{error && <p data-testid="status-contact-error" className="mt-4 text-sm text-[#f4a58b]">{error}</p>}<button type="submit" data-testid="button-submit-rfq" className="mt-6 inline-flex items-center gap-3 bg-accent px-5 py-3.5 text-xs font-bold uppercase tracking-[.13em] text-accent-foreground hover:bg-accent/90">Send requirement <ArrowRight size={15} /></button><p className="mt-5 text-[10px] leading-5 text-sidebar-foreground/40">By submitting, you are sharing a business enquiry for quotation. No certification or delivery claim is implied by this form.</p></form>}</div>
    </div>
  </PageIntro>;
}

function Field({ label, value, onChange, placeholder, type = 'text', testId }: { label: string; value: string; onChange: (value: string) => void; placeholder: string; type?: string; testId: string }) {
  return <label className="block"><span className="eyebrow text-sidebar-foreground/55">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} data-testid={testId} className="mt-2 h-11 w-full border border-sidebar-foreground/20 bg-sidebar-foreground/5 px-3 text-sm text-sidebar-foreground outline-none placeholder:text-sidebar-foreground/30 focus:border-accent" /></label>;
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><SiteShell><Switch><Route path="/" component={Home} /><Route path="/products" component={Products} /><Route path="/products/:id" component={ProductDetail} /><Route path="/manufacturing" component={Manufacturing} /><Route path="/quality" component={Quality} /><Route path="/applications" component={Applications} /><Route path="/about" component={About} /><Route path="/contact" component={Contact} /><Route component={NotFound} /></Switch></SiteShell></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;