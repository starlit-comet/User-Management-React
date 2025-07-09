import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Home, Phone, LogOut } from "lucide-react"
const Contact = () => {
  return (
    <>
    <div className="space-y-6">
                <div className="text-center">
                  <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Contact Us</h2>
                  <p className="text-gray-300">Get in touch with our support team</p>
                </div>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Support Information</h3>
                        <div className="space-y-2">
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Email:</span> support@example.com
                          </p>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Phone:</span> +1 (555) 123-4567
                          </p>
                          <p className="text-gray-300">
                            <span className="font-medium text-white">Hours:</span> Mon-Fri 9AM-6PM
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Quick Contact</h3>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
    </>
  )
}

export default Contact