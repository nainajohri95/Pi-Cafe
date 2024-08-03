import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HandleGetAllEmployees } from "../Helper/HandleGetAllEmployees.Helper";
import { FaPlus } from "react-icons/fa6";
const Navbar = lazy(() => import("../Component/Global/Navbar"));
const EmployeeCard = lazy(() => import("../Component/Global/EmployeeCard"));
const Spinner = lazy(()=>import("../Component/Global/Spinner"))

const EmployeeManagement = ({ userDetails, setUserDetails }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [employeeData, setEmployeeData] = useState([])
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails || userDetails === "undefined") {
      navigate("/");
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  }, [navigate, setUserDetails]);

  useEffect(() => {
    const fetchData = async()=>{
      const employeeData = await HandleGetAllEmployees(
        userDetails?.employee?.store_id,
        setLoading
      );
      setEmployeeData(employeeData)
    }
    fetchData();
    
  }, [userDetails]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-gray-200 flex flex-col items-center w-full min-h-screen">
        <Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
        {loading ? (
          <div className="my-auto">
            <h1 className="text-3xl text-secondary font-medium mb-10">Fetching employee data...</h1>
            <Spinner/>
          </div>
        ) : (
          <div
            style={{
              overflowY: "scroll",
              flex: "none",
              flexWrap: "nowrap",
              msOverflowStyle: "none" /* Internet Explorer 10+ */,
              scrollbarWidth: "none" /* Firefox */,
              WebkitScrollbar: {
                display: "none" /* WebKit */,
              },
            }}
            className="lg:w-[900px] shadow xl:w-[1200px] 2xl:w-[1500px] p-9 mt-10 mb-10 h-[75vh] w-[700px] bg-white rounded-lg flex flex-col items-center"
          >
            <h1 className="text-secondary font-medium xl:text-3xl 2xl:text-[40px] lg:text-2xl">
              Employee List
            </h1>
            <div className="mt-9 grid lg:grid-cols-3 grid-cols-2 gap-4 w-full">
              {employeeData?.map((employee, ind) => (
                <div key={employee?.employee_id} className="col-span-1">
                  <EmployeeCard employee={employee} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button
        onClick={() => navigate("/create-employee")}
        className="fixed bottom-14 right-14 cursor-pointer w-20 h-20 flex flex-col justify-center items-center bg-white rounded-full"
        aria-label="Create Employee"
      >
        <FaPlus className="text-secondary text-5xl" />
      </button>
    </Suspense>
  );
};

export default EmployeeManagement;
