import React from "react";
import Text from "./Text";
import { HiX } from "react-icons/hi";
import { capitalize, getSourceById } from "../utils";

const Sidebar = (props) => {
  const { isOpen, setIsOpen, marker } = props;

  const labels = getSourceById(marker?.source)?.labels;

  return (
    <div
      className={`opacity-90 absolute w-96 max-w-full h-screen top-0 right-0 overflow-hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute top-0 right-0 h-screen w-full max-w-full bg-gray-800 text-white transition-all duration-300 transform overflow-y-auto ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pt-4 text-xl font-bold px-4">
          <h2 className="mx-auto">Informations</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            <HiX />
          </button>
        </div>

        {marker && (
          <div className="p-5">
            <h3 className="text-xl text-center font-bold pb-4">
              {marker.name}
            </h3>
            <ul>
              {Object.entries(marker.data).map(([key, value]) => {
                return (
                  <li className="py-1" key={key}>
                    <h4 className="text-lg font-bold">
                      {labels ? capitalize(labels[key]) : key} :
                    </h4>
                    <Text text={value?.toString() || "???"} />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
