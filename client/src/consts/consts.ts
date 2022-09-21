import { NavigationObject } from "./types";

export const navigation: NavigationObject = [
    {
        path: "/",
        name: "Home"
    },
    {
        path: "/favorites",
        name: "Favorites"
    }
]

export const weekdays: { [index: number]: string } = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
}

export const localStorageKey: string = "favoriteCities";