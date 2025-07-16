import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'



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

export const deleteUser = createApi({
    reducerPath:'deleteUser',
    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:5678',
        prepareHeaders:(headers)=>{
            const adminToken = localStorage.getItem('adminToken')??null
            headers.set('Authorization',`Bearer ${adminToken}`)
            return headers
        }
    }),
    endpoints:(builder)=>({
        // const adminToken = localStorage.getItem('adminToken')
        removeUser:builder.mutation({
            query:(formData)=>({
                url:'/admin/deleteUser',
                method:'DELETE',
                body:formData,
                headers:{'Authorization':`Bearer ${localStorage.getItem("adminToken")}`}
            })
        })
    })
})

export const editUser = createApi({
    reducerPath:'editUser',
    baseQuery
})


export const {useSignInAdminMutation}  = adminSignInApi
export const {useVerifyAdminJwtQuery}  = isAdminJwtValid
export const {useGetAllUsersDataQuery} = getUsersData
export const {useRemoveUserMutation} = deleteUser
