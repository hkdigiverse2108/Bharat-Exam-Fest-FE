import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FiFilter } from "react-icons/fi";
import Calander from "./Calander";

export default function FilterDropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [date, setDate] = React.useState(false);
  // function handleDateshow() {
  //   setDate(!date);
  // }
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    // setDate(!date);
  };

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="inline-flex items-center space-x-2 rounded-lg text-md text-center bg-orange-500 hover:bg-opacity-90 "
      >
        <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
          <FiFilter />
        </svg>
        <p className=" font-semibold text-white">Filter</p>
      </Button>
      <div className="flex">
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Day wise</MenuItem>
          <MenuItem onClick={handleClose}>Week wise</MenuItem>
          <MenuItem onClick={handleClose}>Month wise</MenuItem>
        </Menu>

        {/* <div className="flex flex-col">
              <div className="flex-1">
                <p className="text-start text-lg font-medium text-gray-800">
                  Today
                </p>
                <div className="space-y-2 w-full">
                  <p className="rounded-lg px-2 py-2 text-md text-normal text-start text-slate-600 bg-orange-100 hover:bg-orange-300  hover:bg-opacity-90">
                    22th November 2024
                  </p>
                </div>
              </div>
            </div>
            </div> */}
      </div>

      {/* <div className={`${date === true ? "block" : "hidden"}`}>
        <Calander confirm={date} setConfirm={() => handleDateshow()} />
      </div> */}
    </>
  );
}
