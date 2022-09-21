import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { localStorageKey } from '../../consts/consts';


export type CityEntry = { LocalizedName: string, Key: string };

const initialStateFromStorage = localStorage.getItem(localStorageKey);

const initialState: {
    favoriteCities: CityEntry[]
} = {
    favoriteCities: initialStateFromStorage ? JSON.parse(initialStateFromStorage) : [],
}

const favoritesSlice = createSlice({
    name: 'favoritesSlice',
    initialState,
    reducers: {
        addToFavorites(state, { payload }: PayloadAction<CityEntry>) {
            if (state.favoriteCities.findIndex(item => item.Key === payload.Key) === -1) {
                state.favoriteCities.push(payload);
            }
        },
        removeFromFavorites(state, { payload }: PayloadAction<{ Key: string }>) {
            state.favoriteCities = state.favoriteCities.filter(item => item.Key !== payload.Key);
        },
        replaceAllFavorites(state, { payload }: PayloadAction<CityEntry[]>) {
            state.favoriteCities = payload;
        }
    },
})

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions
export default favoritesSlice.reducer