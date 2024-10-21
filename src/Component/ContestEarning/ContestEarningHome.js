import React from "react";
import ContestwiseEarn from "./ContestwiseEarn";
import SubjecteEarn from "./SubjectEarn";
import SlotTimeEarn from "./SlotTimeEarn";
import UserEarn from "./UserEarn";
import CochingEarn from "./CochingEarn";

export default function ContestEarningHome() {
  return (
    <>
      <div className="overflow-hidden space-y-4 pb-4">
        <ContestwiseEarn />
        <SubjecteEarn />
        <SlotTimeEarn />
        <UserEarn />
        <CochingEarn />
      </div>
    </>
  );
}
