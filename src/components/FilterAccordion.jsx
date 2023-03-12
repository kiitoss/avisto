import React from "react";
import RangeSlider from "./RangeSlider";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterAccordion = (props) => {
  const { index, backgroundColor, handleCheckboxChange, dataSource, filters } =
    props;
  return (
    <div>
      <Accordion
        square
        disableGutters
        sx={{
          backgroundColor: "transparent",
          color: "white",
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ fill: "white" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          className="hover:bg-gray-700"
          sx={{
            padding: 0,
            minHeight: 0,
            "& .MuiAccordionSummary-content": {
              margin: 0,
              height: "100%",
            },
          }}
        >
          <div className="grow flex">
            <label className="grow flex items-center cursor-pointer">
              <span
                style={{
                  backgroundColor: backgroundColor,
                }}
                className="mr-4 h-full w-2"
              ></span>
              <input
                type="checkbox"
                checked={dataSource.enabled}
                name={`checkbox-${index}`}
                className="mr-2 pl-4"
                onChange={(e) => handleCheckboxChange(e, index)}
              />
              <span className="py-2">{dataSource.name}</span>
            </label>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {filters && (
            <ul className="m-4 mt-2 text-gray-400 text-sm">
              {Object.entries(filters).map(([key, infoFilter]) => (
                <li key={key}>
                  {key} : {infoFilter?.toString()}
                  {infoFilter.type === "number" && (
                    <RangeSlider min={infoFilter.min} max={infoFilter.max} />
                  )}
                </li>
              ))}
            </ul>
          )}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
