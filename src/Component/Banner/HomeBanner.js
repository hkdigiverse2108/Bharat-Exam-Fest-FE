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

export default function HomeBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const [bannerData, setBannerData] = useState([]);
  const [confirm, setConfirm] = useState(false);

  // const handleDataShow = (value) => {
  //   console.log(value);
  //   setConfirm(!confirm);
  // };

  const fetchData = async () => {
    try {
      const urlBanner = `https://api-bef.hkdigiverse.com/banner/all`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: urlBanner,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.request(config);

      const { status, data, message, error } = response.data;

      // console.log("Backend response", message);

      if (status === 200) {
        // console.log("Backend response", data.banner_data);
        if (JSON.stringify(data.banner_data) !== JSON.stringify(bannerData)) {
          setBannerData(data.banner_data);
          if (data.banner_data !== null) {
            dispatch(bannerDataList(data.banner_data));
          }
        }
      } else {
        console.warn("failed:", error);
        toast.error("Failed to fetch data from one or both endpoints.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className=" space-y-6">
        <BannerData />
        <ResultBanner />
      </section>
    </>
  );
}
