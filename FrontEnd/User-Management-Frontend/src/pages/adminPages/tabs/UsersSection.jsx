import React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGetAllUsersDataQuery } from "@/features/adminLogin/adminSigninSlice";

import DialogDemo from './AddNewUser'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";


import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  Shield,
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Activity,
} from "lucide-react";
const UsersSection = () => {
  let users = [];
  const adminToken = localStorage.getItem("adminToken");
  const { data, isError, isSuccess } = useGetAllUsersDataQuery(undefined, {
    skip: !adminToken,
  });
  if (isSuccess) {
    users = data?.usersData;
  }
  console.log(users, data, "users data");
  if (adminToken) {
  }

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
      
      <DialogDemo users={users} />
          {/* <Button
            onClick={DialogDemo}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
          >
            Add New User
          </Button> */}
        </div>

        <Card className="bg-slate-800/40 backdrop-blur-sm border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              User Directory ({users?.length} users)
            </CardTitle>
          </CardHeader>
          {/* <Command>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>Calendar</CommandItem>
                <CommandItem>Search Emoji</CommandItem>
                <CommandItem>Calculator</CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Settings">
                <CommandItem>Profile</CommandItem>
                <CommandItem>Billing</CommandItem>
                <CommandItem>Settings</CommandItem>
              </CommandGroup>
            </CommandList>
          </Command> */}
          <CardContent className="p-0">
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
                  {users.map((user, index) => (
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
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-300 hover:text-white hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UsersSection;
