import { LoginService } from "../Services/Login.Services";

export const HandleLogin = async({
  employeeId,
  password,
  errorMsg,
  setErrorMsg,
  setUserDetails,
  setLoading,
}) => {
  // validation
  const updatedErrorMsg = { ...errorMsg };
  if (!employeeId) {
    updatedErrorMsg.employeeId = "Please enter your employee ID";
  } else {
    updatedErrorMsg.employeeId = "";
  }
  if (!password) {
    updatedErrorMsg.password = "Please enter your password";
  } else if (password.length < 10) {
    updatedErrorMsg.password = "Password must be at least 10 characters long";
  } else {
    updatedErrorMsg.password = "";
  }
  setErrorMsg(updatedErrorMsg);
  if (!updatedErrorMsg?.employeeId && !updatedErrorMsg?.password) {
    // calling login api
    const result = await LoginService(
      employeeId,
      password,
      setLoading
    );
    if (result) {
      localStorage.setItem(
        "userDetails",
        JSON.stringify(result)
      );
      setUserDetails(result);
    } 
  } else {
    return false;
  }
};