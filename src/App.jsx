import React, { useState, useEffect } from "react";
import Map from "./components/Map";

const App = () => {
  const [markers, setMarkers] = useState(null);

  const center = [45.764043, 4.835659];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/data.json");
      const json = await response.json();
      setMarkers(json);
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <Map center={center} markers={markers} className="min-h-screen"></Map>
    </div>
  );
};

export default App;
