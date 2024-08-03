import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = lazy(() => import("../Component/Global/Navbar"));
const EmployeeForm = lazy(() => import("../Component/Global/EmployeeForm"));
const EmployeeSuccessfulModal = lazy(() =>
  import("../Component/Global/EmployeeSuccessfulModal")
);

const CreateEmployee = ({ userDetails, setUserDetails }) => {
  const navigate = useNavigate();
  const [employeeAdded, setEmployeeAdded] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails || userDetails === "undefined") {
      navigate("/");
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  }, [navigate, setUserDetails]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="bg-gray-200 flex flex-col items-center w-full min-h-screen">
        <Navbar userDetails={userDetails} setUserDetails={setUserDetails} />
        <div className="mt-16 mb-10">
          {" "}
          {employeeAdded ? (
            <EmployeeSuccessfulModal
              successMsg={"Employee added successfully"}
              data={employeeDetails}
            />
          ) : (
            <EmployeeForm
              userDetails={userDetails}
              setEmployeeAdded={setEmployeeAdded}
              setEmployeeDetails={setEmployeeDetails}
            />
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default CreateEmployee;
