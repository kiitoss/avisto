import React, { useState, useEffect } from "react";
import Map from "./components/Map";

const App = () => {
  const [markers, setMarkers] = useState(null);

  const center = [45.764043, 4.835659];

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/via-ferrata.json");
      const json = await response.json();
      console.log(json.data);
      const newMarkers = json.data.map(
        ({ name, latitude, longitude, ...rest }) => ({
          ...rest,
          popup: name,
          position: [latitude, longitude],
        })
      );
      setMarkers(newMarkers);
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
