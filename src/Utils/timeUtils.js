export const convertUtcToIst = (utcDate) => {
  const date = new Date(utcDate);
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const istDate = new Date(date.getTime() + istOffset); // Add IST offset
  return istDate.toISOString().replace("Z", "+05:30"); // Replace 'Z' with '+05:30'
};

export const convertIstToUtc = (dateString) => {
  const istDate = new Date(dateString);
  if (isNaN(istDate.getTime())) {
    throw new Error("Invalid IST date format");
  }
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  const utcDate = new Date(
    istDate.toLocaleString(istDate.getTime() - istOffset)
  );
  return utcDate.toISOString();
};
