import { HandleValidateEmployeeForm } from "./HandleValidateEmployeeForm";
import toast from "react-hot-toast";
import { CreateEmployee } from "../Services/CreateEmployee.Services";
import { EditEmployee } from "../Services/EditEmployee.Services";
export const HandleConfirmEmployee = async (
  formData,
  setErrorMsg,
  errorMsg,
  type,
  setLoading,
  store_Id,
  setEmployeeAdded,
  setEmployeeDetails
) => {
  if (!HandleValidateEmployeeForm(formData, setErrorMsg, errorMsg)) {
    return;
  }
 

  let result = "";

  if (type === "Add") {
    result = await CreateEmployee(formData, setLoading, store_Id);
  } else {
    result = await EditEmployee(formData, setLoading, store_Id);
  }
  if (result?.employee_id) {
    setEmployeeDetails(result);
    setEmployeeAdded(true)
    
  }else{
    toast.error(result)
  }
};
