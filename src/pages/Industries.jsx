import { useEffect } from 'react'
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import Button from '../components/Button'
import CTASection from '../components/CTASection'
import { industries } from '../data/industries'
import { CONTACT_CONFIG } from '../config/contact'
import { trackPageView, trackWhatsAppClick } from '../lib/analytics'

const Industries = () => {
  useEffect(() => {
    document.title = 'Industries We Serve | Web Design in Pudukkottai'
    trackPageView('/industries')
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Target Customers & Sectors</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Websites Built for Your Specific Business
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Every business has different customers. We build websites calibrated to the search habits and expectations of your trade in Pudukkottai & surrounding areas.
          </p>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {industries.map((industry) => {
              const IconComp = industry.icon
              return (
                <div
                  key={industry.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <Button
                      to={`/contact?service=${encodeURIComponent(industry.name)}`}
                      variant="ghost"
                      size="sm"
                      className="p-0 text-blue-600 hover:text-blue-700 text-xs font-bold"
                    >
                      <span>Discuss Solution</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Don't see your industry */}
      <section className="section-padding bg-white">
        <div className="container-custom text-center max-w-3xl mx-auto space-y-4">
          <h2 className="font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
            Don't See Your Specific Trade Listed?
          </h2>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
            We work with legitimate businesses of all types and scales in Pudukkottai & surrounding areas. If your trade is not shown above, we will understand your workflow and build a custom website tailored for your business.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Button to="/contact" variant="primary" size="md" className="font-bold">
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            <a
              href={CONTACT_CONFIG.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('industries_page_custom')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 text-xs font-bold hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Build Your Business Website?"
        subtitle="Tell us about your trade and goals. We will recommend the exact solution to capture customer demand."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default Industries
