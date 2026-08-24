import { useEffect } from 'react'
import { CheckCircle2, ArrowRight, MessageCircle, Sparkles, Target, Zap, ShieldCheck } from 'lucide-react'
import Button from '../components/Button'
import CTASection from '../components/CTASection'
import { services } from '../data/services'
import { useContactConfig } from '../config/contact'
import { trackPageView, trackWhatsAppClick } from '../lib/analytics'

const conversionPillars = [
  {
    step: '1',
    title: 'Get Discovered',
    desc: 'Local customers search for nearby businesses on Google and discover your website immediately.',
    icon: Target,
  },
  {
    step: '2',
    title: 'Build Immediate Trust',
    desc: 'Professional layout, clear service explanations, and real photos give visitors confidence.',
    icon: ShieldCheck,
  },
  {
    step: '3',
    title: 'Receive Direct Enquiries',
    desc: '1-tap WhatsApp chat and direct phone call buttons make contacting you effortless.',
    icon: Zap,
  },
]

const Services = () => {
  const contactConfig = useContactConfig()

  useEffect(() => {
    document.title = 'Website Services in Pudukkottai | Agamozhi Digital Care'
    trackPageView('/services')
  }, [])

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 sm:py-20 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Practical Digital Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto text-balance leading-tight">
            Services Built to Help Your Business Win Customers
          </h1>
          <p className="text-slate-100 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            We build websites and simple digital tools that help local businesses in Pudukkottai & surrounding areas get found, build trust, and receive more enquiries.
          </p>
        </div>
      </section>

      {/* 3-Step Result Funnel */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            {conversionPillars.map((p) => {
              const IconComp = p.icon
              return (
                <div key={p.step} className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 shadow-xs">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-extrabold uppercase tracking-wider text-blue-700 font-mono">
                    Step {p.step}
                  </div>
                  <h3 className="font-extrabold text-xl text-slate-950">{p.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">{p.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Systematic Service Breakdowns */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom space-y-16">
          {services.map((service, index) => {
            const IconComp = service.icon
            const isReversed = index % 2 !== 0
            const featureList = service.features || service.deliverables || []
            const outcomeText = service.customerBenefit || service.outcome || service.problemSolved || ''

            return (
              <div
                key={service.id}
                id={service.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 md:p-12 shadow-xs hover:border-blue-300 transition-all scroll-mt-24"
              >
                <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-start ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Left Overview & Core Answers */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs shrink-0">
                        <IconComp className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-md border border-blue-100">
                          Core Service 0{index + 1}
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 mt-1">
                          {service.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-medium">
                      {service.shortDescription}
                    </p>

                    {/* Structured Q&A Boxes */}
                    <div className="space-y-3.5 pt-2">
                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                          What is it?
                        </span>
                        <p className="text-sm sm:text-base text-slate-950 font-bold leading-relaxed">
                          {service.whatIsIt}
                        </p>
                      </div>

                      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                          Who is it for?
                        </span>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                          {service.whoIsItFor}
                        </p>
                      </div>

                      {outcomeText && (
                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 shadow-xs">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                            Outcome / What You Get:
                          </span>
                          <p className="text-sm sm:text-base text-blue-950 font-extrabold leading-relaxed">
                            {outcomeText}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Features & Direct CTA Card */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1F3A] to-[#07111F] text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-800">
                    <div>
                      <h3 className="font-extrabold text-xl text-white mb-1">Key Deliverables</h3>
                      <p className="text-xs sm:text-sm text-blue-200">Included in this service</p>
                    </div>

                    <ul className="space-y-3 text-sm sm:text-base">
                      {featureList.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-100">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <Button
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        size="lg"
                        className="w-full font-bold text-sm sm:text-base"
                      >
                        <span>Discuss {service.title}</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>

                      <a
                        href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl(`Hi Agamozhi, I would like to discuss ${service.title}.`) : `https://wa.me/91${contactConfig.whatsappNumber}?text=${encodeURIComponent(`Hi Agamozhi, I would like to discuss ${service.title}.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick(`service_${service.id}`)}
                        className="flex items-center justify-center gap-2 p-3.5 rounded-xl border border-emerald-400/40 bg-emerald-600/30 text-white text-sm font-bold hover:bg-emerald-600/40 transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>Quick Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Build Your Business Website?"
        subtitle="Tell us about your business goals. We will study your requirement and recommend the exact package."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default Services
