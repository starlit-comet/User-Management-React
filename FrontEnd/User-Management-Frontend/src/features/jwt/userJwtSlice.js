import {createSlice} from '@reduxjs/toolkit'
const emptyUserDetails={
    userName:'',
        userEmail:'',
        userPic:'',
        isUserBlocked:false,
        userMobile:'',
        token:null
}
const userSlice= createSlice({
    name:'userSlice',
    initialState:{
        token:localStorage.getItem('userToken')||null,
        userName:'',
        userEmail:'',
        userPic:'',
        isUserBlocked:false,
        userMobile:'',
        
    },
    reducers:{
        setUserToken:(state,action)=>{
            state.token = action.payload
            localStorage.setItem('userToken',action.payload)
            
        },
        userLogout:(state)=>{
            state.userName=''
            state.userEmail=''
            state.userPic=''
            state.isUserBlocked=false
            state.userMobile=''
            state.token=''
            localStorage.removeItem('userToken')
        },
        setUserDetails:(state,action)=>{
            const{email,name,phone,isBlocked,pic} = action.payload
            state.userName=name
            state.userEmail=email
            state.userPic=pic
            state.isUserBlocked=isBlocked
            state.userMobile=phone
        },
    }
})

export const{setUserToken,userLogout,setUserDetails} = userSlice.actions
export default userSlice.reducer