import { Link, useLocation } from 'react-router-dom'
import { Phone, MessageCircle, ArrowRight, ChevronRight } from 'lucide-react'
import Button from './Button'
import { useContactConfig } from '../config/contact'
import { trackPhoneClick, trackWhatsAppClick, trackConsultationCTAClick } from '../lib/analytics'

const MobileMenu = ({ isOpen, navLinks, onClose }) => {
  const location = useLocation()
  const contactConfig = useContactConfig()

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Drawer */}
      <div className="fixed top-[72px] left-0 right-0 max-h-[calc(100vh-72px)] overflow-y-auto bg-white border-b border-slate-200 shadow-2xl z-50 lg:hidden animate-in slide-in-from-top duration-200">
        <div className="container-custom py-6 space-y-4">
          {/* Nav links */}
          <div className="space-y-1.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-bold transition-all ${
                    isActive
                      ? 'text-blue-600 bg-blue-50/90 font-extrabold border border-blue-200'
                      : 'text-slate-900 hover:text-blue-600 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span className="text-base">{link.label}</span>
                  {isActive ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-xs" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  )}
                </Link>
              )
            })}
          </div>

          {/* Quick Actions */}
          <div className="pt-5 border-t border-slate-200 space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <a
                href={contactConfig.phoneTel}
                onClick={() => {
                  trackPhoneClick('mobile_menu')
                  onClose()
                }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-slate-50 hover:bg-slate-100 transition-colors shadow-xs"
              >
                <Phone className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Call Us</span>
              </a>

              <a
                href={contactConfig.getWhatsAppUrl ? contactConfig.getWhatsAppUrl() : `https://wa.me/91${contactConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick('mobile_menu')
                  onClose()
                }}
                className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl border border-emerald-300 bg-emerald-50 text-sm font-bold text-emerald-950 hover:bg-emerald-100 transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>WhatsApp</span>
              </a>
            </div>

            <Button
              to="/contact"
              size="lg"
              className="w-full shadow-md font-bold text-base py-3.5"
              onClick={() => {
                trackConsultationCTAClick('mobile_menu')
                onClose()
              }}
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Button>

            <div className="text-center pt-2 text-xs font-semibold text-slate-500">
              Serving {contactConfig.serviceArea}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
