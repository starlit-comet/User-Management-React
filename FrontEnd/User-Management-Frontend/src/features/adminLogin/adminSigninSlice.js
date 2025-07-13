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



export const isAdminJwtValid=createApi({
    reducerPath:'isAdminJwtValid',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5678',
        prepareHeaders:(headers)=>{
            const adminToken = localStorage.getItem('adminToken');
            if(adminToken){
                headers.set('Authorization',`Bearer ${adminToken}`)
            }
            return headers
        }
    }),
    endpoints:(builder)=>({
        verifyAdminJwt:builder.query({
            query:()=>'/admin/verifyJwt'
        })
    })
})

export const getUsersData = createApi({
    reducerPath:'getUsersData',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5678',
        prepareHeaders:(headers)=>{
            const adminToken = localStorage.getItem('adminToken')??null
            headers.set('Authorization',`Bearer ${adminToken}`)
            return headers
        }
        
    }),
    endpoints:(builder)=>({
        getAllUsersData:builder.query({
            query:()=>'/admin/getUsersData'
        })
    })
})

export const {useSignInAdminMutation} = adminSignInApi
export const {useVerifyAdminJwtQuery} = isAdminJwtValid
export const {useGetAllUsersDataQuery} = getUsersData
