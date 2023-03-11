import React from "react";
import Text from "./Text";
import { HiX } from "react-icons/hi";

const Sidebar = ({ isOpen, setIsOpen, marker }) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className={`opacity-90 absolute w-96 max-w-screen h-screen top-0 right-0 overflow-hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute top-0 right-0 h-screen w-full bg-gray-800 text-white transition-all duration-300 transform overflow-y-auto ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between pt-4 text-xl font-bold px-4">
          <h2 className="mx-auto">Infos</h2>
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
              {marker.infos.map((info, key) => {
                return (
                  <li className="py-1" key={key}>
                    <h4 className="text-lg font-bold">
                      {capitalize(info.label)} :
                    </h4>
                    <Text text={info.text} />
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
