import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Send, CheckCircle, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import Button from './Button'
import { dbService } from '../lib/supabase'
import { trackEnquiryStart, trackEnquirySubmit, trackEnquiryFailed } from '../lib/analytics'

const requirements = [
  'Business Website Development',
  'Website Maintenance',
  'Digital Solutions',
  'Workflow & Automation',
  'Website Redesign / Upgrade',
  'Not Sure / Need Advice',
]

const packagesList = [
  'Starter Website',
  'Standard Website',
  'Business Website',
  'Custom Web Solution',
  'Not Sure Yet',
]

const initialFormData = {
  name: '',
  businessName: '',
  phone: '',
  requirement: '',
  preferredPackage: '',
  message: '',
}

const ContactForm = () => {
  const [searchParams] = useSearchParams()
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const [hasStarted, setHasStarted] = useState(false)

  // Auto-populate from URL query params (e.g. ?package=Standard%20Website or ?service=...)
  useEffect(() => {
    const pkgParam = searchParams.get('package')
    const serviceParam = searchParams.get('service')
    if (pkgParam) {
      const match = packagesList.find((p) => p.toLowerCase().includes(pkgParam.toLowerCase())) || pkgParam
      setFormData((prev) => ({ ...prev, preferredPackage: match, requirement: prev.requirement || 'Business Website Development' }))
    }
    if (serviceParam) {
      const match = requirements.find((r) => r.toLowerCase().includes(serviceParam.toLowerCase())) || serviceParam
      setFormData((prev) => ({ ...prev, requirement: match }))
    }
  }, [searchParams])

  const handleFocus = () => {
    if (!hasStarted) {
      setHasStarted(true)
      trackEnquiryStart()
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Full Name is required'
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required'
    } else if (!/^[0-9]{10}$/.test(formData.phone.trim().replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number'
    }
    if (!formData.requirement) newErrors.requirement = 'Please select your website requirement'
    return newErrors
  }

  const handleChange = (e) => {
    handleFocus()
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (status === 'loading') return

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('loading')
    setErrorMessage('')

    const cleanPhone = formData.phone.trim().replace(/\D/g, '')

    try {
      // Real database submission to Supabase leads table
      await dbService.createLead({
        name: formData.name.trim(),
        business_name: formData.businessName.trim() || null,
        phone: cleanPhone,
        requirement: formData.requirement,
        preferred_package: formData.preferredPackage || null,
        message: formData.message.trim() || null,
      })

      // Record single unified analytics event (no PII sent)
      trackEnquirySubmit(formData.requirement, formData.preferredPackage)

      setStatus('success')
      setFormData(initialFormData)
    } catch (err) {
      console.error('Lead submission failed:', err)
      trackEnquiryFailed(err.message || 'submission_error')
      const msg = err.message || ''
      if (err.status === 429 || err.code === 'RATE_LIMIT_EXCEEDED' || msg.includes('Too many enquiries')) {
        setErrorMessage('Too many enquiries were submitted. Please try again later.')
      } else if (
        msg.includes("Could not find the table 'public.leads'") ||
        msg.includes('relation "public.leads" does not exist')
      ) {
        setErrorMessage(
          'Database table "leads" has not been created yet in your Supabase project. Please run supabase/schema.sql in your Supabase SQL Editor.'
        )
      } else {
        setErrorMessage(msg || "We couldn't submit your enquiry. Please try again.")
      }
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 text-center shadow-lg shadow-blue-500/5">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-5 border border-emerald-200 shadow-xs">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h3 className="font-extrabold text-2xl text-[#0B1727] mb-2 tracking-tight">
          Thank you! Your enquiry has been received.
        </h3>
        <p className="text-slate-600 text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
          We have received your business requirement. Our team in Pudukkottai will review your project and get in touch within 24 hours.
        </p>
        <Button variant="outline" size="md" onClick={() => setStatus('idle')}>
          Submit Another Enquiry
        </Button>
      </div>
    )
  }

  const inputStyles = (fieldName) =>
    `w-full px-4 py-3.5 rounded-xl border text-base transition-all duration-200 bg-white placeholder:text-slate-500 text-slate-950 font-medium focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 outline-none ${
      errors[fieldName] ? 'border-red-500 bg-red-50/20' : 'border-slate-300 hover:border-slate-400'
    }`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 p-4 sm:p-8 md:p-10 shadow-lg shadow-slate-200/50 w-full min-w-0 max-w-full"
    >
      <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-slate-100 min-w-0">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2 max-w-full">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="break-words">Quick Consultation</span>
        </div>
        <h3 className="font-extrabold text-xl sm:text-3xl text-slate-950 tracking-tight mb-2 break-words">
          Tell Us About Your Business
        </h3>
        <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-medium break-words">
          Share your requirements below. We'll understand your goals and suggest the right digital solution for your business.
        </p>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200 min-w-0">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span className="break-words">{errorMessage}</span>
        </div>
      )}

      <div className="space-y-5 sm:space-y-6 min-w-0">
        {/* Row 1: Name & Business Name */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 min-w-0">
          {/* Full Name */}
          <div className="min-w-0">
            <label htmlFor="name" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ramesh Kumar"
              className={inputStyles('name')}
            />
            {errors.name && <p className="mt-1.5 text-xs sm:text-sm font-semibold text-red-600 break-words">{errors.name}</p>}
          </div>

          {/* Business Name */}
          <div className="min-w-0">
            <label htmlFor="businessName" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex flex-wrap items-center justify-between gap-1">
              <span>Business / Shop Name</span>
              <span className="text-xs text-slate-500 font-semibold lowercase">(optional)</span>
            </label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Kaveri Dental Clinic"
              className={inputStyles('businessName')}
            />
          </div>
        </div>

        {/* Row 2: Phone / WhatsApp & Website Requirement */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 min-w-0">
          {/* Phone / WhatsApp */}
          <div className="min-w-0">
            <label htmlFor="phone" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2">
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              className={inputStyles('phone')}
            />
            {errors.phone && <p className="mt-1.5 text-xs sm:text-sm font-semibold text-red-600 break-words">{errors.phone}</p>}
          </div>

          {/* Website Requirement */}
          <div className="min-w-0">
            <label htmlFor="requirement" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2">
              Website Requirement <span className="text-red-500">*</span>
            </label>
            <select
              id="requirement"
              name="requirement"
              value={formData.requirement}
              onChange={handleChange}
              className={inputStyles('requirement')}
            >
              <option value="">What do you need?</option>
              {requirements.map((req) => (
                <option key={req} value={req}>
                  {req}
                </option>
              ))}
            </select>
            {errors.requirement && <p className="mt-1.5 text-xs sm:text-sm font-semibold text-red-600 break-words">{errors.requirement}</p>}
          </div>
        </div>

        {/* Row 3: Preferred Package */}
        <div className="min-w-0">
          <label htmlFor="preferredPackage" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex flex-wrap items-center justify-between gap-1">
            <span>Preferred Package / Service</span>
            <span className="text-xs text-slate-500 font-semibold lowercase">(optional)</span>
          </label>
          <select
            id="preferredPackage"
            name="preferredPackage"
            value={formData.preferredPackage}
            onChange={handleChange}
            className={inputStyles('preferredPackage')}
          >
            <option value="">Select a package (or Not Sure Yet)</option>
            {packagesList.map((pkg) => (
              <option key={pkg} value={pkg}>
                {pkg}
              </option>
            ))}
          </select>
        </div>

        {/* Short Message / Notes */}
        <div className="min-w-0">
          <label htmlFor="message" className="block text-sm font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex flex-wrap items-center justify-between gap-1">
            <span>Short Message / Notes</span>
            <span className="text-xs text-slate-500 font-semibold lowercase">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            placeholder="Tell us briefly about your business goals, target audience, or specific requirements..."
            className={`${inputStyles('message')} resize-none`}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-extrabold shadow-md shadow-blue-500/20"
          disabled={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <span>Get a Free Consultation</span>
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
