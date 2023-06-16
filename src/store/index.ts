import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import app from './app'
import collections from "./collections";
const store = configureStore({
    reducer: {
        user,
        app,
        collections
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch