import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{
        token: localStorage.getItem('adminToken')|| null,
        isAuthenticated :false
    },
    reducers:{
        setToken:(state,action)=>{
            state.token=action.payload
            localStorage.setItem('adminToken',action.payload)
            state.isAuthenticated=true;
        },
        logout:(state)=>{
            state.token=null;
            localStorage.removeItem('adminToken')
            state.isAuthenticated=false
        }
    }
})

export const {setToken,logout} = authSlice.actions
export default authSlice.reducer