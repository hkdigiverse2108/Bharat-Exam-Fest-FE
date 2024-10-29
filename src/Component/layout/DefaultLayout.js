import React from "react";
import Navbar from "../Navigationbar/Navbar";
import Sidebar from "../SideNavbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100 ">
        <Sidebar />
        <div className="relative flex flex-col flex-1  h-screen overflow-hidden">
          <Navbar />
          <main className="h-full overflow-y-auto overflow-x-hidden ">
            <div className=" w-full h-full p-4 ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
