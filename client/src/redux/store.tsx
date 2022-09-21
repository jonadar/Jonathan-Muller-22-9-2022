import { configureStore } from '@reduxjs/toolkit';
import favorites from './stores/favorites';

const store = configureStore({
    reducer: {
        favoritesSlice: favorites
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store