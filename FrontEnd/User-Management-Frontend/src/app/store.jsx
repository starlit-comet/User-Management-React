import { configureStore } from '@reduxjs/toolkit'
import authStateReducer from '../features/jwt/authSlice'
import userStateReducer from '../features/jwt/userJwtSlice'
import signStateReducer from '../features/user_log_page/credentialsSlice'
import { userSignUpApi,userSignInApi,userProfilePicUploadApi } from '@/features/user_log_page/userLogApiSlice'
import { adminSignInApi,isAdminJwtValid,getUsersData, } from '@/features/adminLogin/adminSigninSlice'
export default configureStore({
  reducer: {
    signState:signStateReducer,
    authState:authStateReducer,
    userState:userStateReducer,
    [userSignUpApi.reducerPath]:userSignUpApi.reducer,
    [userSignInApi.reducerPath]:userSignInApi.reducer,
    [adminSignInApi.reducerPath]:adminSignInApi.reducer,
    [isAdminJwtValid.reducerPath]:isAdminJwtValid.reducer,
    [getUsersData.reducerPath]:getUsersData.reducer,
    [userProfilePicUploadApi.reducerPath]:userProfilePicUploadApi.reducer

  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
          .concat(userSignUpApi.middleware)
          .concat(userSignInApi.middleware)
          .concat(adminSignInApi.middleware)
          .concat(isAdminJwtValid.middleware)
          .concat(getUsersData.middleware)
          .concat(userProfilePicUploadApi.middleware)
})

