import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ItemQuantityCard from "../../Global/ItemQuantityCard";
import ActionButton from "../../Global/ActionButton";

const BillingSection = ({ cartItems, setCartItems }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const amount = cartItems?.reduce((accumulator, item) => {
      return accumulator + (item?.price * item?.quantity || 0);
    }, 0);
    const roundedAmount = parseFloat(amount.toFixed(2));
    setTotalAmount(roundedAmount);
  }, [cartItems]);

  const handleConfirmOrder = () => {
    if (cartItems?.length === 0) {
      toast.error("kindly add items in cart");
      return;
    }
    localStorage.setItem("OrderItems", JSON.stringify(cartItems));
    localStorage.setItem("totalAmount", totalAmount);
    navigate("/order-summary");
  };
  return (
    <div className="h-[100vh] rounded-lg p-9 bg-white shadow-lg">
      <h1 className="text-secondary text-2xl font-semibold">Billing Section</h1>
      {cartItems?.length > 0 ? (
        <div
          style={{
            overflowY: "scroll",
            flex: "none",
            flexWrap: "nowrap",
            msOverflowStyle: "none" /* Internet Explorer 10+ */,
            scrollbarWidth: "none" /* Firefox */,
            WebkitScrollbar: {
              display: "none" /* WebKit */,
            },
          }}
          className="flex h-[55vh] flex-col w-full mt-5"
        >
          {cartItems?.map((item, ind) => (
            <ItemQuantityCard
              itemDetails={item}
              cartItems={cartItems}
              setCartItems={setCartItems}
              key={ind}
            />
          ))}
        </div>
      ) : (
        <div className="h-[55vh]">
          <div className="flex bg-gray-300 mt-20 rounded-lg flex-col items-center px-3 justify-center w-full h-[200px]">
            <h1 className="text-2xl font-medium">No items added</h1>
            <p className="text-xl mt-2 font-normal text-center text-secondary">
              Kindly add items to generate an order
            </p>
          </div>
        </div>
      )}
      {cartItems?.length > 0 && (
        <div className="w-full mb-10 rounded-lg py-4 px-5 flex justify-between items-center bg-gray-300">
          <p className="text-secondary text-xl font-medium">Total Amount</p>
          <p className="text-secondary text-2xl font-medium">₹ {totalAmount}</p>
        </div>
      )}
      <div className="w-full mt-4 mb-5 flex lg:flex-row flex-col items-center lg:justify-between space-y-5 lg:space-y-0">
        <div className=" lg:w-[45%] w-full">
          {" "}
          <ActionButton
            onClickButton={() => {
              setCartItems([]);
              localStorage.removeItem("OrderItems");
              localStorage.removeItem("totalAmount");
            }}
            text={"Cancel"}
          />
        </div>
        <div className="lg:w-[45%] w-full">
          {" "}
          <ActionButton onClickButton={handleConfirmOrder} text={"Confirm"} />
        </div>
      </div>
    </div>
  );
};

export default BillingSection;
