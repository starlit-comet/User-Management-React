import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'signState',
    initialState:{
        value:'Sign In'
    },
    reducers:{
        changeToSignUp:(state)=>{
            state.value='Sign Up'
        },
        changeToSignIn:(state)=>{
            state.value='Sign In'
        }
    }
})

export const {changeToSignIn,changeToSignUp} = authSlice.actions
export default authSlice.reducer