import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import ParticularOrderDetails from "./ParticularOrderDetails";

const OrderHistoryDetails = ({ orderHistoryData}) => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleButtonClick = (order) => {
    setSelectedOrder((prevOrder) =>
      prevOrder && prevOrder?.orderId === order?.orderId ? null : order
    );
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      {orderHistoryData?.map((item) => (
        <div key={item.orderId} className="bg-gray-200 p-4 rounded-md">
          <div className="flex w-full justify-between items-center">
            <div className="flex  w-[80%] justify-between">
              <p className="text-gray-700 font-semibold">Order ID: {item?.orderId}</p>
              <p className="text-gray-700 font-semibold">Total Amount: {item?.total}</p>
            </div>
            <button
              className="bg-white rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
              onClick={() => handleButtonClick(item)}
              data-testid={`order-button-${item?.orderId}`}
            >
              {selectedOrder && selectedOrder.orderId === item?.orderId ? (
                <FaArrowUp />
              ) : (
                <FaArrowDown />
              )}
            </button>
          </div>
          {selectedOrder && selectedOrder.orderId === item?.orderId && (
            <div className="mt-4" data-testid={`order-details-${item?.orderId}`}>
              <ParticularOrderDetails order={selectedOrder.items} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistoryDetails;
