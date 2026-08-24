import { useEffect } from 'react'
import {
  Sparkles,
  Target,
  ShieldCheck,
  MapPin,
  Phone,
  MessageCircle,
  Layers,
  Cpu,
  Boxes,
  Cloud,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Smartphone,
  Search,
  HeadphonesIcon,
  Briefcase,
  Zap,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import { useContactConfig } from '../config/contact'
import { trackPageView, trackPhoneClick, trackWhatsAppClick } from '../lib/analytics'

// 6 Approved Core Benefits
const whyChoosePoints = [
  {
    icon: Briefcase,
    title: 'Business-Focused Websites',
    description: 'We do not build generic template sites. We study your actual business model and build a website that explains your services clearly to customers.',
    highlight: 'Built for Your Business',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Most local customers look up businesses from their smartphones. Every page is built to load fast and look great on mobile screens.',
    highlight: 'Works on All Phones',
  },
  {
    icon: Target,
    title: 'Lead-Generation Focused',
    description: 'Every phone number, WhatsApp button, and contact form is placed right where visitors can tap it immediately with zero friction.',
    highlight: 'Quick Contact',
  },
  {
    icon: MapPin,
    title: 'Local Business Understanding',
    description: 'Serving Pudukkottai & surrounding areas, we understand what local customers expect when looking for a trusted business.',
    highlight: 'Local Area Focus',
  },
  {
    icon: Search,
    title: 'SEO-Ready Website Structure',
    description: 'Clean coding, fast speeds, and proper metadata ensure your website is structured correctly to be indexed and found on Google.',
    highlight: 'Google Search Ready',
  },
  {
    icon: HeadphonesIcon,
    title: 'Ongoing Support & Help',
    description: 'Whenever you want to change prices, add new photos, or update phone numbers, our team provides quick and dependable support.',
    highlight: 'Help When You Need It',
  },
]

// 4-Stage Conversion Approach: Get Found → Build Trust → Get Enquiries → Get Customers
const approachStages = [
  {
    step: '01',
    title: 'Get Found',
    description: 'Search-ready code and Google Maps setup help nearby customers discover your business online.',
    icon: Search,
  },
  {
    step: '02',
    title: 'Build Trust',
    description: 'Clean layouts, real business details, and photos establish instant credibility with visitors.',
    icon: ShieldCheck,
  },
  {
    step: '03',
    title: 'Get Enquiries',
    description: '1-tap WhatsApp buttons, call links, and simple quote forms make reaching out effortless.',
    icon: MessageCircle,
  },
  {
    step: '04',
    title: 'Get Customers',
    description: 'Fast response workflow turns visitor questions into paying clients and repeat orders.',
    icon: Zap,
  },
]

// 5-Stage Long-Term Vision Roadmap
const roadmapSteps = [
  {
    step: '01',
    name: 'Service',
    badge: 'Active & Available',
    icon: Target,
    title: 'Custom Website Building',
    description: 'We work closely with local businesses to understand their trade and build custom, mobile-friendly websites that bring real customer enquiries.',
    status: 'Available Today',
    isActive: true,
  },
  {
    step: '02',
    name: 'Standardize',
    badge: 'Active & Available',
    icon: Layers,
    title: 'Proven Website Structures',
    description: 'We develop proven website templates and workflows tailored specifically for shops, clinics, tuition centres, and local service providers.',
    status: 'Available Today',
    isActive: true,
  },
  {
    step: '03',
    name: 'Automate',
    badge: 'Active & Expanding',
    icon: Cpu,
    title: 'Instant Alerts & Notifications',
    description: 'We connect website enquiry forms directly to WhatsApp and email so business owners can respond to potential customers immediately.',
    status: 'Available Today',
    isActive: true,
  },
  {
    step: '04',
    name: 'Productize',
    badge: 'Future Direction',
    icon: Boxes,
    title: 'Pre-Packaged Digital Tools',
    description: 'Turning proven business websites and lead capture systems into turnkey packages for specific business categories.',
    status: 'Development Roadmap',
    isActive: false,
  },
  {
    step: '05',
    name: 'SaaS',
    badge: 'Future Direction',
    icon: Cloud,
    title: 'Self-Service Software Platform',
    description: 'A simple online portal where local business owners can manage website updates, customer leads, and messaging in one place.',
    status: 'Future Vision',
    isActive: false,
  },
]

const About = () => {
  const contactConfig = useContactConfig()

  useEffect(() => {
    document.title = 'About Us & Why Choose Us | Agamozhi Digital Care Pudukkottai'
    trackPageView('/about')
  }, [])

  return (
    <>
      {/* =========================================================================
          1. HERO SECTION
      ========================================================================== */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-14 sm:py-20 md:py-24 border-b border-slate-800 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500 rounded-full blur-[140px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs max-w-full">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>About Agamozhi Digital Care</span>
          </div>

          <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto text-balance leading-tight break-words">
            Helping Businesses Build a Stronger Digital Presence
          </h1>

          <p className="text-slate-200 text-sm sm:text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium break-words">
            We help local shops, clinics, schools, tuition centres, and service businesses in {contactConfig.serviceArea} get found online, build trust, and receive consistent customer calls and WhatsApp enquiries.
          </p>
        </div>
      </section>

      {/* =========================================================================
          2. ABOUT AGAMOZHI (Who We Are & What We Do)
      ========================================================================== */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Story text */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs sm:text-sm font-bold uppercase tracking-wider border border-blue-200">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Who We Are</span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight break-words">
                Simple, Honest & Practical Websites for Real Businesses
              </h2>

              <div className="space-y-4 text-slate-800 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                <p>
                  <strong>Agamozhi Digital Care</strong> was founded with a straightforward mission: to make modern website development simple, accessible, and practical for small and growing local businesses.
                </p>
                <p>
                  Many business owners find website technology confusing, overpriced, or full of unnecessary jargon. We believe building a website should be transparent and focused entirely on one outcome — <strong>bringing your business real customer enquiries, direct phone calls, and steady growth</strong>.
                </p>
                <p>
                  Whether you manage a medical clinic, retail shop, tuition centre, event planning firm, or local trade service in Pudukkottai & surrounding areas, we build fast, mobile-friendly websites that represent your business with credibility.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Plain English Communication</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                    No confusing technical buzzwords. Everything is explained clearly.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
                  <div className="font-bold text-slate-950 text-sm sm:text-base flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Focus on Real Enquiries</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                    Direct 1-tap WhatsApp and call buttons so customers reach you instantly.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button to="/contact" size="md" className="w-full sm:w-auto font-bold text-sm sm:text-base">
                  <span>Get a Free Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button to="/packages" variant="outline" size="md" className="w-full sm:w-auto font-bold text-sm sm:text-base">
                  <span>View Website Packages</span>
                </Button>
              </div>
            </div>

            {/* Location & Support Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#07111F] text-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800 shadow-xl space-y-6">
                <div>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-200 text-xs font-bold border border-blue-400/30">
                    Pudukkottai Based
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-xl sm:text-2xl text-white">Rooted in Pudukkottai</h3>
                  <p className="text-xs sm:text-sm text-blue-200 mt-1 font-semibold">Supporting Tamil Nadu Businesses</p>
                </div>

                <p className="text-slate-200 text-xs sm:text-sm md:text-base leading-relaxed font-medium">
                  We are based in Pudukkottai and work closely with local business owners. When you partner with Agamozhi, you work with a team that understands your local market, values long-term relationships, and provides direct support.
                </p>

                <div className="space-y-3 border-t border-slate-800 pt-5 text-xs sm:text-sm">
                  <a
                    href={contactConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 text-slate-200 hover:text-white transition-colors group"
                  >
                    <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="group-hover:text-blue-300 font-medium leading-relaxed">{contactConfig.address}</span>
                  </a>
                  <div className="flex items-center gap-3 text-slate-200 font-medium">
                    <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>Phone: {contactConfig.phoneDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200 font-medium">
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>WhatsApp: Available 7 days a week</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <a
                    href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('about_page')}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <a
                    href={contactConfig.phoneTel}
                    onClick={() => trackPhoneClick('about_page')}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-white/25 hover:bg-white/10 text-white text-sm font-bold transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Call: {contactConfig.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. WHY CHOOSE AGAMOZHI (6 Approved Core Benefits)
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80" id="why-choose-us">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Why Choose Agamozhi Digital Care?"
            subtitle="Built around your business, your customers, and your local market in Pudukkottai & surrounding areas."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {whyChoosePoints.map((point) => {
              const IconComp = point.icon
              return (
                <div
                  key={point.title}
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

          {/* Comparison: What We Focus On vs What We Avoid */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 sm:gap-8 mt-12 sm:mt-16">
            {/* Positive Focus Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-blue-600 font-bold text-lg border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-slate-900 font-extrabold">What We Focus On</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Understanding your business & local target audience',
                  'Creating simple pages that turn visitors into enquiries',
                  'Making your business visible in Pudukkottai searches',
                  'Clear and readable wording for all visitors',
                  '100% mobile-friendly responsive phone experience',
                  'Responsive ongoing support and maintenance',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid Box */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 text-red-600 font-bold text-lg border-b border-slate-100 pb-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-slate-900 font-extrabold">What We Avoid</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Never use slow, generic template layouts',
                  'Never overcomplicate standard business websites',
                  'Never leave you without support after launch',
                  'Never use confusing technical jargon',
                  'Never make unrealistic promises or fake claims',
                  'Never rush development without testing on phones',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. OUR APPROACH (Get Found → Build Trust → Get Enquiries → Get Customers)
      ========================================================================== */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Approach"
            title="We Don't Build Websites Just to Look Good"
            subtitle="We build websites designed as an active salesperson that works 24/7 to turn searches into customers."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative pt-4 max-w-6xl mx-auto">
            {approachStages.map((stage, idx) => {
              const IconComp = stage.icon
              return (
                <div
                  key={stage.step}
                  className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <span className="w-10 h-10 rounded-xl bg-blue-600 text-white font-mono font-extrabold text-sm flex items-center justify-center shadow-xs">
                        {stage.step}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {stage.title}
                    </h3>

                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200/80 text-[11px] font-bold text-blue-600 flex items-center justify-between">
                    <span>Phase {idx + 1} of 4</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. OUR VISION (Service → Standardize → Automate → Productize → SaaS)
      ========================================================================== */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Company Vision & Roadmap"
            title="Our Long-Term Growth Roadmap"
            subtitle="How we are evolving from hands-on service to standardized digital tools for local businesses."
          />

          <div className="max-w-4xl mx-auto space-y-4 pt-4">
            {roadmapSteps.map((step) => {
              const IconComp = step.icon
              return (
                <div
                  key={step.step}
                  className={`bg-white rounded-2xl border p-5 sm:p-7 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xs ${
                    step.isActive
                      ? 'border-blue-300 ring-1 ring-blue-100'
                      : 'border-slate-200 opacity-90'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-mono font-extrabold text-sm ${
                        step.isActive
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {step.step}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                          {step.name}
                        </span>
                        <h3 className="font-extrabold text-base sm:text-lg text-slate-950">
                          {step.title}
                        </h3>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                            step.isActive
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {step.status}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed max-w-xl font-medium">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 self-end md:self-center">
                    <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                      <IconComp className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="max-w-2xl mx-auto text-center mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              * The first three stages (<strong>Service, Standardize, Automate</strong>) represent our active services available today. <strong>Productize & SaaS</strong> represent our future development roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. CTA SECTION
      ========================================================================== */}
      <CTASection
        title="Ready to Build Your Business Website?"
        subtitle="Tell us about your business. We will recommend the right package to help you get more customer enquiries."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default About
