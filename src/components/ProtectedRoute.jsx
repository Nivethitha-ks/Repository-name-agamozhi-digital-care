import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Loader2 } from 'lucide-react'

const ProtectedRoute = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-primary mx-auto mb-3" />
          <p className="text-text-muted text-sm font-medium">Verifying Session...</p>
        </div>
      </div>
    )
  }

  const isAdmin = Boolean(
    user &&
      (user.role === 'admin' ||
        user.user_metadata?.role === 'admin' ||
        user.email === 'agamozhidigitalcare@gmail.com' ||
        user.email === 'admin@agamozhi.com' ||
        user.email === 'babupavi5050@gmail.com')
  )

  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
