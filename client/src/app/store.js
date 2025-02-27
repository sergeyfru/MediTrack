import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/slice.js";
// import popupReducer from "../features/popup_slice.js";
// import 


const store =  configureStore({
    reducer:{
        dataReducer,
        // popupReducer
    }
})

export default store