import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import app from './app'
import collections from "./collections";
import items from './items'
import admin from './admin'
const store = configureStore({
    reducer: {
        user,
        app,
        collections,
        items,
        admin
    }
})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch