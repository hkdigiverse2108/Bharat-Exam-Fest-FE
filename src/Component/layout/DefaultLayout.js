import React, { useState, ReactNode, Suspense } from "react";
import Navbar from "../Navigationbar/Navbar";
import Sidebar from "../SideNavbar";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-gray-100 ">
        <Sidebar />
        <div className="relative flex flex-col flex-1  h-screen overflow-hidden">
          <Navbar />
          <main className=" overflow-y-auto overflow-x-hidden ">
            <div className=" w-full p-4 md:p-6 ">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
