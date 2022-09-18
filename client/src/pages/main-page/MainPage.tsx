import { FC } from "react";

import { CitySearchBar } from "../../components/CitySearchBar";

import "./MainPage.scss";

export const MainPage: FC = () => {
    return (
        <div>
            <CitySearchBar />
        </div>
    );
};