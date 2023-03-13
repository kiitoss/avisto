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

  // do not use the red color for markers
  // because it is already used for the clicked marker
  const [dataSources, setDataSources] = useState([
    {
      name: "via-ferrata",
      enabled: true,
      file: "./via-ferrata.json",
      markerColor: "green",
    },
  ]);

  const [dataFilters, setDataFilters] = useState([]);

  const center = [45.764043, 4.835659];

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  const handleMarkerClick = (marker) => {
    setSidebarOpen(true);
    setCurrentMarker(marker);
  };

  const updateMarkerFilters = (sourceName, filterKey, newValue) => {
    const newFilters = { ...dataFilters };
    newFilters[sourceName][filterKey].value = newValue;
    setDataFilters(newFilters);
  };

  useEffect(() => {
    const fetchMarkers = async () => {
      const newMarkers = [];
      let markerId = 0;

      for (const dataSource of dataSources) {
        if (!dataSource.enabled) {
          continue;
        }

        const response = await fetch(dataSource.file);
        const { data, filters: rawFilters } = await response.json();

        const filters = Object.fromEntries(
          Object.entries(rawFilters).filter(([_, value]) => value !== null)
        );

        const markers = data.map(({ latitude, longitude, infos, ...rest }) => {
          const markerFilters = {};

          for (const [key, infoFilter] of Object.entries(filters)) {
            const info = infos[key];

            if (infoFilter.type === "number") {
              const numbers = info.text.match(/\d+/g)?.map(Number) || [0];

              markerFilters[key] = numbers.length === 1 ? numbers[0] : numbers;

              if (!infoFilter.min || markerFilters[key] < infoFilter.min) {
                infoFilter.min = markerFilters[key];
                filters[key].value = {
                  ...filters[key].value,
                  min: markerFilters[key],
                };
              }

              if (!infoFilter.max || markerFilters[key] > infoFilter.max) {
                infoFilter.max = markerFilters[key];
                filters[key].value = {
                  ...filters[key].value,
                  max: markerFilters[key],
                };
              }
            } else if (infoFilter.type === "selectmultiple") {
              const values =
                info.text.match(
                  new RegExp(
                    infoFilter.options.map((o) => `\\b${o}\\b`).join("|"),
                    "gi"
                  )
                ) || [];

              markerFilters[key] = values;
              filters[key].value = infoFilter.options;
            }
          }

          return {
            id: markerId++,
            origin: dataSource.name,
            position: [latitude, longitude],
            color: dataSource.markerColor,
            filters: markerFilters,
            infos,
            ...rest,
          };
        });

        setDataFilters((prevDataFilters) => ({
          ...prevDataFilters,
          [dataSource.name]: filters,
        }));

        newMarkers.push(...markers);
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
        dataFilters={dataFilters}
        updateMarkerFilters={updateMarkerFilters}
      />

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        marker={currentMarker}
      />

      <section className="-z-10 absolute top-0 left-0 w-screen h-screen">
        <Map
          center={center}
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
