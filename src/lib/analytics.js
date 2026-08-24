import { dbService } from './supabase'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let isInitialized = false

// Initialize GA4 script tag dynamically if measurement ID is present
export const initAnalytics = () => {
  if (isInitialized || !GA_MEASUREMENT_ID) return

  try {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(script1)

    const script2 = document.createElement('script')
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
    `
    document.head.appendChild(script2)
    isInitialized = true
  } catch (err) {
    console.warn('Analytics initialization failed:', err)
  }
}

// Track Event (Recorded in both Google Analytics and Admin Dashboard Database)
export const trackEvent = (eventName, params = {}) => {
  // 1. Google Analytics 4 (External tracker)
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    try {
      window.gtag('event', eventName, {
        ...params,
        send_to: GA_MEASUREMENT_ID,
      })
    } catch {
      // silent catch
    }
  }

  // 2. Agamozhi Admin Dashboard internal event recording
  if (typeof window !== 'undefined') {
    try {
      const page = params.page_path || window.location.pathname || '/'
      dbService.logAnalytics(eventName, page, params)
    } catch (e) {
      console.warn('Admin analytics logging error:', e)
    }
  }
}

// Specific conversion tracking functions
export const trackPageView = (path) => {
  trackEvent('page_view', { page_path: path })
}

export const trackConsultationCTAClick = (section = 'hero') => {
  trackEvent('consultation_cta_click', { section })
}

export const trackCTAClick = (ctaName) => {
  trackEvent('cta_click', { cta_name: ctaName })
}

export const trackWhatsAppClick = (section = 'header') => {
  trackEvent('whatsapp_click', { section })
}

export const trackPhoneClick = (section = 'header') => {
  trackEvent('phone_click', { section })
}

export const trackEnquiryStart = () => {
  trackEvent('enquiry_started', { section: 'contact_form' })
}

export const trackEnquirySubmit = (requirement, preferredPackage) => {
  // Only non-PII categorical data
  trackEvent('enquiry_submitted', {
    requirement: requirement || 'Not Specified',
    preferred_package: preferredPackage || 'None',
  })
}

export const trackEnquiryFailed = (errorType) => {
  trackEvent('enquiry_failed', { error_type: errorType })
}

export const trackProjectClick = (projectName) => {
  trackEvent('project_click', { project_name: projectName })
}

export const trackPackageClick = (packageName) => {
  trackEvent('package_cta_click', { package_name: packageName })
}
