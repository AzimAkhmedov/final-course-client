import { createSlice } from "@reduxjs/toolkit";
import { IAppReducer } from "../../types";

const initialState: IAppReducer = {
    lang: "Ru",
    darkMode: false,
    adminSidebar: false
}

const slice = createSlice({
    initialState, name: "appSlice", reducers: {
        changeLang(state) {
            state.lang = state.lang === 'En' ? 'Ru' : 'En'
        },
        setLang(state, actions) {
            state.lang = actions.payload
        }
        , changeMode(state) {
            state.darkMode = state.darkMode ? false : true
        },
        handleSidebar(state) {
            state.adminSidebar = !state.adminSidebar
        }
    }
})

export const { changeLang, setLang, changeMode, handleSidebar } = slice.actions
export default slice.reducer