import toast from "react-hot-toast";
import { SubmitFeedback } from "../Services/SubmitFeedback.Services";

export const HandleSubmitFeedback = async (
  customerFeedback,
  orderId,
  setLoading,
  navigate
) => {
  if (Object.values(customerFeedback).some((value) => value === 0)) {
    toast.error(`Kindly fill the full feedback form`);
    return;
  }

  const result = await SubmitFeedback(orderId, customerFeedback, setLoading);
  if (result?.order_id) {
    toast.success("Feedback submitted successfully");
    navigate("/");
  } 
};