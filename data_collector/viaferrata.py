import re

from utils import get_soup, get_text, print_warn, print_fail

DIFFICULTIES = [
    item for d in ["F", "PD", "AD", "D", "TD", "ED"] for item in [f"{d}-", d, f"{d}+"]
]


class ViaFerrata:
    def __init__(self, url: str) -> None:
        soup = get_soup(url)

        # default
        self.name = get_text(soup, "h1 a:last-of-type")
        latitude, longitude = get_text(soup, "#latitude"), get_text(soup, "#longitude")

        if not (latitude and longitude):
            return

        self.latitude = float(latitude)
        self.longitude = float(longitude)
        self.url = url

        # additional data
        starting_altitude = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(1) + td", index=0
        )
        arrival_altitude = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(1) + td", index=1
        )
        drop = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(1) + td", index=2
        )
        difficulty = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(3) + td", index=0
        )
        length = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(3) + td", index=1
        )
        price = get_text(
            soup, "tr:has(td.topoTitre) > td.topoTitre:nth-child(3) + td", index=2
        )
        description = get_text(soup, "div.topoTexte", strip=False)

        self.data = {
            "starting_altitude": self.from_meters(starting_altitude),
            "arrival_altitude": self.from_meters(arrival_altitude),
            "drop": self.from_meters(drop),
            "difficulty": self.from_difficulty(difficulty),
            "length": self.from_meters(length),
            "price": price,
            "description": description,
        }

    def is_valid(self) -> bool:
        return hasattr(self, "latitude") and hasattr(self, "longitude")

    def from_meters(self, text: str) -> int:
        """Return the number of meters from a string like "1234 m"."""
        pattern = r"\d+"

        # warning if no difficulty found
        if not re.search(pattern, text):
            print_warn(f"ViaFerrata {self.name} - No number found in '{text}'.")
            return None

        return int(re.search(r"\d+", text).group())

    def from_difficulty(self, text: str) -> list:
        """Return the list of difficulties from a string like "F- / PD,AD+D + TD+"."""
        difficulties = DIFFICULTIES.copy()

        # replace "-" and "+" by their escaped version
        difficulties = [d.replace("-", "\-").replace("+", "\+") for d in difficulties]

        # sort by length to avoid matching "F" with "F-" for example
        difficulties.sort(key=len, reverse=True)
        pattern = "|".join(r"\b{}".format(d) for d in difficulties)

        matches = re.findall(pattern, text)

        # remove duplicates
        matches = list(set(matches))

        # warning if no difficulty found
        if not len(matches):
            print_warn(f"ViaFerrata - {self.name} - No difficulty found in '{text}'.")
            return None

        return matches

    def to_json(self) -> dict:
        return {
            "name": self.name,
            "url": self.url,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "data": self.data,
        }


class ListViaFerrata:
    def __init__(self) -> None:
        self.base_url = "https://www.viaferrata-fr.net/"
        self.soup = get_soup(self.base_url + "via-ferrata.html")
        self.urls = self.get_urls()

        self.items = self.collect_vias()

        self.filters = {}
        # range filters
        for key in ["starting_altitude", "arrival_altitude", "drop", "length"]:
            values = [via.data[key] for via in self.items if via.data[key]]
            self.filters[key] = {
                "type": "range",
                "min": min(values) if len(values) else 0,
                "max": max(values) if len(values) else 0,
            }

        # multiselect filters
        self.filters["difficulty"] = {"type": "multiselect", "options": DIFFICULTIES}

    def collect_vias(self) -> list:
        """Create and return a list of vias."""
        vias = []

        print(f"- Collecting vias from {self.base_url}...")
        for i, url in enumerate(self.urls):
            print(f"({i+1}/{len(self.urls)})\t- Collecting vias from {url}")
            via = ViaFerrata(url)
            if not via.is_valid():
                print_fail(f"ViaFerrata {via.name} is not valid.")
                continue
            vias.append(via)
        print("Vias collection finished.")

        return vias

    def get_urls(self) -> list:
        """Return the list of vias urls."""
        urls = []
        for selector in [".tr1 a", ".tr2 a"]:
            for link in self.soup.select(selector):
                if link is not None and link.get("href") is not None:
                    url = link.get("href")
                    if not url.startswith("http"):
                        url = self.base_url + url.lstrip("/")
                    urls.append(url)
        return urls
