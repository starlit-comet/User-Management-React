import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from '@/components/ui/label'
import { User, Home, Phone, LogOut } from "lucide-react"
import {Input} from '@/components/ui/input'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setUserProfilePic } from '@/features/jwt/userJwtSlice'
import { useAddProfilePicMutation } from '@/features/user_log_page/userLogApiSlice'
import { toast } from 'sonner'
const Profile = ({userDetails}) => {
  const dispatch = useDispatch()
const {userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile} = userDetails
  const [file,setFile] = useState(null)
  const[uploadProfilePic,{isError,isLoading,isSucces}] = useAddProfilePicMutation()

 async  function submitProfilePic(){
    if(!file){
      toast.info("Select a image to upload")
      return
    }
    try {
      const formData = new FormData()
       formData.append('image',file)
      const res= await uploadProfilePic(formData).unwrap()
      if(res.url){
        dispatch(setUserProfilePic(res.url))
        toast.success("Profile Pic Updated")
      }
    } catch (error) {
      console.log(error)
      toast.error('Image upload failed')
    }

  }

  return (
   <>
   <div className="space-y-6">
               <div className="text-center">
                {userPic?
                
                 <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 square-full flex items-center justify-center mb-4">
                   <img src={userPic?userPic:null} />
                 </div> :
                 <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 round-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-white" />
                 </div> 
                }
                 <h2 className="text-3xl font-bold text-white mb-2">Your Profile</h2>
                 <p className="text-gray-300">Manage your account settings and preferences</p>
               </div>
               <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                 <CardContent className="p-6 space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                       <label className="block text-gray-200 font-medium mb-2">Full Name</label>
                       <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">{userName||"User Name"}</div>
                     </div>
                     <div>
                       <label className="block text-gray-200 font-medium mb-2">Email</label>
                       <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                         {userEmail||'User Email'}
                       </div>
                     </div>
                   </div>
                    <Label htmlFor="Profile-Pic" className="text-gray-100 mt-8 font-medium">
                                     Upload a new Profile Pic
                                   </Label>
                   <Input className="w-64" accept="image/*" id='Profile-Pic' type='file' onChange={(e)=>setFile(e.target.files[0])} /> 
                   <Button onClick={submitProfilePic} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                     Add Photo
                   </Button>
                 </CardContent>
               </Card>
             </div>
   </>
  )
}

export default Profile