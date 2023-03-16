// do not use the red color for markers
// because it is already used for the clicked marker
const SOURCES = [
  {
    id: "viaferrata",
    name: "Via-Ferrata",
    file: "./data/via-ferrata.json",
    color: "green",
    labels: {
      starting_altitude: "altitude de départ",
      arrival_altitude: "altitude d'arrivée",
      drop: "dénivelé",
      difficulty: "difficulté",
      length: "longueur",
      price: "prix",
      description: "description",
    },
  },
  {
    id: "cabins",
    name: "Cabanes",
    file: "./data/cabins.json",
    color: "yellow",
  },
];

export default SOURCES;
