import React, { useState } from "react";
import InputField from "../Global/InputField";
import ActionButton from "./ActionButton";
import toast from "react-hot-toast";
import { HandleClearForm } from "../../Helper/HandleClearForm.Helper";
import { useNavigate, useLocation } from "react-router-dom";
import { HandleConfirmEmployee } from "../../Helper/HandleConfirmEmployee";

const EmployeeForm = ({
  userDetails,
  setEmployeeAdded,
  setEmployeeDetails,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [loading, setLoading] = useState(false);
  const employeeData = JSON.parse(
    decodeURIComponent(queryParams.get("employeeData"))
  );
  const [formData, setFormData] = useState({
    Name: employeeData?.Name,
    Salary: employeeData?.Salary,
    Role: employeeData?.Role ? employeeData?.Role : "Employee",
    Password: "",
    EmpId: employeeData?.EmpId
  });
  const [errorMsg, setErrorMsg] = useState({
    Name: "",
    Salary: "",
    Role: "",
    Password: "",
  });

  return (
    <div className="lg:w-[800px] w-[500px] p-8 rounded-lg bg-white shadow flex flex-col ">
      <h1 className="text-secondary font-semibold text-2xl 2xl:text-3xl">
        {employeeData ? "Edit Employee Details" : "Add Employee Details"}
      </h1>
      <div className="flex mt-10 flex-col space-y-4">
        <InputField
          inputHeading={"Name"}
          placeholder={"Enter employee's name"}
          errorMsg={errorMsg?.Name}
          inputType={"text"}
          value={formData?.Name}
          id={"employeeName"}
          handleChange={(e) =>
            setFormData({ ...formData, Name: e.target.value })
          }
        />
        <InputField
          inputHeading={"Salary"}
          placeholder={"Enter employee's salary"}
          inputType={"number"}
          errorMsg={errorMsg?.Salary}
          value={formData?.Salary}
          id={"employeeSalary"}
          handleChange={(e) =>
            setFormData({ ...formData, Salary: e.target.value })
          }
        />
        <InputField
          inputHeading={"Role"}
          readOnly={true}
          placeholder={"Enter employee's role"}
          inputType={"text"}
          errorMsg={errorMsg?.Role}
          value={formData?.Role}
          id={"employeeRole"}
          handleChange={(e) =>
            setFormData({ ...formData, Role: e.target.value })
          }
        />
        <InputField
          inputHeading={"Password"}
          placeholder={"Enter employee's password"}
          inputType={"password"}
          value={formData?.Password}
          errorMsg={errorMsg?.Password}
          id={"employeePassword"}
          handleChange={(e) =>
            setFormData({ ...formData, Password: e.target.value })
          }
        />
      </div>
      <div className="flex mt-16 mb-5 items-center justify-between w-full">
        <div className="w-40">
          {" "}
          <ActionButton
            text={"Cancel"}
            onClickButton={() => {
              loading
                ? toast.error("Action cannot be taken")
                : navigate("/employee-management");
            }}
            bgColor="red-500"
            hoverColor="red-400"
          />
        </div>
        <div className="flex items-center space-x-6">
          <div className="w-40">
            {" "}
            <ActionButton
              text={"Clear"}
              onClickButton={() => HandleClearForm(setFormData, setErrorMsg)}
              bgColor="gray-400"
              hoverColor="gray-500"
            />
          </div>
          <div className="w-40">
            {" "}
            <ActionButton
              text={"Confirm"}
              loading={loading}
              onClickButton={() =>
                HandleConfirmEmployee(
                  formData,
                  setErrorMsg,
                  errorMsg,
                  employeeData ? "Edit" : "Add",
                  setLoading,
                  userDetails?.employee?.store_Id,
                  setEmployeeAdded,
                  setEmployeeDetails
                )
              }
              bgColor="green-500"
              hoverColor="green-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
