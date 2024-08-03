import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="xl:w-[1200px] shadow-md h-[700px] w-[500px] flex flex-col justify-center items-center text-center bg-gray-200 rounded-lg p-10">
        <h1 className=" xl:text-[13rem] text-9xl text-primary font-bold">
          404
        </h1>
        <p className="text-secondary text-3xl font-semibold mt-5">
          Oops! Page Not Found
        </p>
        <p className="text-lg text-gray-600 font-medium mt-3">
          Sorry the page you are looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-secondary text-lg hover:bg-[#312a2ab0] text-white rounded py-5 px-6 mt-12 w-40"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
