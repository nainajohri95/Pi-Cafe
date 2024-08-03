import React, { useEffect } from "react";
import { Suspense, lazy } from "react";
const Navbar = lazy(() => import("../Component/Global/Navbar"));
const Login = lazy(()=>import("../Component/Local/HomePage/Login"));
const SingleOrder = lazy(()=>import("../Component/Global/SingleOrder"));

const HomePage = ({userDetails, setUserDetails}) => {
  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    if (userData && userData !== "undefined") {
      setUserDetails(JSON.parse(userData));
    }
  }, [setUserDetails]);
  return (
    <Suspense
      fallback={
        <div className="bg-gray-200 text-lg font-medium text-gray-900 flex items-center w-full h-full justify-center">
          Loading...
        </div>
      }
    >
      {userDetails && (
        <Navbar
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
      )}

      {
        userDetails ? <><SingleOrder userDetails={userDetails} setUserDetails={setUserDetails}/></> : <Login setUserDetails={setUserDetails}/>
      }
      
    </Suspense>
  );
};

export default HomePage;
