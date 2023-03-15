import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";

import { HiAdjustments } from "react-icons/hi";

import SOURCES from "./sources";

const MAP_CENTER = [45.764043, 4.835659];

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [filters, setFilters] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);

  // open/close filters
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // update sidebar + current marker
  const handleMarkerClick = (marker) => {
    if (currentMarker?.id === marker.id) {
      setCurrentMarker(null);
      setSidebarOpen(false);
    } else {
      setCurrentMarker(marker);
      setSidebarOpen(true);
    }
  };

  // update filters
  const handleFiltersChange = (newFilters) => {
    setFilters({
      ...newFilters,
    });
  };

  // set up marker and filters
  useEffect(() => {
    const fetchData = async () => {
      const newMarkers = [];
      const newFilters = {};

      let id = 0;

      for (const source of SOURCES) {
        const response = await fetch(source.file);
        const { points, filters } = await response.json();

        const markers = points.map((point) => {
          return {
            id: id++,
            source: source.id,
            ...point,
          };
        });

        newMarkers.push(...markers);

        newFilters[source.id] = {
          is_active: true,
          ...filters,
        };
      }

      // set up states
      setMarkers(newMarkers);
      setFilters({
        ...newFilters,
      });
    };

    fetchData();
  }, []);

  return (
    <main>
      <Searchbar markers={markers} onMarkerClick={handleMarkerClick} />

      <button
        className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 m-4 py-2 px-4 rounded-full flex hover:bg-blue-500 hover:text-white transition-all duration-200 ${
          filtersOpen ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={toggleFilters}
      >
        <HiAdjustments className="h-6 w-6 text-white-500 mr-2" /> Filters
      </button>

      <Filters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={(newFilters) => {
          handleFiltersChange(newFilters);
        }}
      />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        marker={currentMarker}
      />

      <section className="-z-10 absolute top-0 left-0 w-screen h-screen">
        <Map
          center={MAP_CENTER}
          onMarkerClick={handleMarkerClick}
          markers={markers}
          className="h-screen"
          currentMarkerId={currentMarker ? currentMarker.id : null}
          filters={filters}
        />
      </section>
    </main>
  );
};

export default App;
