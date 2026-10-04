import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { session, loading } = useAuth()

  if (loading) return <p>Memuat...</p>
  if (!session) return <Navigate to="/login" replace />

  return <>{children}</>
}