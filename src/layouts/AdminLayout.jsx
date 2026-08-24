import { useState } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { isSupabaseConfigured } from '../lib/supabase'

const adminNavLinks = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Leads', to: '/admin/leads', icon: Users },
  { label: 'Documents', to: '/admin/documents', icon: FileText },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
]

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-navy-deep text-white p-4 flex items-center justify-between border-b border-white/10 sticky top-0 z-40">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-blue-primary flex items-center justify-center font-bold text-sm">
            A
          </div>
          <span className="font-bold text-sm">Agamozhi Admin</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-blue-200 hover:text-white"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-45 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-navy-deep text-white flex flex-col transition-transform duration-300 shadow-2xl md:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10 hidden md:block">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-primary flex items-center justify-center font-bold text-lg text-white">
              A
            </div>
            <div>
              <span className="font-bold text-white block text-base leading-tight">Agamozhi</span>
              <span className="text-blue-300 text-xs font-medium">Admin Portal</span>
            </div>
          </Link>
        </div>

        {/* Database Status Badge */}
        <div className="px-6 py-3 bg-white/5 border-b border-white/5 text-xs text-blue-200 flex items-center justify-between">
          <span>Backend Mode:</span>
          <span
            className={`px-2 py-0.5 rounded font-semibold text-[11px] ${
              isSupabaseConfigured
                ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
            }`}
          >
            {isSupabaseConfigured ? 'Supabase DB' : 'Local Sandbox'}
          </span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {adminNavLinks.map((link) => {
            const Icon = link.icon
            const isActive = location.pathname === link.to || (link.to !== '/admin/dashboard' && location.pathname.startsWith(link.to))
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-primary text-white shadow-sm font-semibold'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Bottom User Profile & Actions */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-blue-200 transition-colors"
          >
            <span>View Public Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center justify-between pt-2">
            <div className="overflow-hidden">
              <p className="text-xs text-white font-medium truncate">{user?.email || 'admin@agamozhi.com'}</p>
              <p className="text-[11px] text-blue-300">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 overflow-y-auto w-full max-w-full min-w-0 p-3.5 sm:p-6 md:p-8">
        <div className="max-w-6xl mx-auto w-full min-w-0">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
