import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../Constant/Global/BaseUrl.Constant";

export const SubmitFeedback = async (orderId, customerFeedback, setLoading) => {
  try {
    setLoading(true);

    const requestBody = {
      orderId: parseInt(orderId),
      ratings: customerFeedback,
    };

    const response = await axios.post(
      `${baseUrl}/picafepos/api/v1/orders/feedback`,
      requestBody
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        toast.error("Unauthorized access");
      } else if (error.response.status === 404) {
        toast.error("Order with specified ID not found");
      } else if (error.response.status === 500) {
        toast.error("Unexpected server error");
      } else {
        toast.error("An error occurred");
      }
    } else {
      toast.error("something went wrong");
    }
    return error.message;
  } finally {
    setLoading(false);
  }
};
