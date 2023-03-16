from bs4 import BeautifulSoup
import unicodedata
import requests
import ftfy
import sys
import json
from datetime import datetime


def print_warn(message: str, end: str = "\n") -> None:
    """Print a warning message in yellow."""
    sys.stderr.write("\x1b[1;33m" + message.strip() + "\x1b[0m" + end)


def print_fail(message: str, end: str = "\n") -> None:
    """Print a fail message in red."""
    sys.stderr.write("\x1b[1;31m" + message.strip() + "\x1b[0m" + end)


def pretty_print_json(data: dict) -> None:
    """Print a json in a pretty way."""
    print(json.dumps(data, indent=4, sort_keys=True))


def get_soup(url: str) -> BeautifulSoup:
    """Return the soup of the given url."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def normalize(text: str) -> str:
    """Return a normalized string."""
    return ftfy.fix_text(unicodedata.normalize("NFKC", text))

def get_text(
    soup: BeautifulSoup, selector: str, strip: bool = True, index: int = 0
) -> str:
    """Return the text of the given selector in the soup."""
    data = soup.select(selector)
    if not data:
        return None

    text = data[index].get_text(strip=strip)
    return normalize(text)


def get_api_data(url: str, params: dict = {}) -> dict:
    response = requests.get(url, params=params)

    if not response.status_code == 200:
        print("Error: request failed with status code", response.status_code)
        return

    return response.json()


def save_json(items, filters, name="output") -> None:
    """Save the list of items in a json file (including time)."""
    filename = f"./data/{name}.json"

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(
            {
                "date": datetime.today().strftime("%Y-%m-%d %H:%M:%S"),
                "points": [item.to_json() for item in items],
                "filters": filters,
            },
            f,
            indent=4,
            ensure_ascii=False,
        )
