from project import date_formatter, experience_calculator
import pytest


def test_date_formatter():
    assert date_formatter("2020-01") == "01.2020"
    assert date_formatter("2022-12") == "12.2022"
    with pytest.raises(ValueError):
        date_formatter("")


def test_experience_calculator():
    assert experience_calculator("2020-10", "2020-10") == "1 month"
    assert experience_calculator("2020-10", "2020-12") == "3 months"
    assert experience_calculator("2018-01", "2020-12") == "3 years"
    assert experience_calculator("2021-01", "2021-12") == "1 year"
    assert experience_calculator("2021-01", "2022-01") == "1 year, 1 month"
    assert experience_calculator("2018-01", "2020-11") == "2 years, 11 months"

    with pytest.raises(ValueError):
        experience_calculator("", "")

    with pytest.raises(TypeError):
        experience_calculator("")

    with pytest.raises(AttributeError):
        experience_calculator("2020-10", 2020)


def test_function_n():
    ...
