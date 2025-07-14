import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token: localStorage.getItem('adminToken')|| null,
        isAuthenticated :false,
        adminName:'',
        adminEmail:'',
        adminPhone:'',

    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
            localStorage.setItem('adminToken',action.payload)
            state.isAuthenticated=true;
        },
        setAdminDetails:(state,action)=>{
            console.log(action.payload,'auth slice admin data')
            state.adminEmail=action.payload.adminEmail
            state.adminName=action.payload.adminName
            state.adminPhone=action.payload.adminPhone
        },
        logout:(state)=>{
            state.token=null;
            localStorage.removeItem('adminToken')
            state.isAuthenticated=false
        }
    }
})

export const {setToken,logout,setAdminDetails} = authSlice.actions
export default authSlice.reducer