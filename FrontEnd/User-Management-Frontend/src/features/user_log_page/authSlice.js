import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'signState',
    initialState:{
        value:'Sign Up',
        showPassword:false,
        showConfirmPassword:false,
       
    },
    reducers:{
        changeToSignUp:(state)=>{
            state.value='Sign Up'
        },
        changeToSignIn:(state)=>{
            state.value='Sign In'
        },
        toggleShowPassword:(state)=>{
            state.showPassword=!state.showPassword
        },
        toggleShowConfirmPassword:(state)=>{
            state.showConfirmPassword=!state.showConfirmPassword
        },

    }
})

export const {changeToSignIn,changeToSignUp,toggleShowPassword,toggleShowConfirmPassword} = authSlice.actions
export default authSlice.reducer