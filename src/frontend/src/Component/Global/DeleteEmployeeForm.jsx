import React, { useState } from "react";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import toast from "react-hot-toast";
import { HandleDeleteEmployee } from "../../Helper/HandleDeleteEmployee.Helper";
import { useNavigate, useLocation } from "react-router-dom";

const DeleteEmployeeForm = ({userDetails, setDeleted}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const employeeData = JSON.parse(
    decodeURIComponent(queryParams.get("employeeData"))
  );
  return (
    <div className="lg:w-[800px] w-[500px] px-8 pb-8 pt-16 rounded-lg bg-white shadow flex flex-col ">
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col space-y-1 items-start">
          <h1 className="text-secondary font-medium text-2xl">
            {employeeData?.Name}
          </h1>
          <h1 className="text-gray-500 font-medium text-xl">
            {employeeData?.Role}
          </h1>
          <h1 className="text-gray-500 font-medium text-xl">
            ₹{employeeData?.Salary}
          </h1>
        </div>
        <h1 className="text-secondary font-medium text-2xl">
          {employeeData?.EmpId}
        </h1>
      </div>
      <hr className="w-full my-10 border-none h-[2px] bg-gray-400" />
      <div className="flex flex-col items-center">
        <h1 className="text-center text-secondary text-2xl font-semibold">
          Are you sure you want to remove this employee?
        </h1>
        <p className="text-gray-500 mt-1 font-normal text-xl">
          Once deleted you won't be able to undo it
        </p>
      </div>
      <div className="mt-16">
        {" "}
        <InputField
          inputType={"password"}
          value={password}
          errorMsg={errorMsg}
          handleChange={(e) => setPassword(e.target.value)}
          inputHeading={"Kindly enter your password to continue"}
          placeholder={"Enter your password"}
        />
      </div>
      <div className="flex  mt-20 mb-5 items-center justify-between w-full">
        <div className="w-40">
          <ActionButton
            text={"Cancel"}
            bgColor="red-500"
            hoverColor={"red-400"}
            onClickButton={() => {
              loading
                ? toast.error("Action cannot be taken")
                : navigate("/employee-management");
            }}
          />
        </div>
        <div className="w-40">
          <ActionButton
            loading={loading}
            text={"Confirm"}
            bgColor="green-500"
            hoverColor="green-400"
            onClickButton={() =>
              HandleDeleteEmployee(
                setErrorMsg,
                password,
                employeeData?.EmpId,
                setLoading,
                userDetails?.employee?.employee_id,
                setDeleted
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteEmployeeForm;