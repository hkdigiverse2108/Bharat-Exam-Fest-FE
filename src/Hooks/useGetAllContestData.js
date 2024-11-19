import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setContestData } from "../Context/Action";

const useGetAllContestData = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  useEffect(() => {
    const fetchContestData = async () => {
      try {
        const response = await axios.get(
          "https://api-bef.hkdigiverse.com/contest/all?page=1&limit=10",
          {
            headers: {
              Authorization: accessToken,
              Accept: "application/json",
            },
          }
        );
        const contestData = response.data.data.contest_data;

        dispatch(setContestData(contestData));
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchContestData();
  }, [accessToken]);
};
export default useGetAllContestData;
