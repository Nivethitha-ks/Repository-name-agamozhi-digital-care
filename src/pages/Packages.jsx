import { useEffect } from 'react'
import { Sparkles, MessageCircle, ArrowRight } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import CTASection from '../components/CTASection'
import Button from '../components/Button'
import { packages } from '../data/packages'
import { CONTACT_CONFIG } from '../config/contact'
import { trackPageView, trackWhatsAppClick } from '../lib/analytics'

const comparisonRows = [
  { feature: 'Page Count', starter: 'Up to 5 Pages', standard: 'Up to 10 Pages', business: 'Multiple Pages' },
  { feature: 'Mobile-Friendly Design', starter: 'Yes', standard: 'Yes', business: 'Yes' },
  { feature: 'Direct WhatsApp Chat Button', starter: 'Yes', standard: 'Yes', business: 'Yes' },
  { feature: 'Customer Enquiry Form', starter: 'Simple Form', standard: 'Custom Form', business: 'Advanced Forms' },
  { feature: 'Google Maps Location Display', starter: 'Yes', standard: 'Yes', business: 'Yes' },
  { feature: 'Search-Ready Website Structure', starter: 'Basic Setup', standard: 'Complete Structure', business: 'Full Structure' },
  { feature: 'Visitor Analytics Setup', starter: '—', standard: 'Included', business: 'Included' },
  { feature: 'Content Writing Assistance', starter: '—', standard: '—', business: 'Included' },
  { feature: 'Revisions', starter: '1 Round', standard: '2 Rounds', business: '3 Rounds' },
  { feature: 'Support Period', starter: 'Launch Support', standard: '1 Month', business: '3 Months' },
]

const Packages = () => {
  useEffect(() => {
    document.title = 'Website Packages & Solutions | Agamozhi Digital Care'
    trackPageView('/packages')
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Website Packages</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Simple Packages for Every Business Stage
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Choose the website solution that fits your current business needs. No hidden charges or complicated technical jargon.
          </p>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Direct Consultation Box */}
          <div className="mt-14 max-w-2xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 md:p-8 text-center shadow-xs space-y-4">
            <h3 className="font-extrabold text-lg text-slate-900">
              Need Help Choosing the Right Package?
            </h3>
            <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
              We can help you choose the best package based on your services, customer goals, and budget. Send us a message on WhatsApp or book a free phone discussion.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <Button to="/contact" size="sm" variant="primary">
                <span>Request Free Advice</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
              <a
                href={CONTACT_CONFIG.getWhatsAppUrl('Hi Agamozhi, I would like guidance on choosing a website package.')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('packages_guidance')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Side-by-Side Comparison"
            title="Compare Package Inclusions"
            subtitle="Review the features included with each website package."
          />

          <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[540px] text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-4 px-6 font-bold text-slate-900">Feature</th>
                    <th className="py-4 px-4 font-bold text-slate-900 text-center">Starter Website</th>
                    <th className="py-4 px-4 font-bold text-blue-600 text-center bg-blue-50/50">Standard Website</th>
                    <th className="py-4 px-4 font-bold text-slate-900 text-center">Business Website</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-6 font-semibold text-slate-800">{row.feature}</td>
                      <td className="py-3.5 px-4 text-center text-slate-700">{row.starter}</td>
                      <td className="py-3.5 px-4 text-center font-bold text-blue-700 bg-blue-50/30">{row.standard}</td>
                      <td className="py-3.5 px-4 text-center text-slate-900 font-semibold">{row.business}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
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

export default Packages
