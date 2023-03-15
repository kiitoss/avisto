import React from "react";
import markerColors from "../marker-colors";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { markerIsVisible, getSourceById } from "../utils";

const getColoredMarkerIcon = (color) => {
  const colors = Object.keys(markerColors);

  if (!color || !colors.includes(color)) {
    color = colors[0];
  }

  return new L.Icon({
    iconUrl: `./markers/marker-icon-2x-${color}.png`,
    shadowUrl: "./markers/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
};

const Map = (props) => {
  const { zoom = 7, markers, onMarkerClick, currentMarkerId, filters } = props;

  const initMarker = (ref) => {
    if (!ref) return;

    if (ref.options.data.id === currentMarkerId) {
      ref.openPopup();
    } else {
      ref.closePopup();
    }
  };

  return (
    <MapContainer
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      attributionControl={false}
      {...props}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers?.map((marker) => {
        const color = getSourceById(marker.source).color;

        if (!markerIsVisible(marker.data, filters[marker.source])) return;
        return (
          <Marker
            ref={initMarker}
            key={marker.id}
            position={[marker.latitude, marker.longitude]}
            data={marker}
            eventHandlers={{
              click: (e) => {
                onMarkerClick(marker);
              },
              mouseover: (e) => e.target.openPopup(),
              mouseout: (e) => {
                if (e.target.options.data?.id !== currentMarkerId) {
                  e.target.closePopup();
                }
              },
            }}
            icon={
              marker.id === currentMarkerId
                ? getColoredMarkerIcon("red")
                : getColoredMarkerIcon(color)
            }
          >
            <Popup autoClose={false}>{marker.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map;
