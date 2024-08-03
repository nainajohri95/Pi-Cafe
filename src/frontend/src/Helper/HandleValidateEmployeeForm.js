export const HandleValidateEmployeeForm = (formData, setErrorMsg, errorMsg)=>{
    const updatedErrorMsg = {...errorMsg}
    const nameRegex = /^(?!\s*$)[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    if(!formData?.Name){
        updatedErrorMsg.Name = "kindly enter employee's Name"
    }else if (!nameRegex.test(formData.Name)){
        updatedErrorMsg.Name =  "Enter valid name"
    }else{
        updatedErrorMsg.Name = ""
    }
    if(!formData?.Salary){
        updatedErrorMsg.Salary = "Kindly enter employee's Salary"
    }else if(parseInt(formData?.Salary) <= 0){
        updatedErrorMsg.Salary = "Enter valid amount"
    }else if(parseInt(formData?.Salary )> 40000){
        updatedErrorMsg.Salary="Salary cannot be greater than 40000"
    }else{
        updatedErrorMsg.Salary = ""
    }
    if(!formData?.Password){
        updatedErrorMsg.Password = "Kindly enter employee's Password"
    }else if(formData?.Password?.length < 10){
        updatedErrorMsg.Password = "Password too short, must be of atleast 10 characters "
    }else{
       updatedErrorMsg.Password = ""
    }

    setErrorMsg(updatedErrorMsg)

    if (Object.values(updatedErrorMsg).some(value => value !== "")) {
        return false;
    }   
     return true
}