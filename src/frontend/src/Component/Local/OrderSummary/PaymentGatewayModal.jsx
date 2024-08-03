import React from "react";
import { RxCross2 } from "react-icons/rx";
import { HandleGenerateOrder } from "../../../Helper/HandleGenerateOrder.Helper";
import ActionButton from "../../Global/ActionButton";

const PaymentGatewayModal = ({orderItems, order, setOrder, setModalType, setOpenModal, loading, setLoading, selectedPaymentType, setSelectedPaymentType, showError, setShowError }) => {
  const paymentOptions = ["Cash", "UPI", "Net Banking"];
 

  return (
      <div className="p-5">
        <div className="w-full justify-between flex items-start">
          <p className="text-xl font-medium text-secondary">
            Choose payment method
          </p>
          <RxCross2
            onClick={() => {
                setShowError("")
                setSelectedPaymentType("")
                setOpenModal(false)

            }}
            className="text-3xl text-secondary cursor-pointer"
          />
        </div>
        <div className="flex w-full mt-10 justify-between items-center">
          {paymentOptions &&
            paymentOptions?.map((payment, ind) => (
              <button
                key={ind}
                onClick={() => setSelectedPaymentType(payment)}
                className={`${
                  selectedPaymentType === payment ? "bg-gray-200" : "bg-none"
                } border border-secondary hover:bg-gray-200 w-40 py-3 px-4 font-medium text-lg text-secondary rounded-lg`}
              >
                {payment}
              </button>
            ))}
        </div>
        {showError && <p className="font-normal text-base text-red-500 mt-3">{showError}</p>}
        <div className="mt-16 w-40 ml-auto">
          <ActionButton loading={loading} text={"Pay Now"} onClickButton={()=>HandleGenerateOrder(selectedPaymentType, setShowError, order, setOrder, orderItems, setModalType, setLoading)}/>
        </div>
        
      </div>
  );
};

export default PaymentGatewayModal;
