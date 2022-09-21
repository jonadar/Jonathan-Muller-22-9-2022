import { FC, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Button, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { TextField, Autocomplete } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';


import { AutocompleteData, CityWeatherData, CityWeatherForcastData } from "../../consts/types";
import { localStorageKey, weekdays } from "../../consts/consts";
import { addToFavorites, removeFromFavorites } from "../../redux/stores/favorites";


import "./MainPage.scss";
import { RootState } from "../../redux/store";
import { Card } from "../../components/Card";
import { setSelectedCity } from "../../redux/stores/selected";

export const MainPage: FC = () => {
    const [autocompleteData, setAutocompleteData] = useState<AutocompleteData[]>([]);
    // const [selectedCity, setSelectedCity] = useState<AutocompleteData>();
    const [fetchingCityData, setFetchingCityData] = useState<boolean>(false);
    const [cityWeatherData, setCityWeatherData] = useState<CityWeatherForcastData>();

    const dispatch = useDispatch();

    const favoriteCities = useSelector((state: RootState) => state.favoritesSlice.favoriteCities);
    const selectedCity = useSelector((state: RootState) => state.selectedSlice.selected);
    const [searchText, setSearchText] = useState<string>(selectedCity.LocalizedName);

    //TODO: try middleware instead
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(favoriteCities));
    }, [favoriteCities]);

    useEffect(() => {
        handleSearchCityWeather();
    }, []);

    useEffect(() => {
        console.log(selectedCity);
    }, [selectedCity]);

    const handleAutocompleteOnChange = async (inputValue: string) => {
        setSearchText(inputValue);

        if (inputValue.length > 0) {
            try {
                const { data } = await axios.get<AutocompleteData[]>(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${inputValue}`);

                console.log('handleAutocompleteOnChange data: ', data);
                setAutocompleteData(data);
            } catch (e) {
                console.error('e: ', e);
            }
        }
    }

    const handleSearchCityWeather = async () => {
        //make sure selected is what was searched
        if (selectedCity?.LocalizedName === searchText) {
            try {
                if (!fetchingCityData) {
                    setFetchingCityData(true);

                    const { data } = await axios.get<CityWeatherForcastData>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${selectedCity.Key}?apikey=${process.env.REACT_APP_API_KEY}`);

                    //city doesnt come with request, but we want data to stay together
                    data.LocalizedName = selectedCity.LocalizedName;
                    data.Key = selectedCity.Key;

                    console.log('handleSearchCityWeather data: ', data);
                    setCityWeatherData(data);
                    setFetchingCityData(false);
                }
            } catch (e) {
                console.error('e: ', e);
                setFetchingCityData(false);
                toast.error("api requests exceeded maximum")
            }
        }
    }

    const handleClickFavorite = () => {
        if (favorite && cityWeatherData) {
            dispatch(removeFromFavorites({ Key: cityWeatherData.Key }));
        } else {
            if (cityWeatherData) {
                dispatch(addToFavorites({ LocalizedName: cityWeatherData.LocalizedName, Key: cityWeatherData.Key }));
            }
        }
    }

    const favorite: boolean = useMemo(() => {
        return favoriteCities.findIndex((item) => item.Key === cityWeatherData?.Key) !== -1;
    }, [cityWeatherData, favoriteCities]);

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
                                // setSelectedCity(value);
                                dispatch(setSelectedCity(value));
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

            {cityWeatherData &&
                <div className="main-page-weather-container">
                    <div className="top">
                        <img src={`https://www.accuweather.com//images/weathericons/${cityWeatherData.DailyForecasts[0].Day.Icon}.svg`} alt="" />
                        <div>
                            <span>{cityWeatherData.LocalizedName}</span>
                            <span>{cityWeatherData.DailyForecasts[0].Temperature.Maximum.Value}°{cityWeatherData.DailyForecasts[0].Temperature.Maximum.Unit}</span>
                        </div>

                        <span className="icon-container">
                            <IconButton onClick={handleClickFavorite}>
                                {favorite ? <FavoriteIcon /> : < FavoriteBorderIcon />}
                            </IconButton>
                        </span>
                    </div>
                    <div className="mid">
                        <h1>
                            {cityWeatherData.Headline.Text}
                        </h1>
                    </div>
                    <div className="bottom">
                        {cityWeatherData.DailyForecasts.map(forcast => {
                            return (
                                <Card className="weather-card" key={forcast.Date}>
                                    <span>{weekdays[new Date(forcast.Date).getDay()]}</span>
                                    <span>{forcast.Temperature.Maximum.Value}°{forcast.Temperature.Maximum.Unit}</span>
                                </Card>
                            );
                        })}
                    </div>

                </div>}
        </div >
    );
};