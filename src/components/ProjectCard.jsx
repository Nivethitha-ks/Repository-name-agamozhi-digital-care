import { ExternalLink, Globe, ShieldCheck, ArrowUpRight } from 'lucide-react'
import Button from './Button'
import { trackProjectClick } from '../lib/analytics'

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group">
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Left Info */}
        <div className="lg:col-span-6 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider border border-blue-200">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Client Website
              </span>
            </div>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-4 group-hover:text-blue-600 transition-colors">
              {project.name}
            </h3>

            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 font-medium">
              {project.description}
            </p>

            <div className="space-y-2.5 mb-8">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Responsive Mobile & Desktop Design</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <Globe className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Clear Service Presentation & Contact Forms</span>
              </div>
            </div>
          </div>

          <div>
            <Button
              href={project.url}
              external
              variant="primary"
              size="md"
              onClick={() => trackProjectClick(project.name)}
              className="w-full sm:w-auto shadow-md shadow-blue-500/15 font-bold"
            >
              <span>Live Demo — Visit Website</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right: Custom Browser Mockup Presentation */}
        <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 via-[#0B1F3A] to-blue-950 p-6 md:p-10 flex items-center justify-center relative overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
          <div className="w-full max-w-md bg-slate-900/90 rounded-xl border border-slate-700/80 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
            {/* Browser chrome header */}
            <div className="bg-slate-800/80 px-4 py-2.5 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="text-[11px] font-mono text-slate-300 bg-slate-950 px-3 py-0.5 rounded border border-slate-700/60 truncate max-w-[200px]">
                https://www.sbautomation.in
              </div>
              <ExternalLink className="w-3 h-3 text-slate-300" />
            </div>

            {/* Inner web mockup view */}
            <div className="p-5 space-y-4 bg-gradient-to-b from-slate-900 to-slate-950 text-white">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold tracking-tight text-white flex items-center gap-2">
                  <div className="w-5 h-5 rounded bg-blue-600 flex items-center justify-center text-[10px] font-extrabold">S</div>
                  <span>SRI BHAVANI AUTOMATION</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 font-semibold">Live Project</span>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-2">
                <div className="text-[11px] font-bold text-white">Industrial Automation Excellence</div>
                <p className="text-[10px] text-slate-200 line-clamp-2">
                  Complete PLC, SCADA, Panel building and industrial engineering solutions.
                </p>
                <div className="pt-2 flex gap-2">
                  <span className="text-[9px] bg-blue-600 px-2 py-1 rounded text-white font-bold">Explore Services</span>
                  <span className="text-[9px] bg-white/10 px-2 py-1 rounded text-slate-200">Contact Team</span>
                </div>
              </div>

              {/* Floating verified badge */}
              <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1 border-t border-white/10">
                <span>Production Deployment</span>
                <span className="text-emerald-400 font-semibold">100% Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
