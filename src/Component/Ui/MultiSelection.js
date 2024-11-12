import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

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

export default function MultipleSelect({ onChange }) {
  const [subtopics, setSubtopics] = useState([]);
  const [classNames, setClassNames] = useState([]);

  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const handleChange = (event) => {
    const { value } = event.target;
    
    const dataId = value.map((res) => res?._id);
    console.log(dataId);
    setSelectedNames(value);
    onChange(dataId);
    // console.log(value);
    console.log(dataId);
  };

  const fetchClassname = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/question/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      // console.log(response.data.data.question_data);

      setSubtopics(response.data.data.question_data);
      const classes = response.data.data.question_data.map(
        (question) => question.classes
      );
      setClassNames(classes);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchClassname();
  }, []);
  return (
    <>
      <FormControl className="container h-full">
        <InputLabel id="demo-multiple-name-label" size="small">
          Classes
        </InputLabel>
        <Select
          multiple
          value={selectedNames}
          onChange={handleChange}
          renderValue={(selected) => selected.map((s) => s.name).join(", ")}
          size="small"
          MenuProps={MenuProps}
        >
          {classNames.map((value,index) => (
            <MenuItem key={index} value={value}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
