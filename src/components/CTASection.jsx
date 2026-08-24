import { ArrowRight, MessageCircle } from 'lucide-react'
import Button from './Button'
import { CONTACT_CONFIG } from '../config/contact'
import { trackWhatsAppClick } from '../lib/analytics'

const CTASection = ({
  eyebrow = 'GET FOUND. GET LEADS. GROW.',
  title = 'Ready to Turn Website Visitors into Real Customer Enquiries?',
  subtitle = 'Tell us about your business. We will recommend the right website package to help you get more customer enquiries.',
  ctaText = 'Get a Free Consultation',
  ctaLink = '/contact',
}) => {
  return (
    <section className="bg-[#0B1F3A] relative overflow-hidden py-20 md:py-28 border-y border-slate-800">
      {/* Background glow & subtle gradient */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500 rounded-full blur-[140px]" />
      </div>

      <div className="container-custom relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-blue-200 border border-white/20 text-xs font-bold tracking-widest uppercase mb-5">
          {eyebrow}
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 max-w-3xl mx-auto tracking-tight leading-[1.15] text-balance">
          {title}
        </h2>

        <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          {subtitle}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" to={ctaLink} className="w-full sm:w-auto shadow-md font-bold">
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button
            href={CONTACT_CONFIG.getWhatsAppUrl()}
            external
            variant="outline"
            size="lg"
            onClick={() => trackWhatsAppClick('cta_section')}
            className="w-full sm:w-auto border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-white/40 font-bold"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CTASection
