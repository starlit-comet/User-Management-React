import {createSlice} from '@reduxjs/toolkit'

const userSlice= createSlice({
    name:'userSlice',
    initialState:{
        token:localStorage.getItem('userToken')||null,
        
    },
    reducers:{
        setUserToken:(state,action)=>{
            state.token = action.payload
            localStorage.setItem('userToken',action.payload)
            
        },
        userLogout:(state)=>{
            state.token=null
            localStorage.removeItem('userToken')
        }
    }
})

export const{setUserToken,userLogout} = userSlice.actions
export default userSlice.reducer