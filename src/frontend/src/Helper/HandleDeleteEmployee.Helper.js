import { LoginService } from "../Services/Login.Services";
import {DeleteEmployee} from "../Services/DeleteEmployee.Services"
import toast from "react-hot-toast";
export const HandleDeleteEmployee = async (
  setErrorMsg,
  password,
  employeeId,
  setLoading,
  userId,
  setDeleted
) => {
  if (!password || password.length < 6) {
    setErrorMsg("Enter valid password");
    return;
  } else {
    setErrorMsg("");
  }
//  to check if user is verified
  const result = await LoginService(userId, password, setLoading);
  if (result) {
    setErrorMsg("");
    const response = await DeleteEmployee(employeeId, setLoading);
    if (response === true) {
      setDeleted(true);
    } else {
      toast.error(response);
    }
  } else {
    setErrorMsg("Invalid password, kindly enter correct password");
  }
};