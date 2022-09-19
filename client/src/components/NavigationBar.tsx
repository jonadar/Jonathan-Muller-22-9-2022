import { Link, useLocation } from "react-router-dom";

import { navigation } from "../consts/consts";

import "./NavigationBar.scss";

export const NavigationBar = () => {

    const location = useLocation();

    return (
        <div className="navigation-bar">
            <span className="navigation-bar-title">Weather App</span>
            {navigation.map(navItem => {
                return location.pathname !== navItem.path ?
                    <Link className="navigation-bar-item" to={navItem.path}>{navItem.name}</Link>
                    :
                    <span className="navigation-bar-item" key={navItem.path}>{navItem.name}</span>
            })}
        </div>
    );
};