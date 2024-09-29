import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./serverUrl"

// register api - called by component auth
export const registerAPI = async (reqBody) =>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

// login api - called by component auth
export const loginAPI = async (reqBody) =>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

//add blog
export const addBlogAPI = async (reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-blog`,reqBody,reqHeader)
}

 //get all blogs
export const getAllBlogsAPI = async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-blogs?search=${searchKey}`,"",reqHeader)
}

//user blogs
export const getUserBlogsAPI = async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-blogs`,"",reqHeader)
}

//home blogs
export const getHomeBlogsAPI = async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-blogs`,"")
}
   
 //edit blog
export const editBlogAPI = async (blogId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-blog/${blogId}`,reqBody,reqHeader)
}

//remove blog
export const removeBlogAPI = async(blogId,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/remove-blog/${blogId}`,{},reqHeader)
}   

// get all users
export const getAllUsersAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-users`, "", reqHeader);
};

// Delete user API
export const deleteUserAPI = async (userId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVER_URL}/delete-user/${userId}`, {}, reqHeader);
}

//update user
export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}