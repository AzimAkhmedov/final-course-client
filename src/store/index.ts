import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import app from './app'
const store = configureStore({
    reducer: {
        user,
        app
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch