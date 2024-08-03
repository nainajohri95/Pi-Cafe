import React from "react";

const ParticularOrderDetails = ({ order }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-lg">
      {" "}
      <div className="p-4 bg-gray-100  flex flex-col items-start rounded-md">
        {
          order && order.map((item)=>(<div className="flex my-3 border-b border-secondary py-4 w-[80%] mx-auto justify-between">
            <p className="text-lg text-secondary font-semibold font-poppins">Item ID:   <span className="font-medium">{item.id}</span></p>
            <p className="text-lg text-secondary font-semibold font-poppins"> Quantity:   <span className="font-medium">{item.quantity}</span></p>
          </div>))
        }
      </div> 
    </div>
  );
};

export default ParticularOrderDetails;
