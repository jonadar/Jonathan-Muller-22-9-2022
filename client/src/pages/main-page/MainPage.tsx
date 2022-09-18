import { FC } from "react";

import { CitySearchBar } from "../../components/CitySearchBar";

import "./MainPage.scss";

export const MainPage: FC = () => {
    return (
        <div>
            {"REACT_APP_API_KEY: " + process.env.REACT_APP_API_KEY}
            <CitySearchBar />
        </div>
    );
};