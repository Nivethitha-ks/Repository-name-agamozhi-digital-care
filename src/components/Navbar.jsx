import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ArrowRight } from 'lucide-react'
import Button from './Button'
import MobileMenu from './MobileMenu'
import { useContactConfig } from '../config/contact'
import { trackConsultationCTAClick, trackPhoneClick } from '../lib/analytics'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Packages', to: '/packages' },
  { label: 'Projects', to: '/projects' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Industries', to: '/industries' },
  { label: 'Resources', to: '/resources' },
  { label: 'Contact', to: '/contact' },
]

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const contactConfig = useContactConfig()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <nav className="container-custom" aria-label="Main navigation">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0B1F3A] to-blue-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xl tracking-tight">A</span>
            </div>
            <div>
              <span className="font-extrabold text-[#0B1727] text-lg tracking-tight block leading-tight">
                Agamozhi
              </span>
              <span className="text-slate-500 text-[11px] font-semibold tracking-wider uppercase block">
                Digital Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-50/80 p-1.5 rounded-full border border-slate-200/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-xs border border-slate-200/70 font-bold'
                      : 'text-slate-600 hover:text-[#0B1727] hover:bg-white/50'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={contactConfig.phoneTel}
              onClick={() => trackPhoneClick('header')}
              className="text-xs font-bold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-50"
            >
              <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>{contactConfig.phoneDisplay}</span>
            </a>
            <Button
              to="/contact"
              size="sm"
              onClick={() => trackConsultationCTAClick('header')}
              className="shadow-xs hover:shadow-blue-500/10"
            >
              <span>Get Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-[#0B1727] hover:bg-slate-100 transition-colors border border-slate-200"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMenuOpen} navLinks={navLinks} onClose={() => setIsMenuOpen(false)} />
    </header>
  )
}

export default Navbar
