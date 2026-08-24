import { useEffect } from 'react'
import { MessageSquare, Palette, Code2, Rocket, CheckCircle2, Sparkles } from 'lucide-react'
import CTASection from '../components/CTASection'
import { trackPageView } from '../lib/analytics'

const steps = [
  {
    step: '01',
    name: 'Discuss',
    icon: MessageSquare,
    title: 'Understand Your Requirements',
    description: 'We learn about your business, the services you provide, and the types of customers you want to attract.',
    details: [
      'Fill out our simple consultation form or message us on WhatsApp',
      'Share your industry, key offerings, and business goals',
      'Choose your preferred website package',
      'Receive a clear, transparent recommendation and timeline',
    ],
  },
  {
    step: '02',
    name: 'Design',
    icon: Palette,
    title: 'Plan & Create Visual Layout',
    description: 'We organize your pages, content, and photos with a clean layout tailored for your customers.',
    details: [
      'Clear service listings and business information structure',
      'Clean typography and Modern Blue visual style',
      'Strategic WhatsApp and direct call button placement',
      'Review and agree on layout before building',
    ],
  },
  {
    step: '03',
    name: 'Develop',
    icon: Code2,
    title: 'Build & Connect',
    description: 'We build your fast, mobile-friendly website with WhatsApp chat, Google Maps, and enquiry forms.',
    details: [
      'Fast, modern website engineering',
      'One-tap WhatsApp and direct call buttons',
      'Secure contact form with instant notification alerts',
      'Tested across various smartphone screen sizes',
    ],
  },
  {
    step: '04',
    name: 'Launch',
    icon: Rocket,
    title: 'Test & Make Live',
    description: 'We test performance, connect your custom domain name, and launch your website live on Google.',
    details: [
      'Rigorous testing on Android and iPhone devices',
      'Search engine ready setup and sitemap generation',
      'Live launch on your custom domain',
      'Handover with ongoing technical support',
    ],
  },
]

const HowItWorks = () => {
  useEffect(() => {
    document.title = 'Our Process & How We Work | Agamozhi Digital Care'
    trackPageView('/how-it-works')
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4-Step Development Process</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Our 4-Step Process: From Requirement to Launch
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            A simple, transparent way to take your business online quickly and professionally.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-6">
            {steps.map((step) => {
              const IconComp = step.icon
              return (
                <div
                  key={step.step}
                  className="bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col md:flex-row items-start gap-6 md:gap-8 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 font-mono font-extrabold text-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                    {step.step}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-md mb-2">
                        {step.name}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                          <IconComp className="w-4 h-4" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900">
                          {step.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                      {step.description}
                    </p>

                    <div className="pt-2 grid sm:grid-cols-2 gap-2.5">
                      {step.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Start Step 01 (Discuss)?"
        subtitle="The first step is simple — tell us about your business goals and we will guide you forward."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default HowItWorks
