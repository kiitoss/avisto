import json
import unicodedata
import requests
from bs4 import BeautifulSoup
import ftfy
from datetime import datetime

def get_soup(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0"
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # Raise an exception if there is an error
    return BeautifulSoup(response.text, "html.parser")


def get_urls(soup, selectors, base_url):
    urls = []
    for selector in selectors:
        for link in soup.select(selector):
            if link is not None and link.get("href") is not None:
                url = link.get("href")
                if not url.startswith("http"):  # Handle relative URLs
                    url = base_url + url.lstrip("/")
                urls.append(url)
    return urls


def get_infos(url, properties):
    soup = get_soup(url)
    infos = {}
    for key, item in properties.items():
        selector = item.get("selector")
        strip = item.get("strip", True)
        index = item.get("index", 0)
        if not selector:
            continue
        data = soup.select(selector)
        if data:
            content = data[index].get_text(strip=strip)
            infos[key] = ftfy.fix_text(unicodedata.normalize("NFKC", content))
    return infos


def save_json(name, data):
    filename = f"{name}.json"
    output = {
        "date": datetime.today().strftime('%Y-%m-%d %H:%M:%S'),
        "data": data
    }

    with open(filename, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=4, ensure_ascii=False)


def collect_data(sources):
    for source in sources:
        name, base_url, home_url, selectors, properties = source.values()
        print(f"- Collecting data from {base_url}...")

        soup = get_soup(base_url + home_url)
        urls = get_urls(soup, selectors, base_url)

        infos = []
        for i, url in enumerate(urls):
            print(f"({i+1}/{len(urls)})\t- Collecting data from {url}")
            infos.append(get_infos(url, properties))

        print()

        save_json(name, infos)

    print("Data collection finished.")


def main():
    with open("sources.json", encoding="utf-8") as f:
        sources = json.load(f)
    print("Starting data collection...\n")
    collect_data(sources)


if __name__ == "__main__":
    main()
