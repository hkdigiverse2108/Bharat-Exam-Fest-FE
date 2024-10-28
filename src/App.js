import { Suspense, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./Component/Login/LoginPage";
import SubjectPage from "./Component/Subjects/SubjectPage";
import DefaultLayout from "./Component/layout/DefaultLayout";
import DashboardMain from "./Component/Dashboard/DashboardMain";
import SubjectDetails from "./Component/Subjects/SubjectDetails";
import AddQuestion from "./Component/Subjects/AddQuestion";
import EditQuestion from "./Component/Subjects/EditQuestion";
import ProfilePage from "./Component/ProfilePage";
import Loading from "./Component/Loader/Loading";

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
            <Route exact path="/" element={<DashboardMain />} />
            <Route path="/question" element={<SubjectPage />} />
            <Route path="/subjectDetails" element={<SubjectDetails />} />
            <Route path="/addQuestion" element={<AddQuestion />} />
            <Route path="/editQuestion" element={<EditQuestion />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
