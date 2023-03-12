import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value) {
  return `${value}°C`;
}

const RangeSlider = (props) => {
  const { min, max } = props;
  const [value, setValue] = useState([min, max]);

  const handleChange = (event, newValue) => {
    console.log(min);
    console.log(max);
    console.log(newValue);
    setValue(newValue);
  };

  return (
    <Box>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
