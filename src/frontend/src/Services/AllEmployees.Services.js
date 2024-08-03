import axios from "axios";
import { baseUrl } from "../Constant/Global/BaseUrl.Constant";
import toast from "react-hot-toast";

export const AllEmployees = async (storeId, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(
      baseUrl + `/picafepos/api/v1/employees/store?store=${storeId}`,
      
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    if (error.response.status === 400) {
      toast.error("Malformed or invalid request format");
    } else if (error.response.status === 500) {
      toast.error("Unexpected server error");
    } else {
      toast.error("Something went wrong");
    }
    return error.message || error;
  } finally {
    setLoading(false);
  }
};