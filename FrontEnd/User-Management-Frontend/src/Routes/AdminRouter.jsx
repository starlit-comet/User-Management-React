import React from 'react'
import { Routes,Route } from 'react-router-dom'
import AdminLoginPage from '../pages/adminPages/Login'
import AdminHomePage from '@/pages/adminPages/HomePage'
const AdminPages = () => {
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage />} />
        <Route path ='/Dashboard' element={<AdminHomePage/>} />
    </Routes>
  )
}

export default AdminPages