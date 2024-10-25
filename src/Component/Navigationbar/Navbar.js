import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import { RiMenuLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const navigationPage = [
    { id: 1, text: "Income Expense", to: "/" },
    { id: 2, text: "KYC", to: "/kyc" },
    { id: 3, text: "Report", to: "/report" },
    { id: 4, text: "Add Contest", to: "/addContest" },
    { id: 5, text: "Contestant Earning", to: "/contestEarning" },
    { id: 6, text: "Content Type", to: "/contestType" },
    { id: 7, text: "Classes", to: "/classes" },
    { id: 8, text: "Information", to: "/information" },
    { id: 9, text: "Subject", to: "/subject" },
    { id: 10, text: "Banner", to: "/banner" },
    { id: 11, text: "User", to: "/userDetails" },
  ];
  const drpodownItems = [
    { id: 12, text: "Reset Password", to: "/resetPassword" },
  ];
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  const [active, setActive] = useState();
  const handleClick = (event) => {
    setActive(event);
    localStorage.setItem("activeTab", active);
  };
  function Navigation() {
    setToggle(!toggle);
  }

  useEffect(() => {
    const storedTab = localStorage.getItem("activeTab");
    if (storedTab) {
      setActive(storedTab);
    } else {
      setActive(1);
    }
  }, []);
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
      <div className="h-16 flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 ">
        <div className="flex items-center justify-center lg:hidden text-3xl font-semibold px-6">
          <span className=" text-center  text-orange-600  whitespace-nowrap">
            Dash
          </span>
          <span className=" text-center text-black whitespace-nowrap">
            Stack
          </span>
        </div>

        <div className="hidden sm:block">
          <div className="relative ">
            <button className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <GoSearch />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full p-2 pl-8 text-md rounded-full bg-transparent border-2  focus:outline-none xl:w-125"
            />
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
          <ul className=" flex flex-col text-md font-medium ">
            {navigationPage.map((value, index) => {
              return (
                <NavLink to={value.to}>
                  <li
                    className="flex gap-x-5"
                    onClick={() => handleClick(value.id)}
                    Key={index.toString()}
                  >
                    <span
                      className={`${
                        active === value.id
                          ? "border-l-4 border-orange-500"
                          : "border-none"
                      } rounded-r-lg `}
                    ></span>
                    <button
                      type="button"
                      className={`${
                        active === value.id
                          ? "text-white bg-orange-400"
                          : "text-black"
                      }  py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize `}
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
      {/* dashboard menu */}
      <div
        className={`${
          toggle === true
            ? " absolute overflow-hidden w-52  duration-300 ease-linear origin-top-right right-2 dark:bg-gray-800 bg-white rounded-lg shadow-xl border dark:border-transparent"
            : "hidden"
        } `}
      >
        <ul className="flex flex-col gap-y-1 dark:text-white text-left font-medium capitalize">
          {drpodownItems.map((value, index) => {
            return (
              <NavLink to={value.to}>
                <li key={index} className="flex gap-x-5" onClick={Navigation}>
                  <button
                    type="button"
                    className={`${
                      active === value.id
                        ? "text-white bg-gray-600"
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
      </div>
    </>
  );
}
export default Navbar;
