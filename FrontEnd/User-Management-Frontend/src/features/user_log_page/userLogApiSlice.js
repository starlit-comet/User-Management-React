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

export const {useCreateUserMutation} = userSignUpApi