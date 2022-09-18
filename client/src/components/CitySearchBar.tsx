import { FC } from "react";

export const CitySearchBar: FC = () => {
    return (
        <div className="autocomplete-container">
            {/* turn off default auto complete */}
            <input className="autocomplete-input" type="text" autoComplete="off" />

            <div className="autocomplete-item-container">

            </div>
        </div>
    );
};