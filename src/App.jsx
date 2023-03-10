import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Searchbar from "./components/Searchbar";
import { HiAdjustments } from "react-icons/hi";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [markers, setMarkers] = useState(null);
  const [dataSources, setDataSources] = useState([
    { name: "via-ferrata", enabled: true, file: "/via-ferrata.json" },
  ]);

  const center = [45.764043, 4.835659];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
      <Searchbar markers={markers} />

      <button
        className={`fixed bottom-0 right-0 m-4 py-2 px-4 rounded-full flex hover:bg-blue-500 hover:text-white transition-all duration-200 ${
          sidebarOpen ? "bg-blue-500 text-white" : "bg-white text-gray-700"
        }`}
        onClick={toggleSidebar}
      >
        <HiAdjustments className="h-6 w-6 text-white-500 mr-2" /> Filters
      </button>

      <Sidebar
        isOpen={sidebarOpen}
        dataSources={dataSources}
        setDataSources={setDataSources}
      />

      <section className="-z-10 absolute top-0 left-0 w-full h-full">
        <Map center={center} markers={markers} className="h-full" />
      </section>
    </main>
  );
};

export default App;
