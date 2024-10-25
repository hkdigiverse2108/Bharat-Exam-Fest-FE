import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SideNavbar() {
  const { pathname } = useLocation();
  const [active, setActive] = useState();
  const handleClick = (event) => {
    setActive(event);
    localStorage.setItem("adminpanel", active);
  };

  const navigationPage = [
    { id: 1, text: "Income Expense", url: "/" },
    { id: 2, text: "KYC", url: "/kyc" },
    { id: 3, text: "Report", url: "/report" },
    { id: 4, text: "Add Contest", url: "/addContest" },
    { id: 5, text: "Contestant Earning", url: "/contestEarning" },
    { id: 6, text: "Content Type", url: "/contestType" },
    { id: 7, text: "Classes", url: "/classes" },
    {
      id: 8,
      text: "Information",
      url: "/information",
    },
    {
      id: 9,
      text: "Subject",
      url: "/subject",
    },
    { id: 10, text: "Banner", url: "/banner" },
    {
      id: 11,
      text: "User",
      url: "/userDetails",
    },
  ];

  useEffect(() => {
    const storedTab = localStorage.getItem("adminpanel");
    if (storedTab) {
      setActive(storedTab);
    } else {
      setActive(1);
    }
    
  }, []);
  console.log(active);

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
                {navigationPage.map((value, index) => {
                  return (
                    <NavLink to={value.url}>
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
