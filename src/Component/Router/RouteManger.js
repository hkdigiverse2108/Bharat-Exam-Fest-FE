import React from "react";
import { Routes, Route } from "react-router-dom";
import PageNotfound from "../Page404";
import UserDetails from "../UserData/UserDetails";
import Profilepage from "../ProfilePage";
import HomeBanner from "../Banner/HomeBanner";
import SubjectData from "../Subjects/SubjectData";
import AddSubject from "../Subjects/AddSubject";
import EditSubjectSection from "../Subjects/EditSubjectSection";
import AddIntroduction from "../Information/AddIntroduction";
import ContestHome from "../ContestType/ContestHome";
import ClassesHomePage from "../Classes/ClassesHomePage";
import InformationHome from "../Information/InformationHome";
import AddUser from "../UserData/AddUser";
import EditUser from "../UserData/Edituser";
import ReportHomePage from "../Report/ReportHomePage";
import KYCHomePage from "../KYC/KYCHomePage";
import ContestEarningHome from "../ContestEarning/ContestEarningHome";
import Incomeboard from "../IncomeExpense/Incomeboard";
import PasswordUpdate from "../NewPassword/PasswordUpdate";
import CreateContest from "../AddContest/CreateContest";
import AddContestHomepage from "../AddContest/AddContestHomepage";
// import Loading from "../Loader/Loading";

// const PageRouting = createBrowserRouter([
//   {
//     path: "/",
//     element: <UserDetails />,
//     loader: <Loading />,
//     children: [
//       {
//         path: "addUser",
//         element: <AddUser />,
//         loader: <Loading />,
//       },
//       {
//         path: "editUser",
//         element: <EditUser />,
//         loader: <Loading />,
//       },
//     ],
//   },
//   {
//     path: "/banner",
//     element: <HomeBanner />,
//     loader: <Loading />,
//   },
//   {
//     path: "/subject",
//     element: <SubjectData />,
//     loader: <Loading />,
//     children: [
//       {
//         path: "addSubject",
//         element: <AddSubject />,
//         loader: <Loading />,
//       },
//       {
//         path: "editSubject",
//         element: <EditSubjectSection />,
//         loader: <Loading />,
//       },
//     ],
//   },
//   {
//     path: "/information",
//     element: <InformationHome />,
//     loader: <Loading />,
//     children: [
//       {
//         path: "addIntroduction",
//         element: <AddIntroduction />,
//         loader: <Loading />,
//       },
//     ],
//   },
//   {
//     path: "/classes",
//     element: <ClassesHomePage />,
//     loader: <Loading />,
//   },
//   {
//     path: "/contestType",
//     element: <ContestHome />,
//     loader: <Loading />,
//   },
//   {
//     path: "/contestEarning",
//     element: <ContestEarningHome />,
//     loader: <Loading />,
//   },
//   {
//     path: "/report",
//     element: <ReportHomePage />,
//     loader: <Loading />,
//   },
//   {
//     path: "/kyc",
//     element: <KYCHomePage />,
//     loader: <Loading />,
//   },
//   {
//     path: "/incomeExpense",
//     element: <Incomeboard />,
//     loader: <Loading />,
//   },
//   {
//     path: "/profile",
//     element: <Profilepage />,
//     loader: <Loading />,
//   },
//   {
//     path: "*",
//     element: <PageNotfound />,
//     loader: <Loading />,
//   },
// ]);
// export { PageRouting };

export default function RouteManger() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Incomeboard />} />
        <Route path="/contestEarning" element={<ContestEarningHome />} />
        <Route path="/kyc" element={<KYCHomePage />} />
        <Route path="/report" element={<ReportHomePage />} />
        <Route path="/addContest" element={<AddContestHomepage />} />
        <Route path="/createContest" element={<CreateContest />} />
        <Route path="/subject" element={<SubjectData />} />
        <Route path="/addSubject" element={<AddSubject />} />
        <Route path="/editSubject" element={<EditSubjectSection />} />
        <Route path="/classes" element={<ClassesHomePage />} />
        <Route path="/contestType" element={<ContestHome />} />
        <Route path="/information" element={<InformationHome />} />
        <Route path="/addIntroduction" element={<AddIntroduction />} />
        <Route path="/banner" element={<HomeBanner />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/editUser" element={<EditUser />} />
        <Route exact path="/resetpassword" element={<PasswordUpdate />} />
        <Route path="*" element={<PageNotfound />} />
      </Routes>
    </>
  );
}
