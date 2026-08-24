import { useEffect, useState } from 'react'
import { FileText, Download, ExternalLink, Sparkles, Loader2 } from 'lucide-react'
import Button from '../components/Button'
import SectionHeading from '../components/SectionHeading'
import CTASection from '../components/CTASection'
import { dbService } from '../lib/supabase'
import { trackPageView } from '../lib/analytics'

const Resources = () => {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Documents & Resources | Agamozhi Digital Care'
    trackPageView('/resources')
    loadPublicDocuments()
  }, [])

  const loadPublicDocuments = async () => {
    setLoading(true)
    try {
      const data = await dbService.fetchDocuments(false) // active only
      setDocuments(data || [])
    } catch (err) {
      console.error('Failed to load public documents:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[#07111F] via-[#0B1F3A] to-[#07111F] text-white py-16 md:py-24 border-b border-slate-800 text-center">
        <div className="container-custom">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Helpful Documents</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 max-w-4xl mx-auto text-balance">
            Documents & Resources
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Download our guides and package details to learn more about how we help your business get found and grow online.
          </p>
        </div>
      </section>

      {/* Documents Section */}
      <section className="section-padding bg-slate-50 border-b border-slate-200/80">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Free Downloads"
            title="Available PDF Resources"
            subtitle="Browse and download helpful information about our website solutions and services."
          />

          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
              <p className="text-slate-600 text-sm font-medium">Loading documents...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-lg text-slate-900">No Documents Available Yet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We are currently updating our PDF resources. In the meantime, please contact us directly on WhatsApp or phone for full package details.
              </p>
              <Button to="/contact" size="sm">
                <span>Contact Us for Details</span>
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto pt-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xs hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-xs">
                      <FileText className="w-6 h-6" />
                    </div>

                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-slate-600 text-xs leading-relaxed">
                        {doc.description || 'Download this PDF document to view full details.'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3">
                    {/* View PDF */}
                    <a
                      href={doc.pdf_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                      <span>View PDF</span>
                    </a>

                    {/* Download PDF */}
                    <a
                      href={doc.pdf_url}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title="Have Questions About Our Solutions?"
        subtitle="We're happy to answer your questions and help you pick the right website package."
        ctaText="Get a Free Consultation"
        ctaLink="/contact"
      />
    </>
  )
}

export default Resources
