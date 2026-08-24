import { useEffect } from 'react'
import { Sparkles, ShieldCheck } from 'lucide-react'
import ProjectCard from '../components/ProjectCard'
import CTASection from '../components/CTASection'
import { projects } from '../data/projects'
import { trackPageView } from '../lib/analytics'

const Projects = () => {
  useEffect(() => {
    document.title = 'Portfolio & Client Demos | Agamozhi Digital Care'
    trackPageView('/projects')
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Demo Websites & Portfolio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Real Websites Built for Real Businesses
          </h1>
          <p className="text-slate-200 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a look at actual websites we have built to help businesses showcase their products, build trust, and receive customer enquiries.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto space-y-8 pt-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Verification Notice */}
          <div className="mt-14 text-center max-w-xl mx-auto">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-xs text-slate-700 text-left leading-relaxed font-medium">
                All client showcase websites are 100% genuine deployments with active domain names and working lead forms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Ready to Build Your Business Website?"
        subtitle="Tell us about your business goals and industry. We will build a customized website that sets you apart."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default Projects
