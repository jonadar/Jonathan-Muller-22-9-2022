import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

import "./FavoritesPage.scss";

export const FavoritesPage: FC = () => {
    const favoriteCities = useSelector((state: RootState) => state.favoritesSlice.favoriteCities);
    return (
        <div>
            {favoriteCities.map(item => {
                return (
                    <div key={item.Key}>
                        {item.LocalizedName}
                    </div>
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