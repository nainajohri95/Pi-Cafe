import React from "react";
import Spinner from "./Spinner";

const ActionButton = ({ onClickButton, loading, text, bgColor="primary", hoverColor="hoverPrimary" }) => {
  return (
    <div
      onClick={onClickButton}
      className={`text-white ${bgColor ? `bg-${bgColor}` : "bg-primary"} ${hoverColor ? `hover:bg-${hoverColor}` : "hover:bg-hoverPrimary"} cursor-pointer rounded  font-medium text-lg mx-auto w-full px-3 py-[12px] text-center`}
    >
     {loading ? <Spinner/> : text}
    </div>
  );
};

export default ActionButton;
