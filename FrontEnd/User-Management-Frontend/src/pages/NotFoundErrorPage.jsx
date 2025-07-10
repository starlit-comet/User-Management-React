"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-blue-200/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-purple-200/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-pink-200/30 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute bottom-20 right-20 w-14 h-14 bg-cyan-200/30 rounded-full animate-bounce delay-1500"></div>

        {/* Floating Squares */}
        <div className="absolute top-1/3 left-1/4 w-8 h-8 bg-indigo-200/40 rotate-45 animate-pulse delay-500"></div>
        <div className="absolute top-2/3 right-1/3 w-6 h-6 bg-emerald-200/40 rotate-12 animate-pulse delay-1200"></div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] animate-pulse"></div>
      </div>

      {/* Main Content */}
      <Card className="relative z-10 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-2xl max-w-md w-full">
        <CardContent className="p-8 text-center space-y-6">
          {/* 404 Animation */}
          <div className="relative">
            <h1 className="text-8xl font-bold text-gray-800 animate-pulse">
              4<span className="inline-block animate-bounce delay-200">0</span>
              <span className="inline-block animate-bounce delay-400">4</span>
            </h1>
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-400/20 rounded-full animate-ping"></div>
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-700 animate-fade-in">Oops! Page Not Found</h2>
            <p className="text-gray-500 animate-fade-in delay-300">
              The page you're looking for seems to have wandered off into the digital void.
            </p>
          </div>

          {/* Animated Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <Search className="w-16 h-16 text-gray-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-300 transform hover:scale-105"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>

            <Button
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 bg-transparent"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </div>

          {/* Fun Message */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-400 animate-fade-in delay-700">
              Don't worry, even the best explorers get lost sometimes! 🧭
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-6xl animate-bounce delay-1000 opacity-20">🚀</div>
      <div className="absolute bottom-10 right-10 text-4xl animate-bounce delay-1800 opacity-20">⭐</div>
      <div className="absolute top-1/2 left-10 text-5xl animate-bounce delay-2500 opacity-20">🌙</div>
    </div>
  )
}

export default NotFoundPage
