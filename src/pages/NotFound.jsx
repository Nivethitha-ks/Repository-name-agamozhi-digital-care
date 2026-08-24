import { useEffect } from 'react'
import { Home, MessageSquare, AlertTriangle } from 'lucide-react'
import Button from '../components/Button'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found — Agamozhi Digital Care'
  }, [])

  return (
    <section className="min-h-[75vh] flex items-center justify-center py-20 px-4 bg-slate-50">
      <div className="max-w-lg w-full text-center space-y-6 bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 shadow-xs">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Error 404
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#0B1727] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm max-w-sm mx-auto leading-relaxed">
            The page you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button to="/" size="md" className="w-full sm:w-auto">
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Button>
          <Button to="/contact" variant="outline" size="md" className="w-full sm:w-auto">
            <MessageSquare className="w-4 h-4" />
            <span>Contact Support</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NotFound
