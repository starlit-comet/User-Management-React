import React from 'react'
import { useState,useEffect } from 'react'
import { Routes,Route,Navigate } from 'react-router-dom'
import AdminLoginPage from '../pages/adminPages/Login'
import AdminHomePage from '@/pages/adminPages/HomePage'
const AdminPages = ({Children }) => {
  const [isLoading,setIsLoading] = useState(true)
  return (
    <Routes>
        <Route path='/login' element={<AdminLoginPage />} />
        <Route path ='/Dashboard' element={<AdminHomePage/>} />
    </Routes>
  )
}

export default AdminPages