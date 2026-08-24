import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Users, UserPlus, Clock, ArrowUpRight, Loader2, MessageSquare, CheckCircle2 } from 'lucide-react'
import { dbService } from '../../lib/supabase'
import { isTodayInIST } from '../../lib/dateUtils'
import Button from '../../components/Button'

const AdminDashboard = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Dashboard — Agamozhi Admin'
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    setLoading(true)
    try {
      const data = await dbService.fetchLeads()
      setLeads(data || [])
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Calculate Real Statistics (Source of Truth: leads table)
  const totalLeads = leads.length
  const newLeads = leads.filter((l) => l.status === 'New').length
  const todayLeads = leads.filter((l) => isTodayInIST(l.created_at)).length

  const pendingFollowups = leads.filter((l) => ['Contacted', 'Interested', 'Quotation', 'Negotiation'].includes(l.status)).length

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Contacted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Interested':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Quotation':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200'
      case 'Negotiation':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Won':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Lost':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="py-20 text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-primary mx-auto mb-3" />
        <p className="text-text-muted text-sm font-medium">Loading Dashboard Analytics...</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard Overview</h1>
          <p className="text-text-muted text-sm">Real-time enquiries & performance metrics.</p>
        </div>
        <Button to="/admin/leads" variant="outline" size="sm">
          View All Leads
          <ArrowUpRight className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-error border border-red-200 rounded-xl text-sm">
          Error loading metrics: {error}
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Total Leads</span>
            <div className="w-9 h-9 rounded-lg bg-blue-very-light flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-primary" />
            </div>
          </div>
          <div className="text-2xl font-bold text-text-primary">{totalLeads}</div>
          <p className="text-xs text-text-muted mt-1">All time enquiries</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">New Leads</span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-primary">{newLeads}</div>
          <p className="text-xs text-text-muted mt-1">Awaiting first response</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Today's Leads</span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-600">{todayLeads}</div>
          <p className="text-xs text-text-muted mt-1">Received today</p>
        </div>

        <div className="bg-white rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-text-muted uppercase tracking-wider">Pending Follow-ups</span>
            <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600">{pendingFollowups}</div>
          <p className="text-xs text-text-muted mt-1">In active conversation</p>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="p-5 border-b border-border flex items-center justify-between">
          <h2 className="text-base font-bold text-text-primary">Recent Enquiries</h2>
          <Link to="/admin/leads" className="text-xs text-blue-primary font-medium hover:underline">
            See All →
          </Link>
        </div>

        {leads.length === 0 ? (
          <div className="py-16 text-center text-text-muted">
            <CheckCircle2 className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-base text-text-primary mb-1">No data available yet</p>
            <p className="text-xs">Enquiries submitted via the contact form will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface text-text-muted text-xs uppercase font-semibold border-b border-border">
                <tr>
                  <th className="py-3.5 px-5">Name & Business</th>
                  <th className="py-3.5 px-5">Requirement</th>
                  <th className="py-3.5 px-5">Phone</th>
                  <th className="py-3.5 px-5">Status</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {leads.slice(0, 5).map((lead) => (
                  <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-semibold text-text-primary">{lead.name}</div>
                      <div className="text-xs text-text-muted">{lead.business_name || lead.business_type}</div>
                    </td>
                    <td className="py-4 px-5 text-text-primary">{lead.requirement}</td>
                    <td className="py-4 px-5 font-mono text-xs">{lead.phone}</td>
                    <td className="py-4 px-5">
                      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(lead.status)}`}>
                        {lead.status || 'New'}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right">
                      <Link
                        to={`/admin/leads/${lead.id}`}
                        className="text-xs text-blue-primary font-medium hover:underline"
                      >
                        Manage →
                      </Link>
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

export default AdminDashboard
