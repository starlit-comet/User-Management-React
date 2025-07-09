import { configureStore } from '@reduxjs/toolkit'
import signStateReducer from '../features/user_log_page/credentialsSlice'
import { userSignUpApi,userSignInApi } from '@/features/user_log_page/userLogApiSlice'
import { adminSignInApi } from '@/features/adminLogin/adminSigninSlice'
export default configureStore({
  reducer: {
    signState:signStateReducer,
    [userSignUpApi.reducerPath]:userSignUpApi.reducer,
    [userSignInApi.reducerPath]:userSignInApi.reducer,
    [adminSignInApi.reducerPath]:adminSignInApi.reducer,

  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
          .concat(userSignUpApi.middleware)
          .concat(userSignInApi.middleware)
          .concat(adminSignInApi.middleware)
})

