import React from "react";
import markerColors from "../marker-colors";
import { HiX } from "react-icons/hi";

const Filters = (props) => {
  const { isOpen, setIsOpen, dataSources, setDataSources, dataFilters } = props;

  const handleCheckboxChange = (e, index) => {
    const newDataSources = [...dataSources];
    newDataSources[index].enabled = !newDataSources[index].enabled;
    setDataSources(newDataSources);
  };

  return (
    <div
      className={`opacity-90 absolute top-0 left-0 h-screen w-64 max-w-screen bg-gray-800 text-white transition-all duration-300 transform ${
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
              <div className="flex">
                <label className="grow hover:bg-gray-700 flex items-center cursor-pointer">
                  <span
                    style={{
                      backgroundColor: markerColors[dataSource.markerColor]
                        ? markerColors[dataSource.markerColor]
                        : markerColors[Object.keys(markerColors)[0]],
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
              {filters && (
                <ul className="ml-6 mt-2 text-gray-400 text-sm">
                  {Object.entries(filters).map(([key, value]) => (
                    <li>
                      {key} : {value?.toString()}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filters;
