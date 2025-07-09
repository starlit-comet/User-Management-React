import React from 'react'

import { useState } from "react"
import { User, Home, Phone } from "lucide-react"

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
const SettingsSection = () => {
  return (
    <><div className="space-y-6">
                   <div className="text-center">
                     <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                       <User className="w-10 h-10 text-white" />
                     </div>
                     <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
                     <p className="text-gray-300">Manage your account settings and preferences</p>
                   </div>
                   <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                     <CardContent className="p-6 space-y-4">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <label className="block text-gray-200 font-medium mb-2">Full Name</label>
                           <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">John Doe</div>
                         </div>
                         <div>
                           <label className="block text-gray-200 font-medium mb-2">Email</label>
                           <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                             john.doe@example.com
                           </div>
                         </div>
                       </div>
                       <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                         Edit Profile
                       </Button>
                     </CardContent>
                   </Card>
                 </div>
              </>
  )
}

export default SettingsSection