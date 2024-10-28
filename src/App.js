import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "./Component/layout/DefaultLayout.js"
import LoginPage from "./Component/Login/LoginPage.js";
import Loading from "./Component/Loader/Loading.js";
import PageNotfound from "./Component/Page404.js";
import UserDetails from "./Component/UserData/UserDetails";
import HomeBanner from "./Component/Banner/HomeBanner";
import SubjectData from "./Component/Subjects/SubjectData";
import AddSubject from "./Component/Subjects/AddSubject";
import EditSubjectSection from "./Component/Subjects/EditSubjectSection";
import AddIntroduction from "./Component/Information/AddIntroduction";
import ContestHome from "./Component/ContestType/ContestHome";
import ClassesHomePage from "./Component/Classes/ClassesHomePage";
import InformationHome from "./Component/Information/InformationHome";
import AddUser from "./Component/UserData/AddUser";
import EditUser from "./Component/UserData/Edituser";
import ReportHomePage from "./Component/Report/ReportHomePage";
import KYCHomePage from "./Component/KYC/KYCHomePage";
import ContestEarningHome from "./Component/ContestEarning/ContestEarningHome";
import Incomeboard from "./Component/IncomeExpense/Incomeboard";
import PasswordUpdate from "./Component/NewPassword/PasswordUpdate";
import CreateContest from "./Component/AddContest/CreateContest";
import AddContestHomepage from "./Component/AddContest/AddContestHomepage";

function App() {
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  const loginInfo = useSelector((state) => state.authConfig);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <>
      {loginInfo.isLoggedIn !== true ? (
        <div className="flex items-center justify-center min-h-screen overflow-hidden">
          <Suspense fallback={<Loading />}>
            <LoginPage />
          </Suspense>
        </div>
      ) : loading ? (
        <Loading />
      ) : (
        <DefaultLayout>
          <Routes>
            <Route exact path="/" element={<Incomeboard />} />
            <Route path="/kyc" element={<KYCHomePage />} />
            <Route path="/report" element={<ReportHomePage />} />
            <Route path="/addContest" element={<AddContestHomepage />} />
            <Route path="/createContest" element={<CreateContest />} />
            <Route path="/contestEarning" element={<ContestEarningHome />} />
            <Route path="/classes" element={<ClassesHomePage />} />
            <Route path="/contestType" element={<ContestHome />} />
            <Route path="/information" element={<InformationHome />} />
            <Route path="/addIntroduction" element={<AddIntroduction />} />
            <Route path="/subject" element={<SubjectData />} />
            <Route path="/addSubject" element={<AddSubject />} />
            <Route path="/editSubject" element={<EditSubjectSection />} />
            <Route path="/banner" element={<HomeBanner />} />
            <Route path="/userDetails" element={<UserDetails />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route exact path="/resetpassword" element={<PasswordUpdate />} />
            <Route path="*" element={<PageNotfound />} />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
