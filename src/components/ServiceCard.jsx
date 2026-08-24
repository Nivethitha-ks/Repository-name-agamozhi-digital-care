import { ArrowRight, Sparkles } from 'lucide-react'
import Button from './Button'
import { trackCTAClick } from '../lib/analytics'

const ServiceCard = ({ service }) => {
  const IconComponent = service.icon

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-7 md:p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between group h-full">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-xs">
            <IconComponent className="w-6 h-6" />
          </div>
          {service.isExpanding && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              Expanding Service
            </span>
          )}
        </div>

        <h3 className="font-extrabold text-xl text-[#0B1727] mb-3 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        <div className="space-y-2 mb-8">
          {service.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Button
          variant="outline"
          size="sm"
          to={service.ctaLink}
          onClick={() => trackCTAClick(`service_${service.id}`)}
          className="w-full justify-between group-hover:border-blue-600 group-hover:text-blue-600"
        >
          <span>{service.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}

export default ServiceCard
