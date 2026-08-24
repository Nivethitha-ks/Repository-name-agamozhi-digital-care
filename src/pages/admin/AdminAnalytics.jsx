import { useEffect, useState } from 'react'
import {
  BarChart3,
  Send,
  Phone,
  MessageCircle,
  Eye,
  Loader2,
  PackageCheck,
  RefreshCw,
  Mail,
  Sparkles,
  RotateCcw,
} from 'lucide-react'
import { dbService } from '../../lib/supabase'
import Button from '../../components/Button'
import { CONTACT_CONFIG } from '../../config/contact'

const AdminAnalytics = () => {
  const [events, setEvents] = useState([])
  const [leadMetrics, setLeadMetrics] = useState({ totalLeads: 0, todayLeads: 0, newLeads: 0 })
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [simulating, setSimulating] = useState(false)

  useEffect(() => {
    document.title = 'Analytics Overview — Agamozhi Admin'
    loadAnalyticsData()
  }, [])

  const loadAnalyticsData = async () => {
    setLoading(true)
    try {
      const [eventsData, metricsData] = await Promise.all([
        dbService.fetchAnalyticsEvents(),
        dbService.fetchLeadMetrics(),
      ])

      setEvents(eventsData || [])
      setLeadMetrics(metricsData || { totalLeads: 0, todayLeads: 0, newLeads: 0 })
    } catch (err) {
      console.error('Failed to load analytics events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateEvent = async (type) => {
    setSimulating(true)
    try {
      if (type === 'whatsapp') {
        await dbService.logAnalytics('whatsapp_click', '/', { section: 'hero_test' })
      } else if (type === 'phone') {
        await dbService.logAnalytics('phone_click', '/contact', { section: 'contact_header' })
      } else if (type === 'package') {
        await dbService.logAnalytics('package_cta_click', '/packages', { package_name: 'Premium Package' })
      } else {
        await dbService.logAnalytics('page_view', '/services', { page_path: '/services' })
      }
      await loadAnalyticsData()
    } finally {
      setSimulating(false)
    }
  }

  const handleResetData = async () => {
    dbService.resetAnalytics()
    await loadAnalyticsData()
  }

  // 1. Authoritative metrics from Supabase leads table (Source of Truth)
  const totalEnquiries = leadMetrics.totalLeads
  const todayEnquiries = leadMetrics.todayLeads

  // 2. Behavioral tracking metrics from analytics_events
  const _totalEvents = events.length
  const pageViews = events.filter((e) => e.event_name === 'page_view').length
  const whatsappClicks = events.filter((e) => e.event_name === 'whatsapp_click').length
  const phoneClicks = events.filter((e) => e.event_name === 'phone_click').length
  const packageClicks = events.filter((e) => e.event_name === 'package_cta_click').length
  const ctaClicks = events.filter((e) => e.event_name === 'consultation_cta_click' || e.event_name === 'cta_click').length
  const enquiryEventsCount = events.filter((e) => e.event_name === 'enquiry_submitted' || e.event_name === 'lead_submission').length

  const getEventBadge = (name) => {
    switch (name) {
      case 'lead_submission':
      case 'enquiry_submitted':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'whatsapp_click':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200'
      case 'phone_click':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'page_view':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'project_click':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'package_cta_click':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'consultation_cta_click':
      case 'cta_click':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'enquiry_started':
        return 'bg-sky-100 text-sky-800 border-sky-200'
      case 'enquiry_failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200'
    }
  }

  const filteredEvents = events.filter((evt) => {
    if (filter === 'all') return true
    if (filter === 'submissions') return evt.event_name === 'lead_submission' || evt.event_name === 'enquiry_submitted'
    if (filter === 'whatsapp') return evt.event_name === 'whatsapp_click'
    if (filter === 'phone') return evt.event_name === 'phone_click'
    if (filter === 'views') return evt.event_name === 'page_view'
    if (filter === 'packages') return evt.event_name === 'package_cta_click'
    if (filter === 'cta') return evt.event_name === 'consultation_cta_click' || evt.event_name === 'cta_click'
    return true
  })

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-primary mx-auto mb-3" />
        <p className="text-text-muted text-sm font-medium">Loading Website Conversion Analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Website Analytics & Conversions</h1>
          <p className="text-text-muted text-sm">
            Live tracking of visitors, calls, WhatsApp chats, and authoritative enquiry counts from the leads database.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={loadAnalyticsData}>
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => handleSimulateEvent('whatsapp')}
            disabled={simulating}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Log Test Click
          </Button>
          <button
            onClick={handleResetData}
            title="Reset baseline sample events"
            className="p-2 border border-border rounded-lg text-text-muted hover:text-text-primary hover:bg-surface transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Notification Email Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-primary text-white flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-semibold text-blue-900 uppercase tracking-wider">Lead Notification Routing</div>
            <p className="text-sm font-medium text-text-primary">
              All enquiries & form conversions alert instantly to: <strong className="text-blue-primary font-mono">{CONTACT_CONFIG.adminNotificationEmail}</strong>
            </p>
          </div>
        </div>
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Active Dispatch
          </span>
        </div>
      </div>

      {/* Metrics Cards Grid — Source of Truth from Leads Table + Behavioral Events */}
      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Total Enquiries (Authoritative COUNT(leads)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Enquiries</span>
            <Send className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">{totalEnquiries}</div>
          <p className="text-[11px] text-text-muted mt-1 font-medium">leads table count</p>
        </div>

        {/* Today's Enquiries (Authoritative COUNT(leads today in IST)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Today's Enquiries</span>
            <BarChart3 className="w-4 h-4 text-blue-primary" />
          </div>
          <div className="text-2xl font-bold text-blue-primary">{todayEnquiries}</div>
          <p className="text-[11px] text-text-muted mt-1 font-medium">Asia/Kolkata (IST)</p>
        </div>

        {/* WhatsApp Clicks (COUNT(whatsapp_click)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">WhatsApp</span>
            <MessageCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{whatsappClicks}</div>
          <p className="text-[11px] text-text-muted mt-1">Chat initiates</p>
        </div>

        {/* Phone Calls (COUNT(phone_click)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Phone Calls</span>
            <Phone className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-primary">{phoneClicks}</div>
          <p className="text-[11px] text-text-muted mt-1">Call clicks</p>
        </div>

        {/* CTA & Packages (COUNT(package_cta_click + cta_click)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">CTA & Packages</span>
            <PackageCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-bold text-indigo-600">{packageClicks + ctaClicks}</div>
          <p className="text-[11px] text-text-muted mt-1">Engagements</p>
        </div>

        {/* Page Views (COUNT(page_view)) */}
        <div className="bg-white rounded-xl border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Page Views</span>
            <Eye className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-text-primary">{pageViews}</div>
          <p className="text-[11px] text-text-muted mt-1">Views tracked</p>
        </div>
      </div>

      {/* Events Stream Table with Filter Tabs */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="p-5 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-text-primary">Recorded Activity Stream</h2>
            <p className="text-xs text-text-muted">Showing real-time visitor interactions and events</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: `All (${events.length})` },
              { id: 'submissions', label: `Enquiry Events (${enquiryEventsCount})` },
              { id: 'whatsapp', label: `WhatsApp (${whatsappClicks})` },
              { id: 'phone', label: `Calls (${phoneClicks})` },
              { id: 'packages', label: `Packages (${packageClicks})` },
              { id: 'views', label: `Views (${pageViews})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                  filter === tab.id
                    ? 'bg-blue-primary text-white'
                    : 'bg-surface text-text-muted hover:text-text-primary hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center text-text-muted">
            <BarChart3 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-base text-text-primary mb-1">No events in this view</p>
            <p className="text-xs">Select "All" or navigate through the website to generate visitor events.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-text-muted text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="py-3.5 px-5">Event Name</th>
                  <th className="py-3.5 px-5">Page Path</th>
                  <th className="py-3.5 px-5">Metadata Details</th>
                  <th className="py-3.5 px-5 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getEventBadge(evt.event_name)}`}>
                        {evt.event_name}
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono text-xs text-text-primary">{evt.page || '/'}</td>
                    <td className="py-4 px-5 text-xs text-text-muted">
                      {evt.metadata && Object.keys(evt.metadata).length > 0 ? (
                        <code className="bg-surface px-2 py-1 rounded text-[11px] text-text-primary font-mono">
                          {JSON.stringify(evt.metadata)}
                        </code>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right text-xs text-text-muted font-mono">
                      {evt.created_at ? new Date(evt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Just now'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminAnalytics

