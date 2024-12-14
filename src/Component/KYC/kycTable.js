import React, { useEffect, useState } from "react";

const KycTable = ({ initialData }) => {
  const [data, setData] = useState([]); // Initialize with an empty array if initialData is undefined
  const [filteredData, setFilteredData] = useState({
    verified: [],
    pending: [],
    unverified: [],
  });

  useEffect(() => {
    const filterDataByStatus = (data) => {
      const verified = data.filter((user) => user.status === "verified");
      const pending = data.filter((user) => user.status === "pending");
      const unverified = data.filter((user) => user.status === "unverified");

      return { verified, pending, unverified };
    };

    setFilteredData(filterDataByStatus(initialData));
  }, [initialData]);

  const handleStatusChange = (id, newStatus) => {
    console.log("brfore", newStatus);

    const updatedData = data.map((user) =>
      user._id === id 
    );
    console.log("update", updatedData);

    // setData(updatedData);
  };

  const renderTable = (users, title) => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-2 px-4 border-b">User ID</th>
                <th className="py-2 px-4 border-b">ID Number</th>
                <th className="py-2 px-4 border-b">ID Proof</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{user.userId}</td>
                    <td className="py-2 px-4 border-b">{user.idNumber}</td>
                    <td className="py-2 px-4 border-b">{user.idProof}</td>
                    <td className="py-2 px-4 border-b">
                      <select
                        value={user.status}
                        onChange={(e) =>
                          handleStatusChange(user._id, e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-1"
                      >
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="unverified">Unverified</option>
                      </select>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {/* You can add additional actions here if needed */}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-2 px-4 text-center">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">KYC Management</h1>
      {renderTable(filteredData.verified, "Verified Users")}
      {renderTable(filteredData.pending, "Pending Users")}
      {renderTable(filteredData.unverified, "Unverified Users")}
    </div>
  );
};

export default KycTable;
