import { serverURL } from "./serverURL";
import commonAPI from "./commonAPI"

// Register
export const registerAPI = async(reqBody) =>{
    return await commonAPI('POST', `${serverURL}/api/register`, reqBody,{})
}

// Login
export const loginAPI = async(reqBody) =>{
    return await commonAPI('POST', `${serverURL}/api/login`, reqBody,{})
}

// google login
export const GoogleloginAPI = async(reqBody) =>{
    return await commonAPI('POST', `${serverURL}/api/google-auth`, reqBody,{})
}


// Add post
export const AddPostAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addPost`, reqBody, reqHeader)
}

// Get all post
export const AllPostAPI = async(searchKey, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/allPosts?search=${searchKey}`, {}, reqHeader)
}

// get profile posts
export const ProfilePostAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/profilePost`, {}, reqHeader)
}

// like
export const likePostAPI = async(postId, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/likepost/${postId}`, {}, reqHeader)
}

// add comment
export const AddCommentAPI = async(postId, commentData, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/comment/${postId}`, commentData, reqHeader)
}

// Get a pirticular post
export const getAPostAPI = async(id,reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/projectDetails/${id}`, {}, reqHeader)
}

// add Job
export const AddJobAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/addJob`, reqBody, reqHeader)
}

// get all jobs
export const AllJobsAPI = async(searchKey, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/allJobs?search=${searchKey}`, {}, reqHeader)
}

// get jobs for company profile
export const CompanyJobsAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/companyJobs`, {}, reqHeader)
}

// delete jobs
export const DeleteJobsAPI = async(id, reqHeader) =>{
    return await commonAPI('DELETE', `${serverURL}/api/deleteJob/${id}`, {}, reqHeader)
}

// get all jobs - admin
export const AllJobsAdminAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/admin/Jobs`, {}, reqHeader)
}

// get all companies - admin
export const AllCompaniesAdminAPI = async(reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/admin/Companies`, {}, reqHeader)
}

// make payment
export const makePaymentAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('POST', `${serverURL}/api/makePayment`, reqBody, reqHeader)
}

// get user data
export const getUserAPI = async(id, reqHeader) =>{
    return await commonAPI('GET', `${serverURL}/api/user/${id}`, {}, reqHeader)
}

// update user profile
export const updateUserAPI = async(reqBody, reqHeader) =>{
    return await commonAPI('PUT',`${serverURL}/api/updateProfile`, reqBody, reqHeader)
}