import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="relative">
      <div
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="h-12 w-12 rounded-full">
          <img
            src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="User"
            className="w-full h-full  rounded-full object-cover"
          />
        </span>
        <span className="hidden text-left lg:block cursor-pointer">
          <span className="block text-sm   font-medium text-black dark:text-white">
            Het Mangukiya
          </span>
          <span className="block text-xs">Admin</span>
        </span>

        <svg
          className="hidden fill-current cursor-pointer sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.410765 0.910734C0.736202 0.585297 1.26384 0.585297 1.58928 0.910734L6.00002 5.32148L10.4108 0.910734C10.7362 0.585297 11.2638 0.585297 11.5893 0.910734C11.9147 1.23617 11.9147 1.76381 11.5893 2.08924L6.58928 7.08924C6.26384 7.41468 5.7362 7.41468 5.41077 7.08924L0.410765 2.08924C0.0853277 1.76381 0.0853277 1.23617 0.410765 0.910734Z"
            fill=""
          />
        </svg>
      </div>

      {/*dropdown */}
      {dropdownOpen && (
        <div
          className={`absolute right-0 top-14 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
        >
          <ul className="flex flex-col gap-2 border-b border-stroke  dark:border-strokedark">
            <li>
              <NavLink
                to="/profile"
                className={`group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium  ${
                  pathname.includes("profile") && "text-white bg-orange-600"
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium  ${
                  pathname.includes("settings") && "text-white bg-orange-600"
                }`}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
