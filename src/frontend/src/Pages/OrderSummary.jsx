import React, { useEffect, useState } from "react";
import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Component/Global/Navbar"));
const CustomerDetails = lazy(() =>
  import("../Component/Local/OrderSummary/CustomerDetails")
);
const OrderModes = lazy(()=>import("../Component/Local/OrderSummary/OrderModes"))
const Summary = lazy(()=>import("../Component/Local/OrderSummary/Summary"))

const OrderSummary = ({ userDetails, setUserDetails }) => {
  const navigate = useNavigate();
  const [selectedTip, setSelectedTip] = useState("")
  const [errorMsg, setErrorMsg] = useState({ custName: "", custEmail: "" });
  const [order, setOrder] = useState({
    price: "",
    orderMode: "",
    name: "",
    email: "",
    storeId: "",
    date: "",
    items: {},
  });
  const orderModes = [{type: "Dine_in"}, {type: "Take_away"}, {type: "Delivery"}]
  const tipOptions = [10, 20, 30];
  useEffect(() => {
    const fetchData = async () => {
      const userData = localStorage.getItem("userDetails");
      if (userData && userData !== "undefined") {
        const userDetails = JSON.parse(userData)
        setOrder((order) => ({
          ...order,
          storeId: userDetails?.employee?.store_id,
        }));
      }else{
        navigate('/')
      }
    };
    fetchData();
  }, [navigate]);
  return (
    <Suspense
      fallback={
        <div className="bg-gray-200 text-lg font-medium text-gray-900 flex items-center w-full h-full justify-center">
          Loading...
        </div>
      }
    >
      <Navbar setUserDetails={setUserDetails} userDetails={userDetails} />
      <div className="flex py-4 min-h-screen items-start bg-gray-100 justify-between">
        <div className="w-[55%] flex flex-col items-start p-6">
          <CustomerDetails order={order} setOrder={setOrder} errorMsg={errorMsg}/>
           <div className="mt-10 w-full">
             <OrderModes orderModes={orderModes} setOrder={setOrder} order={order}/>
            <div className="w-full">
             <div className="flex w-[80%] items-center justify-between"> <p className="text-xl text-secondary font-medium">Add Tip(Optional)</p><p onClick={()=>setSelectedTip("")} className="cursor-pointer hover:scale-105 hover:bg-gray-300 border rounded-lg text-xl border-secondary py-2 px-4 font-medium text-secondary">Clear</p></div>
              <div className="flex mt-5 flex-wrap gap-3 w-full  space-x-11  justify-start">
               {
                tipOptions && tipOptions?.map((tip, ind)=>(
                  <div key={ind} className="flex space-x-3 items-center">
                    <div onClick={()=>setSelectedTip(tip)} className={`${selectedTip === tip ? 'bg-gray-400' : 'bg-none'} w-5 h-5 rounded-full cursor-pointer border border-gray-500`}></div>
                    <p className="text-gray-500 font-medium text-2xl">{tip}%</p>
                  </div>
                ))
               }
              </div>
            </div>
           </div>
        </div>
        <div className="w-[45%]">
          <Summary setErrorMsg={setErrorMsg} errorMsg={errorMsg} order={order} setOrder={setOrder} selectedTip={selectedTip}/>
        </div>
      </div>
    </Suspense>
  );
};

export default OrderSummary;
