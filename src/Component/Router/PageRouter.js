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
import HowToPlay from "../ContestType/HowToPlay";
import ClassesHomePage from "../Classes/ClassesHomePage";
import InformationHome from "../Information/InformationHome";
import AddUser from '../UserData/AddUser';
import EditUser from '../UserData/Edituser';
import ReportHomePage from "../Report/ReportHomePage";
import KYCHomePage from "../KYC/KYCHomePage";
import ContestEarningHome from "../ContestEarning/ContestEarningHome";

function PageRouter() {
  return (
    <Routes>
      <Route exact path="/" element={<UserDetails />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/editUser" element={<EditUser />} />
      <Route path="/contestEarning" element={<ContestEarningHome />} />
      <Route path="/kyc" element={<KYCHomePage />} />
      <Route path="/report" element={<ReportHomePage />} />
      <Route path="/banner" element={<HomeBanner />} />
      <Route path="/subject" element={<SubjectData />} />
      <Route path="/addSubject" element={<AddSubject />} />
      <Route path="/addIntroduction" element={<AddIntroduction />} />
      <Route path="/classes" element={<ClassesHomePage />} />
      <Route path="/contestType" element={<HowToPlay />} />
      <Route path="/information" element={<InformationHome />} />
      <Route path="/editSubject" element={<EditSubjectSection />} />
      <Route exact path="/profile" element={<Profilepage />} />
      <Route path="*" element={<PageNotfound />} />
    </Routes>
  );
}
export default PageRouter;
