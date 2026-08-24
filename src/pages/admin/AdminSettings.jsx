import { useEffect, useState } from 'react'
import { User, Key, Globe, Lock, CheckCircle, AlertTriangle, Loader2, Save, MapPin, ExternalLink } from 'lucide-react'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabase'
import { getStoredContactConfig, saveContactConfig } from '../../config/contact'

const AdminSettings = () => {
  const { user, updatePassword } = useAuth()

  // Security Form State
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passLoading, setPassLoading] = useState(false)
  const [passMessage, setPassMessage] = useState({ type: '', text: '' })

  // Configurable Website Settings State
  const [siteConfig, setSiteConfig] = useState(() => {
    const stored = getStoredContactConfig()
    return {
      phone: stored.phone || '9965352749',
      whatsapp: stored.whatsappNumber || '9965352749',
      notificationEmail: stored.adminNotificationEmail || 'agamozhidigitalcare@gmail.com',
      address: stored.address || "Thiruvallur Nagar, Near Raja's College, Pudukkottai",
    }
  })
  const [configSuccess, setConfigSuccess] = useState(false)

  useEffect(() => {
    document.title = 'Settings — Agamozhi Admin'
    const stored = getStoredContactConfig()
    setSiteConfig({
      phone: stored.phone || '9965352749',
      whatsapp: stored.whatsappNumber || '9965352749',
      notificationEmail: stored.adminNotificationEmail || 'agamozhidigitalcare@gmail.com',
      address: stored.address || "Thiruvallur Nagar, Near Raja's College, Pudukkottai",
    })
  }, [])

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setPassMessage({ type: '', text: '' })

    if (newPassword.length < 6) {
      setPassMessage({ type: 'error', text: 'Password must be at least 6 characters long.' })
      return
    }

    if (newPassword !== confirmPassword) {
      setPassMessage({ type: 'error', text: 'Passwords do not match.' })
      return
    }

    setPassLoading(true)
    try {
      await updatePassword(newPassword)
      setPassMessage({ type: 'success', text: 'Password updated successfully!' })
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      console.error('Password update failed:', err)
      setPassMessage({ type: 'error', text: err.message || 'Failed to update password.' })
    } finally {
      setPassLoading(false)
    }
  }

  const handleConfigSave = (e) => {
    e.preventDefault()
    try {
      saveContactConfig({
        phone: siteConfig.phone,
        whatsapp: siteConfig.whatsapp,
        whatsappNumber: siteConfig.whatsapp,
        notificationEmail: siteConfig.notificationEmail,
        address: siteConfig.address,
      })
      setConfigSuccess(true)
      setTimeout(() => setConfigSuccess(false), 3500)
    } catch (err) {
      console.error('Failed to save settings:', err)
    }
  }

  const currentDirectionsUrl = `https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`
  const currentEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Settings</h1>
        <p className="text-slate-600 text-sm">Manage account security, website contact variables, and map location.</p>
      </div>

      {/* Account Info Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-5 h-5 text-blue-600" />
          Account Profile
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-xs text-slate-500 block mb-1 font-semibold">Authenticated Admin Email</span>
            <p className="font-bold text-slate-900">{user?.email || 'agamozhidigitalcare@gmail.com'}</p>
          </div>
          <div>
            <span className="text-xs text-slate-500 block mb-1 font-semibold">Role & Access</span>
            <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-md">
              Full Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Security / Change Password */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Key className="w-5 h-5 text-blue-600" />
          Security & Authentication
        </h2>

        {passMessage.text && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 font-semibold ${
              passMessage.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {passMessage.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-red-600" />}
            {passMessage.text}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none"
            />
          </div>

          <Button type="submit" size="md" disabled={passLoading} className="font-bold">
            {passLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            <span>Update Password</span>
          </Button>
        </form>
      </div>

      {/* Website Quick Settings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="font-bold text-base text-slate-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <span>Website Contact & Location Settings</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Updating the address automatically updates the Google Maps embed, directions link, and contact footer site-wide.
          </p>
        </div>

        {configSuccess && (
          <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Website contact settings & Google Map location updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleConfigSave} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone Number</label>
              <input
                type="text"
                value={siteConfig.phone}
                onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Support Number</label>
              <input
                type="text"
                value={siteConfig.whatsapp}
                onChange={(e) => setSiteConfig({ ...siteConfig, whatsapp: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none font-mono font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Admin Notification Email (New Enquiries Alert)
            </label>
            <input
              type="email"
              value={siteConfig.notificationEmail}
              onChange={(e) => setSiteConfig({ ...siteConfig, notificationEmail: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none font-mono font-semibold"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Automated notifications for all new incoming client leads are sent to this address.
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Business / Office Address
            </label>
            <input
              type="text"
              value={siteConfig.address}
              onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
              placeholder="e.g. Thiruvallur Nagar, Near Raja's College, Pudukkottai"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:border-blue-600 outline-none font-medium"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Type the full address or landmark. The Google Map below updates automatically.
            </p>
          </div>

          {/* Live Map & Directions Preview */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Live Map Preview for: {siteConfig.address || 'Address'}</span>
              </div>
              <a
                href={currentDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline font-bold"
              >
                <span>Test Directions Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="rounded-lg overflow-hidden border border-slate-300 bg-slate-900 h-48">
              <iframe
                title="Location Preview"
                src={currentEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <Button type="submit" size="md" className="font-bold">
            <Save className="w-4 h-4" />
            <span>Save Contact & Location Settings</span>
          </Button>
        </form>
      </div>

      {/* Integration Readiness Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Integration Readiness Status
        </h2>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-900">WhatsApp Click-to-Chat</p>
              <p className="text-slate-600">Direct messaging via pre-filled URLs</p>
            </div>
            <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold">Active</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-900">Supabase Auth & Database</p>
              <p className="text-slate-600">Real enquiry persistence & admin authentication</p>
            </div>
            <span
              className={`px-2.5 py-1 rounded-full font-bold ${
                isSupabaseConfigured
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isSupabaseConfigured ? 'Connected' : 'Local Sandbox Mode'}
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
            <div>
              <p className="font-bold text-slate-900">Lead Email Notifications</p>
              <p className="text-slate-600">Dispatches to: {siteConfig.notificationEmail}</p>
            </div>
            <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold">
              Ready
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSettings
