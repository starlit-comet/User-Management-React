import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Home, Phone, LogOut } from "lucide-react"

const UserHome = () => {
  return (
    <>
    <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-white mb-4">Welcome Home</h2>
                  <p className="text-gray-300 text-lg">Your dashboard is ready to use</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Quick Stats</h3>
                      <p className="text-gray-300">View your recent activity and statistics</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Recent Updates</h3>
                      <p className="text-gray-300">Stay up to date with the latest changes</p>
                    </CardContent>
                  </Card>
                </div>
              </div></>
  )
}

export default UserHome