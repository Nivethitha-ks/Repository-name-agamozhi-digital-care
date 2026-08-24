import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Clock,
  Send,
  Loader2,
  AlertCircle,
  Building,
  User,
  Tag,
  CheckCircle2,
  Calendar,
  Sparkles,
} from 'lucide-react'
import { dbService } from '../../lib/supabase'
import Button from '../../components/Button'

const statusList = ['New', 'Contacted', 'Interested', 'Quotation', 'Negotiation', 'Won', 'Lost']

const AdminLeadDetail = () => {
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusUpdating, setStatusUpdating] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [channel, setChannel] = useState('call') // call | whatsapp | web_note
  const [noteSubmitting, setNoteSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    document.title = 'Lead Details — Agamozhi Admin'
    loadLeadData()
  }, [id])

  const loadLeadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await dbService.fetchLeadById(id)
      if (!data) {
        setError('Lead record not found.')
        return
      }
      setLead(data)
      const responses = await dbService.fetchLeadResponses(id)
      setTimeline(responses || [])
    } catch (err) {
      console.error('Error fetching lead detail:', err)
      setError(err.message || 'Failed to load lead details.')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (newStatus) => {
    if (!lead || newStatus === lead.status) return
    setStatusUpdating(true)
    setSuccessMsg('')
    try {
      const updated = await dbService.updateLeadStatus(lead.id, newStatus)
      setLead(updated)
      setSuccessMsg(`Status updated to ${newStatus}`)
      const responses = await dbService.fetchLeadResponses(id)
      setTimeline(responses || [])
    } catch (err) {
      console.error('Failed to update status:', err)
      setError('Failed to update status.')
    } finally {
      setStatusUpdating(false)
    }
  }

  const handleAddResponseNote = async (e) => {
    e.preventDefault()
    if (!newNote.trim()) return

    setNoteSubmitting(true)
    setSuccessMsg('')
    try {
      await dbService.addLeadResponse(lead.id, newNote.trim(), channel)
      setNewNote('')
      setSuccessMsg('Activity logged successfully.')
      const responses = await dbService.fetchLeadResponses(id)
      setTimeline(responses || [])
    } catch (err) {
      console.error('Failed to add response note:', err)
      setError('Failed to log activity.')
    } finally {
      setNoteSubmitting(false)
    }
  }

  const getCleanPhone = (phoneStr) => {
    if (!phoneStr) return ''
    return phoneStr.replace(/\D/g, '')
  }

  const getWhatsAppUrl = () => {
    if (!lead?.phone) return '#'
    const rawNum = getCleanPhone(lead.phone)
    const formattedNum = rawNum.length === 10 ? `91${rawNum}` : rawNum
    const msg = encodeURIComponent(
      `Hello ${lead.name}, regarding your enquiry for ${lead.requirement} with Agamozhi Digital Care:`
    )
    return `https://wa.me/${formattedNum}?text=${msg}`
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-primary mx-auto mb-3" />
        <p className="text-text-muted text-sm font-medium">Loading Lead Record...</p>
      </div>
    )
  }

  if (error || !lead) {
    return (
      <div className="bg-white rounded-xl border border-border p-8 text-center max-w-lg mx-auto space-y-4">
        <AlertCircle className="w-10 h-10 text-error mx-auto" />
        <h2 className="text-lg font-bold text-text-primary">Unable to Load Lead</h2>
        <p className="text-text-muted text-sm">{error || 'Record does not exist.'}</p>
        <Button to="/admin/leads" variant="outline" size="sm">
          ← Back to All Leads
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="p-2 rounded-lg border border-border bg-white hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-text-primary flex items-center gap-2">
              {lead.name}
              {lead.business_name && (
                <span className="text-sm font-normal text-text-muted">({lead.business_name})</span>
              )}
            </h1>
            <p className="text-text-muted text-xs">
              Enquiry ID: <code className="font-mono">{lead.id.slice(0, 8)}</code>
            </p>
          </div>
        </div>

        {/* Quick Actions (Call & WhatsApp) */}
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`tel:${lead.phone}`}
            className="px-3.5 py-2 rounded-lg border border-border bg-white text-text-primary hover:bg-surface text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-blue-primary" />
            Call Client
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp Chat
          </a>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 bg-green-50 border border-green-200 text-success text-xs rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Activity Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Lead Information Card */}
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-base text-text-primary border-b border-border pb-3 flex items-center justify-between">
              <span>Lead Details</span>
              <span className="text-xs font-normal text-text-muted">Source: {lead.source || 'Website Form'}</span>
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> Client Name
                </span>
                <p className="font-semibold text-text-primary">{lead.name}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Building className="w-3.5 h-3.5" /> Business Name
                </span>
                <p className="font-semibold text-text-primary">{lead.business_name || 'Not specified'}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Phone / WhatsApp
                </span>
                <p className="font-semibold text-text-primary font-mono">{lead.phone}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Requirement
                </span>
                <p className="font-semibold text-blue-primary">{lead.requirement}</p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Preferred Package
                </span>
                <p className="font-semibold text-text-primary">{lead.preferred_package || 'Not specified'}</p>
              </div>

              {/* Historical Legacy Field: Business Type (only shown if present) */}
              {lead.business_type && (
                <div className="space-y-1">
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Business Type
                  </span>
                  <p className="font-semibold text-text-primary">{lead.business_type}</p>
                </div>
              )}

              {/* Historical Legacy Field: Current Website (only shown if present) */}
              {lead.current_website && (
                <div className="space-y-1">
                  <span className="text-xs text-text-muted flex items-center gap-1">
                    <Building className="w-3.5 h-3.5" /> Current Website
                  </span>
                  <p className="font-semibold text-text-primary">
                    <a
                      href={lead.current_website.startsWith('http') ? lead.current_website : `https://${lead.current_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-primary hover:underline"
                    >
                      {lead.current_website}
                    </a>
                  </p>
                </div>
              )}

              <div className="space-y-1">
                <span className="text-xs text-text-muted flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Submitted Date
                </span>
                <p className="font-semibold text-text-primary">
                  {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Message / Description */}
            <div className="pt-2 border-t border-border">
              <span className="text-xs font-medium text-text-muted block mb-1.5">Client Requirement Message:</span>
              <div className="bg-surface p-4 rounded-lg text-sm text-text-primary whitespace-pre-wrap leading-relaxed border border-border">
                {lead.message || 'No additional message provided.'}
              </div>
            </div>
          </div>

          {/* Activity & Response Timeline */}
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm space-y-6">
            <h2 className="font-bold text-base text-text-primary border-b border-border pb-3 flex items-center justify-between">
              <span>Activity & Response Timeline</span>
              <span className="text-xs text-text-muted">{timeline.length} records</span>
            </h2>

            {/* Add Response Form */}
            <form onSubmit={handleAddResponseNote} className="space-y-3 bg-surface p-4 rounded-xl border border-border">
              <span className="text-xs font-semibold text-text-primary block">Log Activity / Interaction</span>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log notes from call, WhatsApp message, quote sent, or internal update..."
                rows={2}
                required
                className="w-full p-3 text-sm bg-white border border-border rounded-lg focus:border-blue-primary focus:ring-1 focus:ring-blue-primary outline-none resize-none"
              />
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-text-muted">Channel:</span>
                  <select
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    className="text-xs py-1 px-2 border border-border rounded bg-white font-medium"
                  >
                    <option value="call">Phone Call</option>
                    <option value="whatsapp">WhatsApp Message</option>
                    <option value="web_note">Internal Note</option>
                  </select>
                </div>
                <Button type="submit" size="sm" disabled={noteSubmitting}>
                  {noteSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  Log Entry
                </Button>
              </div>
            </form>

            {/* Timeline Stream */}
            {timeline.length === 0 ? (
              <div className="text-center py-8 text-text-muted text-xs">
                <Clock className="w-6 h-6 mx-auto mb-2 text-gray-300" />
                No activity logged yet for this lead.
              </div>
            ) : (
              <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                {timeline.map((item) => (
                  <div key={item.id} className="relative pl-8">
                    <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-blue-primary ring-4 ring-white" />
                    <div className="bg-surface p-3.5 rounded-lg border border-border text-xs space-y-1">
                      <div className="flex items-center justify-between text-text-muted">
                        <span className="font-semibold text-text-primary uppercase text-[10px] tracking-wider">
                          {item.channel?.replace('_', ' ')} • {item.sent_by || 'Admin'}
                        </span>
                        <span>{item.sent_at ? new Date(item.sent_at).toLocaleString() : 'Just now'}</span>
                      </div>
                      <p className="text-text-primary text-sm font-normal">{item.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Status Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-border p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-text-primary uppercase tracking-wider">Lead Status</h3>

            <div className="space-y-2">
              <label className="text-xs text-text-muted block">Change Status:</label>
              <select
                value={lead.status || 'New'}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={statusUpdating}
                className="w-full py-2.5 px-3 border border-border rounded-lg text-sm font-semibold bg-white text-text-primary focus:border-blue-primary outline-none"
              >
                {statusList.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
              {statusUpdating && (
                <p className="text-xs text-blue-primary flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Updating database...
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-border space-y-2 text-xs text-text-muted">
              <div className="flex justify-between">
                <span>Created:</span>
                <span className="font-mono text-text-primary">
                  {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last Updated:</span>
                <span className="font-mono text-text-primary">
                  {lead.updated_at ? new Date(lead.updated_at).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLeadDetail
