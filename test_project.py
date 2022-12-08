from project import date_formatter, get_duration, allowed_file
import pytest


def test_date_formatter():
    assert date_formatter("2020-01") == "01.2020"
    assert date_formatter("2022-12") == "12.2022"
    with pytest.raises(ValueError):
        date_formatter("")


def test_duration():
    assert get_duration("2020-10", "2020-10") == "1 month"
    assert get_duration("2020-10", "2020-12") == "3 months"
    assert get_duration("2018-01", "2020-12") == "3 years"
    assert get_duration("2021-01", "2021-12") == "1 year"
    assert get_duration("2021-01", "2022-01") == "1 year, 1 month"
    assert get_duration("2018-01", "2020-11") == "2 years, 11 months"

    with pytest.raises(ValueError):
        get_duration("", "")

    with pytest.raises(TypeError):
        get_duration("")

    with pytest.raises(AttributeError):
        get_duration("2020-10", 2020)


def test_allowed_file():
    assert allowed_file("file.png") == True
