import React from "react";
import { HiX } from "react-icons/hi";

const Sidebar = ({ isOpen, setIsOpen, marker }) => {
  return (
    <div
      className={`opacity-90 absolute w-96 h-screen top-0 right-0 overflow-hidden ${
        isOpen ? "" : "pointer-events-none"
      }`}
    >
      <div
        className={`absolute top-0 right-0 h-full w-full bg-gray-800 text-white transition-all duration-300 transform overflow-y-auto ${
          isOpen ? "" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 text-xl font-bold px-4">
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
            <h2>{marker.name}</h2>
            <ul>
              {Object.keys(marker).map((property) => (
                <li className="py-2" key={property}>
                  {property}: {marker[property]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
