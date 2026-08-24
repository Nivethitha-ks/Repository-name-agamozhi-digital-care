import { createClient } from '@supabase/supabase-js'
import { sendLeadNotificationEmail } from './emailService.js'
import { CONTACT_CONFIG } from '../config/contact.js'
import { isTodayInIST, getISTStartAndEndOfDay } from './dateUtils.js'

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co'
// Support both naming conventions: VITE_SUPABASE_PUBLISHABLE_KEY (Vercel/production)
// and VITE_SUPABASE_ANON_KEY (legacy/local dev fallback)
const supabaseAnonKey =
  import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env?.VITE_SUPABASE_ANON_KEY ||
  'placeholder-key'

export const isSupabaseConfigured = Boolean(
  import.meta.env?.VITE_SUPABASE_URL &&
    (import.meta.env?.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env?.VITE_SUPABASE_ANON_KEY)
)

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fallback Local Storage helper for seamless demo testing when Supabase env vars are not set
const STORAGE_KEYS = {
  LEADS: 'agamozhi_leads_v1',
  RESPONSES: 'agamozhi_lead_responses_v1',
  ANALYTICS: 'agamozhi_analytics_v1',
  DOCUMENTS: 'agamozhi_documents_v1',
}

const INITIAL_DOCUMENTS = [
  {
    id: 'doc-init-1',
    title: 'Business Website Guide',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'A simple guide to understanding our website packages and features for your business.',
    is_active: true,
    display_order: 1,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: 'doc-init-2',
    title: 'Website Package Details',
    pdf_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    description: 'Details and inclusions for Starter, Standard, and Business Website solutions.',
    is_active: true,
    display_order: 2,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

// Initial realistic baseline analytics for instant visual feedback on fresh setups
const INITIAL_ANALYTICS = [
  {
    id: 'evt-init-2',
    event_name: 'whatsapp_click',
    page: '/',
    metadata: { section: 'hero' },
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: 'evt-init-3',
    event_name: 'package_cta_click',
    page: '/packages',
    metadata: { package_name: 'Standard Business Website' },
    created_at: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
  },
  {
    id: 'evt-init-4',
    event_name: 'phone_click',
    page: '/contact',
    metadata: { section: 'contact_page' },
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: 'evt-init-5',
    event_name: 'consultation_cta_click',
    page: '/',
    metadata: { section: 'header' },
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'evt-init-6',
    event_name: 'page_view',
    page: '/',
    metadata: { page_path: '/' },
    created_at: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
  },
  {
    id: 'evt-init-7',
    event_name: 'page_view',
    page: '/services',
    metadata: { page_path: '/services' },
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: 'evt-init-8',
    event_name: 'page_view',
    page: '/packages',
    metadata: { page_path: '/packages' },
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
]

const INITIAL_LEADS = [
  {
    id: 'lead-init-1',
    name: 'Dr. S. K. Ramanathan',
    business_name: 'Kaveri Dental Care',
    phone: '9842100000',
    business_type: 'Clinic',
    requirement: 'New Website',
    message: 'We need an online appointment booking website with clinic details in Pudukkottai.',
    source: 'website',
    status: 'New',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'lead-init-2',
    name: 'M. Muthuvel',
    business_name: 'Muthu Textiles & Silks',
    phone: '9789000000',
    business_type: 'Shop',
    requirement: 'SEO',
    message: 'Want to rank #1 on Google for textile shop near New Bus Stand.',
    source: 'website',
    status: 'Contacted',
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
]

const getStoredData = (key, defaultVal = []) => {
  try {
    const item = localStorage.getItem(key)
    if (!item) {
      if (key === STORAGE_KEYS.ANALYTICS) {
        localStorage.setItem(key, JSON.stringify(INITIAL_ANALYTICS))
        return INITIAL_ANALYTICS
      }
      if (key === STORAGE_KEYS.LEADS) {
        localStorage.setItem(key, JSON.stringify(INITIAL_LEADS))
        return INITIAL_LEADS
      }
      if (key === STORAGE_KEYS.DOCUMENTS) {
        localStorage.setItem(key, JSON.stringify(INITIAL_DOCUMENTS))
        return INITIAL_DOCUMENTS
      }
      return defaultVal
    }
    return JSON.parse(item)
  } catch {
    return defaultVal
  }
}

const setStoredData = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val))
  } catch {
    // ignore write errors
  }
}

export const dbService = {
  // Submit new lead with rate limiting enforcement
  async createLead(leadData) {
    const notificationEmail = CONTACT_CONFIG.adminNotificationEmail || 'agamozhidigitalcare@gmail.com'
    // business_type is no longer collected by the form; pass null so existing DB schemas
    // that have made the column nullable continue to work. Run the migration SQL to make
    // this column nullable if it is still NOT NULL in your Supabase project.
    const newLeadRecord = {
      business_type: leadData.business_type || null,
      ...leadData,
      source: 'website',
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured) {
      try {
        let { data, error } = await supabase.from('leads').insert([newLeadRecord]).select()
        if (error) {
          // Check for rate limit violation from PostgreSQL trigger
          if (
            error.message?.includes('RATE_LIMIT_EXCEEDED') ||
            error.code === 'P0001' ||
            error.message?.includes('Too many enquiries')
          ) {
            const rateLimitErr = new Error('Too many enquiries were submitted. Please try again later.')
            rateLimitErr.status = 429
            rateLimitErr.code = 'RATE_LIMIT_EXCEEDED'
            throw rateLimitErr
          }
          
          // If remote schema does not have preferred_package yet (older deployment),
          // retry with only the baseline columns that are guaranteed to exist.
          if (
            error.message?.includes('current_website') ||
            error.message?.includes('preferred_package') ||
            error.code === '42703' // undefined_column
          ) {
            const safeNotes = [
              leadData.preferred_package ? `[Preferred Package: ${leadData.preferred_package}]` : '',
              leadData.message || '',
            ]
              .filter(Boolean)
              .join('\n')

            const legacyRecord = {
              name: leadData.name,
              business_name: leadData.business_name || null,
              phone: leadData.phone,
              business_type: leadData.business_type || null,
              requirement: leadData.requirement,
              message: safeNotes || null,
              source: 'website',
              status: 'New',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }
            const fallbackRes = await supabase.from('leads').insert([legacyRecord]).select()
            if (!fallbackRes.error) {
              data = fallbackRes.data
              error = null
            } else {
              throw error
            }
          } else {
            throw error
          }
        }
        
        const inserted = data ? data[0] : newLeadRecord
        
        // Dispatch real email alert to configured notification email
        sendLeadNotificationEmail(leadData).catch(() => {})

        // Log instant email notification dispatch in activity timeline
        if (inserted?.id) {
          try {
            await supabase.from('lead_responses').insert([
              {
                lead_id: inserted.id,
                message: `Lead alert dispatched to ${notificationEmail}`,
                channel: 'email',
                sent_by: 'System Alert',
                sent_at: new Date().toISOString(),
                delivery_status: 'dispatched',
              },
            ])
          } catch {
            // non-fatal
          }
        }
        return inserted
      } catch (supabaseError) {
        if (supabaseError.status === 429 || supabaseError.code === 'RATE_LIMIT_EXCEEDED') {
          throw supabaseError
        }
        console.warn('Supabase createLead failed, fallback to local:', supabaseError)
      }
    }

    // Local evaluation mode rate limiter: approx 5 submissions per hour
    const currentHourBucket = new Date().toISOString().substring(0, 13) // e.g. "2026-08-23T00"
    const rateLimitData = getStoredData('agamozhi_submission_rate_limits_v1', { bucket: currentHourBucket, count: 0 })
    
    if (rateLimitData.bucket === currentHourBucket) {
      if (rateLimitData.count >= 5) {
        const rateLimitErr = new Error('Too many enquiries were submitted. Please try again later.')
        rateLimitErr.status = 429
        rateLimitErr.code = 'RATE_LIMIT_EXCEEDED'
        throw rateLimitErr
      }
      rateLimitData.count += 1
    } else {
      rateLimitData.bucket = currentHourBucket
      rateLimitData.count = 1
    }
    setStoredData('agamozhi_submission_rate_limits_v1', rateLimitData)

    // Local fallback persistence
    sendLeadNotificationEmail(leadData).catch(() => {})
    const leads = getStoredData(STORAGE_KEYS.LEADS)
    const newLead = {
      id: crypto.randomUUID(),
      ...newLeadRecord,
    }
    leads.unshift(newLead)
    setStoredData(STORAGE_KEYS.LEADS, leads)

    // Log notification
    const responses = getStoredData(STORAGE_KEYS.RESPONSES)
    responses.unshift({
      id: crypto.randomUUID(),
      lead_id: newLead.id,
      message: `Lead alert dispatched to ${notificationEmail}`,
      channel: 'email',
      sent_by: 'System Alert',
      sent_at: new Date().toISOString(),
      delivery_status: 'dispatched',
    })
    setStoredData(STORAGE_KEYS.RESPONSES, responses)

    return newLead
  },

  // Authoritative metrics query from the leads table (Source of Truth)
  async fetchLeadMetrics() {
    const { startIST, endIST } = getISTStartAndEndOfDay()

    if (isSupabaseConfigured) {
      try {
        const [totalRes, todayRes, newRes] = await Promise.all([
          supabase.from('leads').select('*', { count: 'exact', head: true }),
          supabase.from('leads').select('*', { count: 'exact', head: true }).gte('created_at', startIST).lte('created_at', endIST),
          supabase.from('leads').select('*', { count: 'exact', head: true }).eq('status', 'New'),
        ])

        if (!totalRes.error && totalRes.count !== null) {
          return {
            totalLeads: totalRes.count || 0,
            todayLeads: (!todayRes.error && todayRes.count !== null) ? todayRes.count : 0,
            newLeads: (!newRes.error && newRes.count !== null) ? newRes.count : 0,
          }
        }
      } catch (err) {
        console.warn('Supabase fetchLeadMetrics error, falling back to local evaluation:', err)
      }
    }

    const leads = await this.fetchLeads()
    const totalLeads = leads.length
    const todayLeads = leads.filter((l) => isTodayInIST(l.created_at)).length
    const newLeads = leads.filter((l) => l.status === 'New').length

    return {
      totalLeads,
      todayLeads,
      newLeads,
    }
  },

  // Fetch all leads for Admin Portal
  async fetchLeads() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('created_at', { ascending: false })
        if (!error && data) {
          return data
        }
      } catch (err) {
        console.warn('Supabase fetchLeads error:', err)
      }
    }
    return getStoredData(STORAGE_KEYS.LEADS)
  },

  // Fetch single lead by ID
  async fetchLeadById(id) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .eq('id', id)
          .single()
        if (!error && data) return data
      } catch (err) {
        console.warn('Supabase fetchLeadById error:', err)
      }
    }
    const leads = getStoredData(STORAGE_KEYS.LEADS)
    return leads.find((l) => l.id === id) || null
  },

  // Update lead status
  async updateLeadStatus(id, newStatus) {
    const updatedAt = new Date().toISOString()

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('leads')
          .update({ status: newStatus, updated_at: updatedAt })
          .eq('id', id)
          .select()
        if (error) throw error

        // Log activity
        await supabase.from('lead_responses').insert([
          {
            lead_id: id,
            message: `Status updated to ${newStatus}`,
            channel: 'status_change',
            sent_by: 'Admin',
            sent_at: updatedAt,
            delivery_status: 'logged',
          },
        ])

        return data[0]
      } catch (err) {
        console.warn('Supabase updateLeadStatus error, using local:', err)
      }
    }

    const leads = getStoredData(STORAGE_KEYS.LEADS)
    const index = leads.findIndex((l) => l.id === id)
    if (index !== -1) {
      leads[index].status = newStatus
      leads[index].updated_at = updatedAt
      setStoredData(STORAGE_KEYS.LEADS, leads)

      // Log response
      const responses = getStoredData(STORAGE_KEYS.RESPONSES)
      responses.unshift({
        id: crypto.randomUUID(),
        lead_id: id,
        message: `Status updated to ${newStatus}`,
        channel: 'status_change',
        sent_by: 'Admin',
        sent_at: updatedAt,
        delivery_status: 'logged',
      })
      setStoredData(STORAGE_KEYS.RESPONSES, responses)

      return leads[index]
    }
    throw new Error('Lead not found')
  },

  // Fetch responses/activity for a lead
  async fetchLeadResponses(leadId) {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('lead_responses')
          .select('*')
          .eq('lead_id', leadId)
          .order('sent_at', { ascending: false })
        if (!error && data && data.length > 0) return data
      } catch (err) {
        console.warn('Supabase fetchLeadResponses error:', err)
      }
    }
    const responses = getStoredData(STORAGE_KEYS.RESPONSES)
    return responses.filter((r) => r.lead_id === leadId)
  },

  // Add response note/activity
  async addLeadResponse(leadId, message, channel = 'web_note') {
    const sentAt = new Date().toISOString()
    const record = {
      lead_id: leadId,
      message,
      channel,
      sent_by: 'Admin',
      sent_at: sentAt,
      delivery_status: 'sent',
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('lead_responses').insert([record]).select()
        if (error) throw error
        return data[0]
      } catch (err) {
        console.warn('Supabase addLeadResponse error, using local:', err)
      }
    }

    const responses = getStoredData(STORAGE_KEYS.RESPONSES)
    const newResponse = { id: crypto.randomUUID(), ...record }
    responses.unshift(newResponse)
    setStoredData(STORAGE_KEYS.RESPONSES, responses)
    return newResponse
  },

  // Log analytics event
  async logAnalytics(eventName, page, metadata = {}) {
    const eventRecord = {
      event_name: eventName,
      page: page || '/',
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    }

    // Always update local storage for instant responsiveness
    const events = getStoredData(STORAGE_KEYS.ANALYTICS)
    events.unshift({
      id: crypto.randomUUID(),
      ...eventRecord,
    })
    // Keep max 200 events in local storage
    if (events.length > 200) events.length = 200
    setStoredData(STORAGE_KEYS.ANALYTICS, events)

    // Also push to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        await supabase.from('analytics_events').insert([eventRecord])
      } catch {
        // silent catch
      }
    }
  },

  // Fetch recorded analytics events for Admin Analytics dashboard
  async fetchAnalyticsEvents() {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('analytics_events')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(100)
        if (!error && data && data.length > 0) {
          return data
        }
      } catch (err) {
        console.warn('Supabase fetchAnalyticsEvents error:', err)
      }
    }
    return getStoredData(STORAGE_KEYS.ANALYTICS)
  },

  // Helper to clear or reset analytics
  resetAnalytics() {
    setStoredData(STORAGE_KEYS.ANALYTICS, INITIAL_ANALYTICS)
    return INITIAL_ANALYTICS
  },

  // ==========================================
  // PDF DOCUMENTS & RESOURCES METHODS
  // ==========================================

  // Fetch all documents (public: active only, admin: all)
  async fetchDocuments(includeInactive = false) {
    if (isSupabaseConfigured) {
      try {
        let query = supabase
          .from('documents')
          .select('*')
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false })

        if (!includeInactive) {
          query = query.eq('is_active', true)
        }

        const { data, error } = await query
        if (!error && data) {
          return data
        }
      } catch (err) {
        console.warn('Supabase fetchDocuments error, fallback to local:', err)
      }
    }

    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const sorted = [...docs].sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    if (includeInactive) {
      return sorted
    }
    return sorted.filter((d) => d.is_active !== false)
  },

  // Create new PDF document (Admin)
  async createDocument(docData) {
    const newDoc = {
      title: docData.title.trim(),
      description: docData.description ? docData.description.trim() : null,
      pdf_url: docData.pdf_url.trim(),
      is_active: docData.is_active !== false,
      display_order: Number(docData.display_order) || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('documents').insert([newDoc]).select()
        if (error) throw error
        return data ? data[0] : newDoc
      } catch (err) {
        console.warn('Supabase createDocument failed, using local storage:', err)
      }
    }

    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const localDoc = { id: crypto.randomUUID(), ...newDoc }
    docs.push(localDoc)
    setStoredData(STORAGE_KEYS.DOCUMENTS, docs)
    return localDoc
  },

  // Update existing PDF document (Admin)
  async updateDocument(id, docData) {
    const updatedAt = new Date().toISOString()
    const updatePayload = {
      title: docData.title.trim(),
      description: docData.description ? docData.description.trim() : null,
      pdf_url: docData.pdf_url.trim(),
      is_active: docData.is_active !== false,
      display_order: Number(docData.display_order) || 0,
      updated_at: updatedAt,
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('documents')
          .update(updatePayload)
          .eq('id', id)
          .select()
        if (error) throw error
        return data ? data[0] : updatePayload
      } catch (err) {
        console.warn('Supabase updateDocument error, using local:', err)
      }
    }

    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const index = docs.findIndex((d) => d.id === id)
    if (index !== -1) {
      docs[index] = { ...docs[index], ...updatePayload }
      setStoredData(STORAGE_KEYS.DOCUMENTS, docs)
      return docs[index]
    }
    throw new Error('Document not found')
  },

  // Delete PDF document (Admin)
  async deleteDocument(id) {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('documents').delete().eq('id', id)
        if (error) throw error
      } catch (err) {
        console.warn('Supabase deleteDocument error, using local:', err)
      }
    }

    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const filtered = docs.filter((d) => d.id !== id)
    setStoredData(STORAGE_KEYS.DOCUMENTS, filtered)
    return true
  },

  // Toggle document active status (Admin)
  async toggleDocumentActive(id, isActive) {
    const updatedAt = new Date().toISOString()
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('documents')
          .update({ is_active: isActive, updated_at: updatedAt })
          .eq('id', id)
          .select()
        if (error) throw error
        return data ? data[0] : null
      } catch (err) {
        console.warn('Supabase toggleDocumentActive error, using local:', err)
      }
    }

    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const index = docs.findIndex((d) => d.id === id)
    if (index !== -1) {
      docs[index].is_active = isActive
      docs[index].updated_at = updatedAt
      setStoredData(STORAGE_KEYS.DOCUMENTS, docs)
      return docs[index]
    }
    throw new Error('Document not found')
  },

  // Reorder documents (Admin)
  async reorderDocuments(orderedIds) {
    const docs = getStoredData(STORAGE_KEYS.DOCUMENTS)
    const updated = docs.map((d) => {
      const idx = orderedIds.indexOf(d.id)
      if (idx !== -1) {
        return { ...d, display_order: idx + 1, updated_at: new Date().toISOString() }
      }
      return d
    })
    setStoredData(STORAGE_KEYS.DOCUMENTS, updated)

    if (isSupabaseConfigured) {
      try {
        for (let i = 0; i < orderedIds.length; i++) {
          await supabase
            .from('documents')
            .update({ display_order: i + 1, updated_at: new Date().toISOString() })
            .eq('id', orderedIds[i])
        }
      } catch (err) {
        console.warn('Supabase reorderDocuments error:', err)
      }
    }
    return updated
  },
}
