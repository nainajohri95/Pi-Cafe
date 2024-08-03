import React from "react";
import InputField from "../../Global/InputField";

const CustomerDetails = ({ order, setOrder, errorMsg }) => {
  return (
    <div className="w-full flex flex-col items-start">
      <h1 className="text-secondary lg:text-3xl text-xl font-semibold">
        Customer Details
      </h1>
      <div className="w-[80%] mt-12 flex flex-col space-y-12">
        <InputField
          inputHeading={"Customer Name"}
          value={order?.name}
          id={"customer-name"}
          handleChange={(e) => setOrder({ ...order, name: e.target.value })}
          placeholder={"Enter Customer name"}
          inputType={"text"}
          errorMsg={errorMsg?.custName}
        />
        <InputField
          inputHeading={"Customer Email"}
          value={order?.email} //customerId is customer phone no.
          id={"customer-email"}
          handleChange={(e) =>
            setOrder({ ...order, email: e.target.value })
          }
          placeholder={"Enter Customer Email Id"}
          inputType={"email"}
          errorMsg={errorMsg?.custEmail}
        />
        <hr className="w-full border-none h-[2px] bg-gray-400" />
      </div>
    </div>
  );
};

export default CustomerDetails;
