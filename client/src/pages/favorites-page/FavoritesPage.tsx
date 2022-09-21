import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FavoriteCityCard } from "../../components/FavoriteCityCard";

import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

import "./FavoritesPage.scss";
import { SelectedCity, setSelectedCity } from "../../redux/stores/selected";

export const FavoritesPage: FC = () => {
    const dispatch = useDispatch();
    const favoriteCities = useSelector((state: RootState) => state.favoritesSlice.favoriteCities);

    const navigate = useNavigate();

    const onClickFavorite = (value: SelectedCity): void => {
        dispatch(setSelectedCity(value))
        navigate("/");
    }
    return (
        <div className="favorite-page-container">
            {favoriteCities.map(item => {
                return (
                    <FavoriteCityCard cityData={item} key={item.Key} onClick={() => { onClickFavorite(item) }} />
                )
            })}

            {
                favoriteCities.length === 0 &&
                <h2>
                    you did not add any favorite cities yet
                </h2>
            }
        </div>
    );
};