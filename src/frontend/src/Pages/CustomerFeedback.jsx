import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleSubmitFeedback } from "../Helper/HandleSubmitFeedback";
import { CustomerFeedbackQuestions } from "../Constant/Local/CustomerFeedbackQuestions.Constant";

const CustomerFeedback = () => {
  const navigate = useNavigate();
  const [customerFeedback, setCustomerFeedback] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const orderID = localStorage.getItem("orderId");
    if (!orderID || orderID === "undefined") {
      navigate("/");
    } else {      
      setCustomerFeedback({foodrating: 0, customerexprating: 0, ambiancerating: 0});
      setOrderId(orderID);
    }
  }, [navigate]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <div className="lg:w-[1000px] rounded-lg w-[600px] p-10 bg-gray-200">
        <h1 className="text-5xl text-secondary font-medium">
          Customer Feedback
        </h1>
        <div className="flex mt-10 flex-col items-start">
          {CustomerFeedbackQuestions?.map((question, ind) => (
            <div
              key={ind}
              className="flex my-5 w-full justify-between items-start"
            >
              <h1 className="w-[40%] text-gray-500 font-medium text-xl">
                {question.question}
              </h1>
              <div className="flex items-center space-x-4">
                {Array.from(Array(5).keys()).map((ele) => (
                  <div
                    key={ele}
                    onClick={() =>
                      setCustomerFeedback((prevFeedback) => {
                        const updatedFeedback = {...prevFeedback};
                        if(updatedFeedback[question.type] === parseInt(ele + 1)){
                            updatedFeedback[question.type] = 0
                        }else{ 
                            updatedFeedback[question.type] = parseInt(ele + 1)
                        }
                        return updatedFeedback
                      })
                    }
                    className={`${
                      customerFeedback[question.type] === ele + 1
                        ? "bg-gray-400"
                        : "bg-white"
                    } rounded-full w-12 h-12 hover:bg-gray-400 cursor-pointer font-medium text-secondary text-xl flex flex-col items-center justify-center`}
                  >
                    {ele + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex mt-10 items-center space-x-7 w-[350px] ml-auto">
          <button
            disabled={loading}
            onClick={() => {
              localStorage.removeItem("orderId");
              navigate("/");
            }}
            className="border border-secondary font-medium bg-white text-secondary text-lg py-[12px] px-4 rounded-lg hover:bg-gray-400 w-40"
          >
            Skip
          </button>
          <button
            disabled={loading}
            onClick={() =>
              HandleSubmitFeedback(
                customerFeedback,
                orderId,
                setLoading,
                navigate
              )
            }
            className="border border-secondary font-medium bg-white text-secondary text-lg py-[12px] px-4 rounded-lg hover:bg-gray-400 w-40"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerFeedback;
