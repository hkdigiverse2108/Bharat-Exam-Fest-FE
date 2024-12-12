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
          <main className="h-full overflow-y-auto p-4 overflow-x-hidden ">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
