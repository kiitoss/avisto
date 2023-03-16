from viaferrata import ListViaFerrata
from cabins import ListCabins
from utils import save_json


def main() -> None:
    list_via_ferrata = ListViaFerrata()
    save_json(list_via_ferrata.items, list_via_ferrata.filters, name="via-ferrata")

    list_cabins = ListCabins()
    save_json(list_cabins.items, list_cabins.filters, name="cabins")


if __name__ == "__main__":
    main()
