import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export default function RoleGuard({ allowedRoles, children }) {
  const { role } = useAuthStore()

  if (!role || (allowedRoles && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />
  }

  return children
}
