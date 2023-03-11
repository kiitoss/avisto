import React from "react";
import { HiX } from "react-icons/hi";

const Filters = ({ isOpen, setIsOpen, dataSources, setDataSources }) => {
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
        {dataSources.map((dataSource, index) => (
          <li key={index}>
            <label className="pl-6 py-2 hover:bg-gray-700 flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={dataSource.enabled}
                name={`checkbox-${index}`}
                className="mr-2"
                onChange={(e) => handleCheckboxChange(e, index)}
              />
              {dataSource.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
