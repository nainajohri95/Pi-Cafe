import React from "react";
import { MainLogo } from "../../Assets/Images/index";

const Logo = () => {
  return (
    <div className=" w-48  mt-4 ">
      <img loading="lazy" src={MainLogo} alt="PiCafe" />
    </div>
  );
};

export default Logo;
