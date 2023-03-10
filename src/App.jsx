import React, { useState, useEffect } from "react";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

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
      for (const dataSource of dataSources) {
        if (dataSource.enabled) {
          const response = await fetch(dataSource.file);
          const json = await response.json();
          const markers = json.data.map(
            ({ name, latitude, longitude, ...rest }) => ({
              ...rest,
              popup: name,
              position: [latitude, longitude],
            })
          );
          newMarkers.push(...markers);
        }
      }
      setMarkers(newMarkers);
    };
    fetchMarkers();
  }, [dataSources]);

  return (
    <div className="flex">
      <button
        className="fixed z-50 top-0 right-0 m-4 p-2 bg-blue-500 text-white rounded"
        onClick={toggleSidebar}
      >
        {sidebarOpen ? "Close" : "Open"} Sidebar
      </button>
      <Sidebar
        className="z-10"
        isOpen={sidebarOpen}
        dataSources={dataSources}
        setDataSources={setDataSources}
      />
      <div className="flex-1 z-0">
        <div className="relative h-screen">
          <div className="absolute top-0 left-0 w-full h-full">
            <Map center={center} markers={markers} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
