import React, { useState, useEffect } from "react";
import Map from "./components/Map";

const App = () => {
  const [markers, setMarkers] = useState(null);

  const position = [45.764043, 4.835659];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      const json = await response.json();
      setMarkers(json);
    }
    fetchData();
  }, []);

  return (
    <Map
      style={{ minHeight: "100vh", minWidth: "100vw" }}
      position={position}
      markers={markers}
    ></Map>
  );
};

export default App;
