import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Global/Navbar";
import OrderHistoryDetails from "../Component/Local/OrderHistory/OrderHistoryDetails";
import { GetOrders } from "../Services/GetOrders.Services";
import { HandleFormatReadableDate } from "../Helper/HandleFormatReadableDate";
import Spinner from "../Component/Global/Spinner";


function OrderHistory({userDetails, setUserDetails}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [ordersData, setOrdersData] = useState([])
  useEffect(() => {
    const fetchData = async()=>{
      const userData = localStorage.getItem("userDetails")
      if (!userData || userData === "undefined") {
        navigate("/");
      }else{
        const parsedData = JSON.parse(userData)
        setUserDetails(parsedData);
        const data = await GetOrders(setLoading, parsedData?.employee?.store_id)
        setOrdersData(data)
      }
    }
   fetchData();
  }, [navigate, setUserDetails]);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <Navbar userDetails={userDetails} setUserDetails={setUserDetails}/>
      <div className="max-w-6xl w-full bg-white shadow-md rounded-lg p-12 mt-10 mb-10">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold">Order History</h1>
          <p className="text-gray-600 mt-2 mb-10 text-lg font-medium ">{HandleFormatReadableDate(new Date())}</p>
        </div>
       {
        loading ? <Spinner></Spinner> :  <div className="flex justify-center">
        <OrderHistoryDetails orderHistoryData={ordersData?.orders} />{" "}
      </div>
       }
      </div>
    </div>
  );
}

export default OrderHistory;