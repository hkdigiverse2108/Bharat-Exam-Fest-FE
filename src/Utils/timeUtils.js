import moment from "moment-timezone";

export const convertUtcToIst = (utcDate) => {
  const istDate = moment(utcDate).tz("Asia/Kolkata", true);
  // console.log("istDate", istDate);
  return istDate.toISOString();
};

export const convertIstToUtc = (iscDate) => {
  const utcTime = moment(iscDate).tz("Asia/Kolkata", true).utc();
  // console.log("utcTime", utcTime);
  return utcTime.toISOString();
};