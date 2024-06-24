import React from 'react'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }: any) => {
  const token = localStorage.getItem('token')
  // 登入情況下，如果輸入了 /login，會跳轉回首頁
  if (token) return <Navigate to='/' replace />
  return children
}

export default PublicRoute