import { Link } from 'react-router-dom'
import { Phone, MessageCircle, MapPin } from 'lucide-react'
import { useContactConfig } from '../config/contact'
import { trackPhoneClick, trackWhatsAppClick } from '../lib/analytics'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const contactConfig = useContactConfig()

  const quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Website Packages', to: '/packages' },
    { label: 'Featured Projects', to: '/projects' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Industries', to: '/industries' },
    { label: 'Documents & Resources', to: '/resources' },
    { label: 'Contact Us', to: '/contact' },
  ]

  const serviceLinks = [
    { label: 'Business Website Development', to: '/services#website-development' },
    { label: 'Website Maintenance', to: '/services#website-maintenance' },
    { label: 'Custom Digital Solutions', to: '/services#digital-solutions' },
    { label: 'Workflow & Automation', to: '/services#automation' },
  ]

  return (
    <footer className="bg-[#07111F] text-white border-t border-slate-800">
      {/* Top Banner / Brand Intro */}
      <div className="container-custom pt-12 sm:pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-xl shadow-xs">
                A
              </div>
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block leading-tight">
                  Agamozhi
                </span>
                <span className="text-blue-400 text-xs font-semibold tracking-wider uppercase block">
                  Digital Care
                </span>
              </div>
            </Link>

            <p className="text-white text-sm font-semibold pt-1">
              {contactConfig.tagline}
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-md">
              We help local and growing businesses in Pudukkottai & surrounding areas build clear websites,
              get found by nearby customers, and receive steady phone calls and WhatsApp enquiries.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-950/80 text-blue-200 border border-blue-800/60 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{contactConfig.serviceArea}</span>
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-300 text-sm hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-slate-300 text-sm hover:text-white transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Direct Contact */}
          <div>
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-4">
              Direct Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={contactConfig.phoneTel}
                  onClick={() => trackPhoneClick('footer')}
                  className="flex items-center gap-3 text-slate-200 text-sm hover:text-white transition-colors group p-2 -ml-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-300">Call Us</div>
                    <div className="font-bold text-white">{contactConfig.phoneDisplay}</div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('footer')}
                  className="flex items-center gap-3 text-slate-200 text-sm hover:text-white transition-colors group p-2 -ml-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-300">WhatsApp</div>
                    <div className="font-bold text-white">Chat with Team</div>
                  </div>
                </a>
              </li>

              <li>
                <a
                  href={contactConfig.mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-slate-200 text-sm hover:text-white transition-colors group p-2 -ml-2 rounded-lg hover:bg-white/5"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed group-hover:text-blue-300 transition-colors">
                    {contactConfig.address}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>
            © {currentYear} {contactConfig.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <Link to="/contact" className="hover:text-slate-200 transition-colors">
              Free Consultation
            </Link>
            <Link to="/packages" className="hover:text-slate-200 transition-colors">
              Website Packages
            </Link>
            <Link to="/resources" className="hover:text-slate-200 transition-colors">
              Resources
            </Link>
            <Link to="/admin/login" className="hover:text-slate-200 transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
