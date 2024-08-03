import toast from "react-hot-toast";
import { AllEmployees } from "../Services/AllEmployees.Services";
export const HandleGetAllEmployees = async(storeId, setLoading)=>{
  if(!storeId){
    toast.error("something went wrong, store id not found");
    return null;
  }

  const result = await AllEmployees(storeId, setLoading)
  return result;


  
}