"use client"

import { useState,useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, UserPlus, Shield } from "lucide-react"
import { useCreateUserMutation } from "@/features/user_log_page/userLogApiSlice"
import { toast } from "sonner"
function AdminUserDialog({open,onOpenChange}) {
  const [createUser,{isLoading,isError,isSuccess}] = useCreateUserMutation()
  const initialFormData={
    name: "",
    email: "",
    password: "",
    confirmPassword: "",}
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [selectedFile, setSelectedFile] = useState(null)
  const signUpFormData = useRef({...initialFormData})
  const [errors, setErrors] = useState({ ...initialFormData })
  const handleInputChange=(name,value)=>{
    // const{name,value}=e.target
    signUpFormData.current[name]=value
  }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     setSelectedFile(file)
//   }
 async function handleCreateUser({users}){
    try {
      const res = await createUser(signUpFormData).unwrap();

      // console.log('usercreated')
      console.log(res.userData,'New User Data')
      toast.success("success! new User created");
      signUpFormData.current={...initialFormData}
      setOpen(false)
      if(res?.UserData){

        users.push(res.userData)
      }

    } catch (error) {
      console.log(error, "error data");
      if (error.error) {
        toast.error(`${error.error}`);
      }
      const errObj = error.data?.errors;
      if (errObj) {
        for (const [key, val] of Object.entries(errObj)) {
          console.log(key, val);
          toast.warning(`${val}`);
        }
      }
      const errMsg = error.data?.message;
      console.log(errMsg, errObj);
      if (errMsg) {
        toast.error(`${errMsg}`);
      }
    }
  }

  const validateField = (name, value) => {
    let error = ""

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required"
        break
      case "email":
        if (!value) {
          error = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address"
        }
        break
      case "password":
        if (!value) {
          error = "Password is required"
        } else if (value.length < 8) {
          error = "Password must be at least 6 characters long"
        }
        break
      case "confirmPassword":
        const passwordField = document.getElementById("password")
        if (!value) {
          error = "Please confirm your password"
        } else if (passwordField && value !== passwordField.value) {
          error = "Passwords do not match"
        }
        break
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  return (
      <Dialog >
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Create New User
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px] bg-slate-900/95 backdrop-blur-xl border-blue-500/30 shadow-2xl shadow-blue-500/10">
          <div  className="space-y-6">
            <DialogHeader className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold text-white">Create New User</DialogTitle>
                  <DialogDescription className="text-blue-200">
                    Add a new user to the DataBase
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-6">
              {/* Profile Photo Upload */}
              {/* <div className="space-y-3">
                <Label htmlFor="photo" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Profile Photo
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold text-lg">
                    {selectedFile ? "✓" : "?"}
                  </div>
                  <div className="flex-1">
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-slate-800/50 border-blue-500/30 text-white file:bg-blue-600 file:text-white file:border-0 file:rounded-md file:px-3 file:py-1 file:mr-3 hover:file:bg-blue-700 transition-all duration-200"
                    />
                    <p className="text-blue-300 text-xs mt-1">Upload JPG, PNG or GIF (max 5MB)</p>
                  </div>
                </div>
              </div> */}

              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter full name"
                  required
                  className={`bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                    errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                  }`}
                  onChange={(e) => {
                    validateField("name", e.target.value)
                    handleInputChange(e.target.name,e.target.value)
                  }}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@company.com"
                  required
                  className={`bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                    errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                  }`}
                  onChange={(e) => {
                    validateField("email", e.target.value)
                    handleInputChange(e.target.name,e.target.value)

                  }}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create secure password"
                    required
                    className={`bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 pr-10 ${
                      errors.password ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                    }`}
                    onChange={(e) => {
                      validateField("password", e.target.value)
                      handleInputChange(e.target.name,e.target.value)
                      }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-cyan-200 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-blue-100 font-medium flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    required
                    className={`bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 pr-10 ${
                      errors.confirmPassword ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                    }`}
                    onChange={(e) => {
                      validateField("confirmPassword", e.target.value)
                      handleInputChange(e.target.name,e.target.value)

                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-cyan-200 transition-colors duration-200"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

         

            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-slate-800/50 border-blue-500/30 text-blue-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleCreateUser}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Create User
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default AdminUserDialog
