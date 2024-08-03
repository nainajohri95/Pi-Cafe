import axios from 'axios';
import { baseUrl } from '../Constant/Global/BaseUrl.Constant';
import toast from 'react-hot-toast';
export const ItemsService = async (setLoading) => {
  try {
    if(setLoading){
      setLoading(true);
    }
   const response = await axios.get(baseUrl + '/picafepos/api/v1/categories/items');
   if(response.status === 200){
    localStorage.setItem("categoriesData", JSON.stringify(response.data));
    return true
   }

  } catch (error) {
      toast.error("Something went wrong while fetching items data");
      return false;
  } finally {
    if(setLoading){
      setLoading(false);
    }
  }
};
