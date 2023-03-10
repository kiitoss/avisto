import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";

import { HiAdjustments } from "react-icons/hi";

const App = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);

  const [markers, setMarkers] = useState(null);
  const [dataSources, setDataSources] = useState([
    { name: "via-ferrata", enabled: true, file: "/via-ferrata.json" },
  ]);

  const center = [45.764043, 4.835659];

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleMarkerClick = (marker) => {
    setSidebarOpen(true);
    setCurrentMarker(marker);
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const newMarkers = [];
      let id = 0;
      for (const dataSource of dataSources) {
        if (dataSource.enabled) {
          const response = await fetch(dataSource.file);
          const json = await response.json();
          const markers = json.data.map(({ latitude, longitude, ...rest }) => ({
            ...rest,
            id: id++,
            position: [latitude, longitude],
          }));
          newMarkers.push(...markers);
        }
      }
      setMarkers(newMarkers);
    };
    fetchMarkers();
  }, [dataSources]);

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
        setIsOpen={setFiltersOpen}
        dataSources={dataSources}
        setDataSources={setDataSources}
      />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        marker={currentMarker}
      />

      <section className="-z-10 absolute top-0 left-0 w-full h-full">
        <Map
          center={center}
          onMarkerClick={handleMarkerClick}
          markers={markers}
          className="h-full"
        />
      </section>
    </main>
  );
};

export default App;
