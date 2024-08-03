import React, { useEffect, useState } from "react";
import { ItemsService } from "../../Services/Items.Services";
import BillingSection from "../Local/SingleOrder/BillingSection";
import SelectItemsSection from "../Local/SingleOrder/SelectItemsSection";
import Spinner from "./Spinner";

const SingleOrder = ({ userDetails, setUserDetails }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem("categoriesData");
      if (data && data !== "undefined") {
        setCategoriesData(JSON.parse(data));
      } else {
        const result = await ItemsService(setLoading);
        if (result) {
          const data = localStorage.getItem("categoriesData");
          if (data && data !== "undefined") {
            setCategoriesData(JSON.parse(data));
          }
        }
      }
      const userData = localStorage.getItem("userDetails");
      if (userData && userData !== "undefined") {
        setUserDetails(JSON.parse(userData));
      }

      const cartData = localStorage.getItem("OrderItems");
      if (cartData && cartData !== "undefined") {
        setCartItems(JSON.parse(cartData));
      }
    };
    fetchData();
  }, [setUserDetails]);
  return (
    <div className="">
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex py-4 items-start bg-gray-100 justify-between">
          <div className="w-[60%] flex flex-col items-start p-6">
            <SelectItemsSection
              categoriesData={categoriesData}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          </div>
          <div className="w-[40%] bg-gray-200">
            <BillingSection cartItems={cartItems} setCartItems={setCartItems} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleOrder;
