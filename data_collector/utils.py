from bs4 import BeautifulSoup
import unicodedata
import requests
import ftfy
import sys


def get_soup(url: str) -> BeautifulSoup:
    """Return the soup of the given url."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()
    return BeautifulSoup(response.text, "html.parser")


def get_text(
    soup: BeautifulSoup, selector: str, strip: bool = True, index: int = 0
) -> str:
    """Return the text of the given selector in the soup."""
    data = soup.select(selector)
    if not data:
        return None

    text = data[index].get_text(strip=strip)
    return ftfy.fix_text(unicodedata.normalize("NFKC", text))


def print_warn(message: str, end: str = "\n") -> None:
    """Print a warning message in yellow."""
    sys.stderr.write("\x1b[1;33m" + message.strip() + "\x1b[0m" + end)


def print_fail(message: str, end: str = "\n") -> None:
    """Print a fail message in red."""
    sys.stderr.write("\x1b[1;31m" + message.strip() + "\x1b[0m" + end)
