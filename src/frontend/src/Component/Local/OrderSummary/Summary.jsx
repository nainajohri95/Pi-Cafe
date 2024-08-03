import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleProceedToPay } from "../../../Helper/HandleProceedToPay.Helper";
import ItemQuantityCard from "../../Global/ItemQuantityCard";
import ActionButton from "../../Global/ActionButton";
import OrderModal from "./OrderModal";

const Summary = ({ setErrorMsg, errorMsg, order, setOrder, selectedTip }) => {
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  const [itemTotal, setItemTotal] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const cartData = localStorage.getItem("OrderItems");
    if (cartData && cartData !== "undefined") {
      setOrderItems(JSON.parse(cartData));
    }else{
      navigate('/')
    }

    const totalAmount = localStorage.getItem("totalAmount");
    if (totalAmount && totalAmount !== "undefined") {
      setItemTotal(JSON.parse(totalAmount));
    }
  }, [navigate]);

  useEffect(() => {
    const gstRate = 0.05; // 5% GST
    const gstAmount = itemTotal * gstRate;
    const tipAmount = itemTotal * (selectedTip / 100);
    const totalAmount = itemTotal + gstAmount + tipAmount;
    const netAmount = totalAmount.toFixed(2);
    setOrder((order) => ({ ...order, price: parseFloat(netAmount) }));
  }, [itemTotal, selectedTip, setOrder]);
  return (
    <>
      <div className="rounded-lg p-9 bg-white shadow-lg h-[100vh]">
        <h1 className="text-secondary lg:text-3xl text-xl font-semibold">
          Order Summary
        </h1>
        <div className=" flex flex-col w-full mt-5">
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
            className="flex h-[30vh]  flex-col w-full mt-5"
          >
            {orderItems?.map((item, ind) => (
              <ItemQuantityCard
                itemDetails={item}
                cartItems={orderItems}
                disabledUpdateQuantity={true}
                key={ind}
              />
            ))}
          </div>

          {/* billing details */}
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
            className="flex h-[30vh] flex-col w-full mt-10"
          >
            <h1 className="text-secondary lg:text-3xl text-xl mb-3 font-semibold">
              Billing Details
            </h1>
            <div className="flex flex-row my-[6px] items-center w-full justify-between">
              <p className="text-secondary font-medium text-xl">Item Total</p>
              <p className="text-secondary font-medium text-xl">₹{itemTotal}</p>
            </div>
            <div className="flex flex-row  my-[6px] items-center w-full justify-between">
              <p className="text-secondary font-medium text-xl">
                GST(inclusive all taxes)
              </p>
              <p className="text-secondary font-medium text-xl">5%</p>
            </div>
            {selectedTip && (
              <div className="flex flex-row my-[6px] items-center w-full justify-between">
                <p className="text-secondary font-medium text-xl">Tip added</p>
                <p className="text-secondary font-medium text-xl">
                  {selectedTip}%
                </p>
              </div>
            )}
            <hr className="w-full border-none my-5 h-[2px] bg-gray-400" />
            <div className="flex flex-row  my-[6px] items-center w-full justify-between">
              <p className="text-secondary font-medium text-2xl">Net Amount</p>
              <p className="text-secondary font-medium text-2xl">
                ₹{order?.price}
              </p>
            </div>
          </div>
          <div className="w-full mt-4 mb-5 flex lg:flex-row flex-col items-center lg:justify-between space-y-5 lg:space-y-0">
            <div className=" lg:w-[45%] w-full">
              {" "}
              <ActionButton
                onClickButton={() => navigate("/")}
                text={"Go Back"}
              />
            </div>
            <div className="lg:w-[45%] w-full">
              {" "}
              <ActionButton
                onClickButton={() =>
                  HandleProceedToPay({
                    order,
                    setErrorMsg,
                    errorMsg,
                    setOpenModal,
                  })
                }
                text={"Proceed to pay"}
              />
            </div>
          </div>
        </div>
      </div>
      {
        <OrderModal
          orderItems={orderItems}
          order={order}
          setOrder={setOrder}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      }
    </>
  );
};

export default Summary;
