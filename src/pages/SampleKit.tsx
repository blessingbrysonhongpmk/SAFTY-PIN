import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Box, CheckCircle2, ShieldCheck, ArrowRight, Truck, Check, MapPin, MessageSquare } from 'lucide-react';
import { Link } from 'wouter';

export function SampleKit() {
  const { addSampleKit } = useCart();
  const [requested, setRequested] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
    city: '',
    zip: '',
    country: 'India',
    primaryInterest: 'Tirupur Garment Tagging & Apparel',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) return;
    setRequested(true);
  };

  const handleWhatsAppNotify = () => {
    const text = encodeURIComponent(
      `*FREE SAMPLE BOX REQUEST - KANYAKUMARI SAFETY PINS*\n` +
      `---------------------------------------\n` +
      `• *Name:* ${formData.name}\n` +
      `• *Company:* ${formData.company || 'N/A'}\n` +
      `• *Phone:* ${formData.phone || 'N/A'}\n` +
      `• *Email:* ${formData.email}\n` +
      `• *Address:* ${formData.address}, ${formData.city} - ${formData.zip}, ${formData.country}\n` +
      `• *Application:* ${formData.primaryInterest}\n` +
      `---------------------------------------\n` +
      `Please dispatch the 12-Size Evaluation Box from Kanyakumari Mill.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-10 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
        {/* Left Intro */}
        <div>
          <div className="eyebrow text-accent flex items-center gap-2">
            <Box size={14} /> Evaluation Hardware • Kanyakumari Mill
          </div>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
            THE MASTER<br />
            <span className="text-accent">SAMPLE BOX.</span>
          </h1>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
            Complimentary engineering evaluation kit for garment sourcing directors, quality controllers, tailoring boutiques, and export houses. Experience our wire temper, clasp retention, and electroplating finish standards firsthand.
          </p>

          {/* Sample Kit Box Specs */}
          <div className="mt-6 grid sm:grid-cols-2 gap-4 border-y border-foreground/15 py-5 font-mono text-xs">
            <div className="space-y-1.5">
              <span className="text-muted-foreground block font-bold">Box Contents:</span>
              <p className="font-semibold text-foreground">• 12 Calibrated Pin Sizes (#000 to #5)</p>
              <p className="font-semibold text-foreground">• Nickel Steel & Pure Brass Golden Pins</p>
              <p className="font-semibold text-foreground">• Bunched Ring Packs & Pear Bulb Pins</p>
            </div>
            <div className="space-y-1.5">
              <span className="text-muted-foreground block font-bold">Included Technical Data:</span>
              <p className="font-semibold text-foreground">• Mill Test Report (MTR 3.1)</p>
              <p className="font-semibold text-foreground">• RoHS & REACH Compliance Certificate</p>
              <p className="font-semibold text-foreground">• Wire SWG Sizing Reference Rule</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-muted-foreground font-mono">
            <span className="flex items-center gap-1.5 text-foreground font-bold">
              <Truck size={14} className="text-accent" /> Free Courier Dispatch from Kanyakumari
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-accent" /> Zero Commercial Obligation
            </span>
          </div>
        </div>

        {/* Right Request Box */}
        <div className="border border-foreground/15 bg-card p-5 sm:p-8 md:p-10 shadow-xl rounded-xs">
          {requested ? (
            <div className="py-8 text-center animate-in zoom-in-95 duration-300">
              <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground rounded-full mx-auto mb-4 shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <span className="eyebrow text-accent">Dispatch Queued</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold mt-1 text-foreground">Sample Box on the Way!</h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-foreground">{formData.name}</strong>. Your sample case has been registered for courier packaging to <strong className="text-foreground">{formData.company || formData.city}</strong>.
              </p>
              <div className="mt-5 p-4 border border-foreground/15 bg-secondary/50 font-mono text-xs text-left space-y-1.5 rounded-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dispatch Window:</span>
                  <span className="text-accent font-bold">24-48 Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origin:</span>
                  <span>Kanyakumari Mill, Tamil Nadu</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Courier:</span>
                  <span>Professional Courier / FedEx Express</span>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 justify-center">
                <button
                  type="button"
                  onClick={handleWhatsAppNotify}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 font-bold text-xs uppercase tracking-wider rounded-xs flex items-center justify-center gap-2"
                >
                  <MessageSquare size={15} />
                  <span>Notify via WhatsApp</span>
                </button>
                <Link
                  href="/products"
                  className="bg-accent text-accent-foreground py-3 px-4 font-bold text-xs uppercase tracking-wider rounded-xs text-center"
                >
                  View Full Catalogue
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="border-b border-foreground/10 pb-3 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">Request Your Free Sample Box</h3>
                  <p className="text-xs text-muted-foreground">Shipped directly to textile mills & apparel brands</p>
                </div>
                <span className="bg-accent/15 text-accent font-mono text-[11px] font-bold px-2 py-0.5 rounded-xs">
                  ₹0.00 FREE
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
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Mobile / WhatsApp Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">Company / Mill Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Tirupur Apparel Exports"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Primary Application</label>
                <select
                  value={formData.primaryInterest}
                  onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                >
                  <option>Tirupur Garment Tagging & Apparel</option>
                  <option>Silk Sarees & Delicate Weaves</option>
                  <option>Commercial Laundry & Dry Cleaning</option>
                  <option>Retail Packaging & Hangtags</option>
                  <option>Medical & Sterilization</option>
                  <option>Custom Industrial Fastening</option>
                </select>
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Delivery Street Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Factory Address, Building / Street"
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Tirupur / Chennai"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
                <div>
                  <label className="block eyebrow text-muted-foreground mb-1">PIN / Postal Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    placeholder="641604"
                    className="w-full border border-foreground/20 bg-background p-2.5 text-xs sm:text-sm outline-none focus:border-accent rounded-xs"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3.5 px-6 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md rounded-xs transition-transform active:scale-98 mt-2"
              >
                <span>Dispatch Free Sample Box (₹0.00)</span>
                <ArrowRight size={15} />
              </button>

              <p className="text-[10px] text-muted-foreground text-center pt-1">
                Zero charges. Delivered across Tamil Nadu, India, and overseas.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default SampleKit;
