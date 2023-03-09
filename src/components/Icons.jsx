import L from "leaflet";

const iconMarker = new L.Icon({
  iconUrl: require("/markers/default.svg"),
  iconRetinaUrl: require("/markers/default.svg"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export { iconMarker };
