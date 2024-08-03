import React, { useEffect, useState } from "react";
import { ItemsService } from "../../Services/Items.Services";
import { RoutesList } from "../../RoutesNavigation/Routes";
import { Toaster } from "react-hot-toast";
import MobileScreenLayout from "./MobileScreenLayout";

export const AppComponent = () => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(()=>{
      window.onbeforeunload = function () {
        localStorage.clear();
        return "";
      };
    }, [])
    

    useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  useEffect(() => {
    const fetchItems = async () => {
      await ItemsService();
       
    };

    fetchItems();
  }, []);


  return (
    <>
      {screenWidth >= 768 ? (
        <>
          <RoutesList />
          <Toaster position="top-center"/>
        </>
      ) : (
        <>
          <MobileScreenLayout/>
        </>
      )}
    </>
  );
};
