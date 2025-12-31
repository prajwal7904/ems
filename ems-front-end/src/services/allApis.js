import { BASE_URL } from "./base_url";
import { commonRequest } from "./commonRqst";

// Register a new employee
export const empRegister = async (body,header) => {
  return commonRequest("POST", `${BASE_URL}/employee/register`,body,header);
};

// getallusers api
export const getusers = async (searchKey)=>{
 return await commonRequest("GET",`${BASE_URL}/employee/get-all-employee-details?search=${searchKey}`,"")
}
export const getauser = async (id)=>{
  return await commonRequest("GET",`${BASE_URL}/profile/getauser?id=${id}`,"")
}

export const removeUser = async (id)=>{
  return await commonRequest("DELETE",`${BASE_URL}/employee/delete-user/${id}`,{})
}
export const updateUser =async (id,body,header)=>{
  return await commonRequest("PUT",`${BASE_URL}/employee/update/${id}`,body,header)
}
 