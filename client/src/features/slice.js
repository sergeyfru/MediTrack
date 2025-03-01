import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

const initialState = {
  allPills: [],
  user: {},
  popup: {
    msg: "",
    openPopup: false,
    error: "",
    type: "",
  },
  error: "",
  status: "Success",
};

export const getAllPills = createAsyncThunk("/pills/all", async () => {
  const user_id = localStorage.getItem("user_id");
  console.log(user_id);

  try {
    const response = await axios.post(`${apiUrl}/pills/all`, { user_id });
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
      return error;
    } else {
      console.error("Unexpected error", error);
    }
  }
});

export const addPillToUser = createAsyncThunk(
  "/pills/addpill",
  async (data) => {
    data.user_id = localStorage.getItem("user_id");
    console.log("addPillToUser ", data);

    try {
      const response = await axios.post(`${apiUrl}/pills/addpill`, data);
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error);
        return error;
      } else {
        console.error("Unexpected error", error);
      }
    }
  }
);

export const removePill = createAsyncThunk(
  "/pills/removepill",
  async ({ pill_name, pill_id }) => {
    const user_id = localStorage.getItem("user_id") || 1;

    try {
      const response = await axios.delete(`${apiUrl}/pills/remove`, {
        data: { pill_name, pill_id, user_id },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error);
        return error;
      } else {
        console.error("Unexpected error", error);
      }
    }
  }
);

export const registration = createAsyncThunk(
  "/users/registration",
  async (user) => {
    try {
      const response = await axios.post(`${apiUrl}/users/registration`, user);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Axios error", error);
        return error;
      } else {
        console.error("Unexpected error", error);
      }
    }
  }
);

export const login = createAsyncThunk("/users/login", async (user) => {
  try {
    const response = await axios.post(`${apiUrl}/users/login`, user);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
      return error;
    } else {
      console.error("Unexpected error", error);
    }
  }
});
export const logOut = createAsyncThunk('/users/loguot', async()=>{
  try {
    const response = await axios.post(`${apiUrl}/users/logout`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
      return error;
    } else {
      console.error("Unexpected error", error);
    }
  }
})
export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    
    togglePopup: (state) => {
      state.popup.openPopup = !state.openPopup;
    },
    openPopup: (state, action) => {
      state.popup.openPopup = true;
      state.popup.title = action.payload.title;
      state.popup.msg = action.payload.msg;
      state.popup.type = action.payload.type || "info";
    },
    closePopup: (state) => {
      state.popup.openPopup = false;
      state.popup.title = "";
      state.popup.msg = "";
      state.popup.type = "";
    },
    clearErrorMessage: (state) => {
      state.popup.error = "";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllPills.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(getAllPills.fulfilled, (state, action) => {
        if (action.payload.name === "AxiosError") {
          state.popup.msg = action.payload.message;
          state.popup.type = action.payload.type || "success";
        } else {
          state.error = "";
        }
        state.popup.openPopup = true;
        state.popup.title = action.payload.title || "";
        state.popup.msg = action.payload.msg;
        state.popup.type = action.payload.type || "success";

        state.allPills = action.payload;
        state.status = "Success";
      })
      .addCase(getAllPills.rejected, (state, actino) => {
        state.status = "Failed";
      })
      .addCase(addPillToUser.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(addPillToUser.fulfilled, (state, action) => {
        if (action.payload.name === "AxiosError") {
          state.error = action.payload.message;
        } else {
          state.error = "";
        }

        state.allPills = [...state.allPills, action.payload.pill] || [];
        state.status = "Success";
      })
      .addCase(addPillToUser.rejected, (state, actino) => {
        state.status = "Failed";
      })
      .addCase(removePill.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(removePill.fulfilled, (state, action) => {
        if (action.payload.name === "AxiosError") {
          state.error = action.payload.message;
        } else {
          state.error = "";
        }

        const newArr = state.allPills.filter((item) => {
          return item.pill_id !== action.payload.pill[0].pill_id;
        });

        state.allPills = newArr;
        state.status = "Success";
      })
      .addCase(removePill.rejected, (state, actino) => {
        state.status = "Failed";
      })
      .addCase(registration.pending, (state, action) => {
        state.status = "Loading";
        // console.log(state.status);
      })
      .addCase(registration.fulfilled, (state, action) => {
        if (action.payload.name === "AxiosError") {
          state.popup.msg = action.payload.message;
          state.popup.type = action.payload.type || "success";
        } else {
          state.error = "";
        }
        state.popup.openPopup = true;
        state.popup.title = action.payload.title || "";
        state.popup.msg = action.payload.msg;
        state.popup.type = action.payload.type || "success";

        state.status = "Successs";
      })
      .addCase(registration.rejected, (state, action) => {
        state.status = "Failed";
      })
      .addCase(login.pending, (state, action) => {
        state.status = "Loading";
        // console.log(state.status);
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.name === "AxiosError") {
          state.popup.msg = action.payload.message;
          state.popup.type = action.payload.type || "error";
          state.show = true;
        } else {
          state.error = "";
        }
          state.popup.openPopup = true;
          state.popup.title = action.payload.title || "";
          state.popup.msg = action.payload.msg;
          state.popup.type = action.payload.title || "info";
          state.popup.show = action.payload.show;
        

        if (action.payload.title === "Success") {
          state.user = action.payload.user;
          localStorage.setItem("accessToken", action.payload.accessToken);
          localStorage.setItem("user_id", action.payload.user.user_id);
        }
        state.status = "Success";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "Failed";
      })
      .addCase(logOut.pending, (state, action) => {
        state.status = "Loading";
        // console.log(state.status);
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state = {
          allPills: [],
          user: {},
          popup: {
            msg: "Logged out successfully",
            openPopup: true,
            error: "",
            type: "",
          },
          error: "",
          status: "Logged out",
        };
        localStorage.clear();
        state.status = "Success";
      })
      .addCase(logOut.rejected, (state, action) => {
        state.status = "Failed";
      });
  },
});

export const { togglePopup, clearErrorMessage, openPopup, closePopup, } =
  dataSlice.actions;

export default dataSlice.reducer;
