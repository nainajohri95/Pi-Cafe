import {baseUrl} from "../Constant/Global/BaseUrl.Constant"
import axios from 'axios';
import toast from "react-hot-toast"

export const LoginService = async (
  employeeId,
  password,
  setLoading
) => {
  try {
    setLoading(true);
    //api call will be implemented here
    const body = { employeeId, password };
    const response = await axios.post(baseUrl + '/pos/api/login', body);

   if(response.status === 200){
    toast.success("Login successful")
    return response.data;
   }
  } catch (error) {
     if(error.response.status === 401){
      toast.error("Unauthorized user");
     }else{
      toast.error("Something went wrong")
     }
    return false;
  } finally {
    setLoading(false);
  }
};