import axios from "axios";
import { baseUrl } from "../Constant/Global/BaseUrl.Constant";

export const DeleteEmployee = async(employeeId, setLoading)=>{
    try {
        setLoading(true);
    
        const response = await axios.delete(
          baseUrl + `/picafepos/api/v1/employees/delete?employeeId=${employeeId}`,
        );
        if (response.status === 200) {
           return true
        }
      } catch (error) {
        if (error.response.status === 400) {
          return "Invalid request"
        } else if (error.response.status === 500) {
          return "Unexpected server error"
        } else {
         return "Something went wrong"
        }
      } finally {
        setLoading(false);
      }
 }