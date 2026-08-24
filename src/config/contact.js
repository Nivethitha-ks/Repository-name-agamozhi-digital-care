// AGAMOZHI DIGITAL CARE — CENTRALIZED CONTACT & ADDRESS CONFIGURATION
import { useState, useEffect } from 'react'

export const DEFAULT_CONFIG = {
  companyName: 'Agamozhi Digital Care',
  tagline: 'Get Found. Get Leads. Grow.',

  // Phone numbers
  phone: '9965352749',
  phoneDisplay: '9965352749',
  phoneTel: 'tel:9965352749',

  // WhatsApp Configuration
  whatsappNumber: '9965352749',
  whatsappPrefilledMessage: 'Hi Agamozhi Digital Care, I would like to discuss my business requirement.',

  // Address & Location (Centralized single source of truth)
  address: "Thiruvallur Nagar, Near Raja's College, Pudukkottai",
  city: 'Pudukkottai',
  state: 'Tamil Nadu',
  country: 'India',
  serviceArea: 'Pudukkottai & surrounding areas',

  // Google Maps Embed & Directions Link
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Thiruvallur%20Nagar%2C%20Near%20Raja%27s%20College%2C%20Pudukkottai&t=&z=15&ie=UTF8&iwloc=&output=embed',
  mapsDirectionsUrl:
    'https://maps.google.com/?q=Thiruvallur+Nagar+Near+Rajas+College+Pudukkottai',

  // Email Configuration & Notification Dispatch
  email: 'agamozhidigitalcare@gmail.com',
  emailMailto: 'mailto:agamozhidigitalcare@gmail.com',
  adminNotificationEmail: 'agamozhidigitalcare@gmail.com',
}

export function getStoredContactConfig() {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('agamozhi_site_settings_v1')
      if (saved) {
        const parsed = JSON.parse(saved)
        const currentAddr = parsed.address || DEFAULT_CONFIG.address
        const encodedAddr = encodeURIComponent(currentAddr)
        
        // Generate responsive Google search embed that pins the exact address entered
        const dynamicEmbedUrl = `https://maps.google.com/maps?q=${encodedAddr}&t=&z=15&ie=UTF8&iwloc=&output=embed`
        const dynamicDirectionsUrl = `https://maps.google.com/?q=${encodedAddr}`

        const phoneVal = parsed.phone || DEFAULT_CONFIG.phone
        const whatsappVal = parsed.whatsapp || parsed.whatsappNumber || DEFAULT_CONFIG.whatsappNumber
        const emailVal = parsed.notificationEmail || parsed.email || DEFAULT_CONFIG.adminNotificationEmail

        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          phone: phoneVal,
          phoneDisplay: phoneVal,
          phoneTel: `tel:${phoneVal}`,
          whatsappNumber: whatsappVal,
          address: currentAddr,
          mapsDirectionsUrl: dynamicDirectionsUrl,
          mapsEmbedUrl: dynamicEmbedUrl,
          email: emailVal,
          emailMailto: `mailto:${emailVal}`,
          adminNotificationEmail: emailVal,
        }
      }
    } catch {
      // ignore parse errors
    }
  }
  return DEFAULT_CONFIG
}

// Function to update settings and broadcast change event
export function saveContactConfig(newSettings) {
  if (typeof window !== 'undefined') {
    try {
      const current = getStoredContactConfig()
      const updated = {
        ...current,
        ...newSettings,
      }
      localStorage.setItem('agamozhi_site_settings_v1', JSON.stringify(updated))
      window.dispatchEvent(new Event('agamozhi_settings_changed'))
      return updated
    } catch (err) {
      console.error('Failed to save contact config:', err)
    }
  }
  return DEFAULT_CONFIG
}

// Reactive Hook for React components
export function useContactConfig() {
  const [config, setConfig] = useState(() => getStoredContactConfig())

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getStoredContactConfig())
    }
    window.addEventListener('agamozhi_settings_changed', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    return () => {
      window.removeEventListener('agamozhi_settings_changed', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [])

  return config
}

// Live Dynamic Proxy Object for Direct Imports
export const CONTACT_CONFIG = {
  get companyName() { return getStoredContactConfig().companyName },
  get tagline() { return getStoredContactConfig().tagline },
  get phone() { return getStoredContactConfig().phone },
  get phoneDisplay() { return getStoredContactConfig().phoneDisplay },
  get phoneTel() { return getStoredContactConfig().phoneTel },
  get whatsappNumber() { return getStoredContactConfig().whatsappNumber },
  get whatsappPrefilledMessage() { return getStoredContactConfig().whatsappPrefilledMessage },
  get address() { return getStoredContactConfig().address },
  get city() { return getStoredContactConfig().city },
  get state() { return getStoredContactConfig().state },
  get country() { return getStoredContactConfig().country },
  get serviceArea() { return getStoredContactConfig().serviceArea },
  get mapsEmbedUrl() { return getStoredContactConfig().mapsEmbedUrl },
  get mapsDirectionsUrl() { return getStoredContactConfig().mapsDirectionsUrl },
  get email() { return getStoredContactConfig().email },
  get emailMailto() { return getStoredContactConfig().emailMailto },
  get adminNotificationEmail() { return getStoredContactConfig().adminNotificationEmail },
  
  getWhatsAppUrl: (customMsg) => {
    const current = getStoredContactConfig()
    const rawNumber = (current.whatsappNumber || current.whatsapp || '9965352749').replace(/\D/g, '')
    const cleanNumber = rawNumber.length === 10 ? `91${rawNumber}` : rawNumber
    const message = customMsg || current.whatsappPrefilledMessage
    const encoded = encodeURIComponent(message)
    return `https://wa.me/${cleanNumber}?text=${encoded}`
  },
}
