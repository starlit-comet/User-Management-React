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

export const userProfilePicUploadApi = createApi({
    reducerPath:'userProfilePicUploadApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:5678'}),
    endpoints:(builder)=>({
        addProfilePic:builder.mutation({
            query:(formData)=>({
                url:'/user/upload/profileImage',
                method:'POST',
                body:formData,
                headers:{
                    'Authorization':`bearer ${localStorage.getItem('userToken')??undefined}`
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
                method:'GET',
                // body:formData.append(localStorage.getItem('userToken')||null),
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':`bearer ${localStorage.getItem('userToken')||''}`
                }
            })
        })
    })
})

export const {useCreateUserMutation} = userSignUpApi
export const {useSignInUserMutation} = userSignInApi
export const {useJwtAuthUserMutation} = isUserJwtValid
export const{useAddProfilePicMutation} = userProfilePicUploadApi



// import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query";

// export const userApi = createApi({
//     reducerPath:'userApi',
//     baseQuery:fetchBaseQuery({
//         baseUrl:'http://localhost:5678',
//         prepareHeaders:(headers)=>{
//             const token = localStorage.getItem('userToken')
//             if(token){
//                 headers.set('Authorization',`Bearer ${token}`)
//             }
//             return headers
//         }
//     }),
//     endpoints:(builder)=>({
//         createUser:builder.mutation({
//             query:(formData)=>({
//                 url:'/user/signup',
//                 method:'POST',
//                 body:formData,
//             })
//         }),
//         signInUser:builder.mutation({
//             query:(formData)=>({
//                 url:'/user/login',
//                 method:"POST",
//                 body:formData
//             })
//         }),
//         addProfilePic:builder.mutation({
//             query:(formData)=>({
//                 url:'/user/upload/profileImage',
//                 method:'POST',
//                 body:formData
//             })
//         }),
//         isJwtValid:builder.query({
//             query:()=>({
//                 url:'/user/jwtCheck',
//                 method:"GET"
//             })
//         })
//     })
// })

// export  const {
//     useCreateUserMutation,
//     useSignInUserMutation,
//     useAddProfilePicMutation,
//     useIsJwtValidQuery,
// } = userApi

// export default  userApi