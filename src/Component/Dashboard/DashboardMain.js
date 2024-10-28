import React from "react";
import Dashboard from "./Dashboard";
import ContestwiseEarn from "./ContestwiseEarn";
import Privacy from "./Privacy";

export default function DashboardMain() {
  return (
    <>
      <div className=" overflow-hidden space-y-6 pb-4">
        <Dashboard />
        <ContestwiseEarn />
        <Privacy/>
      </div>
    </>
  );
}
