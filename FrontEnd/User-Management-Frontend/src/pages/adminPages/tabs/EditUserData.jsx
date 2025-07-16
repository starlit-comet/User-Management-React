"use client"

import { useState,useRef, useEffect } from "react"
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
import { Eye, EyeOff, UserPlus, Shield,Edit } from "lucide-react"
import { useEditUserDetailsMutation } from "@/features/adminLogin/adminSigninSlice"
import { toast } from "sonner"
function EditUserData({open,onOpenchange,users,user,index}) {
   const userId = user._id
  const [editUserDetails,{isLoading,isError,isSuccess}] = useEditUserDetailsMutation()
  const initialFormData={
    name: user.name,
    email: user.email,

    }
    const [email,setEmail] = useState(user.email)
    const [name,setName] = useState(user.name)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [selectedFile, setSelectedFile] = useState(null)
  const signUpFormData = useRef({...initialFormData})
  const [isChangeExists,setIsChangeExists] = useState(true)
  useEffect(()=>{
    if(email!==user.email || name!==user.name) setIsChangeExists(false)
    if(email===user.email && name===user.name) setIsChangeExists(true)
  },[email,name])
  const [errors, setErrors] = useState({ name:'',email:'' })
  const handleInputChange=(name,value)=>{
    // const{name,value}=e.target
    signUpFormData.current[name]=value
  }

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]
//     setSelectedFile(file)
//   }
async function handleEditUser(){
     const updatedData = signUpFormData .current
    try {
      const res = await editUserDetails({updatedData,userId}).unwrap();

      // console.log('usercreated')
      console.log(res.user,'Edited User Data')
      toast.success("success! User Info Updated");
      signUpFormData.current={email:res.user.email,name:res.user.name}
      onOpenchange.setOpen(false)
      if(res?.user){

        users[index]=res.user
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
        // if(value.length===0) error="Name can't be empty"
        break
      case "email":
        if (!value) {
          error = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email address"
        }
        break
    //   case "password":
    //     if (!value) {
    //       error = "Password is required"
    //     } else if (value.length < 8) {
    //       error = "Password must be at least 6 characters long"
    //     }
    //     break
    //   case "confirmPassword":
    //     const passwordField = document.getElementById("password")
    //     if (!value) {
    //       error = "Please confirm your password"
    //     } else if (passwordField && value !== passwordField.value) {
    //       error = "Passwords do not match"
    //     }
    //     break
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
    console.log(errors,'erros validation')
  }

  return (
      <Dialog >
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white flex items-center gap-2">
            <Edit className="w-4 h-4" />
            Edit Details
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
                  <DialogTitle className="text-xl font-bold text-white">Edit User Details</DialogTitle>
                  <DialogDescription className="text-blue-200">
                    Change the details below
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            <div className="grid gap-6">
            
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
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
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
                  value={email}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="user@company.com"
                  required
                  className={`bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200 ${
                    errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""
                  }`}
                  onChange={(e) => {
                    setEmail(e.target.value)
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

              {/* Password Field
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

              {/* Confirm Password Field 
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
              </div> */}
            </div>
            {isChangeExists && <div className="text-white">No change exists</div>}
         

            <DialogFooter className="gap-3">
              <DialogClose asChild>
                <Button
                  onClick={()=>{
                    setEmail(user.email)
                    setName(user.name)
                  }}
                  variant="outline"
                  className="bg-slate-800/50 border-blue-500/30 text-blue-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                disabled={isChangeExists}
                onClick={handleEditUser}
                className="bg-gradient-to-r disabled:bg-red-400 from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Edit User Details
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default EditUserData
