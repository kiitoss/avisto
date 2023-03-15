import SOURCES from "./sources";

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// const markerIsVisible = (data, filters) => {
//   // if no filters are set, marker is visible
//   if (!filters) return true;

//   for (const [filterKey, filter] of Object.entries(filters)) {
//     // return false if the value is not null AND the value is not in the range
//     if (filter.type === "range") {
//       const value = data[filterKey];
//       const { min, max } = filter.value;
//       if (value != 0 && (value < min || value > max)) return false;
//     }

//     // return false if the value is not null AND the value is not in the list
//     if (filter.type === "multiselect") {
//       const availableValues = filter.value;
//       const currentValues = data[filterKey];
//       const currentInAvailable = currentValues.some((value) =>
//         availableValues.includes(value)
//       );

//       if (currentValues.length != 0 && !currentInAvailable) return false;
//     }
//   }
//   return true;
// };

// const getFilterableData = (infos, filters) => {
//   const filterableData = {};
//   for (const [key, info] of Object.entries(infos)) {
//     const filter = filters[key];

//     // if the filter doesn't exist or is empty, continue
//     if (!filter || !filter.value) continue;

//     if (filter.type === "range") {
//       filterableData[key] = (info.text.match(/\d+/g)?.map(Number) || [0])[0];
//     }

//     if (filter.type === "multiselect") {
//       filterableData[key] =
//         info.text.match(
//           new RegExp(filter.options.map((o) => `\\b${o}\\b`).join("|"), "gi")
//         ) || [];
//     }
//   }

//   return filterableData;
// };

const getSourceById = (sourceId) => {
  return SOURCES.find((source) => source.id === sourceId);
};

export { capitalize, getSourceById };
