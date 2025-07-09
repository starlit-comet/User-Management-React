import React from 'react'

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
const HomeSection = () => {
  
  return (
    <>
    <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Admin Dashboard</h2>
                  <p className="text-blue-200 text-lg">System overview and key metrics</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-200 text-sm">Total Users</p>
                          <p className="text-2xl font-bold text-white">1,234</p>
                        </div>
                        <Users className="w-8 h-8 text-cyan-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-200 text-sm">Active Sessions</p>
                          <p className="text-2xl font-bold text-white">856</p>
                        </div>
                        <Activity className="w-8 h-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-200 text-sm">System Health</p>
                          <p className="text-2xl font-bold text-white">98.5%</p>
                        </div>
                        <Shield className="w-8 h-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-200 text-sm">Revenue</p>
                          <p className="text-2xl font-bold text-white">$45.2K</p>
                        </div>
                        {/* <BarChart3 className="w-8 h-8 text-purple-400" /> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div></>
  )
}

export default HomeSection