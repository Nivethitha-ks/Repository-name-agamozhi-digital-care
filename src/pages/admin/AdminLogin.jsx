import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Mail, AlertCircle, Loader2, Shield } from 'lucide-react'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabase'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Admin Login — Agamozhi Digital Care'
    if (user) {
      navigate('/admin/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email.trim() || !password) {
      setError('Please enter both email and password.')
      return
    }

    setIsSubmitting(true)
    try {
      await login(email.trim(), password)
      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setError(err.message || 'Invalid credentials. Please check your email and password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy-deep flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-border">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-navy-deep to-blue-primary p-6 text-center text-white">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">Agamozhi Digital Care</h1>
          <p className="text-blue-200 text-xs mt-1">Admin Portal Authentication</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
          {!isSupabaseConfigured && (
            <div className="p-3 bg-blue-very-light border border-blue-200 rounded-lg text-xs text-blue-primary">
              <p className="font-semibold mb-0.5">Administrator Portal:</p>
              <p>Please enter your authorized administrator credentials to sign in.</p>
            </div>
          )}

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-lg text-xs text-error flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="agamozhidigitalcare@gmail.com"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:border-blue-primary focus:ring-1 focus:ring-blue-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-text-primary mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border text-sm focus:border-blue-primary focus:ring-1 focus:ring-blue-primary outline-none"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing In...
              </>
            ) : (
              'Sign In to Admin'
            )}
          </Button>

          <div className="text-center pt-2">
            <a href="/" className="text-xs text-text-muted hover:text-blue-primary transition-colors">
              ← Return to Public Website
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
