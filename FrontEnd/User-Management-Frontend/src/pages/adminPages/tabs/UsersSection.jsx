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
const UsersSection = () => {
      const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15",
      lastLogin: "2024-01-10",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Premium",
      status: "Active",
      joinDate: "2024-01-08",
      lastLogin: "2024-01-09",
      avatar: "JS",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2023-12-20",
      lastLogin: "2023-12-25",
      avatar: "MJ",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2023-11-10",
      lastLogin: "2024-01-10",
      avatar: "SW",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@example.com",
      role: "User",
      status: "Suspended",
      joinDate: "2024-01-01",
      lastLogin: "2024-01-05",
      avatar: "DB",
    },
  ]

    const getStatusColor = (status) => {
      switch (status) {
        case "Active":
          return "bg-green-500/20 text-green-300 border-green-500/30"
        case "Inactive":
          return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
        case "Suspended":
          return "bg-red-500/20 text-red-300 border-red-500/30"
        default:
          return "bg-gray-500/20 text-gray-300 border-gray-500/30"
      }
    }
  
    
  return (
    <>
    <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">User Management</h2>
                <p className="text-blue-200">Manage user accounts and permissions</p>
              </div>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white">
                Add New User
              </Button>
            </div>

            <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  User Directory ({users.length} users)
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-blue-500/20">
                      <tr className="text-left">
                        <th className="px-6 py-4 text-blue-200 font-medium">User</th>
                        <th className="px-6 py-4 text-blue-200 font-medium">Status</th>
                        <th className="px-6 py-4 text-blue-200 font-medium">Join Date</th>
                        <th className="px-6 py-4 text-blue-200 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr
                          key={user.id}
                          className={`border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors ${index % 2 === 0 ? "bg-slate-800/20" : ""}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold">
                                {user.avatar}
                              </div>
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-blue-300 text-sm flex items-center gap-1">
                                  <Mail className="w-3 h-3" />
                                  {user.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <Badge className={`${getStatusColor(user.status)} border`}>{user.status}</Badge>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-blue-200 flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {user.joinDate}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-blue-300 hover:text-white hover:bg-blue-500/20"
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-cyan-300 hover:text-white hover:bg-cyan-500/20"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              {user.status === "Active" ? (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-orange-300 hover:text-white hover:bg-orange-500/20"
                                  title="Block User"
                                >
                                  Block
                                </Button>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-green-300 hover:text-white hover:bg-green-500/20"
                                  title="Unblock User"
                                >
                                  Unblock
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-300 hover:text-white hover:bg-red-500/20"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
          
          </>
  )
}

export default UsersSection