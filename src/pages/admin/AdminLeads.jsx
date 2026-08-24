import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, ArrowUpDown, Loader2, Phone, Eye, Inbox } from 'lucide-react'
import { dbService } from '../../lib/supabase'
import { isTodayInIST } from '../../lib/dateUtils'

const statusOptions = ['All', 'New', 'Contacted', 'Interested', 'Quotation', 'Negotiation', 'Won', 'Lost']

const AdminLeads = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortOrder, setSortOrder] = useState('desc') // desc | asc

  useEffect(() => {
    document.title = 'Leads Management — Agamozhi Admin'
    loadLeads()
  }, [])

  const loadLeads = async () => {
    setLoading(true)
    try {
      const data = await dbService.fetchLeads()
      setLeads(data || [])
    } catch (err) {
      console.error('Failed to load leads:', err)
    } finally {
      setLoading(false)
    }
  }

  // Authoritative metrics from leads table
  const totalLeads = leads.length
  const todayLeads = leads.filter((l) => isTodayInIST(l.created_at)).length

  // Filter & Search Logic
  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        search === '' ||
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.business_name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.includes(search) ||
        lead.requirement?.toLowerCase().includes(search.toLowerCase()) ||
        lead.preferred_package?.toLowerCase().includes(search.toLowerCase()) ||
        lead.business_type?.toLowerCase().includes(search.toLowerCase()) ||
        lead.current_website?.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = statusFilter === 'All' || lead.status === statusFilter

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at || 0)
      const dateB = new Date(b.created_at || 0)
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

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

  return (
    <div className="space-y-6">
      {/* Page Title & Stats Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Lead Management</h1>
          <p className="text-text-muted text-sm">View, search, filter and track all client enquiries.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-xs">
            Total Leads: {totalLeads}
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-xs">
            Today: {todayLeads}
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-border p-3.5 sm:p-4 shadow-sm space-y-3 sm:space-y-4 md:space-y-0 md:flex md:items-center md:justify-between md:gap-4">
        {/* Search */}
        <div className="relative flex-1 w-full max-w-full md:max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, business, phone, or requirement..."
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-border focus:border-blue-primary focus:ring-1 focus:ring-blue-primary outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-1 sm:flex-initial">
            <Filter className="w-4 h-4 text-text-muted shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-2 px-2.5 sm:px-3 text-xs sm:text-sm rounded-lg border border-border bg-white focus:border-blue-primary outline-none w-full sm:w-auto"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  Status: {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs sm:text-sm rounded-lg border border-border bg-white hover:bg-surface transition-colors shrink-0"
          >
            <ArrowUpDown className="w-4 h-4 text-text-muted" />
            <span>{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
          </button>
        </div>
      </div>

      {/* Leads Data Table / Cards */}
      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-primary mx-auto mb-3" />
            <p className="text-text-muted text-sm font-medium">Fetching leads database...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="py-20 text-center text-text-muted">
            <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-semibold text-lg text-text-primary mb-1">No leads found</p>
            <p className="text-sm text-text-muted">
              {search || statusFilter !== 'All'
                ? 'Try adjusting your search query or status filter.'
                : 'No enquiries have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface text-text-muted text-xs uppercase font-semibold border-b border-border">
                  <tr>
                    <th className="py-3.5 px-5">Name & Business</th>
                    <th className="py-3.5 px-5">Package / Type</th>
                    <th className="py-3.5 px-5">Requirement</th>
                    <th className="py-3.5 px-5">Phone</th>
                    <th className="py-3.5 px-5">Status</th>
                    <th className="py-3.5 px-5">Date</th>
                    <th className="py-3.5 px-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-surface/50 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-semibold text-text-primary">{lead.name}</div>
                        <div className="text-xs text-text-muted">{lead.business_name || 'Individual'}</div>
                      </td>
                      <td className="py-4 px-5 text-text-muted text-xs">{lead.preferred_package || lead.business_type || '—'}</td>
                      <td className="py-4 px-5 font-medium text-text-primary">{lead.requirement}</td>
                      <td className="py-4 px-5 font-mono text-xs text-text-primary">{lead.phone}</td>
                      <td className="py-4 px-5">
                        <span
                          className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          {lead.status || 'New'}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-xs text-text-muted">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="inline-flex items-center gap-1 text-xs text-blue-primary font-semibold hover:underline bg-blue-very-light px-3 py-1.5 rounded-lg"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="md:hidden divide-y divide-border">
              {filteredLeads.map((lead) => (
                <div key={lead.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-text-primary text-base">{lead.name}</h3>
                      <p className="text-xs text-text-muted">{lead.business_name || (lead.preferred_package ? `Package: ${lead.preferred_package}` : (lead.business_type || ''))}</p>
                    </div>
                    <span
                      className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${getStatusBadge(
                        lead.status
                      )}`}
                    >
                      {lead.status || 'New'}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 bg-surface p-2.5 rounded-lg text-text-muted">
                    <p><strong className="text-text-primary">Requirement:</strong> {lead.requirement}</p>
                    <p><strong className="text-text-primary">Phone:</strong> {lead.phone}</p>
                    <p><strong className="text-text-primary">Submitted:</strong> {lead.created_at ? new Date(lead.created_at).toLocaleString() : 'N/A'}</p>
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <a
                      href={`tel:${lead.phone}`}
                      className="px-3 py-1.5 text-xs border border-border rounded-lg flex items-center gap-1 font-medium"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Call
                    </a>
                    <Link
                      to={`/admin/leads/${lead.id}`}
                      className="px-3 py-1.5 text-xs bg-blue-primary text-white rounded-lg flex items-center gap-1 font-medium"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Manage Lead
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminLeads
