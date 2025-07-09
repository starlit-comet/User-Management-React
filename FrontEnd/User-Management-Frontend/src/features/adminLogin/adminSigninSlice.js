import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const adminSignInApi = createApi({
    reducerPath:'adminSignInApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5678'}),
    endpoints:(builder)=>({
        signInAdmin:builder.mutation({
            query:(formData)=>({
                url:'/admin/login',
                method:'POST',
                body:formData,
                headers:{
                    'Content-Type' :'application/json'
                }
            })
        })
    })
})

export const {useSignInAdminMutation} = adminSignInApi