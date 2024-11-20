import React, { useEffect, useState } from "react";
import Verified from "./Verified";
import Pending from "./Pending";
import Unverified from "./Unverified";
import axios from "axios";
import { useSelector } from "react-redux";

export default function KYCHomePage() {
  const [kycData, setKycData] = useState([]);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([]);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const fetchKycData = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/kyc/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      console.log("kyc_data", response.data.data.kyc_data);

      setKycData(response.data.data.kyc_data);
      // setDataToDisplay(response.data.data.kyc_data.slice(0, itemsPerPage));
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, []);

  useEffect(() => {
    // Function to filter data based on status
    const filterData = () => {
      const pending = kycData.filter(user => user.status === 'pending');
      const approved = kycData.filter(user => user.status === 'approved');
      const unverified = kycData.filter(user => user.user.isMobileVerified === false);
      const verified = kycData.filter(user => user.user.isMobileVerified === true && user.status !== 'pending');

      setPendingUsers(pending);
      setApprovedUsers(approved);
      setUnverifiedUsers(unverified);
      setVerifiedUsers(verified);
    };

    filterData(); 
  }, [kycData]);

  return (
    <>
      <section className="space-y-4 pb-4">
        <Verified verifiedData={verifiedUsers}/>
        <Pending pendingData={pendingUsers}/>
        <Unverified unverifiedData={unverifiedUsers}/>
      </section>
    </>
  );
}
