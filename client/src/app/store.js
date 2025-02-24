import { configureStore } from "@reduxjs/toolkit";
import pillsReducer from "../features/slice.js";


const store =  configureStore({
    reducer:{
        pillsReducer,
    }
})

export default store