import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem } from "@mui/material"; // Ensure you have @mui/material installed
import { fetchContestTypes } from "../../Hooks/getContestTypeApi"; // Adjust the path as necessary
import { useSelector } from "react-redux";

function ContestTypeDropDown({ value, onChange }) {
  const [contestTypes, setContestTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.authConfig.userInfo[0]);

  useEffect(() => {
    const loadContestTypes = async () => {
      try {
        // Get the access token
        const data = await fetchContestTypes(token); // Pass the access token to the API call
        
        setContestTypes(data.data); // Assuming data is an array of contest types
        console.log("contesttype",contestTypes);
      } catch (err) {
        setError("Failed to load contest types");
      } finally {
        setLoading(false);
      }
    };

    loadContestTypes();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or similar
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  return (
    <Box
      sx={{
        "& .MuiSelect-select": {
          paddingRight: 1,
          paddingLeft: 1,
          paddingTop: 1,
          paddingBottom: 1,
        },
        "& fieldset": { borderRadius: 2 },
      }}
    >
      <FormControl fullWidth>
        <Select
          labelId="contest-type"
          id="contest-type"
          value={value}
          onChange={onChange}
        >
          {contestTypes.map((type) => (
            <MenuItem key={type.id} value={type.id}>
              {" "}
              {/* Assuming each type has a unique id */}
              {type.name}{" "}
              {/* Adjust according to your API response structure */}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ContestTypeDropDown;
