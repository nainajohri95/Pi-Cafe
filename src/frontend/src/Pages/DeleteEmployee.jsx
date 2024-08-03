import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const EmployeeSuccessfulModal = lazy(() =>
  import("../Component/Global/EmployeeSuccessfulModal")
);
const Navbar = lazy(() => import("../Component/Global/Navbar"));
const DeleteEmployeeForm = lazy(() =>
  import("../Component/Global/DeleteEmployeeForm")
);

const DeleteEmployee = ({ userDetails, setUserDetails }) => {
  const navigate = useNavigate();
  const [deleted, setDeleted] = useState(false);
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
          {deleted ? (
            <EmployeeSuccessfulModal
              successMsg={"Employee deleted successfully"}
            />
          ) : (
            <DeleteEmployeeForm
              userDetails={userDetails}
              setDeleted={setDeleted}
            />
          )}{" "}
        </div>
      </div>
    </Suspense>
  );
};

export default DeleteEmployee;