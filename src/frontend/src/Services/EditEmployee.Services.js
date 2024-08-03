import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../Constant/Global/BaseUrl.Constant";

export const EditEmployee = async (formData, setLoading, store_Id) => {
  const userData = JSON.parse(localStorage.getItem("userDetails"));
  try {
    setLoading(true);
    const apibody = {};
    apibody["name"] = formData.Name;
    apibody["password"] = formData.Password;
    apibody["salary"] = parseInt(formData.Salary);
    apibody["manager_id"] = userData.employee.employee_id;

    const response = await axios.put(
      `${baseUrl}/picafepos/api/v1/employees/edit/${formData.EmpId}`,
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
