import React from "react";
import markerColors from "../marker-colors";
import { HiX } from "react-icons/hi";
import FilterAccordion from "./FilterAccordion";

const Filters = (props) => {
  const {
    isOpen,
    setIsOpen,
    dataSources,
    setDataSources,
    dataFilters,
    updateMarkerFilters,
  } = props;

  const handleCheckboxChange = (e, index) => {
    const newDataSources = [...dataSources];
    newDataSources[index].enabled = !newDataSources[index].enabled;
    setDataSources(newDataSources);
  };

  const handleUpdateFilter = (sourceName, filterKey, newValue) => {
    updateMarkerFilters(sourceName, filterKey, newValue);
  };

  return (
    <div
      className={`opacity-90 absolute top-0 left-0 h-screen overflow-auto w-72 max-w-screen bg-gray-800 text-white transition-all duration-300 transform ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between pt-4 text-xl font-bold px-4">
        <h2 className="mx-auto">Filters</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-300 focus:outline-none"
        >
          <HiX />
        </button>
      </div>
      <ul className="py-4">
        {dataSources.map((dataSource, index) => {
          const filters = dataFilters[dataSource.name];
          return (
            <li key={index} className="flex flex-col">
              <FilterAccordion
                index={index}
                backgroundColor={
                  markerColors[dataSource.markerColor]
                    ? markerColors[dataSource.markerColor]
                    : markerColors[Object.keys(markerColors)[0]]
                }
                handleCheckboxChange={handleCheckboxChange}
                dataSource={dataSource}
                filters={filters}
                onUpdate={(filterKey, newValue) =>
                  handleUpdateFilter(dataSource.name, filterKey, newValue)
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filters;
