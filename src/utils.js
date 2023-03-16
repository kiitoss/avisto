import SOURCES from "./sources";

const capitalize = (string) => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const markerIsVisible = (data, filters) => {
  // if no filters are set, marker is visible
  if (!filters) return true;

  if (!filters.is_active) return false;

  for (const [key, filter] of Object.entries(filters.dataFilters)) {
    if (!filter.value) continue;

    if (filter.type === "range") {
      const value = data[key];
      const { min, max } = filter.value;
      if (value < min || value > max) return false;
    }

    if (filter.type === "multiselect") {
      // TODO: add support for undefined values
      if (!data[key]) return true;

      const availableValues = filter.value;
      const currentValues = data[key];
      const currentInAvailable = currentValues.some((value) =>
        availableValues.includes(value)
      );

      if (!currentInAvailable) return false;
    }
  }
  return true;
};

const getSourceById = (sourceId) => {
  if (!sourceId) return null;
  return SOURCES.find((source) => source.id === sourceId);
};

export { capitalize, markerIsVisible, getSourceById };
