import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function MultipleSelect(props) {
  const { options = [], initialValues = [] } = props;
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Select
      multiple
      value={values}
      onChange={handleChange}
      className="w-full"
      sx={{
        fontSize: "0.875rem",
        lineHeight: "1.25rem",

        color: "white",
        ".MuiSelect-select": {
          padding: "10px",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        "& .MuiSelect-icon": {
          color: "white",
        },
      }}
    >
      {options.map((value) => (
        <MenuItem key={value} value={value} className="text-sm">
          {value}
        </MenuItem>
      ))}
    </Select>
  );
}
