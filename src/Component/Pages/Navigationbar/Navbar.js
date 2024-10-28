import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import { RiMenuLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  // const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  // const { pathname } = useLocation();
  // const location = useLocation(); // once ready it returns the 'window.location' object
  const navigatePage = [
    { id: 1, text: "Dashboard", url: "/" },
    {
      id: 2,
      text: "Add Question",
      url: "/subject",
    },
  ];
  const drpodownItems = [
    { id: 3, text: "Profile", to: "/profile" },
    { id: 4, text: "Setting", to: "/" },
  ];
  const [active, setActive] = useState("/");
  const handleClick = (event) => {
    localStorage.setItem("lang", event);
    setActive(event);
  };
  useEffect(() => {
    const item = localStorage.getItem("lang");
    if (item === null) {
      setActive(localStorage.setItem("lang", "/"));
    } else {
      setActive(item);
    }
  }, [active]);

  // const userLogout = () => {
  //   try {
  //     console.log("logout");

  //     setTimeout(() => {
  //       setShow(!show);
  //       dispatch(logOut());
  //       setDashboardMenu(!dashbaordMenu);
  //       setToggle(!toggle);
  //       toast.success("Log out Successfully...");
  //       navigate("/");
  //     }, [1000]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <div className="h-16 flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center justify-center space-x-8">
          <div className="flex items-center justify-center text-3xl font-semibold px-6">
            <span className=" text-center  text-orange-600  whitespace-nowrap">
              Dash
            </span>
            <span className=" text-center text-black whitespace-nowrap">
              Stack
            </span>
          </div>
          <div className="no-scrollbar duration-300 ease-linear hidden lg:block">
            <nav className="text-md font-medium ">
              <ul className=" flex flex-row gap-x-2">
                {navigatePage.map((value, index) => {
                  return (
                    <NavLink to={value.url}>
                      <li
                        key={value.id}
                        className="flex gap-x-5"
                        onClick={() => handleClick(value.url)}
                      >
                        <button
                          type="button"
                          className={`${
                            active === value.url
                              ? "text-white bg-orange-600"
                              : "text-black"
                          }  py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600`}
                        >
                          {value.text}
                        </button>
                      </li>
                    </NavLink>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        <div className=" hidden text-right lg:block">
          <div className="flex items-center gap-2 2xsm:gap-4">
            <div className="flex justify-center items-center space-x-3 overflow-hidden">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                <img
                  src="https://images.unsplash.com/photo-1610397095767-84a5b4736cbd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className=" font-medium dark:text-white text-gray-900 text-base lg:block xl:block sm:hidden md:hidden">
                <div className="capitalize">het mangukiya</div>
                <div className="capitalize text-left text-sm text-gray-3000">
                  admin
                </div>
              </div>
              <button
                type="button"
                title="Menu"
                onClick={() => setToggle(!toggle)}
                className="p-2  cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="text-gray-700 w-6 h-6"
                  viewBox="0 0 18 18"
                >
                  {toggle ? <SlArrowUpCircle /> : <SlArrowDownCircle />}
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            className=" text-md text-slate-500 p-2 mt-2 hover:bg-slate-500 hover:text-white rounded-full lg:hidden xl:hidden 2xl:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title="Menu"
          >
            <svg viewBox="0 0 16 16" className="h-6 w-6">
              <RiMenuLine />
            </svg>
          </button>
        </div>
      </div>
      <div
        className={`${
          sidebarOpen === true
            ? "block lg:hidden w-full px-4 py-6 bg-gray-100 duration-300 ease-linear"
            : "hidden"
        }`}
        id="mobile-menu"
      >
        <nav className="flex flex-col h-full overflow-y-auto duration-300 ease-linear ">
          <nav className="text-md font-medium ">
            <ul className=" flex flex-col">
              {navigatePage.map((value, index) => {
                return (
                  <NavLink to={value.url}>
                    <li
                      key={index}
                      className="flex gap-x-5"
                      id={value.id}
                      onClick={handleClick(value.url)}
                    >
                      <button
                        type="button"
                        className={`${
                          active === value.url
                            ? "text-white bg-orange-600"
                            : "text-black"
                        }  py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600`}
                      >
                        {value.text}
                      </button>
                    </li>
                  </NavLink>
                );
              })}
            </ul>
          </nav>
        </nav>
      </div>
      <div
        className={`${
          toggle === true
            ? " absolute overflow-hidden w-52  duration-300 ease-linear origin-top-right right-2 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent"
            : "hidden"
        } `}
      >
        <ul className="flex flex-col gap-y-1 dark:text-white text-left font-medium capitalize">
          {drpodownItems.map((value, index) => {
            return (
              <NavLink to={value.url}>
                <li
                  key={value.id}
                  className={`${
                    active === value.url
                      ? "text-white bg-gray-500"
                      : "text-black"
                  } bg-gray-300 py-2 px-4 w-full rounded-md duration-300 ease-in-out capitalize `}
                  onClick={handleClick(value.url)}
                >
                  {value.text}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default Navbar;
