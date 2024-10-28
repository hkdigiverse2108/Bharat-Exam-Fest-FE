import React, { useState, ReactNode, Suspense } from "react";
import { useSelector } from "react-redux";

import Navbar from "../Navigationbar/Navbar";
import LoginPage from "../Loader/Loading.js";
import Loading from "../Loader/Loading.js";

const DefaultLayout = ({ children }) => {
  const loginInfo = useSelector((state) => state.authConfig);
  return (
    <>
      {loginInfo.isLoggedIn !== true ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-boxdark-2 dark:text-bodydark">
          <div className="relative flex flex-col h-screen overflow-hidden">
            <Navbar />
            <main className=" overflow-y-auto overflow-x-hidden ">
              <div className=" w-full p-4 md:p-6 ">
                {children}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default DefaultLayout;
