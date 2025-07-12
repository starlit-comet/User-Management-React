import { createSlice } from "@reduxjs/toolkit";

const signIn_SignUp_Slice = createSlice({
    name:'signState',
    initialState:{
        value:'Sign In',
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

const userDetailsSlice = createSlice({
    name:'userDetails',
    initialState:{
        name:'',
        email:'',
        profileImage:'',
        mobile:'',
        isBlocked:''
    },
    reducers:{
        
    }
})

export const {changeToSignIn,changeToSignUp,toggleShowPassword,toggleShowConfirmPassword} = signIn_SignUp_Slice.actions



export default signIn_SignUp_Slice.reducer
