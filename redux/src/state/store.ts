
import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characters/characterSlice"
export const store = configureStore({
    reducer: {
        character: charactersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch