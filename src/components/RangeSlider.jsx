import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const RangeSlider = (props) => {
  const { min, max, onUpdate } = props;
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    onUpdate({
      min: newValue[0],
      max: newValue[1],
    });
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "20%", textAlign: "center" }}>{min}</Box>
      <Box sx={{ width: "60%", mx: 2 }}>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={min}
          max={max}
        />
      </Box>
      <Box sx={{ width: "20%", textAlign: "center" }}>{max}</Box>
    </Box>
  );
};

export default RangeSlider;
