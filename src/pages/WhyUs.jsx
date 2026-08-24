import { useEffect } from 'react'
import {
  Briefcase,
  Smartphone,
  Target,
  MapPin,
  Search,
  HeadphonesIcon,
  CheckCircle2,
  XCircle,
  Sparkles,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import { trackPageView } from '../lib/analytics'

const reasons = [
  {
    icon: Briefcase,
    title: 'Business-Focused Websites',
    description: 'We do not build generic template sites. We study your actual business model and build a website that explains your services clearly to customers.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    description: 'Most local customers look up businesses from their smartphones. Every page is built to load fast and look great on mobile screens.',
  },
  {
    icon: Target,
    title: 'Easy for Customers to Contact',
    description: 'Every phone number, WhatsApp button, and contact form is placed right where visitors can tap it immediately.',
  },
  {
    icon: MapPin,
    title: 'Local Business Understanding',
    description: 'Serving Pudukkottai & surrounding areas, we understand what local customers expect when looking for a trusted business.',
  },
  {
    icon: Search,
    title: 'Search-Ready Setup',
    description: 'Clean coding, fast speeds, and proper Google business details ensure your website is ready to be found on search engines.',
  },
  {
    icon: HeadphonesIcon,
    title: 'Ongoing Help & Maintenance',
    description: 'Whenever you want to change prices, add new photos, or update phone numbers, our team provides quick support.',
  },
]

const WhyUs = () => {
  useEffect(() => {
    document.title = 'Why Choose Agamozhi Digital Care | Web Development Pudukkottai'
    trackPageView('/why-us')
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Agamozhi Standard</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Why Choose Agamozhi Digital Care?
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            We are not just designing web pages — we build business websites that work as your first salesperson to capture local demand in Pudukkottai & surrounding areas.
          </p>
        </div>
      </section>

      {/* 6 Core Pillars */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Core Strengths"
            title="Six Key Reasons Businesses Partner with Us"
            subtitle="Built for long-term credibility, reliable lead generation, and strong local presence."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {reasons.map((reason) => {
              const IconComp = reason.icon
              return (
                <div
                  key={reason.title}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 mb-2.5 group-hover:text-blue-600 transition-colors">
                      {reason.title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Comparison: What We Focus On vs What We Avoid */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Standard"
            title="Our Work Standards & Commitment"
            subtitle="We believe in building practical digital tools that bring real results, not unnecessary complexity."
          />

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Positive Focus Box */}
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-5">
              <div className="flex items-center gap-2.5 text-blue-600 font-bold text-lg border-b border-slate-200 pb-3">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-slate-900 font-extrabold">What We Focus On</span>
              </div>
              <ul className="space-y-3.5">
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
            <div className="bg-slate-50 rounded-3xl border border-slate-200 p-8 space-y-5">
              <div className="flex items-center gap-2.5 text-red-600 font-bold text-lg border-b border-slate-200 pb-3">
                <XCircle className="w-5 h-5" />
                <span className="text-slate-900 font-extrabold">What We Avoid</span>
              </div>
              <ul className="space-y-3.5">
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

      {/* CTA */}
      <CTASection
        title="Ready to Build Your Business Website?"
        subtitle="Tell us about your business goals. We will study your requirement and recommend the exact solution."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default WhyUs
