import React from "react";
import { HiX } from "react-icons/hi";
import FilterAccordion from "./FilterAccordion";

import { getSourceById } from "../utils";

const Filters = (props) => {
  const { isOpen, onClose, filters, onChange } = props;

  const handleChange = (id, newValue) => {
    filters[id] = newValue;
    onChange(filters);
  };

  const sourceIds = Object.keys(filters);

  return (
    <div
      className={`opacity-90 absolute top-0 left-0 h-screen overflow-auto w-72 max-w-screen bg-gray-800 text-white transition-all duration-300 transform ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between pt-4 text-xl font-bold px-4">
        <h2 className="mx-auto">Filtres</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <HiX />
        </button>
      </div>
      <ul className="py-4">
        {sourceIds.map((id) => {
          const source = getSourceById(id);

          return (
            <li key={id} className="flex flex-col">
              <FilterAccordion
                filters={filters[id]}
                source={source}
                onChange={(newFilters) => {
                  handleChange(id, newFilters);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filters;
