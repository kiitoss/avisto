import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Filters from "./components/Filters";
import Searchbar from "./components/Searchbar";
import Sidebar from "./components/Sidebar";

import { markerIsVisible, getFilterableData } from "./utils";

import { HiAdjustments } from "react-icons/hi";

const CENTER_POSITION = [45.764043, 4.835659];

// do not use the red color for markers
// because it is already used for the clicked marker
const DATA_SOURCES = [
  {
    name: "via-ferrata",
    enabled: true,
    file: "./via-ferrata.json",
    markerColor: "green",
  },
];

const App = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMarker, setCurrentMarker] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [dataFilters, setDataFilters] = useState([]);
  const [dataSources, setDataSources] = useState(DATA_SOURCES);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleMarkerClick = (marker) => {
    if (currentMarker?.id === marker.id) {
      setCurrentMarker(null);
      setSidebarOpen(false);
    } else {
      setCurrentMarker(marker);
      setSidebarOpen(true);
    }
  };

  const updateFilters = (sourceName, filterKey, newValue) => {
    const newFilters = { ...dataFilters };
    newFilters[sourceName][filterKey].value = newValue;
    setDataFilters(newFilters);
  };

  const toggleDataSource = (index) => {
    const newDataSources = [...dataSources];
    newDataSources[index].enabled = !newDataSources[index].enabled;
    setDataSources(newDataSources);
  };

  // update markers when data sources change
  useEffect(() => {
    const fetchMarkers = async () => {
      const newMarkers = [];
      let markerId = 0;

      for (const source of dataSources) {
        // if the source is not enabled, continue
        if (!source.enabled) continue;

        // fetch the data
        const response = await fetch(source.file);
        const { data, filters } = await response.json();

        // foreach data, create a marker object
        const updatedMarkers = data.map(
          ({ latitude, longitude, infos, ...rest }) => {
            dataFilters[source.name] = filters;

            const filterableData = getFilterableData(infos, filters);

            return {
              id: markerId++,
              origin: source.name,
              position: [latitude, longitude],
              color: source.markerColor,
              filterableData: filterableData,
              infos,
              isVisible: markerIsVisible(
                filterableData,
                dataFilters[source.name]
              ),
              ...rest,
            };
          }
        );
        newMarkers.push(...updatedMarkers);
      }

      // update the markers
      setMarkers(newMarkers);
    };
    fetchMarkers();
  }, [dataSources]);

  // update filters values when markers change
  useEffect(() => {
    const newDataFilters = { ...dataFilters };

    markers.forEach((marker) => {
      const filters = newDataFilters[marker.origin];
      const data = marker.filterableData;

      for (const [key, value] of Object.entries(data)) {
        // if the data is not filtered, continue
        if (!filters[key]) continue;

        const filter = filters[key];

        if (filter.type === "range") {
          if (!filter.min || value < filter.min) {
            filter.min = value;
          }
          if (!filter.max || value > filter.max) {
            filter.max = value;
          }
        }

        if (filter.type === "selectmultiple") {
          filter.value = filter.options;
        }
      }
    });

    setDataFilters(newDataFilters);
  }, [markers]);

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
        onClose={() => setIsOpen(false)}
        dataSources={dataSources}
        dataFilters={dataFilters}
        updateMarkerFilters={updateFilters}
        toggleDataSource={toggleDataSource}
      />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        marker={currentMarker}
      />

      <section className="-z-10 absolute top-0 left-0 w-screen h-screen">
        <Map
          center={CENTER_POSITION}
          onMarkerClick={handleMarkerClick}
          markers={markers}
          className="h-screen"
          currentMarkerId={currentMarker ? currentMarker.id : null}
          markerFilters={dataFilters}
        />
      </section>
    </main>
  );
};

export default App;
