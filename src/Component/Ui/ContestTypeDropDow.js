import React, { useEffect, useState } from "react";
import { Box, FormControl, Select, MenuItem, InputLabel } from "@mui/material";

function ContestTypeDropDown({ contestTypeData, onChange, value }) {
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
        {/* <InputLabel id="contest-type-label" size="small">
          Contest Type
        </InputLabel> */}
        <Select
          labelId="contest-type-label"
          id="contest-type"
          value={value}
          onChange={onChange}
        >
          <MenuItem value="">None</MenuItem>
          {contestTypeData.map((type) => (
            <MenuItem key={type._id} value={type}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default ContestTypeDropDown;
