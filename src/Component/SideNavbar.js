import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideNavbar({ sidebarOpen, onStateChange }) {
  const { pathname } = useLocation();
  const nnavigationPage = [
    { text: "Income Expense" ,to:"/incomeExpense"},
    { text: "KYC" ,to:"/kyc"},
    { text: "Report" ,to:"/report"},
    { text: "Contestant Earning" ,to:"/contestEarning"},
    { text: "Content Type", to: "/contestType" },
    { text: "Classes", to: "/classes" },
    { text: "Information", to: "/information" },
    { text: "Subject", to: "/subject" },
    { text: "Banner", to: "/banner" },
    { text: "User", to: "/" },
  ];
  // const [menu, setMenu] = useState(false);

  return (
    <>
      <aside className="absolute left-0 top-0 z-20 flex h-screen w-full flex-col overflow-y-auto bg-inherite border-r duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 -translate-x-fullhidden lg:block xl:block 2xl:block">
        <div className="flex items-center justify-center text-2xl font-semibold py-6">
          <span className=" text-center  text-orange-600  whitespace-nowrap">
            Dash
          </span>
          <span className=" text-center text-black whitespace-nowrap">
            Stack
          </span>
        </div>

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-5 pr-4">
            <div>
              <ul className="mb-6 flex flex-col gap-1">
                {nnavigationPage.map((value, index) => {
                  return (
                    <NavLink to={value.to}>
                      <li className="flex gap-x-5" Key={index.toString()}>
                        <span
                          className={`${
                            pathname === value.to
                              ? "border-l-4 border-orange-500"
                              : "border-none"
                          } rounded-r-lg `}
                        ></span>
                        <button
                          type="button"
                          className={`${
                            pathname === value.to
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
            </div>
          </nav>
        </div>
      </aside>
      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-center"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
export default SideNavbar;
