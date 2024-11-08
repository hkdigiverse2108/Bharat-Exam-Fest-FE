import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Chip, Stack } from "@mui/material";

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

const listName = ["Economics", "Polity & GOV", "Geography", "Current Affairs"];

function getStyles(name, personName, theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function MultipleSelect({ onChange }) {
  const theme = useTheme();
  const [subtopics, setSubtopics] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSelectedNames(value);

    onChange(value);
  };

  const fetchSubtopics = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      // console.log(response.data.data.sub_topic_data);
      setSubtopics(response.data.data.sub_topic_data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchSubtopics();
  }, []);

  return (
    <>
      <FormControl className="container h-full">
        <InputLabel id="demo-multiple-name-label" size="small">
          Subtopics
        </InputLabel>
        <Select
          multiple
          value={selectedNames}
          onChange={handleChange}
          renderValue={(selected) => selected.join(", ")}
          size="small"
        >
          {subtopics.map((value) => (
            <MenuItem key={value._id} value={value.name}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
