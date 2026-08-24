import { Check, Sparkles, ArrowRight, MessageCircle } from 'lucide-react'
import Button from './Button'
import { CONTACT_CONFIG } from '../config/contact'
import { trackPackageClick } from '../lib/analytics'

const PackageCard = ({ pkg }) => {
  const isHighlighted = Boolean(pkg.highlighted)

  const getWhatsAppPackageUrl = () => {
    const message = `Hi Agamozhi Digital Care, I would like to discuss the ${pkg.name} package for my business.`
    return CONTACT_CONFIG.getWhatsAppUrl(message)
  }

  return (
    <div
      className={`rounded-2xl flex flex-col h-full relative transition-all duration-300 ${
        isHighlighted
          ? 'bg-white border-2 border-blue-600 shadow-xl shadow-blue-500/10 md:-translate-y-2 z-10'
          : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-lg shadow-xs'
      }`}
    >
      {/* Top Badge for Most Popular / Highlighted */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <div className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{pkg.badge}</span>
          </div>
        </div>
      )}

      {/* Package Header */}
      <div
        className={`p-6 sm:p-8 border-b ${
          isHighlighted ? 'border-blue-100 bg-blue-50/50 rounded-t-2xl' : 'border-slate-100'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="font-extrabold text-2xl text-slate-950 tracking-tight">
            {pkg.name}
          </h3>
        </div>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed min-h-[44px] font-medium">
          {pkg.tagline}
        </p>
      </div>

      {/* Feature List */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-4">
            Included in this package:
          </div>
          <ul className="space-y-3.5 mb-8">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3 text-sm sm:text-base text-slate-900">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    isHighlighted ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span className="font-semibold leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 pt-2">
          <Button
            href={getWhatsAppPackageUrl()}
            external
            variant={isHighlighted ? 'primary' : 'outline'}
            size="lg"
            onClick={() => trackPackageClick(pkg.name)}
            className={`w-full py-3.5 font-bold text-sm sm:text-base ${isHighlighted ? 'shadow-md shadow-blue-500/20' : ''}`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{pkg.cta || 'Discuss This Package'}</span>
          </Button>

          <Button
            to={`/contact?package=${encodeURIComponent(pkg.name)}`}
            variant="ghost"
            size="sm"
            className="w-full text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600"
          >
            <span>Or Submit Requirement Form</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PackageCard
