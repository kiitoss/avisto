import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

const Map = (props) => {
  const { zoom = 7, markers, onMarkerClick } = props;

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
        <Marker
          key={marker.id}
          position={marker.position}
          data={marker}
          eventHandlers={{
            click: (e) => {
              onMarkerClick(e.target.options.data);
            },
          }}
          icon={
            new Icon({
              iconUrl: markerIconPng,
              iconSize: [25, 41],
            })
          }
        >
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
