import { MessageCircle } from 'lucide-react'
import { CONTACT_CONFIG } from '../config/contact'
import { trackWhatsAppClick } from '../lib/analytics'

const FloatingWhatsApp = () => {
  const handleClick = () => {
    trackWhatsAppClick('floating_button')
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group pointer-events-auto">
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-semibold shadow-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-slate-700/60">
        WhatsApp Us
      </span>

      {/* Floating Action Button */}
      <a
        href={CONTACT_CONFIG.getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Chat with Agamozhi Digital Care on WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/40 hover:scale-105 transition-all duration-300 relative border-2 border-white/25"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        
        {/* Subtle Pulse ring */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
      </a>
    </div>
  )
}

export default FloatingWhatsApp
