import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, redirectPath = '/login' }: any) => {
  const token = localStorage.getItem('token')
  // 未登入情況下，會跳轉回 /login 頁面
  if (!token) return <Navigate to={redirectPath} replace />
  return children
}

export default ProtectedRoute