import React, { useEffect, useState } from "react";
import ResultBanner from "./ResultBanner";
import ImgUpdatePage from "./ImgUpdatePage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BannerData from "./BannerData";
import { bannerDataList } from "../../Context/Action/index";
import fetchData from "../../Hooks/bannerService";

export default function HomeBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token)
  const [bannerData, setBannerData] = useState([]);
  const [homeData, setHomeData] = useState([]);
  const [resultData, setResultData] = useState([]);
  const [confirm, setConfirm] = useState(false);

  // const handleDataShow = (value) => {
  //   console.log(value);
  //   setConfirm(!confirm);
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData(accessToken);
        setBannerData(data);
        // dispatch(bannerDataList(data)); 
      } catch (error) {
        toast.error(error.message);
      }
    };

    getData();
  }, [accessToken, dispatch]);

  useEffect(() => {
    // Filter the banner data based on the selected type
    const homeFiltered = bannerData.filter(item => item.type === 'home');
    const resultFiltered = bannerData.filter(item => item.type === 'result');

    setHomeData(homeFiltered);
    setResultData(resultFiltered);
  }, [bannerData]);

  return (
    <>
      <section className="space-y-6">
        <BannerData home={bannerData}/>
        <ResultBanner result={resultData} />
      </section>
    </>
  );
}
