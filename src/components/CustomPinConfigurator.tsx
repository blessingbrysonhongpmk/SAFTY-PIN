import { useState } from 'react';
import { ArrowRight, Check, Sparkles, FileText, Sliders, CheckCircle2 } from 'lucide-react';

export function CustomPinConfigurator() {
  const [profile, setProfile] = useState<'classic' | 'coilless' | 'bulb' | 'heavy' | 'locking'>('classic');
  const [lengthMm, setLengthMm] = useState<number>(38);
  const [wireGaugeMm, setWireGaugeMm] = useState<number>(0.85);
  const [finish, setFinish] = useState<'nickel' | 'ss316' | 'satin' | 'matte'>('nickel');
  const [customLogo, setCustomLogo] = useState<boolean>(false);
  const [logoText, setLogoText] = useState<string>('');
  const [packaging, setPackaging] = useState<'bulk-poly' | 'workshop-box' | 'retail-blister' | 'tape-reel'>('workshop-box');
  const [volume, setVolume] = useState<number>(25000);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState({ name: '', company: '', email: '', notes: '' });

  // Calculate estimated unit price based on variables
  const baseRate = 0.015;
  const lengthFactor = lengthMm / 30 * 0.006;
  const wireFactor = wireGaugeMm * 0.008;
  const finishFactor = finish === 'ss316' ? 0.025 : finish === 'satin' ? 0.005 : 0;
  const logoFactor = customLogo ? 0.003 : 0;
  const packFactor = packaging === 'tape-reel' ? 0.008 : packaging === 'retail-blister' ? 0.006 : 0;

  const rawUnit = baseRate + lengthFactor + wireFactor + finishFactor + logoFactor + packFactor;
  // Volume discount scaling
  const volDiscount = volume >= 500000 ? 0.45 : volume >= 100000 ? 0.35 : volume >= 50000 ? 0.20 : volume >= 25000 ? 0.10 : 0;
  const estUnitPrice = Math.max(0.012, rawUnit * (1 - volDiscount));
  const estTotal = estUnitPrice * volume;
  const estLeadTime = volume >= 200000 ? '3-4 Weeks' : volume >= 50000 ? '2 Weeks' : '7-10 Days';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientInfo.email || !clientInfo.name) return;
    setSubmitted(true);
  };

  return (
    <div className="bracket border border-foreground/15 bg-card/80 p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-foreground/10 pb-6 mb-8">
        <div>
          <span className="eyebrow text-accent flex items-center gap-2">
            <Sparkles size={14} /> Custom Engineering Studio
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">
            Configure Your Safety Pin
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Build your exact technical brief. Real-time pricing & tooling calculations.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-secondary/80 px-4 py-2 font-mono text-xs border border-foreground/15">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span>Spec ID: HF-CUS-{(lengthMm * 10 + Math.round(wireGaugeMm * 100)).toString(16).toUpperCase()}</span>
        </div>
      </div>

      {submitted ? (
        <div className="py-12 text-center max-w-lg mx-auto animate-in zoom-in-95 duration-300">
          <div className="grid h-16 w-16 place-items-center bg-accent text-accent-foreground mx-auto mb-5 rounded-full shadow-lg">
            <CheckCircle2 size={32} />
          </div>
          <span className="eyebrow text-accent">Specification Received</span>
          <h3 className="font-display text-3xl font-bold mt-2">Engineering Brief Logged</h3>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Thank you, <strong className="text-foreground">{clientInfo.name}</strong>. Your custom safety pin specification for <strong className="text-foreground">{volume.toLocaleString()} units</strong> at approximately <strong className="text-foreground">${estUnitPrice.toFixed(4)}/pc</strong> has been submitted directly to our toolroom.
          </p>

          <div className="mt-6 p-4 border border-foreground/15 bg-secondary/40 text-left font-mono text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Reference Number:</span>
              <span className="font-bold text-foreground">HF-RFQ-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Profile & Dimensions:</span>
              <span>{profile.toUpperCase()} • {lengthMm}mm x ⌀{wireGaugeMm}mm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Plating & Logo:</span>
              <span>{finish.toUpperCase()} {customLogo ? `(Stamp: "${logoText}")` : ''}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Est. Tooling Lead:</span>
              <span className="text-accent font-bold">{estLeadTime}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-8 border border-foreground/20 px-6 py-3 font-mono text-xs uppercase tracking-wider hover:border-accent hover:text-accent transition-colors"
          >
            Configure Another Pin Specification
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="space-y-8">
            {/* Step 1: Geometry Profile */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-3">
                01 / Working Profile Geometry
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'classic', label: 'Classic Stamped Clasp', desc: 'Standard industrial loop' },
                  { id: 'coilless', label: 'Coil-less Anti-Snag', desc: 'Seamless no-loop base' },
                  { id: 'bulb', label: 'Bulb / Pear Gourd', desc: 'Swing tag teardrop base' },
                  { id: 'heavy', label: 'Heavy-Duty Reinforced', desc: 'High-tensile stout gauge' },
                  { id: 'locking', label: 'Shielded Lock-Cap', desc: 'Dual-action safety guard' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setProfile(item.id as any)}
                    className={`p-3 text-left border transition-all ${
                      profile === item.id
                        ? 'border-accent bg-accent/10 shadow-xs'
                        : 'border-foreground/15 hover:border-foreground/40 bg-background/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-semibold text-sm">{item.label}</span>
                      {profile === item.id && <Check size={14} className="text-accent" />}
                    </div>
                    <span className="block text-[11px] text-muted-foreground mt-1">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions Slider */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-3">
                02 / Pin Length & Wire Diameter
              </label>
              <div className="grid sm:grid-cols-2 gap-6 bg-background/40 p-4 border border-foreground/10">
                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold">Overall Pin Length</span>
                    <span className="font-mono text-accent font-bold text-sm">{lengthMm} mm</span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={100}
                    step={1}
                    value={lengthMm}
                    onChange={(e) => setLengthMm(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                    <span>15mm (Mini)</span>
                    <span>50mm (Standard)</span>
                    <span>100mm (Kilt)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold">Wire Gauge (Diameter)</span>
                    <span className="font-mono text-accent font-bold text-sm">⌀ {wireGaugeMm.toFixed(2)} mm</span>
                  </div>
                  <input
                    type="range"
                    min={0.50}
                    max={1.80}
                    step={0.05}
                    value={wireGaugeMm}
                    onChange={(e) => setWireGaugeMm(Number(e.target.value))}
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                    <span>0.50mm (Silk)</span>
                    <span>0.85mm (Core)</span>
                    <span>1.80mm (Rigid)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Material & Finish */}
            <div>
              <label className="block eyebrow text-muted-foreground mb-3">
                03 / Silver Finish & Alloy Specification
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'nickel', name: 'Mirror Bright Nickel Silver', desc: 'Standard high-luster electro-coat' },
                  { id: 'ss316', name: 'AISI 316 Marine Stainless', desc: '100% rustproof autoclave sterilizable' },
                  { id: 'satin', name: 'Satin Pearl Silver', desc: 'Matte luxury non-reflective texture' },
                  { id: 'matte', name: 'Eco Zinc-Tin Protective', desc: 'RoHS compliant passivated finish' },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setFinish(item.id as any)}
                    className={`p-3 text-left border transition-all ${
                      finish === item.id
                        ? 'border-accent bg-accent/10'
                        : 'border-foreground/15 bg-background/50 hover:border-foreground/40'
                    }`}
                  >
                    <span className="font-display font-semibold text-xs block">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground mt-0.5 block">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Custom Stamping & Pack Format */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-foreground/10 bg-background/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold">Custom Clasp Logo Stamp</span>
                  <input
                    type="checkbox"
                    checked={customLogo}
                    onChange={(e) => setCustomLogo(e.target.checked)}
                    className="accent-accent h-4 w-4"
                  />
                </div>
                {customLogo ? (
                  <input
                    type="text"
                    placeholder="Brand monogram / Code (max 6 chars)"
                    value={logoText}
                    onChange={(e) => setLogoText(e.target.value.toUpperCase())}
                    maxLength={6}
                    className="w-full border border-foreground/20 bg-background p-2 text-xs font-mono uppercase mt-2 outline-none focus:border-accent"
                  />
                ) : (
                  <p className="text-[11px] text-muted-foreground">
                    Emboss your company monogram directly into the metal clasp hood.
                  </p>
                )}
              </div>

              <div className="p-4 border border-foreground/10 bg-background/40">
                <span className="text-xs font-semibold block mb-2">Packaging Format</span>
                <select
                  value={packaging}
                  onChange={(e) => setPackaging(e.target.value as any)}
                  className="w-full border border-foreground/20 bg-background p-2 text-xs outline-none focus:border-accent"
                >
                  <option value="workshop-box">Workshop Box (1,000 pcs/box)</option>
                  <option value="bulk-poly">Bulk Master Polybag (10,000 pcs)</option>
                  <option value="retail-blister">Hanging Retail Blister (100 pcs)</option>
                  <option value="tape-reel">Automated Feeder Tape & Reel</option>
                </select>
              </div>
            </div>

            {/* Step 5: Volume Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="eyebrow text-muted-foreground">04 / Indicative Batch Volume</span>
                <span className="font-mono text-accent font-bold text-base">{volume.toLocaleString()} pcs</span>
              </div>
              <input
                type="range"
                min={5000}
                max={500000}
                step={5000}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1">
                <span>5,000 (Pilot)</span>
                <span>50,000 (Batch)</span>
                <span>250,000 (Production)</span>
                <span>500,000+ (Contract)</span>
              </div>
            </div>
          </div>

          {/* Right Summary Column & Instant RFQ Submission */}
          <div className="bg-sidebar text-sidebar-foreground p-6 flex flex-col justify-between border border-foreground/15 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-sidebar-foreground/15 pb-4 mb-5">
                <span className="font-mono text-xs uppercase tracking-wider text-accent">
                  Custom Quotation
                </span>
                <span className="font-mono text-[10px] text-sidebar-foreground/60">LIVE ESTIMATOR</span>
              </div>

              <div className="space-y-3 font-mono text-xs border-b border-sidebar-foreground/15 pb-5 mb-5">
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/60">Selected Model:</span>
                  <span className="font-bold uppercase">{profile} Style</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/60">Dimensions:</span>
                  <span>{lengthMm}mm x ⌀{wireGaugeMm.toFixed(2)}mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/60">Finish:</span>
                  <span className="uppercase">{finish}</span>
                </div>
                {customLogo && (
                  <div className="flex justify-between text-accent">
                    <span>Clasp Stamp:</span>
                    <span>"{logoText || 'CUSTOM'}"</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/60">Batch Quantity:</span>
                  <span className="font-bold">{volume.toLocaleString()} pcs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sidebar-foreground/60">Volume Tier Discount:</span>
                  <span className="text-accent font-bold">{(volDiscount * 100).toFixed(0)}% OFF</span>
                </div>
              </div>

              {/* Price Hero */}
              <div className="bg-sidebar-foreground/5 p-4 border border-sidebar-foreground/10 mb-6">
                <div className="text-[10px] font-mono text-sidebar-foreground/60 uppercase">Estimated Unit Cost</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-3xl font-bold text-accent">${estUnitPrice.toFixed(4)}</span>
                  <span className="text-xs font-mono text-sidebar-foreground/60">/ piece</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono pt-3 mt-3 border-t border-sidebar-foreground/10">
                  <span className="text-sidebar-foreground/70">Est. Batch Total:</span>
                  <span className="font-bold">${estTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-mono text-sidebar-foreground/50 mt-1">
                  <span>Lead Time:</span>
                  <span>{estLeadTime}</span>
                </div>
              </div>

              {/* Contact Inputs */}
              <div className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name *"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  className="w-full bg-sidebar-foreground/10 border border-sidebar-foreground/20 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent placeholder:text-sidebar-foreground/40"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email *"
                  value={clientInfo.email}
                  onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                  className="w-full bg-sidebar-foreground/10 border border-sidebar-foreground/20 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent placeholder:text-sidebar-foreground/40"
                />
                <input
                  type="text"
                  placeholder="Company / Organization"
                  value={clientInfo.company}
                  onChange={(e) => setClientInfo({ ...clientInfo, company: e.target.value })}
                  className="w-full bg-sidebar-foreground/10 border border-sidebar-foreground/20 p-2.5 text-xs text-sidebar-foreground outline-none focus:border-accent placeholder:text-sidebar-foreground/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-accent text-accent-foreground py-3.5 px-4 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-md active:scale-98"
            >
              <span>Submit Custom RFQ Brief</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CustomPinConfigurator;
