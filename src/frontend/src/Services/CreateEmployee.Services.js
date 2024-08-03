import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../Constant/Global/BaseUrl.Constant";

export const CreateEmployee = async (formData, setLoading) => {
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    setLoading(true);
    const apibody = {};
    apibody["name"] = formData.Name;
    apibody["storeId"] = parseInt(userData.employee.store_id);
    apibody["password"] = formData.Password;
    apibody["position"] = formData.Role;
    apibody["salary"] = parseInt(formData.Salary);
    apibody["managerId"] = userData.employee.employee_id;

    const response = await axios.post(
      `${baseUrl}/picafepos/api/v1/employees`,
      apibody
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
        toast.error("Invalid input data");
      } else if (error.response.status === 401) {
        toast.error("Unauthorized access");
      } else if (error.response.status === 500) {
        toast.error("Unexpected server error");
      } else {
        toast.error("An error occurred");
      }
    } else {
      toast.error(error.message);
    }
    return error.message;
  } finally {
    setLoading(false);
  }
};
