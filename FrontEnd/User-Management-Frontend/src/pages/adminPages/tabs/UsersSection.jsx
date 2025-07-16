import React from "react";

import { useState,useEffect,useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllUsersDataQuery,useRemoveUserMutation } from "@/features/adminLogin/adminSigninSlice";

import DialogDemo from './AddNewUser'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import DeleteUser from "./DeleteUser";

import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Shield,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  Search,
  Trash2,
  Mail,
  Calendar,
  Activity,
} from "lucide-react";
const UsersSection = () => {
  const[open,setOpen] = useState(false)
  const [searchQuery,setSearchQuery] = useState('')
  const [debouncedSearchQuery,setDebouncedSearchQuery] = useState('')
  const [currPage, setCurrPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(5)
  const [users,setUsers] = useState([])
  const adminToken = localStorage.getItem("adminToken");
  const { data, isError, isSuccess } = useGetAllUsersDataQuery(undefined, {
    skip: !adminToken,
  });
  useEffect(()=>{
      if (isSuccess && data?.usersData) {
    setUsers( data.usersData)
  }
  },[isSuccess,data])

  // console.log(users, data, "users data");
  if (adminToken) {
  }
  
  
  
  useEffect(()=>{
    const timer = setTimeout(()=>{
      setDebouncedSearchQuery(searchQuery)
      setCurrPage(1)
    },300)
    return ()=>clearTimeout(timer)
  },[searchQuery])
  
  const filterdUsers = useMemo(()=>{
    return users.filter(
      (user)=>
        user.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    )
  },[users,debouncedSearchQuery])
  
  const totalPages = Math.ceil(filterdUsers.length / usersPerPage)
  const startIndex = (currPage-1) * usersPerPage
  const paginatedUsers = filterdUsers.slice(startIndex,startIndex+usersPerPage)
  
  
  const getStatusColor = (status) => {
    switch (status) {
      case false:
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case true:
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "Suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              User Management
            </h2>
            <p className="text-blue-200">
              Manage user accounts and permissions
            </p>
          </div>
      
      <DialogDemo users={users} open={open} onOpenChange={setOpen} />
         
        </div>
        <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-4 h-4" />
            <Input 
              placeholder = "Search users by Email or Name"
              value = {searchQuery}
              onChange = {(e)=>setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-blue-500/30 text-white placeholder:text-blue-300/60 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200" />
          </div>
        </CardContent>

        </Card>

        <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              User Directory ({filterdUsers.length} users) 
              {debouncedSearchQuery && (
                <span className="text-sm text-blue-300 font-normal" >-filtered by "{debouncedSearchQuery}"</span>
              )}
            </CardTitle>
          </CardHeader>
      

          <CardContent className="p-0">
            {paginatedUsers.length ===0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-blue-300/50 mx-auto mb-4"  />
                <p className="text-blue-200 text-lg">No Users Found</p>
                <p className="text-blue-300/70 text-sm">
                {debouncedSearchQuery ? `No users Match "${debouncedSearchQuery}"` :'No users available'}
                </p>
              </div>
            ) :(<>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-blue-500/20">
                  <tr className="text-left">
                    <th className="px-6 py-4 text-blue-200 font-medium">
                      User
                    </th>
                    <th className="px-6 py-4 text-blue-200 font-medium">
                      Status
                    </th>
                    {/* <th className="px-6 py-4 text-blue-200 font-medium">Join Date</th> */}
                    <th className="px-6 py-4 text-blue-200 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { paginatedUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className={`border-b border-blue-500/10 hover:bg-blue-500/5 transition-colors ${
                        index % 2 === 0 ? "bg-slate-800/20" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12  rounded-lg flex items-center justify-center text-white font-semibold">
                            <img
                              src={user.profileImage ?? null}
                              alt="No profile pic"
                            />
                          </div>
                          <div>
                            <p className="text-white font-medium">
                              {user.name}
                            </p>
                            <p className="text-blue-300 text-sm flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          className={`${getStatusColor(user.isBlocked)} border`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </Badge>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {!user.isBlocked ? (
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
                          <DeleteUser setUsers={setUsers} user={user}/>
                          {/* <Button onClick={()=>handleDeleteUser(user._id)}
                            size="sm"
                            variant="ghost"
                            className="text-red-300 hover:text-white hover:bg-red-500/20"
                          >
                            
                          </Button> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages >1 && (
              <div className='border-t border-blue-500/20 px-6 py-4' >
                <div className="flex items-center justify-between ">
                  <div className="text-blue-200 text-sm">
                    Showing {startIndex +1 } to { Math.min(startIndex + usersPerPage,filterdUsers.length)}  {" of "}{filterdUsers.length} users
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size='sm' variant='ghost' 
                      onClick={()=>setCurrPage((prev)=>Math.max(prev-1,1))}
                      disabled = {currPage===1}
                      className="text-blue-300 hover:text-white hover:bg-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft  className="w-4 h-4" /> Previous

                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({length:totalPages},(_,i)=>i+1).map((page)=>(
                      <Button key={page}
                      size='sm' variant ="ghost"
                      onClick={()=>setCurrPage(page)}
                      className={`w-8 h-8 p-0 ${
                        currPage===page 
                                 ? "bg-blue-500/20 text-white border border-blue-500/30"
                                 : "text-blue-300 hover:text-white hover:bg-blue-500/20"
                      }`}


                      >{page}</Button>
                    ))}
                  </div>
                  <Button size="sm" variant="ghost"
                    onClick={()=>setCurrPage((prev)=>Math.min(prev+1,totalPages))}
                    disabled={currPage===totalPages}
                    className="text-blue-300 hover:text-white hover:bg-blue-500/20 diabled:opacity-50 disabled:cursor-not-allowed"
                  >Next <ChevronRight className="w-4 h-4"  />
                  </Button>
                  </div>
                </div>
              </div>
          

            )}


            </>) }
          </CardContent>
        
        </Card>
      </div>
    </>
  );
};

export default UsersSection;
