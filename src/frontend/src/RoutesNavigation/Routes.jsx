import React, { Suspense, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { routePath } from "../Constant/Global/RoutePath.Constant";

export const RoutesList = () => {
  const [userDetails, setUserDetails] = useState(null);

  const routes = routePath({ userDetails, setUserDetails });

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="flex flex-col justify-center items-center w-full h-full text-2xl text-secondary font-medium">Loading...</div>}>
        <Routes>
          {routes.map((route, ind) => (
            <Route 
              key={ind} 
              path={route.path} 
              element={route.element} 
            />
          ))}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
