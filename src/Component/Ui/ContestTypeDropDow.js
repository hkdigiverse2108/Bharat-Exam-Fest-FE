import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";

function ContestTypeDropDow({ value, onChange }) {
  return (
    <>
       <Box
        sx={{
          "& .MuiSelect-select": {
            paddingRight: 1,
            paddingLeft: 1,
            paddingTop: 1,
            paddingBottom: 1,
          },
          '& fieldset': { borderRadius: 2 }
        }}
      >
        <FormControl fullWidth>
          {/* <InputLabel id="ranks">Rank</InputLabel> */}
          <Select
            labelId="ranks"
            id="ranks"
            value={value} 
            onChange={onChange} 
          >
            <MenuItem value="1st">1st</MenuItem>
            <MenuItem value="2nd">2nd</MenuItem>
            <MenuItem value="3rd">3rd</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  )
}

export default ContestTypeDropDow
