import { useState } from 'react';
import { ArrowRight, CheckCircle2, MessageSquare, PhoneCall, ShieldCheck, Truck, FileSpreadsheet, Send, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { INDIAN_SIZE_CHART } from '../data/products';

export function CustomPinConfigurator() {
  const { formatPrice, currency } = useCart();
  const [productType, setProductType] = useState('Standard Steel Safety Pins (Mirror Nickel)');
  const [sizeNo, setSizeNo] = useState('Size 2 (#2 - 38mm / 1.5")');
  const [finish, setFinish] = useState('Mirror Silver Nickel Plating');
  const [packaging, setPackaging] = useState('Bunched Ring Pack (12 Pins on Master Pin)');
  const [volume, setVolume] = useState<number>(50000);
  const [destination, setDestination] = useState('Tirupur / Tamil Nadu / All India GST / Tuticorin Port Export');
  const [customStamp, setCustomStamp] = useState(false);
  const [stampText, setStampText] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [clientInfo, setClientInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
  });

  // Base price in USD (converted to INR at live 86.5 rate)
  const getBaseRatePerPiece = () => {
    let rate = 0.0095; // Base rate
    if (productType.includes('Brass')) rate += 0.012;
    if (productType.includes('Stainless')) rate += 0.055;
    if (productType.includes('Heavy-Duty')) rate += 0.045;
    if (productType.includes('Pear')) rate += 0.002;
    if (finish.includes('Black') || finish.includes('Gold')) rate += 0.0025;
    if (customStamp) rate += 0.0015;

    // Volume discount
    if (volume >= 500000) rate *= 0.75;
    else if (volume >= 250000) rate *= 0.82;
    else if (volume >= 100000) rate *= 0.90;
    else if (volume >= 50000) rate *= 0.95;

    return Math.max(0.007, rate);
  };

  const unitRateUSD = getBaseRatePerPiece();
  const totalAmountUSD = unitRateUSD * volume;
  const estimatedCartons = Math.ceil(volume / 20000);
  const estimatedWeightKg = Math.round((volume * 0.00065) + 3);

  const handleWhatsAppQuote = () => {
    const message = `*INQUIRY: KANYAKUMARI SAFETY PINS & FASTENERS (TAMIL NADU)*\n` +
      `---------------------------------------\n` +
      `• *Product:* ${productType}\n` +
      `• *Size:* ${sizeNo}\n` +
      `• *Finish:* ${finish}\n` +
      `• *Packaging:* ${packaging}\n` +
      `• *Quantity:* ${volume.toLocaleString()} pcs\n` +
      `• *Delivery Location:* ${destination}\n` +
      (customStamp && stampText ? `• *Custom Clasp Stamp:* ${stampText}\n` : '') +
      `• *Buyer Name:* ${clientInfo.name || 'Direct Buyer'}\n` +
      `• *Company/Firm:* ${clientInfo.company || 'Direct Buyer'}\n` +
      `• *Phone/WhatsApp:* ${clientInfo.phone || 'N/A'}\n` +
      `• *Email:* ${clientInfo.email || 'N/A'}\n` +
      `---------------------------------------\n` +
      `Please provide formal GST Proforma Invoice / Ex-Factory Kanyakumari / FOB Tuticorin Port rates.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919876543210?text=${encoded}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientInfo.name || !clientInfo.email) return;
    setSubmitted(true);
  };

  return (
    <div className="border border-foreground/15 bg-card p-6 md:p-10 shadow-xl rounded-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-6 mb-8">
        <div>
          <div className="eyebrow text-accent flex items-center gap-2">
            <Sparkles size={14} /> Kanyakumari, Tamil Nadu • Direct Mill Desk
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-1 text-foreground">
            Bulk Order & RFQ Cost Estimator
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Instant factory rate estimate for Tamil Nadu textile houses, Tirupur knitwear units & global exports.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/80 px-4 py-2 text-xs font-mono border border-foreground/15">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>KANYAKUMARI DESK: +91 98765 43210</span>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center max-w-xl mx-auto animate-in zoom-in-95 duration-300">
          <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground mx-auto mb-5 rounded-full shadow-lg">
            <CheckCircle2 size={32} />
          </div>
          <span className="eyebrow text-accent">Tamil Nadu Plant RFQ Logged</span>
          <h3 className="font-display text-3xl font-bold mt-2 text-foreground">Quotation Request Received</h3>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Thank you, <strong className="text-foreground">{clientInfo.name}</strong>. Your requirement for <strong className="text-foreground">{volume.toLocaleString()} pcs</strong> of <strong className="text-foreground">{productType}</strong> has been sent to our Kanyakumari sales & dispatch division.
          </p>

          <div className="mt-6 p-5 border border-foreground/15 bg-secondary/50 text-left font-mono text-xs space-y-2 rounded-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">RFQ Reference:</span>
              <span className="font-bold text-foreground">KK-RFQ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size & Finish:</span>
              <span>{sizeNo} • {finish}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Packing:</span>
              <span>{packaging}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Factory Amount:</span>
              <span className="text-accent font-bold text-sm">{formatPrice(totalAmountUSD)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dispatch Hub:</span>
              <span className="text-foreground">Kanyakumari / Tuticorin Port / Tirupur</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={handleWhatsAppQuote}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all rounded-xs"
            >
              <MessageSquare size={16} />
              <span>Connect on WhatsApp (+91)</span>
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors rounded-xs"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-6">
            {/* 1. Pin Category */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-2">1. Select Pin Type *</label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border border-foreground/20 bg-background p-3 text-sm font-medium outline-none focus:border-accent rounded-xs"
              >
                <option value="Standard Steel Safety Pins (Mirror Nickel)">Kanyakumari Standard Steel Safety Pins (Mirror Nickel)</option>
                <option value="Pure Brass 100% Rustproof Golden Safety Pins">Pure Brass 100% Rustproof Golden Safety Pins (Coastal Grade)</option>
                <option value="Bunched Master Ring Pack Safety Pins (12/24 on Master Pin)">Bunched Master Ring Pack Safety Pins (12/24 Pins on Master Pin)</option>
                <option value="Pear / Gourd / Bulb Hangtag Pins (Teardrop)">Pear / Gourd / Bulb Hangtag Pins (Teardrop)</option>
                <option value="Coil-less Anti-Snag Safety Pins (French Style)">Coil-less Anti-Snag Safety Pins (French Style)</option>
                <option value="Heavy-Duty Industrial & Laundry Safety Pins">Heavy-Duty Industrial & Laundry Safety Pins</option>
                <option value="Surgical & Marine 316 Stainless Steel Pins">Surgical & Marine 316 Stainless Steel Pins</option>
                <option value="Assorted 5-Size Master Tailor Box">Assorted 5-Size Master Tailor Box</option>
              </select>
            </div>

            {/* 2. Indian Standard Size */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-2">2. Safety Pin Size & Length (Indian Standard) *</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {INDIAN_SIZE_CHART.map((s) => {
                  const label = `${s.sizeNo} (${s.lengthMm}mm)`;
                  const isSelected = sizeNo.includes(`${s.lengthMm}mm`) || sizeNo.startsWith(s.sizeNo.split(' ')[0]);
                  return (
                    <button
                      type="button"
                      key={s.sizeNo}
                      onClick={() => setSizeNo(label)}
                      className={`p-2.5 text-left border text-xs rounded-xs transition-all ${
                        isSelected
                          ? 'border-accent bg-accent/10 font-bold text-foreground ring-1 ring-accent'
                          : 'border-foreground/15 hover:border-foreground/40 bg-background'
                      }`}
                    >
                      <div className="font-bold">{s.sizeNo}</div>
                      <div className="text-[11px] text-muted-foreground font-mono">{s.lengthMm}mm / {s.lengthInch}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Surface Finish */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block eyebrow text-muted-foreground mb-2">3. Plating / Surface Finish *</label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent rounded-xs"
                >
                  <option value="Mirror Silver Nickel Plating (Standard)">Mirror Silver Nickel Plating (Standard)</option>
                  <option value="Solid Brass Natural Golden Polished">Solid Brass Natural Golden Polished</option>
                  <option value="Matte Electro-Black (Apparel Hangtag)">Matte Electro-Black (Apparel Hangtag)</option>
                  <option value="Antique Brass / Vintage Bronze">Antique Brass / Vintage Bronze</option>
                  <option value="Rose Gold Luxury Plating">Rose Gold Luxury Plating</option>
                  <option value="Electropolished 316 Stainless Steel">Electropolished 316 Stainless Steel</option>
                </select>
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-2">4. Packaging Requirement *</label>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-3 text-sm outline-none focus:border-accent rounded-xs"
                >
                  <option value="Bunched Ring Pack (12 Pins on Master Pin)">Bunched Ring Pack (12 Pins on Master Pin)</option>
                  <option value="Bunched Ring Pack (24 Pins on Master Pin)">Bunched Ring Pack (24 Pins on Master Pin)</option>
                  <option value="Bulk Factory Master Carton (10k / 50k pcs)">Bulk Factory Master Carton (10k / 50k pcs)</option>
                  <option value="Printed Boxes (1,000 pcs / box)">Printed Boxes (1,000 pcs / box)</option>
                  <option value="Retail Blister Cards (Custom OEM Logo)">Retail Blister Cards (Custom OEM Logo)</option>
                  <option value="Polybag Packs (100 pcs with Barcode)">Polybag Packs (100 pcs with Barcode)</option>
                </select>
              </div>
            </div>

            {/* 4. Target Volume */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="eyebrow text-muted-foreground">
                  5. Order Volume: <span className="font-bold text-foreground text-sm font-mono">{volume.toLocaleString()} Pieces</span>
                </label>
                <span className="text-[11px] font-mono text-accent">
                  {volume >= 250000 ? 'Wholesale Tier-1 Ex-Factory (-25%)' : volume >= 50000 ? 'Bulk Factory Rate (-10%)' : 'Standard Rate'}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-accent h-2 bg-foreground/10 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
                <span>10,000 pcs (Sample)</span>
                <span>50,000 pcs</span>
                <span>100,000 pcs</span>
                <span>500,000 pcs</span>
                <span>1,000,000+ pcs (Container)</span>
              </div>
            </div>

            {/* Custom Stamping */}
            <div className="p-4 border border-foreground/15 bg-secondary/30 space-y-3 rounded-xs">
              <label className="flex items-center gap-2.5 text-xs font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={customStamp}
                  onChange={(e) => setCustomStamp(e.target.checked)}
                  className="rounded-xs text-accent focus:ring-accent"
                />
                <span>Custom Brand Embossing / Clasp Stamp (Min. 50,000 pcs)</span>
              </label>
              {customStamp && (
                <input
                  type="text"
                  placeholder="Enter brand name / initials for pin clasp stamping (e.g. TIRUPUR, ZARA, CHENNAI)"
                  value={stampText}
                  onChange={(e) => setStampText(e.target.value)}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
              )}
            </div>

            {/* Buyer Contact Details */}
            <div className="border-t border-foreground/15 pt-5 space-y-4">
              <p className="eyebrow text-foreground font-bold">Buyer & Shipping Details</p>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Contact Name / Sourcing Manager *"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
                <input
                  type="text"
                  placeholder="Company / Garment Mill Name"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
                <input
                  type="email"
                  required
                  placeholder="Business Email Address *"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp / Mobile Number (+91...)"
                  value={clientInfo.phone}
                  onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
              </div>

              <div>
                <label className="block eyebrow text-muted-foreground mb-1">Delivery Destination / Port</label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Tirupur, Coimbatore, Chennai, Mumbai, Tuticorin Port (FOB/CIF), Export Worldwide"
                  className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
                />
              </div>

              <textarea
                rows={2}
                placeholder="Specific instructions (e.g. special carton marking, GST invoice details, SGS lab test report)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-foreground/20 bg-background p-2.5 text-xs outline-none focus:border-accent rounded-xs"
              />
            </div>
          </div>

          {/* Right Summary Card */}
          <div className="lg:sticky lg:top-24 h-fit border border-foreground/20 bg-sidebar text-sidebar-foreground p-6 shadow-2xl space-y-5 rounded-xs">
            <div className="border-b border-sidebar-foreground/15 pb-4">
              <span className="eyebrow text-accent">EX-FACTORY KANYAKUMARI</span>
              <h4 className="font-display text-2xl font-bold mt-1 text-white">Live Cost Summary</h4>
              <p className="text-xs text-sidebar-foreground/70">Calculated in Indian Rupees (₹)</p>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Pin Type:</span>
                <span className="text-white text-right truncate max-w-[170px]">{productType.split(' ')[0]} {productType.split(' ')[1]}</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Size:</span>
                <span className="text-white">{sizeNo.split(' ')[0]} {sizeNo.split(' ')[1]}</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Packaging:</span>
                <span className="text-white text-right truncate max-w-[160px]">{packaging}</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Unit Rate:</span>
                <span className="text-accent font-bold">~{formatPrice(unitRateUSD)} / pc</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Total Volume:</span>
                <span className="text-white font-bold">{volume.toLocaleString()} pcs</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Gross Weight:</span>
                <span className="text-white">~{estimatedWeightKg} kg ({estimatedCartons} Cartons)</span>
              </div>
              <div className="flex justify-between text-sidebar-foreground/80">
                <span>Plant Dispatch:</span>
                <span className="text-emerald-400">24-48 Hours from Kanyakumari</span>
              </div>

              <div className="pt-3 border-t border-sidebar-foreground/15 flex justify-between items-baseline">
                <span className="font-sans font-bold text-white text-sm">Estimated Total:</span>
                <span className="font-display text-2xl font-bold text-accent">{formatPrice(totalAmountUSD)}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="submit"
                className="w-full bg-accent text-accent-foreground py-3.5 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg hover:brightness-110 transition-all rounded-xs"
              >
                <Send size={15} />
                <span>Submit Technical RFQ</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppQuote}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors rounded-xs"
              >
                <MessageSquare size={15} />
                <span>Instant WhatsApp Quote (+91)</span>
              </button>
            </div>

            <div className="border-t border-sidebar-foreground/15 pt-4 text-[10px] space-y-1.5 text-sidebar-foreground/60">
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-accent" />
                <span>ISO 9001:2015 Certified • Tamil Nadu Mill</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck size={13} className="text-accent" />
                <span>Ex-Factory Kanyakumari / FOB Tuticorin Port / Tirupur Direct</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet size={13} className="text-accent" />
                <span>GST Tax Invoice & Mill Test Report (MTR 3.1)</span>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default CustomPinConfigurator;
