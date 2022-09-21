import { configureStore } from '@reduxjs/toolkit';
import favoritesSlice from './stores/favorites';
import selectedSlice from './stores/selected';

const store = configureStore({
    reducer: {
        favoritesSlice,
        selectedSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store