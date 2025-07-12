import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Home, Phone, LogOut } from "lucide-react"
import {Input} from '@/components/ui/input'
import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { useAddProfilePicMutation } from '@/features/user_log_page/userLogApiSlice'
const Profile = ({userDetails}) => {
const {userName,
        userEmail,
        userPic,
        isUserBlocked,
        userMobile} = userDetails
  const [file,setFile] = useState(null)
  console.log('userpic',userPic)
  const[uploadProfilePic,{isError,isLoading,isSucces}] = useAddProfilePicMutation()

 async  function submitProfilePic(){

    try {
      const formData = new FormData()
       formData.append('image',file)
      const res= await uploadProfilePic(formData).unwrap()
      console.log(res)
    } catch (error) {
      console.log(error)
    }

  }

  return (
   <>
   <div className="space-y-6">
               <div className="text-center">
                {userPic?
                
                 <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 square-full flex items-center justify-center mb-4">
                   <img src={userPic} />
                 </div> :
                 <div className="mx-auto w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 round-full flex items-center justify-center mb-4">
                   <User className="w-10 h-10 text-white" src={userPic} />
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
                       <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">{userName}</div>
                     </div>
                     <div>
                       <label className="block text-gray-200 font-medium mb-2">Email</label>
                       <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                         {userEmail}
                       </div>
                     </div>
                   </div>
                   <Input type='file' onChange={(e)=>setFile(e.target.files[0])} /> 
                   <Button onClick={submitProfilePic}> AddPic </Button>
                   <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                     Edit Profile
                   </Button>
                 </CardContent>
               </Card>
             </div>
   </>
  )
}

export default Profile