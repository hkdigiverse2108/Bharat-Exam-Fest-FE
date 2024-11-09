import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import DropdownUser from "./DropdownUser";

function Navbar() {
  const location = useLocation();
  const { pathname } = location;
  const [navbarOpen, setNavbarOpen] = useState(false);
  function Navigation() {
    setNavbarOpen(!navbarOpen);
  }

  return (
    <>
      <header className="sticky top-0 z-20 h-20 px-4 py-4  flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex flex-grow items-center justify-between">
          <div className="flex items-center justify-start gap-x-20">
            <div className="flex items-center gap-2 sm:gap-4">
              <NavLink className="block flex-shrink-0 " to="/">
                <div className="flex items-center justify-center text-3xl font-semibold px-6">
                  <span className=" text-center  text-orange-600  whitespace-nowrap">
                    Dash
                  </span>
                  <span className=" text-center text-black whitespace-nowrap">
                    Stack
                  </span>
                </div>
              </NavLink>
            </div>
            {/* navigationtab */}
            <nav className="flex items-center justify-start duration-300 ease-linear  md:hidden lg:block xl:block 2xl:block ">
              <ul className=" flex gap-x-1.5">
                <li>
                  <NavLink
                    to="/"
                    className={`${
                      pathname === "/" && "text-white bg-orange-600"
                    } group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/subjects"
                    className={` ${
                      pathname === "/subjects" ||
                      pathname === "/subjectDetails" ||
                      pathname === "/addQuestion" ||
                      pathname === "/editQuestion"
                        ? "text-white bg-orange-600"
                        : "text-black"
                    } group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
                  >
                    Add Question
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center justify-around gap-2.5">
            <div className=" items-center">
              <DropdownUser />
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
              <button
                className=" text-md text-slate-500 p-2 mt-2 hover:bg-slate-500 hover:text-white rounded-full lg:hidden xl:hidden 2xl:hidden"
                onClick={Navigation}
                title="Menu"
              >
                <svg viewBox="0 0 16 16" className="h-6 w-6">
                  <RiMenuLine />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* toggle menu */}
      <div
        className={`${
          navbarOpen === true
            ? "block lg:hidden w-full px-4 py-6 bg-sky-100 border-b shadow-md duration-300 ease-linear"
            : "hidden"
        }`}
        id="mobile-menu"
      >
        <nav className=" h-full text-md font-medium  overflow-y-auto duration-300 ease-linear ">
          <ul className="mb-6 flex flex-col gap-1.5">
            <li>
              <NavLink
                to="/"
                className={`${
                  pathname === "/" && "text-white bg-orange-600"
                } group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/subjects"
                className={` ${
                  pathname === "/subjects" ||
                  pathname === "/subjectDetails" ||
                  pathname === "/addQuestion" ||
                  pathname === "/editQuestion"
                    ? "text-white bg-orange-600"
                    : "text-black"
                } group relative flex items-center gap-2.5 outline-none rounded-md duration-300 ease-in-out capitalize hover:text-white hover:bg-gray-600 py-2 px-4 font-medium `}
              >
                Add Question
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Navbar;
