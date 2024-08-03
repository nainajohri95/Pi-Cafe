import toast from 'react-hot-toast';

export const HandleProceedToPay = ({order, setErrorMsg, errorMsg, setOpenModal})=>{
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const nameRegex = /^(?!\s*$)[a-zA-Z]+([ '-][a-zA-Z]+)*$/;
    const updatedErrorMsg = { ...errorMsg };
  if (!order?.name) {
    updatedErrorMsg.custName = "Customer name is required";
  } else if (!nameRegex.test(order.name)) {
    updatedErrorMsg.custName = "Enter valid name";
  } else {
    updatedErrorMsg.custName = "";
  }
  if (!order?.email) {
    updatedErrorMsg.custEmail = "Customer Email is required";
  } else if (!emailRegex.test(order.email)) {
    updatedErrorMsg.custEmail = "kindly enter valid email address";
  } else {
    updatedErrorMsg.custEmail = "";
  }
  setErrorMsg(updatedErrorMsg);

  if(updatedErrorMsg?.custName || updatedErrorMsg?.custEmail){
    return;
  }

  if(!order?.orderMode){
    toast.error("kindly select order mode");
    return;
  }


  setOpenModal(true)
}