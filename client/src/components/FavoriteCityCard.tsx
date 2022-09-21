import axios from "axios";
import { FC, useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import { CityWeatherData } from "../consts/types";
import { CityEntry } from "../redux/stores/favorites";
import { Card } from "./Card";

type Props = {
    cityData: CityEntry,
    onClick: (value: any) => void
}

export const FavoriteCityCard: FC<Props> = ({ cityData, onClick }) => {
    const [cityWeatherData, setCityWeatherData] = useState<Partial<CityWeatherData>>()

    useEffect(() => {
        fetchCityWeatherData();
    }, []);

    const fetchCityWeatherData = async () => {
        try {
            const { data } = await axios.get<CityWeatherData[]>(`http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=${process.env.REACT_APP_API_KEY}`);
            console.log(`fetchCityWeatherData for city: ${cityData.LocalizedName}`, data);
            setCityWeatherData(data.length > 0 ? data[0] : undefined);
        } catch (e) {
            console.error(e);
            toast.error(`failed to fetch weather for ${cityData.LocalizedName}`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    return (
        <Card className="favorite-city-card" onClick={onClick}>
            <div>{cityData.LocalizedName}</div>
            {
                cityWeatherData &&
                <Fragment>
                    <div>{cityWeatherData.Temperature?.Imperial.Value}°{cityWeatherData.Temperature?.Imperial.Unit}</div>
                    <div>{cityWeatherData.WeatherText}</div>
                </Fragment>
            }
        </Card>
    );
};