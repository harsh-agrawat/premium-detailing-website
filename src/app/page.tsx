"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { FooterSection } from "@/components/ui/footer-section";
import dynamic from "next/dynamic";
const AdvancedMap = dynamic(
  () => import("@/components/ui/interactive-map").then((mod) => mod.AdvancedMap),
  { ssr: false }
);
import { NavBar } from "@/components/ui/tubelight-navbar";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";
import {
  Home, Info, Briefcase, Phone, CheckCircle, ShieldCheck,
  Zap, Droplets, Sparkles, MapPin, Star, Wrench,
  ArrowRight, Check, ChevronDown, Clock, X
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const navItems = [
  { name: "Home",     url: "#home",     icon: Home },
  { name: "Services", url: "#services", icon: Briefcase },
  { name: "Pricing",  url: "#pricing",  icon: Zap },
  { name: "About",    url: "#about",    icon: Info },
  { name: "Contact",  url: "#contact",  icon: Phone },
];

const services = [
  {
    title: "Exterior Detailing",
    description: "Flawless decontamination and high-gloss finishing to restore showroom brilliance.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Interior Restoration",
    description: "Deep material extraction, leather conditioning, and comprehensive sanitization.",
    icon: <Droplets className="w-8 h-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Paint Correction",
    description: "Multi-stage machine compounding to eliminate swirl marks, scratches, and oxidation.",
    icon: <Wrench className="w-8 h-8 text-primary" />,
    image: "/after-detail.jpg",
  },
  {
    title: "Ceramic Coating",
    description: "Nano-ceramic polymers bonding to your clear coat for years of extreme protection.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=800&auto=format&fit=crop",
  },
];

const allTestimonials = [
  {
    text: "My black Porsche 911 looks better than the day I bought it. The 9H ceramic coating is absolutely unbelievable.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Michael R.",
    role: "Porsche 911 GT3 Owner",
  },
  {
    text: "The level of attention to detail is unmatched. They found and corrected swirls I didn't even know existed.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sarah L.",
    role: "BMW M4 Owner",
  },
  {
    text: "Worth every penny. The paint correction removed 5 years of automatic car wash damage completely.",
    image: "https://randomuser.me/api/portraits/men/68.jpg",
    name: "David K.",
    role: "Mercedes AMG Owner",
  },
  {
    text: "From the moment I dropped off my car to picking it up, the experience was completely five-star.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    name: "Jennifer T.",
    role: "Tesla Model S Owner",
  },
  {
    text: "The interior restoration is something else. My Range Rover smells and looks brand new after 8 years.",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    name: "James W.",
    role: "Range Rover Sport Owner",
  },
  {
    text: "I've been to 4 detailers in the city. Apex is in a completely different league — premium in every sense.",
    image: "https://randomuser.me/api/portraits/women/55.jpg",
    name: "Amanda C.",
    role: "Audi RS6 Owner",
  },
  {
    text: "They treated my Lamborghini like it was their own. The paint correction results under proper lighting are jaw-dropping.",
    image: "https://randomuser.me/api/portraits/men/77.jpg",
    name: "Carlos M.",
    role: "Lamborghini Urus Owner",
  },
  {
    text: "Quick turnaround, meticulous work, and incredible communication throughout the entire process.",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    name: "Rachel P.",
    role: "Maserati GranTurismo Owner",
  },
  {
    text: "The ceramic coating they applied has made maintenance so easy. Water just rolls off effortlessly.",
    image: "https://randomuser.me/api/portraits/men/41.jpg",
    name: "Tyler B.",
    role: "Ferrari 488 Owner",
  },
];

const firstColumn  = allTestimonials.slice(0, 3);
const secondColumn = allTestimonials.slice(3, 6);
const thirdColumn  = allTestimonials.slice(6, 9);

const faqs = [
  { question: "How long does a detail take?", answer: "Most full details take 4–8 hours depending on the vehicle's condition and the package selected." },
  { question: "Is ceramic coating worth it?", answer: "Absolutely. Ceramic coating provides years of protection against UV, chemicals, and minor scratches while making the car easier to clean." },
  { question: "How often should I detail my vehicle?", answer: "A full detail every 4–6 months with maintenance washes every 2–4 weeks to preserve the finish." },
  { question: "What's included in paint correction?", answer: "Machine compounding and polishing to remove swirl marks, scratches, and oxidation from the clear coat." },
];

// ─── Utility Components ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-primary font-bold tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
      <span className="block w-8 h-px bg-primary shrink-0" />
      {children}
    </p>
  );
}

// ─── Before/After Slider ──────────────────────────────────────────────────────

function BeforeAfterSlider() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    update(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragging.current) {
      update(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative z-50 w-full max-w-5xl mx-auto h-[380px] md:h-[560px] rounded-3xl overflow-hidden select-none border border-white/5 shadow-2xl cursor-ew-resize touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* AFTER (full width underneath) */}
      <img
        src="/after-detail.jpg"
        draggable={false}
        alt="After detailing"
        className="absolute inset-0 w-full h-full object-cover brightness-100 pointer-events-none"
      />

      {/* BEFORE (clipped to right side) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${pos}%)`, WebkitClipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <img
          src="/before-detail.jpg"
          draggable={false}
          alt="Before detailing"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-5 left-5 z-20 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/10 pointer-events-none">
        After
      </div>
      <div
        className="absolute top-5 z-20 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/70 border border-white/10 transition-all pointer-events-none"
        style={{ left: `${pos + 2}%` }}
      >
        Before
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 z-20 pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center shadow-xl pointer-events-none">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-4 bg-white rounded-full" />
            <div className="w-0.5 h-4 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials (3-column infinite scroll) ─────────────────────────────────

function Testimonials() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center max-w-[540px] mx-auto text-center mb-12"
      >
        <div className="border border-primary/30 bg-primary/5 py-1 px-4 rounded-full text-xs font-bold text-primary tracking-widest uppercase mb-4">
          Client Testimonials
        </div>
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
          What Clients <span className="font-bold">Say.</span>
        </h2>
        <p className="text-muted-foreground mt-4 text-base font-light">
          Trusted by owners of the world&apos;s finest automobiles.
        </p>
      </motion.div>

      <div className="flex justify-center gap-5 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[720px] overflow-hidden">
        <TestimonialsColumn testimonials={firstColumn} duration={15} />
        <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
        <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
      </div>
    </div>
  );
}

// ─── Executive Quote Calculator ───────────────────────────────────────────────

// Car SVG icons
const CarIconSedan = () => (
  <svg viewBox="0 0 64 32" fill="none" className="w-10 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h56M8 22l4-8h28l8 8" />
    <path d="M14 14l4-6h16l6 6" />
    <circle cx="16" cy="25" r="3" />
    <circle cx="48" cy="25" r="3" />
  </svg>
);
const CarIconSUV = () => (
  <svg viewBox="0 0 64 32" fill="none" className="w-10 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h56M8 22l2-10h40l2 10" />
    <path d="M12 12l2-5h32l2 5" />
    <circle cx="16" cy="25" r="3" />
    <circle cx="48" cy="25" r="3" />
  </svg>
);
const CarIconTruck = () => (
  <svg viewBox="0 0 64 32" fill="none" className="w-10 h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h56M6 22V10h28v12M34 14h16l6 8" />
    <circle cx="14" cy="25" r="3" />
    <circle cx="50" cy="25" r="3" />
  </svg>
);

const vehicleTypes = [
  { label: "Sedan / Coupe",       sub: "Multiplier: 1x",   multiplier: 1.0,  icon: <CarIconSedan /> },
  { label: "SUV / Crossover",     sub: "Multiplier: 1.2x", multiplier: 1.2,  icon: <CarIconSUV /> },
  { label: "Supercar / Heavy Truck", sub: "Multiplier: 1.4x", multiplier: 1.4, icon: <CarIconTruck /> },
];

const packages = [
  { name: "Signature Detail",  price: 199,  desc: "Full exterior & interior reset" },
  { name: "Paint Correction",  price: 499,  desc: "Multi-stage swirl removal" },
  { name: "9H Ceramic Coating",price: 899,  desc: "3-year nano-ceramic armor" },
  { name: "Exotic Concierge",  price: 1499, desc: "White-glove total transformation" },
];

const addons = [
  { name: "Wheel Barrel Ceramic",       desc: "Banish brake dust and road grime",    price: 150 },
  { name: "Rain-Repellent Glass Coat",  desc: "Ultra-hydrophobic safety shield",     price: 99  },
  { name: "Premium Leather Guard",      desc: "Preserves factory matte soft leather", price: 120 },
  { name: "Engine Bay Cosmetic Restoration", desc: "Deep degreasing and dry dressing", price: 95 },
];

function ExecutiveQuote() {
  const [vehicleIdx, setVehicleIdx] = useState(0);
  const [packageIdx, setPackageIdx] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", date: "" });

  const toggleAddon = (i: number) => {
    setSelectedAddons(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  const basePrice  = packages[packageIdx].price;
  const multiplier = vehicleTypes[vehicleIdx].multiplier;
  const addonTotal = [...selectedAddons].reduce((sum, i) => sum + addons[i].price, 0);
  const totalPrice = Math.round(basePrice * multiplier) + addonTotal;

  return (
    <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
      {/* ── LEFT: Steps ── */}
      <div className="relative z-[100] bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 space-y-10">

        {/* Step 1 */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5 select-none">
            1. Select Vehicle Classification
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {vehicleTypes.map((v, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setVehicleIdx(i)}
                className={`cursor-pointer select-none flex flex-col gap-3 p-4 rounded-2xl border text-left transition-all duration-300 ${
                  vehicleIdx === i
                    ? "bg-primary/10 border-primary/60 shadow-[0_0_20px_rgba(0,100,255,0.1)]"
                    : "bg-background/40 border-white/5 hover:border-white/15"
                }`}
              >
                <div className={`pointer-events-none transition-colors duration-300 ${
                  vehicleIdx === i ? "text-primary" : "text-muted-foreground"
                }`}>
                  {v.icon}
                </div>
                <div className="pointer-events-none">
                  <p className={`font-bold text-sm ${
                    vehicleIdx === i ? "text-white" : "text-foreground/80"
                  }`}>{v.label}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{v.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5 select-none">
            2. Select Core Treatment Package
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {packages.map((pkg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPackageIdx(i)}
                className={`cursor-pointer select-none flex items-start justify-between p-4 rounded-2xl border text-left transition-all duration-300 ${
                  packageIdx === i
                    ? "bg-primary/10 border-primary/60 shadow-[0_0_20px_rgba(0,100,255,0.1)]"
                    : "bg-background/40 border-white/5 hover:border-white/15"
                }`}
              >
                <div className="pointer-events-none">
                  <p className={`font-bold text-sm ${
                    packageIdx === i ? "text-white" : "text-foreground/80"
                  }`}>{pkg.name}</p>
                  <p className="text-muted-foreground text-xs mt-1">Base Price: ${pkg.price}</p>
                </div>
                {packageIdx === i && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5 pointer-events-none">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3 */}
        <div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-5 select-none">
            3. Elevate Protection (Optional Add-Ons)
          </p>
          <div className="space-y-3">
            {addons.map((addon, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleAddon(i)}
                className={`cursor-pointer select-none w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                  selectedAddons.has(i)
                    ? "bg-primary/10 border-primary/60"
                    : "bg-background/40 border-white/5 hover:border-white/15"
                }`}
              >
                <div className={`pointer-events-none w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                  selectedAddons.has(i)
                    ? "bg-primary border-primary"
                    : "border-white/20"
                }`}>
                  {selectedAddons.has(i) && <Check className="w-3 h-3 text-white" />}
                </div>
                <div className="pointer-events-none flex-1 min-w-0">
                  <p className={`font-semibold text-sm ${
                    selectedAddons.has(i) ? "text-white" : "text-foreground/80"
                  }`}>{addon.name}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{addon.desc}</p>
                </div>
                <span className="pointer-events-none text-primary font-bold text-sm shrink-0">+${addon.price}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Quote + Form ── */}
      <div className="relative z-0 lg:sticky lg:top-24 space-y-4">
        {/* Quote Panel */}
        <div className="bg-card/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
          <h3 className="text-sm font-bold text-white uppercase tracking-widest text-center mb-6">Your Executive Quote</h3>
          <div className="bg-background/60 rounded-2xl p-6 mb-4 text-center border border-white/5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3">Estimated Treatment Price</p>
            <div className="flex items-start justify-center">
              <span className="text-xl text-primary font-light mt-2 mr-1">$</span>
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={totalPrice}
                  initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.3 }}
                  className="text-6xl font-light text-white tracking-tighter"
                >
                  {totalPrice}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">*Taxes & paint prep depth factored upon inspection</p>
        </div>

        {/* Booking Form */}
        <div className="bg-card/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8">
          <form onSubmit={(e) => { e.preventDefault(); alert("VIP Inspection Request Submitted!"); }} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">Full Name</label>
              <input
                type="text" required placeholder="e.g. Sterling Archer"
                value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))}
                className="w-full bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">Email Address</label>
                <input
                  type="email" required placeholder="e.g. sterling@apex.com"
                  value={formData.email} onChange={(e) => setFormData(p => ({...p, email: e.target.value}))}
                  className="w-full bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">Phone Number</label>
                <input
                  type="tel" placeholder="(555) 0199"
                  value={formData.phone} onChange={(e) => setFormData(p => ({...p, phone: e.target.value}))}
                  className="w-full bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground/40"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] tracking-widest uppercase font-bold text-muted-foreground">Preferred Inspection Date</label>
              <input
                type="date"
                value={formData.date} onChange={(e) => setFormData(p => ({...p, date: e.target.value}))}
                className="w-full bg-background/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors [color-scheme:dark]"
              />
            </div>
            <NeonButton variant="solid" type="submit" className="w-full py-4 rounded-xl text-xs tracking-[0.15em] font-bold flex items-center justify-center gap-2">
              <ArrowRight className="w-4 h-4" /> REQUEST VIP INSPECTION
            </NeonButton>
          </form>
        </div>
      </div>
    </div>
  );
}
// ─── Pricing Cards (interactive) ───────────────────────────────────────────────

const pricingPlans = [
  {
    name: "Signature Detail",
    badge: "Best Seller",
    price: "199",
    desc: "Comprehensive deep cleaning, interior sterilization, and clay bar treatment with advanced spray sealant.",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=800&auto=format&fit=crop",
    icon: <Sparkles className="w-5 h-5 text-primary" />,
    features: ["100% scratch-free hand wash", "Wheel barrel & brake caliper cleaning", "Deep carpet extraction & leather conditioning", "Clay bar treatment & iron decontamination"],
    highlight: false,
  },
  {
    name: "Paint Correction",
    badge: "Recommended",
    price: "499",
    desc: "Bespoke multi-stage machine polishing designed to eliminate heavy swirl marks, holograms, and scratches.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=800&auto=format&fit=crop",
    icon: <Wrench className="w-5 h-5 text-primary" />,
    features: ["Everything in Signature Detail", "Decontamination & paint thickness measurement", "Stage 2 dual-action machine polishing", "Correction of up to 90–95% of paint defects"],
    highlight: true,
  },
  {
    name: "9H Ceramic Coating",
    badge: "Premium Armor",
    price: "899",
    desc: "Ultimate protective armor shield. Semi-permanent liquid glass bonding against UV, bird drops, and acid rain.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    features: ["Everything in Paint Correction", "Professional grade 9H liquid ceramic application", "Single-layer coating (up to 5-year guarantee)", "Glass, alloy wheel & plastic trim coating"],
    highlight: false,
  },
  {
    name: "Exotic Concierge",
    badge: "Ultimate",
    price: "1,499",
    desc: "Elite preservation treatment designed for museum-grade supercars, hypercars, and classic collector cars.",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=800&auto=format&fit=crop",
    icon: <Zap className="w-5 h-5 text-primary" />,
    features: ["Multi-stage heavy paint correction (99% flawless)", "Double-layer 9H professional nano coating", "Wheel-off detailing (inner barrels & suspension)", "Full leather restoration & dry ice cleaning"],
    highlight: false,
  },
];

function PricingCards() {
  const [selected, setSelected] = useState<number>(1); // Paint Correction pre-selected

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 relative z-[100]">
      {pricingPlans.map((plan, i) => {
        const isActive = selected === i;
        return (
          <FadeIn key={i} delay={i * 0.05}>
            <div
              className={`group flex flex-col relative rounded-3xl overflow-hidden backdrop-blur-xl border transition-all duration-300 ${
                isActive
                  ? "border-primary/70 bg-secondary/80 shadow-[0_0_30px_rgba(0,100,255,0.15)]"
                  : "border-white/5 bg-card/40 hover:border-white/20 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
              }`}
            >
              {/* Invisible Button for perfect hit-testing */}
              <button
                type="button"
                onClick={() => setSelected(i)}
                className="absolute inset-0 z-10 w-full h-full cursor-pointer focus:outline-none"
                aria-label={`Select ${plan.name}`}
              />

              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={plan.image}
                  alt={plan.name}
                  className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isActive ? "from-secondary/90 via-secondary/20" : "from-card/90 via-card/20"
                } to-transparent`} />
                {/* Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/40"
                    : "bg-white/10 backdrop-blur-md border border-white/20 text-white"
                }`}>
                  {plan.badge}
                </div>
                {/* Icon */}
                <div className={`absolute bottom-4 left-4 w-10 h-10 rounded-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 ${
                  isActive ? "bg-primary/20 border border-primary/40" : "bg-black/50 border border-white/10"
                }`}>
                  {plan.icon}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-7 relative z-20 pointer-events-none">
                <h3 className={`text-xl font-bold tracking-tight mb-1 transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-white"
                }`}>{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-base text-muted-foreground pb-1">$</span>
                  <span className="text-5xl font-light text-white tracking-tighter leading-none">{plan.price}</span>
                  <span className="text-xs text-muted-foreground pb-1 ml-1">starting</span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-primary/70"
                      }`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto relative z-20 pointer-events-auto">
                  <a href="#booking" className="block">
                    {isActive ? (
                      <NeonButton variant="solid" className="w-full py-3 rounded-xl text-xs font-bold tracking-widest uppercase">
                        Book Now
                      </NeonButton>
                    ) : (
                      <button type="button" className="w-full py-3 rounded-xl border border-white/10 text-white text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors">
                        Book Now
                      </button>
                    )}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        );
      })}
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/5 rounded-2xl bg-card/40 backdrop-blur-md overflow-hidden">
          <button
            className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-white text-base pr-4">{faq.question}</span>
            <ChevronDown
              className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className="px-6 pb-5 text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const { scrollY } = useScroll();
  const videoY  = useTransform(scrollY, [0, 800], [0, 160]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const [showOfferModal, setShowOfferModal] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      {showOfferModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowOfferModal(false)} />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl w-full max-w-md shadow-2xl"
          >
            <button onClick={() => setShowOfferModal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-black text-white uppercase mb-2">Claim Your Offer</h3>
            <p className="text-sm text-white/60 mb-6">Fill out the details below and we will contact you to confirm your Clay Bar + Ceramic Sealant appointment.</p>
            <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("Offer claimed! We will contact you soon."); setShowOfferModal(false); }}>
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 transition-colors" placeholder="(555) 000-0000" />
              </div>
              <div>
                <label className="text-xs font-bold text-white/70 uppercase tracking-widest mb-1.5 block">Vehicle Make & Model</label>
                <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-primary/50 transition-colors" placeholder="e.g. 2023 Tesla Model 3" />
              </div>
              <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-widest uppercase py-4 rounded-lg mt-2 transition-all shadow-[0_0_15px_rgba(255,0,0,0.3)] hover:shadow-[0_0_25px_rgba(255,0,0,0.5)] cursor-pointer">
                Submit & Book
              </button>
            </form>
          </motion.div>
        </div>
      )}

      <NavBar items={navItems} />

      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section id="home" className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-24 md:pb-32">
        {/* Parallax video */}
        <motion.div style={{ y: videoY }} className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover brightness-[0.65]">
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>

        {/* Top Info Bar */}
        <div className="absolute top-0 left-0 w-full bg-black/60 backdrop-blur-md border-b border-white/10 z-40 hidden md:block">
          <div className="container mx-auto px-6 max-w-7xl h-10 flex items-center justify-between text-[11px] font-medium tracking-wide text-white/70">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-primary" /> Mon-Sat: 8:00AM - 7:00PM</span>
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-primary" /> Serving Greater Apex & Surrounding Areas</span>
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </span>
              <a href="tel:8005552739" className="flex items-center gap-2 text-white font-bold hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5 text-primary" /> (800) 555-APEX
              </a>
            </div>
          </div>
        </div>

        {/* Brand Badge (Now acts as the Logo in the visual hierarchy) */}
        <div className="absolute top-6 left-6 md:top-16 md:left-10 z-30 flex items-center gap-2.5">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary),0.5)] border border-white/20">
            <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <span className="text-white font-black tracking-widest uppercase text-base md:text-lg drop-shadow-md">Apex Detailers</span>
        </div>

        {/* Left-Aligned headline block */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative z-10 text-left w-full max-w-7xl mx-auto px-6 mt-12 md:mt-0"
        >
          <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[1] mb-6 uppercase drop-shadow-[0_4px_15px_rgba(0,0,0,0.8)]">
            <span className="text-white block">FALL IN LOVE WITH</span>
            <span className="text-primary block mt-1">YOUR CAR AGAIN.</span>
          </h1>
          <p className="text-sm md:text-xl text-white font-medium mb-10 max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Premium Paint Correction, Ceramic Coatings, and Professional Detailing Serving The Greater Apex Metro Area
          </p>
          
          <div className="relative z-[100] flex flex-col sm:flex-row justify-start items-start sm:items-center gap-6 pointer-events-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-sm md:text-base px-10 py-4 tracking-widest font-bold uppercase rounded-full cursor-pointer shadow-[0_0_20px_rgba(255,0,0,0.2)] hover:shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:-translate-y-1"
            >
              Get Your Free Quote
            </button>
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const target = document.getElementById('services');
                if (target) {
                  try {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } catch(err) {
                    window.location.hash = 'services';
                  }
                }
              }}
              className="relative z-[9999] pointer-events-auto group text-white/80 hover:text-white transition-colors uppercase tracking-[0.18em] text-[11px] font-bold flex items-center gap-2 cursor-pointer focus:outline-none py-4 pr-6 whitespace-nowrap"
            >
              <span className="pointer-events-none">Explore Services</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform pointer-events-none" />
            </button>
          </div>
        </motion.div>

        {/* Bottom Features Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-black/40 backdrop-blur-md border-t border-white/10 z-20">
          <div className="container mx-auto px-6 max-w-6xl py-6 grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2 group cursor-default">
              <MapPin className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
              <span className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-white">Fully Mobile Service</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 group cursor-default">
              <ShieldCheck className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
              <span className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-white">Professional Care</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2 group cursor-default">
              <Star className="w-5 h-5 md:w-7 md:h-7 text-primary group-hover:-translate-y-1 transition-transform" strokeWidth={1.5} />
              <span className="text-[9px] md:text-xs font-bold tracking-widest uppercase text-white">Trusted By Many</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Limited Time Offer ────────────────────────────────────────── */}
      <section className="relative w-full py-12 md:py-16 bg-background overflow-hidden border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="relative bg-[#0a0202] border border-red-900/40 rounded-3xl p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden shadow-[0_0_80px_rgba(255,0,0,0.08)]">
            {/* Background Glow */}
            <div className="absolute left-0 top-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-red-600/10 blur-[120px] pointer-events-none rounded-full" />

            <div className="relative z-10 flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 bg-primary text-white uppercase font-black text-[10px] tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.5)] animate-pulse">
                  <Clock className="w-3.5 h-3.5" /> Flash Sale
                </span>
                <span className="text-red-400 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 fill-red-400" /> Only 3 Spots Left This Week!
                </span>
              </div>
              <h2 className="text-white font-black text-3xl md:text-5xl uppercase tracking-tighter leading-[1.05]">
                Clay Bar + 6 Month Ceramic Sealant
              </h2>
              <p className="text-white/70 mt-4 font-medium max-w-2xl text-sm md:text-lg leading-relaxed">
                Get our premium clay bar treatment combined with a 6-month ceramic sealant for ultimate gloss and protection. <strong className="text-white">Lock in this price before it's gone!</strong>
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center md:items-end gap-5 min-w-[240px]">
              <div className="flex items-center gap-4">
                <span className="line-through text-white/30 text-2xl md:text-3xl font-bold decoration-red-500/50">$189</span>
                <span className="text-white text-5xl md:text-6xl font-black drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">$149</span>
              </div>
              <button 
                onClick={() => setShowOfferModal(true)}
                className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 text-sm md:text-base px-10 py-5 tracking-widest font-black uppercase rounded-xl cursor-pointer shadow-[0_0_30px_rgba(255,0,0,0.4)] hover:shadow-[0_0_50px_rgba(255,0,0,0.6)] hover:-translate-y-1 relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[150%] group-hover:animate-[shimmer_1.5s_infinite]" />
                Claim Offer Now
              </button>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">No Credit Card Required</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────── */}
      <section id="services" className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <SectionLabel>The Arsenal</SectionLabel>
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
                Precision <span className="font-bold">Services.</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-base font-light leading-relaxed">
              Surgical precision and industry-leading chemistry to resurrect and armor every surface.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-5">
            {services.map((s, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="group relative h-[380px] md:h-[440px] rounded-3xl overflow-hidden border border-white/5 cursor-pointer">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="absolute inset-0 w-full h-full object-cover brightness-30 group-hover:brightness-50 group-hover:scale-[1.04] transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 p-7 flex flex-col justify-end z-10">
                    <div className="mb-4 w-13 h-13 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center w-[52px] h-[52px] group-hover:-translate-y-1.5 transition-transform duration-500">
                      {s.icon}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-2 group-hover:text-primary transition-colors duration-500">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-75">{s.description}</p>
                    <div className="flex items-center gap-2 text-[11px] font-bold text-white uppercase tracking-widest opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150 mt-4">
                      Discover <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ──────────────────────────────────────────── */}
      <section className="py-28 md:py-36 bg-card/20 border-y border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center mb-14">
            <SectionLabel>Metamorphosis</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
              Witness The <span className="font-bold">Transformation.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <BeforeAfterSlider />
          </FadeIn>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────── */}
      <section className="py-28 md:py-36">
        <div className="container mx-auto px-6 max-w-7xl">
          <Testimonials />
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────── */}
      <section id="pricing" className="py-28 md:py-36 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center mb-16">
            <SectionLabel>Curated Packages</SectionLabel>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
              Transparent <span className="font-bold">Investment.</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-base font-light">
              Every package includes our satisfaction guarantee and post-service support.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <PricingCards />
          </FadeIn>
        </div>
      </section>

      {/* ── Executive Quote (Estimator + Booking merged) ───────────── */}
      <section id="booking" className="py-28 md:py-36 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Get Your Executive Quote</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white">
              Build Your <span className="font-bold">Package.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ExecutiveQuote />
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 md:py-36 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-3xl">
          <FadeIn className="text-center mb-12">
            <SectionLabel>Questions</SectionLabel>
            <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-white">
              Frequently <span className="font-bold">Asked.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <FAQ />
          </FadeIn>
        </div>
      </section>

      {/* ── Map & Footer ─────────────────────────────────────────────── */}
      <section id="contact" className="pt-24 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-7xl mb-12">
          <FadeIn className="text-center mb-10">
            <h2 className="text-3xl font-light tracking-tighter text-white">
              The <span className="font-bold">Studio.</span>
            </h2>
            <p className="text-muted-foreground text-sm mt-2 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-primary" /> 100 Luxury Lane, Beverly Hills, CA 90210
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
              <AdvancedMap
                style={{ height: "480px", width: "100%" }}
                markers={[{
                  position: [34.0736, -118.4004],
                  color: "blue",
                  size: "large",
                  popup: { title: "Apex Detailers", content: "Premium Auto Detailing Studio" },
                }]}
              />
            </div>
          </FadeIn>
        </div>
        <FooterSection />
      </section>
    </main>
  );
}
