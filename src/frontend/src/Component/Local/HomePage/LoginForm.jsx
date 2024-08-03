import React, { useState } from "react";
import { HandleLogin } from "../../../Helper/HandleLogin.Helper";
import InputField from "../../Global/InputField";
import ActionButton from "../../Global/ActionButton";

const LoginForm = ({ setUserDetails, userDetails }) => {
  const [errorMsg, setErrorMsg] = useState({ employeeId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [loginFormData, setLoginFormData] = useState({
    employeeId: "",
    password: "",
  });

  return (
    <>
      <div className="flex flex-col bg-gray-200 shadow-md mt-[40px] rounded xl:p-10 p-6 w-[80%] xl:mt-[100px] mx-auto">
        {/* input fields */}
        <div className=" xl:space-y-10 space-y-5 w-full">
          <InputField
            inputHeading={"Employee ID"}
            value={loginFormData?.employeeId}
            id={"employee-id"}
            handleChange={(e) =>
              setLoginFormData({ ...loginFormData, employeeId: e.target.value })
            }
            placeholder={"Ex: 123"}
            inputType={"text"}
            errorMsg={errorMsg?.employeeId}
          />
          <InputField
            inputHeading={"Password"}
            value={loginFormData?.password}
            id={"employee-password"}
            handleChange={(e) =>
              setLoginFormData({ ...loginFormData, password: e.target.value })
            }
            placeholder={"Enter your password"}
            inputType={"password"}
            errorMsg={errorMsg?.password}
          />
        </div>
        <div className="xl:mt-20 mt-10 w-40">
          {/* login button */}
          <ActionButton
            onClickButton={async () =>
              await HandleLogin({
                employeeId: loginFormData.employeeId,
                password: loginFormData.password,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
                setUserDetails: setUserDetails,
                setLoading: setLoading,
              })
            }
            loading={loading}
            text={"Login"}
          />
        </div>
      </div>
    </>
  );
};

export default LoginForm;
