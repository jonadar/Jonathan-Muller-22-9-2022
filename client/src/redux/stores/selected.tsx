import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AutocompleteData } from '../../consts/types'

export type SelectedCity = Partial<AutocompleteData> & { Key: string, LocalizedName: string };
const initialState: {
    selected: SelectedCity;
} = {
    selected: {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
            "ID": "IL",
            "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
            "ID": "TA",
            "LocalizedName": "Tel Aviv"
        }
    }
}

const selectedSlice = createSlice({
    name: 'selectedSlice',
    initialState,
    reducers: {
        setSelectedCity(state, { payload }: PayloadAction<SelectedCity>) {
            state.selected = payload;
        }
    },
})

export const { setSelectedCity } = selectedSlice.actions
export default selectedSlice.reducer