from utils import get_api_data, print_fail


class Cabin:
    def __init__(self, data: dict) -> None:
        properties = data.get("properties")
        coordinates = properties.get("coord")
        info_comp = properties.get("info_comp")

        # default
        self.name = properties.get("nom")
        latitude, longitude = coordinates.get("lat"), coordinates.get("long")

        if not (latitude and longitude):
            return

        self.latitude = float(latitude)
        self.longitude = float(longitude)

        # additional data
        altitude = coordinates.get("alt")
        places = properties.get("places").get("valeur")
        water = info_comp.get("eau").get("valeur")
        wood = info_comp.get("bois").get("valeur")
        toilets = info_comp.get("latrines").get("valeur")

        self.data = {
            "altitude": float(altitude) if altitude else None,
            "places": int(places) if places else None,
            "water": bool(water) if water else None,
            "wood": bool(wood) if wood else None,
            "toilets": bool(toilets) if toilets else None,
        }

    def is_valid(self) -> bool:
        return hasattr(self, "latitude") and hasattr(self, "longitude")

    def to_json(self) -> dict:
        return {
            "name": self.name,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "data": self.data,
        }


class ListCabins:
    def __init__(self) -> None:
        self.api_url = "https://www.refuges.info/api/bbox/"
        self.params = {
            "bbox": "-13.00,44.05,17.00,49.79",
            "detail": "complet",
            "nb_points": "5",
        }

        data = get_api_data(self.api_url, self.params)
        self.items = self.collect_cabins(data)

        self.filters = {}

    def collect_cabins(self, data) -> list:
        """Create and return a list of cabins."""
        size = data.get("size")
        cabins = []
        print(f"- Collecting cabins from {self.api_url}...")
        for i, dict in enumerate(data.get("features")):
            print(
                f"({i+1}/{size})\t- Collecting cabin '{dict.get('properties').get('nom')}'"
            )
            cabin = Cabin(dict)
            if not cabin.is_valid():
                print_fail(f"Cabin '{cabin.name}' is not valid.")
                continue
            cabins.append(cabin)
        print("Cabins collection finished.")
        return cabins
