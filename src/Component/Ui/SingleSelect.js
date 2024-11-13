import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SingleSelect({ label, value, onChange, options }) {
  return (
    <>
      <FormControl className="container h-full" size="small">
        <InputLabel id={`${label}-label`} size="small">
          {label}
        </InputLabel>
        <Select
          labelId={`${label}-label`}
          value={value}
          label={label}
          onChange={onChange}
          MenuProps={MenuProps}
        >
          {options.map((option,index) => (
            <MenuItem key={index} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
