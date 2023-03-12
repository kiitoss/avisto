import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = (props) => {
  const { min, max } = props;
  const [value, setValue] = useState([min, max]);

  console.log(value);
  console.log(min);
  console.log(max);

  const handleChange = (event, newValue) => {
    console.log(min);
    console.log(max);
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "20%", textAlign: "center" }}>{min}</Box>
      <Box sx={{ width: "60%", mx: 2 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={min}
          max={max}
        />
      </Box>
      <Box sx={{ width: "20%", textAlign: "center" }}>{max}</Box>
    </Box>
  );
};

export default RangeSlider;
