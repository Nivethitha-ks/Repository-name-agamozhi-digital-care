import { useEffect } from 'react'
import {
  ArrowRight,
  Globe,
  Phone,
  MessageCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  ChevronRight,
  Smartphone,
  Search,
  HeadphonesIcon,
  Briefcase,
  Target,
} from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import ProjectCard from '../components/ProjectCard'
import ContactForm from '../components/ContactForm'
import { packages } from '../data/packages'
import { projects } from '../data/projects'
import { industries } from '../data/industries'
import { useContactConfig } from '../config/contact'
import { trackPageView, trackPhoneClick, trackWhatsAppClick, trackConsultationCTAClick } from '../lib/analytics'

// 4-Step Process
const processSteps = [
  {
    step: '01',
    name: 'Discuss',
    title: 'Understand Your Business',
    description: 'We talk with you to understand your services, target customers, and what you want your website to achieve.',
  },
  {
    step: '02',
    name: 'Design',
    title: 'Plan & Create Layout',
    description: 'We create a clean, easy-to-read website design with clear contact buttons and simple service descriptions.',
  },
  {
    step: '03',
    name: 'Develop',
    title: 'Build & Connect',
    description: 'We build your mobile-friendly website with instant WhatsApp chat, call buttons, and contact forms.',
  },
  {
    step: '04',
    name: 'Launch',
    title: 'Test & Make Live',
    description: 'We test your website on mobile phones, connect your domain name, and launch it live for your customers.',
  },
]

// 6 Core Benefits (Simple English & High Contrast)
const whyChoosePoints = [
  {
    id: 'business-focused',
    title: 'Business-Focused Websites',
    description: 'We build websites designed specifically to explain your services clearly and help you get real customer enquiries.',
    icon: Briefcase,
    highlight: 'Built for Your Business',
  },
  {
    id: 'mobile-first',
    title: 'Mobile-First Design',
    description: 'Most local customers use their phones to find businesses. Your website will load fast and look great on every smartphone.',
    icon: Smartphone,
    highlight: 'Works on All Phones',
  },
  {
    id: 'lead-generation',
    title: 'Easy for Customers to Contact',
    description: 'We place easy-to-tap WhatsApp buttons, call links, and contact forms so visitors can reach you without hassle.',
    icon: Target,
    highlight: 'Quick Contact',
  },
  {
    id: 'local-understanding',
    title: 'Local Business Understanding',
    description: 'Serving Pudukkottai & surrounding areas, we understand what local customers look for when choosing a service.',
    icon: MapPin,
    highlight: 'Local Area Focus',
  },
  {
    id: 'seo-ready',
    title: 'Search-Ready Structure',
    description: 'Your website is built with clean code and proper details so it is ready to be indexed and found on Google.',
    icon: Search,
    highlight: 'Google Ready',
  },
  {
    id: 'ongoing-support',
    title: 'Ongoing Support & Help',
    description: 'Whenever you need to update a phone number, add new photos, or change services, our team is just a call away.',
    icon: HeadphonesIcon,
    highlight: 'Help When You Need It',
  },
]

// Trust Pillars (Operational Commitments Only — No Fake Proof)
const trustPillars = [
  {
    title: 'Transparent Process',
    desc: 'Clear steps, agreed timelines, and honest communication with no confusing technical terms.',
    icon: ShieldCheck,
  },
  {
    title: 'Responsive Support',
    desc: 'Quick help whenever you need updates, phone number changes, or general technical advice.',
    icon: HeadphonesIcon,
  },
  {
    title: 'Mobile-Friendly Design',
    desc: 'Smooth performance and clear reading experience on both Android and iPhone devices.',
    icon: Smartphone,
  },
  {
    title: 'Search-Ready Setup',
    desc: 'Proper website structure and map setup so nearby customers can discover your business.',
    icon: Search,
  },
  {
    title: 'Business-Focused Layout',
    desc: 'Clean layout that highlights your key products and guides customers to contact you.',
    icon: Target,
  },
]

const Home = () => {
  const contactConfig = useContactConfig()

  useEffect(() => {
    document.title = 'Website Development Company in Pudukkottai | Agamozhi Digital Care'
    trackPageView('/')
  }, [])

  const featuredProject = projects.find((p) => p.featured) || projects[0]

  return (
    <>
      {/* =========================================================================
          1. HERO SECTION — Simple English, High Contrast, Direct Conversion
      ========================================================================== */}
      {/* =========================================================================
          1. HERO SECTION — Spacious, High-Contrast & Responsive
      ========================================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white pt-10 pb-14 sm:py-20 md:py-24 lg:py-28 border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-500 blur-[130px]" />
          <div className="absolute bottom-10 right-0 w-[500px] h-[500px] rounded-full bg-blue-600 blur-[170px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left Column: Clear, Spacious Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left min-w-0">
              {/* Local Area Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-100 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xs max-w-full text-left">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="break-words">Serving {contactConfig.serviceArea}</span>
              </div>

              {/* Headline — Client Approved: Want More Enquiries & More Customers? */}
              <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.14] text-balance text-white break-words">
                Want More Enquiries &{' '}
                <span className="text-blue-400">
                  More Customers?
                </span>
              </h1>

              {/* Subheadline — Crisp White Text */}
              <p className="text-white text-sm sm:text-base md:text-xl w-full max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium break-words">
                Get found online, build customer trust, and grow your business with a fast, mobile-friendly website built for your trade.
              </p>

              {/* Hero Benefit Badges: Get Found · Get Calls · Get Enquiries */}
              <div className="flex flex-col min-[420px]:flex-row flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-2.5 pt-1 max-w-full">
                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-blue-500/25 border border-blue-400/50 text-blue-100 text-xs sm:text-sm font-extrabold shadow-xs w-full min-[420px]:w-auto text-center">
                  <span>🔍 Get Found</span>
                </span>
                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-500/25 border border-emerald-400/50 text-emerald-100 text-xs sm:text-sm font-extrabold shadow-xs w-full min-[420px]:w-auto text-center">
                  <span>📞 Get Calls</span>
                </span>
                <span className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500/25 border border-amber-400/50 text-amber-100 text-xs sm:text-sm font-extrabold shadow-xs w-full min-[420px]:w-auto text-center">
                  <span>💬 Get Enquiries</span>
                </span>
              </div>

              {/* Conversion Buttons — Clean Vertical Stack on Mobile / Horizontal on Desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-3.5 pt-2 w-full max-w-full">
                <Button
                  to="/contact"
                  size="lg"
                  onClick={() => trackConsultationCTAClick('hero_primary')}
                  className="w-full sm:w-auto shadow-xl shadow-blue-600/40 font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-4 sm:px-6"
                >
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                </Button>

                <a
                  href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('hero_whatsapp')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl border border-emerald-400/50 bg-emerald-600 hover:bg-emerald-500 text-white text-sm sm:text-base font-extrabold transition-all shadow-lg shadow-emerald-600/20 w-full sm:w-auto text-center"
                >
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-100 shrink-0" />
                  <span>WhatsApp Us</span>
                </a>

                <a
                  href={contactConfig.phoneTel}
                  onClick={() => trackPhoneClick('hero_call')}
                  className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 sm:py-4 rounded-xl text-xs sm:text-sm font-extrabold text-white hover:bg-white/15 transition-colors border border-white/30 w-full sm:w-auto text-center"
                >
                  <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Call {contactConfig.phoneDisplay}</span>
                </a>
              </div>

              {/* Trust markers — High Visibility Crisp Text */}
              <div className="pt-5 border-t border-slate-800/90 grid grid-cols-1 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-6 text-xs sm:text-sm text-white font-bold max-w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Fast Loading Speed</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>100% Mobile Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Google Search Ready</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>Local Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Spacious Live Sales Preview */}
            <div className="lg:col-span-5 flex justify-center w-full max-w-full min-w-0">
              <div className="w-full max-w-md relative min-w-0">
                {/* Subtle Ambient Glow */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-purple-600/30 blur-2xl opacity-75 pointer-events-none max-w-full overflow-hidden" />

                {/* Main Card Shell */}
                <div className="relative bg-slate-900/95 backdrop-blur-xl rounded-3xl border border-slate-700/90 shadow-2xl overflow-hidden max-w-full">
                  {/* Browser-style Top Bar */}
                  <div className="bg-slate-800/90 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-slate-700 flex items-center justify-between gap-2 overflow-hidden">
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-md bg-slate-950 border border-slate-700 text-[11px] sm:text-xs text-white font-mono font-medium min-w-0 truncate">
                      <Search className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="truncate">best business in pudukkottai</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-4 max-w-full">
                    {/* Live Funnel Header */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-blue-950/90 border border-blue-700/80 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                        <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-md shrink-0">
                          24/7
                        </div>
                        <div className="min-w-0">
                          <div className="text-sm sm:text-base font-extrabold text-white truncate">Live Sales Engine</div>
                          <div className="text-[11px] sm:text-xs text-blue-100 font-medium mt-0.5 truncate">Captures searches 24/7</div>
                        </div>
                      </div>
                      <span className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-full bg-emerald-500/25 text-emerald-200 font-extrabold border border-emerald-400/50 shrink-0">
                        Live Flow
                      </span>
                    </div>

                    {/* Quality Metrics Badges */}
                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700">
                        <div className="text-[10px] sm:text-[11px] text-slate-200 font-bold uppercase tracking-wider truncate">Loading Speed</div>
                        <div className="text-xs sm:text-base font-extrabold text-emerald-300 mt-1 truncate">⚡ Fast & Responsive</div>
                      </div>
                      <div className="p-2.5 sm:p-3 rounded-xl bg-slate-800 border border-slate-700">
                        <div className="text-[10px] sm:text-[11px] text-slate-200 font-bold uppercase tracking-wider truncate">Local Search</div>
                        <div className="text-xs sm:text-base font-extrabold text-blue-300 mt-1 truncate">📍 Google Ready</div>
                      </div>
                    </div>

                    {/* 3 Clear Conversion Rows */}
                    <div className="space-y-2.5 pt-1">
                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500/25 text-emerald-400 flex items-center justify-center border border-emerald-400/30 shrink-0">
                            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-white truncate">Instant WhatsApp Enquiries</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-emerald-200 font-mono font-extrabold bg-emerald-950/90 px-2 sm:px-2.5 py-1 rounded-md border border-emerald-500/40 shrink-0">1-Tap</span>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-blue-500/25 text-blue-400 flex items-center justify-center border border-blue-400/30 shrink-0">
                            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-white truncate">Direct Phone Calling</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-blue-200 font-mono font-extrabold bg-blue-950/90 px-2 sm:px-2.5 py-1 rounded-md border border-blue-500/40 shrink-0">Instant</span>
                      </div>

                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-500/25 text-indigo-400 flex items-center justify-center border border-indigo-400/30 shrink-0">
                            <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                          <span className="text-xs sm:text-sm font-extrabold text-white truncate">Customer Enquiry Form</span>
                        </div>
                        <span className="text-[10px] sm:text-xs text-indigo-200 font-mono font-extrabold bg-indigo-950/90 px-2 sm:px-2.5 py-1 rounded-md border border-indigo-500/40 shrink-0">Alert Sent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. WEBSITE AS A SALES TOOL — Simple English & High Contrast
      ========================================================================== */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <Target className="w-3.5 h-3.5 text-blue-600" />
                <span>The Real Purpose</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                We don't build websites <br />
                <span className="text-blue-600">just to look good.</span>
              </h2>

              <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed">
                A website should do real work for your business. It should act as your <strong>first salesperson</strong> — welcoming new visitors, explaining what you offer, building trust, and making it easy for customers to contact you immediately.
              </p>

              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="font-bold text-base text-slate-900">
                  Your website is built to bring you:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Direct Phone Calls', desc: 'Customers can call you with one tap on mobile' },
                    { label: 'WhatsApp Enquiries', desc: 'Visitors can chat with you instantly on WhatsApp' },
                    { label: 'Customer Quote Requests', desc: 'Simple enquiry forms sent straight to your email' },
                    { label: 'In-Person Store Visits', desc: 'Clear Google Maps location and driving directions' },
                  ].map((item) => (
                    <div key={item.label} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>{item.label}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Flow Card */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#07111F] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h3 className="font-extrabold text-xl sm:text-2xl text-white">How Your Website Helps You Win Customers</h3>
                    <p className="text-xs sm:text-sm text-blue-100 mt-0.5 font-medium">Simple 3-step visitor experience</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-blue-600/40 text-blue-200 font-extrabold border border-blue-500/40">
                    High Conversion
                  </span>
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                      1
                    </div>
                    <div>
                      <strong className="text-white block text-sm sm:text-base mb-0.5 font-extrabold">Builds Immediate Trust</strong>
                      <span className="text-slate-100 font-medium">Shows your real business, location, photos, and contact information cleanly.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                      2
                    </div>
                    <div>
                      <strong className="text-white block text-sm sm:text-base mb-0.5 font-extrabold">Explains Services Clearly</strong>
                      <span className="text-slate-100 font-medium">Customers understand what you offer and why they should choose you.</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0 text-sm shadow-xs">
                      3
                    </div>
                    <div>
                      <strong className="text-white block text-sm sm:text-base mb-0.5 font-extrabold">Makes Reaching You Effortless</strong>
                      <span className="text-slate-100 font-medium">Direct WhatsApp message or phone call with zero waiting.</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button to="/contact" size="md" className="w-full font-extrabold text-base py-3.5">
                    <span>Discuss Your Website Requirement</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ABOUT US SPOTLIGHT — ID="about" (Opens seamlessly on mobile and desktop)
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-b border-slate-200" id="about">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs sm:text-sm font-bold uppercase tracking-wider border border-blue-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>About Agamozhi Digital Care</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                Simple, Honest & Practical Websites for Local Businesses
              </h2>

              <div className="space-y-4 text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                <p>
                  <strong>Agamozhi Digital Care</strong> was started with a single purpose: to help local business owners in {contactConfig.serviceArea} get found online, build customer trust, and receive consistent phone calls and WhatsApp enquiries.
                </p>
                <p>
                  We don't sell complicated technical jargon or overpriced templates. We build fast, mobile-friendly websites that make it effortless for nearby customers to discover your shop, clinic, school, or service business.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Plain English Communication</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                    Everything explained clearly with zero confusing buzzwords.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Focus on Real Enquiries</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                    1-tap WhatsApp and call buttons so customers reach you directly.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Button to="/about" size="md" variant="primary" className="font-bold text-sm sm:text-base">
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button to="/contact" size="md" variant="outline" className="font-bold text-sm sm:text-base">
                  <span>Free Consultation</span>
                </Button>
              </div>
            </div>

            {/* Location & Quick Contact Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#07111F] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-2xl shadow-xs">
                    A
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
                    Pudukkottai Based
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-2xl text-white">Rooted in Pudukkottai</h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-1 font-semibold">Supporting Tamil Nadu Businesses</p>
                </div>

                <p className="text-white text-sm sm:text-base leading-relaxed font-medium">
                  When you partner with Agamozhi, you work with a team that understands your local market, values long-term relationships, and provides direct support.
                </p>

                <div className="space-y-3.5 border-t border-slate-800 pt-5 text-sm">
                  <a
                    href={contactConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-white hover:text-blue-200 transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="group-hover:text-blue-200 font-semibold">{contactConfig.address}</span>
                  </a>
                  <div className="flex items-center gap-3 text-white font-semibold">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Phone: {contactConfig.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white font-semibold">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp: Available 7 days a week</span>
                  </div>
                </div>

                <div className="pt-1 flex flex-col gap-2.5">
                  <a
                    href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('about_spotlight')}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. CORE SERVICES — 4 Simple Services (NO Standalone SEO Service)
      ========================================================================== */}
      <section className="section-padding bg-white border-b border-slate-200" id="services">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Services"
            title="Simple & Practical Digital Services"
            subtitle="Clear services explained in normal, everyday business terms."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {/* Service 1 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    <Globe className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
                    🚀 Core Service
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Business Website Development
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  Professional websites designed to build trust and turn visitors into enquiries.
                </p>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-900 font-bold mb-6">
                  Outcome: More customer trust & phone calls
                </div>
              </div>
              <Button to="/packages" variant="outline" size="sm" className="w-full font-bold">
                <span>View Website Packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
                    ⚡ 99.9% Fast Uptime
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Website Maintenance
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  Keep your website updated, secure and working smoothly without technical headaches.
                </p>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-900 font-bold mb-6">
                  Outcome: Peace of mind & fast loading
                </div>
              </div>
              <Button to="/contact?service=Website%20Maintenance" variant="outline" size="sm" className="w-full font-bold">
                <span>Discuss Maintenance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200 shadow-xs">
                    🚀 Lead Automation
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Digital Solutions
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  Simple digital systems that help businesses manage their day-to-day work better.
                </p>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-900 font-bold mb-6">
                  Outcome: Organized customer enquiries
                </div>
              </div>
              <Button to="/contact?service=Digital%20Solutions" variant="outline" size="sm" className="w-full font-bold">
                <span>Explore Digital Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shadow-xs">
                    💬 1-Tap Alerts
                  </span>
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  Notification Integrations
                </h3>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
                  Connect enquiry forms directly to WhatsApp and email for fast responses.
                </p>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs sm:text-sm text-blue-900 font-bold mb-6">
                  Outcome: Never miss a customer lead
                </div>
              </div>
              <Button to="/contact?service=Notification%20Integrations" variant="outline" size="sm" className="w-full font-bold">
                <span>Connect Notifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. WHY CHOOSE US — 6 Key Points in High Contrast
      ========================================================================== */}
      <section className="section-padding bg-white" id="why-us">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Agamozhi Digital Care?"
            subtitle="Built around your business, your customers, and your local market in Pudukkottai & surrounding areas."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {whyChoosePoints.map((point) => {
              const IconComp = point.icon
              return (
                <div
                  key={point.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                        {point.highlight}
                      </span>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                      {point.title}
                    </h3>

                    <p className="text-slate-700 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. 4-STEP PROCESS — Desktop Horizontal / Mobile Vertical
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-y border-slate-200/80" id="process">
        <div className="container-custom">
          <SectionHeading
            eyebrow="4-Step Process"
            title="How We Build Your Website"
            subtitle="A simple, step-by-step process with clear milestones from start to live launch."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative pt-4">
            {processSteps.map((step, idx) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 font-mono font-extrabold text-base flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      {step.step}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      {step.name}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-slate-700 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500 group-hover:text-blue-600 transition-colors">
                  <span>Step {idx + 1} of 4</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. TRUST SECTION — Genuine Operational Pillars
      ========================================================================== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Commitment"
            title="Our Commitment to Honest Work"
            subtitle="We build lasting client relationships through transparent communication, reliable support, and solid work."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 pt-2">
            {trustPillars.map((pillar) => {
              const IconComp = pillar.icon
              return (
                <div
                  key={pillar.title}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shadow-xs">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-base text-slate-900">{pillar.title}</h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">{pillar.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. WEBSITE PACKAGES — Standard=1 Month, Business=3 Months, Multiple Pages
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-t border-slate-200/80" id="packages">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Website Packages"
            title="Choose the Right Package for Your Business"
            subtitle="Clear packages with no hidden surprises. Pick the option that fits your current goals."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto pt-4">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PORTFOLIO / DEMOS — Real Client Website (Sri Bhavani Automation)
      ========================================================================== */}
      <section className="section-padding bg-white border-t border-slate-200" id="portfolio">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Live Projects"
            title="Real Websites Built for Real Businesses"
            subtitle="Inspect actual client websites built and maintained by Agamozhi Digital Care."
          />

          <div className="max-w-5xl mx-auto">
            <ProjectCard project={featuredProject} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. TARGET CUSTOMERS — "Who We Help" (Mobile Optimized Grid)
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-t border-slate-200/80" id="who-we-help">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Who We Help"
            title="Websites for Local Businesses in Every Category"
            subtitle="We build websites tailored for the specific needs of local businesses in Pudukkottai & surrounding areas."
          />

          <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 max-w-6xl mx-auto pt-2">
            {industries.map((item) => {
              const IconComp = item.icon
              return (
                <div
                  key={item.id}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-slate-700 text-xs leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-blue-600">
                    <span>Discuss Solution</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. LOCAL POSITIONING — Pudukkottai & Surrounding Areas
      ========================================================================== */}
      <section className="section-padding bg-[#0B1F3A] text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-center">
            {/* Left Location Info */}
            <div className="lg:col-span-6 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{contactConfig.serviceArea}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Helping Pudukkottai Businesses Grow Online
              </h2>

              <p className="text-white text-base sm:text-lg leading-relaxed font-medium">
                We are proud to serve local shops, clinics, schools, tuition centres, restaurants, and service providers in Pudukkottai & surrounding areas to build a trustworthy digital presence and reach nearby customers.
              </p>

              {/* Clickable Location Card to Open Directions */}
              <a
                href={contactConfig.mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-white/10 border border-white/20 flex items-start gap-4 hover:bg-white/15 transition-colors group block shadow-md"
              >
                <MapPin className="w-6 h-6 text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs sm:text-sm text-slate-100 font-bold flex items-center justify-between">
                    <span>Office Location</span>
                    <span className="text-xs font-extrabold text-blue-300 group-hover:underline">Open in Google Maps →</span>
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-white mt-1 break-words">{contactConfig.address}</div>
                </div>
              </a>

              <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2">
                <Button to="/contact" variant="primary" size="md" className="w-full sm:w-auto font-bold">
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <a
                  href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('pudukkottai_section')}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-400/40 bg-emerald-600/30 text-white text-xs font-bold hover:bg-emerald-600/40 transition-colors w-full sm:w-auto"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Us</span>
                </a>
              </div>
            </div>

            {/* Right Map */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-2xl p-2 space-y-2">
                <div className="flex items-center justify-between px-3 py-1 text-white">
                  <span className="text-xs font-bold flex items-center gap-1.5 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" />
                    Google Maps Pin
                  </span>
                  <a
                    href={contactConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-blue-300 hover:text-white"
                  >
                    Get Directions →
                  </a>
                </div>
                <iframe
                  title="Agamozhi Digital Care Location Map"
                  src={contactConfig.mapsEmbedUrl}
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. FINAL CLOSING CONVERSION SECTION
      ========================================================================== */}
      <section className="section-padding bg-gradient-to-b from-white to-slate-50 border-t border-slate-200" id="contact">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Start Your Project</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Ready to Build Your Business Website?
              </h2>

              <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                Take the first step toward getting more customer calls and enquiries. Send us a message on WhatsApp, give us a quick call, or submit the form.
              </p>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-950 space-y-1">
                <strong className="font-bold block text-blue-900">{contactConfig.tagline}</strong>
                <p className="text-blue-900 leading-relaxed font-medium">
                  Professional website → Trust → Visibility → Enquiries → Business growth.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('home_final_cta')}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-900 font-bold">Fast Response</div>
                    <div className="text-base font-extrabold text-emerald-950">WhatsApp Us</div>
                  </div>
                </a>

                <a
                  href={contactConfig.phoneTel}
                  onClick={() => trackPhoneClick('home_final_cta')}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-slate-300 bg-white hover:border-blue-400 hover:shadow-md transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-600 font-bold">Direct Phone Call</div>
                    <div className="text-base font-extrabold text-slate-900">Call Now: {contactConfig.phoneDisplay}</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
