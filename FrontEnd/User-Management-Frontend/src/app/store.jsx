import { configureStore } from '@reduxjs/toolkit'
import signStateReducer from '../features/user_log_page/authSlice'
import counterReducer from '../features/counter/counterSlice'
import { userSignUpApi,userSignInApi } from '@/features/user_log_page/userLogApiSlice'
export default configureStore({
  reducer: {
    signState:signStateReducer,
    [userSignUpApi.reducerPath]:userSignUpApi.reducer,
    [userSignInApi.reducerPath]:userSignInApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware()
          .concat(userSignUpApi.middleware)
          .concat(userSignInApi.middleware)
})

