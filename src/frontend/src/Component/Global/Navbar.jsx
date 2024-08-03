import React, { useState, useRef, useEffect } from "react";
import { FaRegUser } from "react-icons/fa";
import { NavbarLogo } from "../../Assets/Images";
import { useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { AdminOptions, EmployeeOptions } from "../../Constant/Local/NavbarOptions.Constant";

const Navbar = ({ setUserDetails, userDetails }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const toggleMenuRef = useRef(null);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    setUserDetails(null);
    navigate('/')
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      toggleMenuRef.current &&
      !toggleMenuRef.current.contains(event.target)
    ) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full sticky h-[110px] z-30 top-0 left-0 px-5 bg-white shadow-md flex justify-between items-center">
    <img
      onClick={() => navigate("/")}
      src={NavbarLogo}
      alt="PiCafe"
      loading="lazy"
      className=" w-52 cursor-pointer"
    />

    <div className="flex items-center space-x-8">
      {/* options button */}
      {(userDetails?.employee?.position === "Manager" ? AdminOptions : EmployeeOptions)?.map((option, ind) => (
          <button
            key={ind}
            onClick={() => navigate(option?.url)}
            className="text-secondary xl:block hidden text-lg border border-secondary py-3 px-4 rounded-lg hover:bg-gray-200 font-medium"
          >
            {option?.title}
          </button>
        ))}

      <div ref={toggleMenuRef}
        onClick={() => setShowMenu(!showMenu)}
        className="text-5xl text-secondary block relative xl:hidden cursor-pointer"
      >
        <IoMenu />
        {showMenu && (
          <div ref={menuRef} className="absolute w-[200px] top-20 -left-5 bg-white rounded-lg shadow-md">
             {(userDetails?.employee?.position === "Manager" ? AdminOptions : EmployeeOptions)?.map((option, ind) => (
                <p
                  className="w-full py-4 cursor-pointer border-b px-4 text-secondary text-lg"
                  key={ind}
                  onClick={() => navigate(option?.url)}
                >
                  {option?.title}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* userInfo display */}
      <div className="border border-primary flex space-x-9  py-2 px-4 rounded items-center">
        <FaRegUser className="text-[40px] text-primary" />
        <div className="flex flex-col items-start">
          <p className="text-secondary text-xl font-medium">
            {userDetails?.employee?.name}
          </p>
          <p className="font-normal text-base text-gray-500">
            {userDetails?.employee?.employee_id}
          </p>
        </div>
      </div>
      {/* log out button */}
      <div
        onClick={handleLogout}
        className="font-medium  cursor-pointer hover:bg-gray-400 bg-gray-300 w-32 py-3 px-4 text-center rounded text-base"
      >
        Log Out
      </div>
    </div>
  </div>
  );
};

export default Navbar;
