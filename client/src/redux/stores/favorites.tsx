import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export type CityEntry = { LocalizedName: string, Key: string };

const initialState: {
    favoriteCities: CityEntry[]
} = {
    favoriteCities: [],
}

const favorites = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        addToFavorites(state, { payload }: PayloadAction<CityEntry>) {
            if (state.favoriteCities.findIndex(item => item.Key === payload.Key) === -1) {
                state.favoriteCities.push(payload);
            }
        },
        removeFromFavorites(state, { payload }: PayloadAction<{ Key: string }>) {
            state.favoriteCities = state.favoriteCities.filter(item => item.Key !== payload.Key)
        }
    },
})

export const { addToFavorites, removeFromFavorites } = favorites.actions
export default favorites.reducer