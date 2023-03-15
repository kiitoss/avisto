import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";

// import { markerIsVisible, getFilterableData } from "./utils";

import { HiAdjustments } from "react-icons/hi";

import SOURCES from "./sources";

const CENTER_POSITION = [45.764043, 4.835659];

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [filters, setFilters] = useState({});
  const [labels, setLabels] = useState({});
  const [filtersOpen, setFiltersOpen] = useState(false);
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  // const [currentMarker, setCurrentMarker] = useState(null);

  console.log("render");

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  // const handleMarkerClick = (marker) => {
  //   if (currentMarker?.id === marker.id) {
  //     setCurrentMarker(null);
  //     setSidebarOpen(false);
  //   } else {
  //     setCurrentMarker(marker);
  //     setSidebarOpen(true);
  //   }
  // };

  const handleFiltersChange = (newFilters) => {
    setFilters({
      ...newFilters, // destructuration needed to trigger re-render
    });
  };

  // set up marker, filters and labels
  useEffect(() => {
    const fetchData = async () => {
      const newMarkers = [];
      const newFilters = {};
      const newLabels = {};
      const newColors = {};

      let id = 0;

      for (const source of SOURCES) {
        const response = await fetch(source.file);
        const { points, filters, labels } = await response.json();

        // foreach point, create a marker object
        const markers = points.map((point) => {
          return {
            id: id++,
            source: source.id,
            ...point,
          };
        });

        // add the markers to the list
        newMarkers.push(...markers);

        // add a new filter entry
        newFilters[source.id] = {
          is_active: true,
          ...filters,
        };

        // add a new label entry
        newLabels[source.id] = labels;

        // add a new color entry
        newColors[source.id] = source.color;
      }

      // set up state
      setMarkers(newMarkers);
      setFilters(newFilters);
      setLabels(newLabels);
    };

    fetchData();
  }, []);

  return (
    <main>
      {/* <Searchbar markers={markers} onMarkerClick={handleMarkerClick} /> */}

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

      {/* <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        marker={currentMarker}
      /> */}

      {/* <section className="-z-10 absolute top-0 left-0 w-screen h-screen">
        <Map
          center={CENTER_POSITION}
          onMarkerClick={handleMarkerClick}
          markers={markers}
          className="h-screen"
          currentMarkerId={currentMarker ? currentMarker.id : null}
          markerFilters={dataFilters}
        />
      </section> */}
    </main>
  );
};

export default App;
