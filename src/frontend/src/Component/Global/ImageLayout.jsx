import React from "react";
import { FoodImage } from "../../Assets/Images/index";

const ImageLayout = () => {
  return (
    <div className="w-[45%] hidden lg:block overflow-y-hidden h-screen">
      <img src={FoodImage} loading="lazy" alt="PiCafe" className="w-[100%] bg-cover" />
    </div>
  );
};

export default ImageLayout;
