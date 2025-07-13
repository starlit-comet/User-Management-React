"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Home, Phone, LogOut } from "lucide-react"
import UserHome from "./tabs/Home"
import Profile from "./tabs/Profile"
import { userLogout } from "@/features/jwt/userJwtSlice"
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import Contact from "./tabs/Contact"
const UserHomePage = () => {

  const {userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile,
      } = useSelector(s=>s.userState)
  
 

  const [activeTab, setActiveTab] = useState("home")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "profile", label: "Profile", icon: User },
    { id: "contact", label: "Contact", icon: Phone },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <UserHome userDetails={{userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile}} />
        )
      case "profile":
        return (
          <><Profile userDetails={{userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile}}/></>
        )
      case "contact":
        return (
          <Contact userDetails={{userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile}}/>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-purple-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-pink-300/30 rounded-full animate-bounce delay-1500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Welcome back to your account</p>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            onClick={() => {
             dispatch(userLogout()) 
             navigate('/login')
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl mb-8">
          <div className="flex border-b border-white/20">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-white bg-white/10 border-b-2 border-purple-400"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </Card>

        {/* Tab Content */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="p-8">{renderTabContent()}</CardContent>
        </Card>
      </div>
    </div>
  )
}

export default UserHomePage
