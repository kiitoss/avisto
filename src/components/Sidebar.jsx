import React, { useState } from "react";

const Sidebar = ({ className, isOpen, dataSources, setDataSources }) => {
  const handleCheckboxChange = (index) => {
    const newDataSources = [...dataSources];
    newDataSources[index].enabled = !newDataSources[index].enabled;
    setDataSources(newDataSources);
  };

  return (
    <div
      className={`${className} absolute top-0 left-0 h-full w-64 bg-gray-800 text-white transition-all duration-300 transform ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-center h-16 text-xl font-bold">
        Filtres
      </div>
      <ul className="py-4">
        {dataSources.map((dataSource, index) => (
          <li
            key={index}
            className="pl-6 py-2 hover:bg-gray-700 flex items-center cursor-pointer"
            onClick={() => handleCheckboxChange(index)}
          >
            <input
              type="checkbox"
              checked={dataSource.enabled}
              onChange={() => handleCheckboxChange(index)}
              className="mr-2"
            />
            {dataSource.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
