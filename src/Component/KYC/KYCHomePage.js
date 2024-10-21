import React from "react";
import Verified from "./Verified";
import Pending from "./Pending";
import Unverified from "./Unverified";

export default function KYCHomePage() {
  return (
    <>
      <section className="space-y-4 pb-4">
        <Verified />
        <Pending />
        <Unverified />
      </section>
    </>
  );
}
