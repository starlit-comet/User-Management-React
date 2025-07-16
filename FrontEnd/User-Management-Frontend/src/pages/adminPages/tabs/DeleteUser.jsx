import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button'
import { useRemoveUserMutation } from '@/features/adminLogin/adminSigninSlice'
import { toast } from 'sonner'
import { Trash2,AlertTriangle,Shield } from 'lucide-react'
const DeleteUser = ({user,setUsers}) => {
    const [isDeleting,setIsDeleting] = useState(false)
    const userId = user._id
      const[deleteUser]=useRemoveUserMutation()

    async function handleDeleteUser (){
        setIsDeleting(true)
    try {
      const res = await deleteUser({userId}).unwrap()
      console.log(res,'delete user res data')
      if(res.status===200  || res.message==='User Deleted SuccessFully'){

        setUsers(prevUsers=>prevUsers.filter(user=>user._id!==userId))
        toast.info("User Deleted")
      }
    } catch (error) {
      console.log(error,'delte user catch data')
    } finally{
        setIsDeleting(false)
    }
    

  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-300 hover:text-white hover:bg-red-500/20 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-slate-900/95 backdrop-blur-xl border-red-500/30 shadow-2xl shadow-red-500/10 max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-500 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <AlertDialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-400" />
                  Confirm User Deletion
                </AlertDialogTitle>
              </div>
            </div>

            <AlertDialogDescription className="text-blue-200 space-y-3">
              <span className="bg-slate-800/50 border border-blue-500/20 rounded-lg p-3">
                <span className="text-red-300 font-medium mb-2">⚠️ This action is irreversible</span>
                
              </span>

              
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-3 pt-6">
            <AlertDialogCancel className="bg-slate-800/50 border-blue-500/30 text-blue-200 hover:bg-slate-700/50 hover:text-white transition-all duration-200">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={isDeleting}
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete User
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    
    </>
  )
}

export default DeleteUser