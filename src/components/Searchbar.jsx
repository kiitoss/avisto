import { useEffect, useState } from "react";

const SearchInput = ({ onFocus, onBlur, onChange }) => {
  return (
    <input
      className="w-full text-gray-700 bg-transparent focus:outline-none"
      type="text"
      placeholder="Search..."
      onFocus={onFocus}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
};

const SearchResultList = ({ className, markers, onMarkerClick }) => {
  return (
    <ul
      className={`${className} max-w-lg mx-auto max-h-52 overflow-auto bg-white rounded-b-lg`}
    >
      {markers?.map((marker) => (
        <li
          key={marker.id}
          className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
          onClick={() => onMarkerClick(marker)}
        >
          {marker.name}
        </li>
      ))}
      {markers?.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          No markers match your search.
        </p>
      )}
    </ul>
  );
};

const Searchbar = ({ markers, onMarkerClick }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 100);
  };
  const handleSearchChange = (event) => setSearchTerm(event.target.value);

  const filteredMarkers = markers?.filter((marker) =>
    marker.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className={`rounded-full py-2 px-4 m-auto mt-2 bg-white  hover:opacity-100 hover:max-w-lg ${
          isFocused
            ? "opacity-100 max-w-lg rounded-none rounded-t-lg transition-none"
            : "max-w-sm opacity-80"
        } transition-all duration-200`}
      >
        <SearchInput
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleSearchChange}
        />
      </div>

      <SearchResultList
        className={`${
          isFocused ? "opacity-100 max-h-52" : "opacity-0 max-h-0"
        } transition-all duration-200`}
        markers={filteredMarkers || markers}
        onMarkerClick={onMarkerClick}
      />
    </div>
  );
};

export default Searchbar;
