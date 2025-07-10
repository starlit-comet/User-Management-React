"use client"

import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Shield, Lock } from "lucide-react"
import { setToken } from "@/features/jwt/authSlice"
import { useSignInAdminMutation,useVerifyAdminJwtQuery } from "@/features/adminLogin/adminSigninSlice"
import { toast } from "sonner"
import { Navigate, useNavigate } from "react-router-dom"
 function  AdminLoginPage() {
  const navigate = useNavigate()
  const jwtToken = localStorage.getItem('adminToken')
  const {data,isSuccess} = useVerifyAdminJwtQuery(undefined,{skip:!jwtToken})
  console.log(data,isSuccess,'login data')
  useEffect(()=>{
    if(isSuccess) navigate('/admin/dashboard')
  },[isSuccess])
 

  const dispatch =  useDispatch()
  const initialFormData = {
    email: "",
    password: "",
  }

  const [inputErrors, setInputErrors] = useState({ ...initialFormData })
  const [showPassword, setShowPassword] = useState(false)
  const signInFormDataRef = useRef({ ...initialFormData })
  const [signInAdmin,{isSignInLoading,isSignInSuccess,isSignInError}]=useSignInAdminMutation()
  const handleInputChange = (e) => {
    const { name, value } = e.target
    signInFormDataRef.current[name] = value
  }


  async function handleSignInClick() {
    const signInEmail = signInFormDataRef.current.email
    const signinPassword = signInFormDataRef.current.password
    try {
      const res= await signInAdmin({email:signInEmail,password:signinPassword})
      console.log(res,'admin try data')
      if(res.error){
        if(res.error?.error){
          toast.error(res.error.error)
        }
        if(res.error?.data?.message){
        toast.error(res.error?.data?.message ??'failed to login')}
        if(res.error?.data?.errors){
          for(const [key,val] of Object.entries(res.error.data.errors)){
            console.log(key,val)
            toast.error(`${val}`)
          }
        }
      }else if(res.data?.message && res.data?.token){
        const jwtToken = res.data.token
        dispatch(setToken(jwtToken))
        toast.success("Login Success")
        navigate('/admin/dashboard')
      }
    } catch (error) {
      console.log(error,'admin catch data')
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 relative overflow-hidden">
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

      {/* Admin Login Card */}
      <Card className="w-full mt-28 max-w-md relative z-10 bg-slate-900/40 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/10">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/25">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            Admin Access
          </CardTitle>
          <CardDescription className="text-blue-200">
            Secure administrator portal - Enter your credentials
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-100 font-medium flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                Admin Email
              </Label>
              <Input
              autoComplete='email'
                onChange={handleInputChange}
                name="email"
                id="email"
                type="email"
                placeholder="admin@company.com"
                required
                className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 shadow-inner"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Secure Password
                </Label>
                <a
                  href="#"
                  className="text-sm text-cyan-300 hover:text-cyan-200 underline-offset-4 hover:underline transition-colors duration-200"
                >
                  Recovery Options
                </a>
              </div>
              <div className="relative">
                <Input
                  onChange={handleInputChange}
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter secure password"
                  required
                  className="bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 pr-10 shadow-inner"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-cyan-200 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </form>

          
        </CardContent>

        <CardFooter className="flex flex-col gap-4">
          <Button
            onClick={handleSignInClick}
            disabled={false}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
          >
            <Lock className="w-4 h-4 mr-2" />
            Secure Sign In
          </Button>

          
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminLoginPage
