import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = (props) => {
  const { zoom = 7, markers } = props;

  return (
    <MapContainer
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}
      {...props}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers?.map((marker) => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
