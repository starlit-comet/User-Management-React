import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const userSignUpApi = createApi({
    reducerPath:'userSignUpApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5678'}),
    endpoints:(builder)=>({

        createUser:builder.mutation({
            query:(formData)=>({
                url:'/user/signup',
                method:'POST',
                body:formData,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        })
    })
})

export const userSignInApi = createApi({
    reducerPath:'userSignInApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5678'}),
    endpoints:(builder)=>({
        signInUser:builder.mutation({
            query:(formData)=>({
                url:'/user/login',
                method:'POST',
                body:formData,
                headers:{
                    'Content-Type' :'application/json'
                }
            })
        })
    })
})

export const isUserJwtValid = createApi({
    reducerPath:'isUserJwtValid',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5678'}),
    endpoints:(builder)=>({
        isJwtValid:builder.mutation({
            query:(formData)=>({
                url:'/user/jwtCheck',
                method:'POST',
                body:formData,
                headers:{
                    'Content-Type':'application/json'
                }
            })
        })
    })
})

export const {useCreateUserMutation} = userSignUpApi
export const {useSignInUserMutation} = userSignInApi
export const {useJwtAuthUserMutation} = isUserJwtValid