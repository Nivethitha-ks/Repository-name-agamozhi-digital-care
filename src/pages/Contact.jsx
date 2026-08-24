import { useEffect } from 'react'
import { Phone, MessageCircle, MapPin, Clock, Sparkles, Navigation, ExternalLink, Mail } from 'lucide-react'
import ContactForm from '../components/ContactForm'
import { useContactConfig } from '../config/contact'
import { trackPageView, trackPhoneClick, trackWhatsAppClick } from '../lib/analytics'

const Contact = () => {
  const contactConfig = useContactConfig()

  useEffect(() => {
    document.title = 'Contact Agamozhi Digital Care | Pudukkottai & Surrounding Areas'
    trackPageView('/contact')
  }, [])

  return (
    <>
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-12 sm:py-20 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-bold uppercase tracking-wider mb-4 shadow-xs max-w-full">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="break-words">Direct Business Consultation</span>
          </div>
          <h1 className="text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 sm:mb-6 max-w-4xl mx-auto text-balance leading-tight break-words">
            Let's Discuss Your Website Requirement
          </h1>
          <p className="text-slate-200 text-sm sm:text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-medium break-words">
            Reach out by WhatsApp, direct phone call, or submit the form below. We will understand your business goals and suggest the right digital solution.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Contact Info & Location */}
            <div className="lg:col-span-5 space-y-6 w-full min-w-0 max-w-full">
              <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 shadow-xs space-y-5 sm:space-y-6 w-full min-w-0 max-w-full">
                <div className="min-w-0">
                  <h2 className="font-extrabold text-xl sm:text-3xl text-slate-950 tracking-tight break-words">
                    {contactConfig.companyName}
                  </h2>
                  <p className="text-blue-600 font-extrabold text-xs sm:text-sm uppercase tracking-wider mt-1 break-words">
                    {contactConfig.tagline}
                  </p>
                </div>

                <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium break-words">
                  Serving shops, clinics, tuition centres, schools, restaurants, and service businesses in <strong>{contactConfig.serviceArea}</strong>.
                </p>

                {/* Primary Conversion Actions (WhatsApp, Call & Email) */}
                <div className="space-y-3 pt-1 w-full min-w-0 max-w-full">
                  {/* WhatsApp Click-to-Chat */}
                  <a
                    href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('contact_page_primary')}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 hover:shadow-md transition-all group w-full min-w-0 max-w-full"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-emerald-900 font-extrabold uppercase tracking-wider">Fastest Response</div>
                      <div className="font-extrabold text-base sm:text-xl text-emerald-950 break-words">WhatsApp Us</div>
                    </div>
                  </a>

                  {/* Call Now with tel: */}
                  <a
                    href={contactConfig.phoneTel}
                    onClick={() => trackPhoneClick('contact_page_primary')}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl border border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 transition-all group shadow-xs w-full min-w-0 max-w-full"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">Direct Telephone</div>
                      <div className="font-extrabold text-base sm:text-xl text-slate-950 break-words">
                        Call Now: {contactConfig.phoneDisplay}
                      </div>
                    </div>
                  </a>

                  {/* Email Us with mailto: */}
                  <a
                    href={contactConfig.emailMailto || `mailto:${contactConfig.email}`}
                    className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl border border-slate-300 bg-white hover:border-blue-400 hover:bg-slate-50 transition-all group shadow-xs w-full min-w-0 max-w-full"
                  >
                    <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                      <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">Email Us</div>
                      <div className="font-extrabold text-xs min-[360px]:text-sm sm:text-base md:text-lg text-slate-950 break-all sm:break-normal [overflow-wrap:anywhere] leading-snug mt-0.5">
                        {contactConfig.email}
                      </div>
                    </div>
                  </a>

                  {/* Location & Directions Click */}
                  <a
                    href={contactConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 sm:gap-4 p-3.5 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50/60 hover:border-blue-300 transition-all group w-full min-w-0 max-w-full"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">Location & Directions</div>
                        <ExternalLink className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-slate-950 leading-relaxed mt-0.5 break-words">
                        {contactConfig.serviceArea}
                      </div>
                      <div className="text-xs sm:text-sm text-slate-800 mt-1 font-medium group-hover:text-blue-800 transition-colors break-words">
                        {contactConfig.address}
                      </div>
                    </div>
                  </a>

                  {/* Response Time Guarantee */}
                  <div className="flex items-center gap-3.5 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 w-full min-w-0 max-w-full">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white border border-slate-200 text-blue-600 flex items-center justify-center shrink-0 shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs text-slate-700 font-bold uppercase tracking-wider">Response Window</div>
                      <div className="text-xs sm:text-sm font-bold text-slate-950 break-words">Within 24 business hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map embed with Directions Button */}
              <div className="bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-800 overflow-hidden shadow-md p-2.5 sm:p-3 space-y-2 w-full min-w-0 max-w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 px-2 sm:px-3 py-1.5 text-white">
                  <span className="text-xs sm:text-sm font-bold flex items-center gap-1.5 text-slate-200 shrink-0">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    Google Map Pin
                  </span>
                  <a
                    href={contactConfig.mapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-300 hover:text-white"
                  >
                    <Navigation className="w-3.5 h-3.5 shrink-0" />
                    <span>Get Driving Directions</span>
                  </a>
                </div>
                <iframe
                  title="Agamozhi Digital Care Location Map"
                  src={contactConfig.mapsEmbedUrl}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-xl sm:rounded-2xl w-full block"
                />
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 w-full min-w-0 max-w-full">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
