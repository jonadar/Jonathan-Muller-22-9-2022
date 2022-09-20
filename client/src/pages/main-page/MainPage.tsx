import { FC, useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, Autocomplete } from '@mui/material';

import { AutocompleteData, CityWeatherData, CityWeatherForcastData, DailyForcasts } from "../../consts/types";
import { data_v1 } from "../../data/autocomplete";

import "./MainPage.scss";

const selected: AutocompleteData = {
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    }
}

const _cityData: CityWeatherData = {
    "LocalObservationDateTime": "2022-09-20T20:00:00+08:00",
    "EpochTime": 1663675200,
    "WeatherText": "Overcast",
    "WeatherIcon": 7,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "LocalSource": {
        "Id": 7,
        "Name": "Huafeng",
        "WeatherCode": "02"
    },
    "IsDayTime": false,
    "Temperature": {
        "Metric": {
            "Value": 28.9,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 84,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://www.accuweather.com/en/cn/tongren/58491/current-weather/58491?lang=en-us",
    "Link": "http://www.accuweather.com/en/cn/tongren/58491/current-weather/58491?lang=en-us"
}

const _cityForcastWeather: CityWeatherForcastData = {
    "Headline": {
        "EffectiveDate": "2022-09-24T08:00:00+03:00",
        "EffectiveEpochDate": 1663995600,
        "Severity": 4,
        "Text": "Pleasant this weekend",
        "Category": "mild",
        "EndDate": null,
        "EndEpochDate": null,
        "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us",
        "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?lang=en-us"
    },
    "DailyForecasts": [
        {
            "Date": "2022-09-20T07:00:00+03:00",
            "EpochDate": 1663646400,
            "Temperature": {
                "Minimum": {
                    "Value": 68,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 84,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 3,
                "IconPhrase": "Partly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=1&lang=en-us"
        },
        {
            "Date": "2022-09-21T07:00:00+03:00",
            "EpochDate": 1663732800,
            "Temperature": {
                "Minimum": {
                    "Value": 68,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 83,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 4,
                "IconPhrase": "Intermittent clouds",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=2&lang=en-us"
        },
        {
            "Date": "2022-09-22T07:00:00+03:00",
            "EpochDate": 1663819200,
            "Temperature": {
                "Minimum": {
                    "Value": 69,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 84,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 33,
                "IconPhrase": "Clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=3&lang=en-us"
        },
        {
            "Date": "2022-09-23T07:00:00+03:00",
            "EpochDate": 1663905600,
            "Temperature": {
                "Minimum": {
                    "Value": 68,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 84,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 1,
                "IconPhrase": "Sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 34,
                "IconPhrase": "Mostly clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=4&lang=en-us"
        },
        {
            "Date": "2022-09-24T07:00:00+03:00",
            "EpochDate": 1663992000,
            "Temperature": {
                "Minimum": {
                    "Value": 65,
                    "Unit": "F",
                    "UnitType": 18
                },
                "Maximum": {
                    "Value": 81,
                    "Unit": "F",
                    "UnitType": 18
                }
            },
            "Day": {
                "Icon": 2,
                "IconPhrase": "Mostly sunny",
                "HasPrecipitation": false
            },
            "Night": {
                "Icon": 33,
                "IconPhrase": "Clear",
                "HasPrecipitation": false
            },
            "Sources": [
                "AccuWeather"
            ],
            "MobileLink": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us",
            "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/daily-weather-forecast/215854?day=5&lang=en-us"
        }
    ]
}

export const MainPage: FC = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData[]>([]);
    const [selectedCity, setSelectedCity] = useState<AutocompleteData | null>(selected);
    const [fetchingCityData, setFetchingCityData] = useState<boolean>(false);
    const [cityWeatherData, setCityWeatherData] = useState(_cityForcastWeather);

    useEffect(() => {
        setAutocompleteData(data_v1)
    }, []);


    useEffect(() => {
        console.log(selectedCity);
    }, [selectedCity]);

    const handleAutocompleteOnChange = async (inputValue: string) => {
        setSearchText(inputValue);

        if (inputValue.length > 0) {
            console.log('send', inputValue);
            try {
                const { data } = await axios.get<AutocompleteData[]>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${inputValue}`);

                setAutocompleteData(data);
                console.log('data: ', data);
            } catch (e) {
                console.log('e: ', e);
            }
        }
    }

    const handleSearchCityWeather = async () => {
        //make sure selected is what was searched
        if (selectedCity?.LocalizedName === searchText) {
            try {
                if (!fetchingCityData) {
                    setFetchingCityData(true);
                    // const { data } = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${selectedCity.Key}?apikey=${process.env.REACT_APP_API_KEY}`);

                    const { data } = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.Key}?apikey=${process.env.REACT_APP_API_KEY}`);
                    console.log('data: ', data);
                    setCityWeatherData(data);
                    setFetchingCityData(false);
                }
            } catch (e) {
                console.log('e: ', e);
            }
        }
    }

    return (
        <div className="main-page-container">
            <div className="main-page-search-container">
                <div className="main-page-autocomplete">
                    <Autocomplete
                        freeSolo
                        blurOnSelect
                        filterOptions={(options) => options}
                        options={autocompleteData.map((option) => option)}
                        renderInput={(params) => <TextField {...params} label="Search City" />}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.Key}>
                                    {option.LocalizedName}
                                </li>
                            );
                        }}
                        getOptionLabel={(option) => {
                            return typeof option === "string" ? option : option.LocalizedName
                        }}
                        onChange={(_, value) => {
                            if (value && typeof value !== "string") {
                                setSelectedCity(value);
                                console.log('selected value: ', value);
                            } else {
                                //popup alert "please select item from list"
                            }
                        }}
                        value={selectedCity}
                        onInputChange={(_, inputValue) => {
                            setSearchText(inputValue)
                            handleAutocompleteOnChange(inputValue)
                        }}
                        inputValue={searchText}
                    />
                </div>
                <Button disabled={fetchingCityData} onClick={handleSearchCityWeather} variant="contained" endIcon={<SearchIcon />}>
                    search
                </Button>
            </div>

            <div className="main-page-weather-container">
                {cityWeatherData &&
                    <div>
                        TODO: make weather card here
                    </div>}
            </div>
        </div >
    );
};