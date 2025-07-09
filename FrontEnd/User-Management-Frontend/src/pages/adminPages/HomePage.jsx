"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Shield,
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Activity,
} from "lucide-react"
import SettingsSection from "./tabs/SettingsSection"
import HomeSection from "./tabs/HomeSection"
import UsersSection from "./tabs/UsersSection"

const AdminHomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard")

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  // Mock user data




  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <HomeSection/>
        )
      case "users":
        return (
        <UsersSection />
        )
      case "settings":
        return (
         <SettingsSection />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Moving Particles */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-300/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-cyan-300/50 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-indigo-300/40 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-2 h-2 bg-blue-300/30 rounded-full animate-bounce delay-1500"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

        {/* Hexagonal Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-20 left-20 w-8 h-8 border border-cyan-400 transform rotate-45"></div>
          <div className="absolute top-40 right-32 w-6 h-6 border border-blue-400 transform rotate-12"></div>
          <div className="absolute bottom-32 left-40 w-10 h-10 border border-indigo-400 transform -rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-4 h-4 border border-cyan-400 transform rotate-90"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
              <p className="text-blue-200">System administration and management</p>
            </div>
          </div>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            onClick={() => {
              /* Handle logout */
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <Card className="bg-slate-800/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/10 mb-8">
          <div className="flex border-b border-blue-500/20">
            {tabs.map((tab) => {
              const IconComponent = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-white bg-blue-500/20 border-b-2 border-cyan-400"
                      : "text-blue-200 hover:text-white hover:bg-blue-500/10"
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
        <Card className="bg-slate-800/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/10">
          <CardContent className="p-8">{renderTabContent()}</CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminHomePage
