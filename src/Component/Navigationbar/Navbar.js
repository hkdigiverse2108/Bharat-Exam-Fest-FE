import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { SlArrowDownCircle, SlArrowUpCircle } from "react-icons/sl";
import { RiMenuLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutConfimation from "./LogoutConfimation";
import { logOut } from "../../Context/Action/Auth";
import { logOutAdmin } from "../../Context/Action";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { pathname } = useLocation();
  const [confirm, setConfirm] = useState(false);

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  function Navigation() {
    setToggle(!toggle);
  }

  function handleToggle() {
    setConfirm(!confirm);
  }

  const handleLogout = () => {
    toast.success("Logout successfully");
    Navigation();
    handleToggle();
    setTimeout(() => {
      dispatch(logOut(), logOutAdmin());
      navigate("/");
    }, [1000]);
  };

  return (
    <>
      <div className="h-16 bg-white flex items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11 ">
        <div className="flex items-center justify-center lg:hidden text-3xl font-semibold px-6">
          <span className=" text-center  text-orange-600  whitespace-nowrap">
            Dash
          </span>
          <span className=" text-center text-black whitespace-nowrap">
            Stack
          </span>
        </div>

        <div className="hidden sm:block ">
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
              className="w-full p-2 pl-8 text-md rounded-full bg-transparent border border-gray-500  focus:outline-none focus:border-black  md:w-100 xl:w-125"
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
        <div className="flex items-center gap-x-2 sm:gap-x-4 lg:hidden">
          <button
            className=" text-md text-slate-500 p-2 hover:bg-slate-500 hover:text-white rounded-full lg:hidden xl:hidden 2xl:hidden"
            onClick={() => setNavbarOpen(!navbarOpen)}
            title="Menu"
          >
            <svg viewBox="0 0 16 16" className="h-6 w-6">
              <RiMenuLine />
            </svg>
          </button>
        </div>
      </div>

      {/* toggle navbar */}
      <div
        className={`${
          navbarOpen === true
            ? "block lg:hidden w-full px-4 py-6 bg-slate-200 border-b shadow-default duration-300 ease-linear"
            : "hidden"
        }`}
        id="mobile-menu"
      >
        <nav className="flex flex-col h-full overflow-y-auto duration-300 ease-linear ">
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <NavLink
                to="/"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  Income Expense
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kyc"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/kyc"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/kyc" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  KYC
                </span>
              </NavLink>
            </li>
            <li className="">
              <NavLink
                to="/report"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/report"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/report" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  Report
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addContest"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/addContest" || pathname === "/createContest"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/addContest" || pathname === "/createContest"
                      ? "text-white bg-orange-500"
                      : "text-black"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  add contest
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contestEarning"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/contestEarning"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/contestEarning" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  contest earning
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/classes"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/classes"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/classes" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  classes
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contestType"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/contestType"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/contestType" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  contest Type
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/information"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/information" ||
                    pathname === "/addIntroduction"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/information" ||
                    pathname === "/addIntroduction"
                      ? "text-white bg-orange-500"
                      : "text-black"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  information
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subject"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/subject" ||
                    pathname === "/addSubject" ||
                    pathname === "/editSubject" ||
                    pathname === "/addSubtopic"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/subject" ||
                    pathname === "/addSubject" ||
                    pathname === "/editSubject" ||
                    pathname === "/addSubtopic"
                      ? "text-white bg-orange-500"
                      : "text-black"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  subject
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/banner"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/banner"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/banner" && "text-white bg-orange-500"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  banner
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/userDetails"
                className="
                   flex space-x-3"
              >
                <span
                  className={`${
                    pathname === "/userDetails" ||
                    pathname === "/addUser" ||
                    pathname === "/editUser"
                      ? "border-l-4 border-orange-500"
                      : "border-none"
                  } rounded-r-lg `}
                ></span>
                <span
                  className={`${
                    pathname === "/userDetails" ||
                    pathname === "/addUser" ||
                    pathname === "/editUser"
                      ? "text-white bg-orange-500"
                      : "text-black"
                  } group w-full outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                >
                  user
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* dashboard menu */}
      <div
        className={`${
          toggle === true
            ? " absolute right-0 top-14 flex w-62.5 flex-col rounded-md border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
            : "hidden"
        } `}
      >
        <ul className="flex flex-col dark:text-white text-left font-medium capitalize">
          <li onClick={Navigation}>
            <NavLink to="/resetpassword">
              <button
                type="button"
                className={`${
                  pathname === "/resetpassword"
                    ? "text-white bg-gray-600"
                    : "text-black"
                }  py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600`}
              >
                Reset Password
              </button>
            </NavLink>
          </li>
          <li onClick={Navigation}>
            <button
              type="button"
              className={`${
                pathname === "/resetpassword"
                  ? "text-white bg-gray-600"
                  : "text-black"
              }  py-2 px-4 w-full text-left outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600`}
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <LogoutConfimation
          confirm={confirm}
          onLogout={handleLogout}
          onCancel={handleToggle}
        />
      </div>
    </>
  );
}
export default Navbar;
