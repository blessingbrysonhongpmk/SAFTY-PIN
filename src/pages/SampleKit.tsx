import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Box, CheckCircle2, ShieldCheck, ArrowRight, Truck, Check } from 'lucide-react';
import { Link } from 'wouter';

export function SampleKit() {
  const { addSampleKit } = useCart();
  const [requested, setRequested] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    primaryInterest: 'Apparel Tagging & Fashion',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;
    setRequested(true);
  };

  return (
    <div className="mx-auto max-w-[1440px] px-5 py-14 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
        {/* Left Intro */}
        <div>
          <div className="eyebrow text-accent flex items-center gap-2">
            <Box size={14} /> Evaluation Hardware
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold tracking-tight leading-[0.95]">
            THE MASTER<br />
            <span className="text-accent">SAMPLE BOX.</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Complimentary engineering evaluation kit for designers, quality controllers, and sourcing directors. Experience our wire temper, clasp retention, and finish standards firsthand.
          </p>

          {/* Sample Kit Box Specs */}
          <div className="mt-8 grid sm:grid-cols-2 gap-4 border-y border-foreground/15 py-6 font-mono text-xs">
            <div className="space-y-2">
              <span className="text-muted-foreground block">Box Contents:</span>
              <p className="font-bold text-foreground">• 16 Calibrated Pin Sizes (13mm to 102mm)</p>
              <p className="font-bold text-foreground">• 8 Distinct Profile Geometries</p>
              <p className="font-bold text-foreground">• 4 Plating & Finish Standards</p>
            </div>
            <div className="space-y-2">
              <span className="text-muted-foreground block">Included Technical Data:</span>
              <p className="font-bold text-foreground">• Mill Test Certificates (MTR 3.1)</p>
              <p className="font-bold text-foreground">• RoHS & REACH Chemical Compliance</p>
              <p className="font-bold text-foreground">• Precision Wire Gauge Sizing Rule</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5 text-foreground font-bold">
              <Truck size={14} className="text-accent" /> 100% Free Priority Courier Dispatch
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-accent" /> Zero Commercial Obligation
            </span>
          </div>
        </div>

        {/* Right Request Box */}
        <div className="bracket border border-foreground/15 bg-card p-6 md:p-10 shadow-2xl">
          {requested ? (
            <div className="py-10 text-center animate-in zoom-in-95 duration-300">
              <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground rounded-full mx-auto mb-5 shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <span className="eyebrow text-accent">Dispatch Order Logged</span>
              <h3 className="font-display text-3xl font-bold mt-2">Sample Box on the Way!</h3>
              <p className="text-sm text-muted-foreground mt-3 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-foreground">{formData.name}</strong>. Your sample case has been queued for courier packaging to <strong className="text-foreground">{formData.company || formData.city}</strong>.
              </p>
              <div className="mt-6 p-4 border border-foreground/15 bg-secondary/50 font-mono text-xs text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracking Dispatch:</span>
                  <span className="text-accent font-bold">24-48 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courier Service:</span>
                  <span>FedEx Priority International</span>
                </div>
              </div>
              <div className="mt-8 flex flex-col gap-3">
                <Link
                  href="/products"
                  className="bg-accent text-accent-foreground py-3 font-bold text-xs uppercase tracking-widest text-center"
                >
                  Explore Standard Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border-b border-foreground/10 pb-4 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-xl font-bold">Request Your Free Sample Box</h3>
                  <p className="text-xs text-muted-foreground">Shipped to verifiable business & studio addresses</p>
                </div>
                <span className="bg-accent/15 text-accent font-mono text-[11px] font-bold px-2.5 py-1">
                  $0.00 FREE
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Marc Rossi"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.rossi@tailorhouse.com"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Company / Studio Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company or Brand"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Primary Application</label>
                  <select
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  >
                    <option>Apparel Tagging & Fashion</option>
                    <option>Commercial Laundry & Dry Cleaning</option>
                    <option>Retail Packaging & Hangtags</option>
                    <option>Delicate Silk & Haute Couture</option>
                    <option>Medical & Sterilization</option>
                    <option>Custom Industrial Assembly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Delivery Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street Address, Suite / Floor"
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="City"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    placeholder="Zip / Postcode"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3.5 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-105 shadow-md active:scale-98 mt-2"
              >
                <span>Dispatch Free Engineering Sample Box</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-[10px] text-muted-foreground text-center pt-1">
                No credit card required. Available worldwide for commercial and design evaluations.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SampleKit;
