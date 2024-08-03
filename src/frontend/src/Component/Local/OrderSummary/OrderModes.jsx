import React from "react";
import ActionButton from "../../Global/ActionButton";

const OrderModes = ({ orderModes, order, setOrder

 }) => {
  return (
   
      <div className="w-full">
        {" "}
        <div className="w-full">
          <p className="text-xl text-secondary font-medium">
            Select Order Mode*
          </p>
          <div className="flex flex-wrap gap-3 w-full  lg:space-x-11  justify-start">
            {orderModes &&
              orderModes?.map((orderMode, ind) => (
                <div key={ind} className="w-40 mt-5">
                  <ActionButton
                    text={orderMode?.type}
                    bgColor={order?.orderMode === orderMode?.type ? "primary" : "hoverPrimary"}
                    hoverColor={"primary"}
                    onClickButton={()=>setOrder({...order, orderMode: orderMode?.type})}
                  />
                </div>
              ))}
          </div>
        </div>
        <hr className="w-[80%] my-10 border-none h-[2px] bg-gray-400" />
      </div>
  );
};

export default OrderModes;
