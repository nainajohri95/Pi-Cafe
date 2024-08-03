import React, {useState} from "react";
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const InputField = ({
  inputHeading,
  placeholder,
  inputType,
  errorMsg,
  value,
  handleChange,
  id,
  readOnly
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <div className="flex flex-col items-start relative">
      <label htmlFor={id} className="font-medium text-secondary text-xl">
        {inputHeading}
      </label>
      <div className="w-full mt-3 relative">
        <input
          name={id}
          value={value}
          id={id}
          readOnly={readOnly}
          type={isPasswordVisible && inputType === "password" ? "text" : inputType}
          placeholder={placeholder}
          onChange={handleChange}
          className="border outline-none border-primary w-full text-lg rounded py-[16px] px-3 pr-10"
        />
        {inputType === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-3 py-3 text-gray-500 focus:outline-none"
          >
            {isPasswordVisible ? <FaRegEyeSlash className="text-xl text-secondary"/> : <FaEye className="text-xl text-secondary"/>}
          </button>
        )}
      </div>
      {errorMsg && (
        <p className="mt-2 text-red-500 font-normal text-sm">{errorMsg}</p>
      )}
    </div>
  );
};

export default InputField;
