import React, { useEffect } from "react";
import RangeSlider from "./RangeSlider";
import MultipleSelect from "./MultipleSelect";
import { capitalize } from "../utils";
import markerColors from "../marker-colors";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FilterAccordion = (props) => {
  const { filters, source, onChange } = props;
  const { name, labels, color } = source;

  const handleCheckboxChange = (e) => {
    onChange({
      ...filters,
      is_active: e.target.checked,
    });
  };

  const onUpdate = (key, value) => {
    filters.dataFilters[key].value = value;
    onChange(filters);
  };

  useEffect(() => {
    Object.entries(filters.dataFilters).map(([key, filter]) => {
      if (!filter.type) return;

      if (!filter.value) {
        if (filter.type === "range") {
          filter.value = { min: filter.min, max: filter.max };
        } else if (filter.type === "multiselect") {
          filter.value = filter.options;
        }
      }
    });
  }, []);

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
          expandIcon={
            Object.entries(filters.dataFilters).length > 0 && (
              <ExpandMoreIcon sx={{ fill: "white" }} />
            )
          }
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
                  backgroundColor: markerColors[color],
                }}
                className="mr-4 h-full w-2"
              ></span>
              <input
                type="checkbox"
                checked={filters.is_active}
                className="mr-4 pl-4"
                onChange={handleCheckboxChange}
              />
              <span className="py-2 text-lg">{name}</span>
            </label>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <ul className="mt-2 text-sm">
            {Object.entries(filters.dataFilters).map(
              ([key, filter]) =>
                filter.type && (
                  <li key={key} className="pb-4">
                    <h4 className="font-bold pb-1">
                      {capitalize(labels[key])} :
                    </h4>
                    {filter.type === "range" && (
                      <RangeSlider
                        min={filter.min}
                        max={filter.max}
                        onUpdate={(newValue) => onUpdate(key, newValue)}
                      />
                    )}
                    {filter.type === "multiselect" && (
                      <MultipleSelect
                        options={filter.options}
                        initialValues={filter.options}
                        onUpdate={(newValue) => onUpdate(key, newValue)}
                      />
                    )}
                  </li>
                )
            )}
          </ul>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
