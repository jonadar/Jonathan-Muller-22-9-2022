import { navigation } from "../consts/consts";

import "./NavigationBar.scss";

export const NavigationBar = () => {
    return (
        <div className="navigation-bar">
            <span className="navigation-bar-title">Weather App</span>
            {navigation.map(navItem => {
                return window.location.pathname !== navItem.path ?
                    <a className="navigation-bar-item" href={navItem.path}>{navItem.name}</a>
                    :
                    <span className="navigation-bar-item">{navItem.name}</span>
            })}
        </div>
    );
};