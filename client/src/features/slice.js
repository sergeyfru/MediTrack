import axios from 'axios'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const defaultUrl = 'http://localhost:3001/api'

const initialState = {
  allPills: [],
  status: "Success",
};

export const getAllPills = createAsyncThunk("/data/all", async () => {
  const user_id = localStorage.getItem('user_id') || 1
  
    try {
      
        const response = await axios.post(`${defaultUrl}/pills/all`,{user_id});

        return response.data;

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("Axios error", error);
        } else {
          console.error("Unexpected error", error);
        }
    }
});

export const addPillToUser =createAsyncThunk('/data/addpill',async(data)=>{
  data.user_id = localStorage.getItem('user_id')
  // console.log(data);

  // Object.keys(data).forEach((key) => {
    
  //   if(data[key] == '') {
  //     data[key] = null
  //   }
  //   // console.log(data);
    
  //   console.log(key, typeof(data[key]));

  //   });
  try {
    
    const response = await axios.post(`${defaultUrl}/pills/addpill`,data)
    console.log(response.data);
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
    } else {
      console.error("Unexpected error", error);
    }
  }
})

export const removePill = createAsyncThunk('/data/removepill', async({pill_name,pill_id})=>{
  const user_id = localStorage.getItem('user_id') || 1

  try {
    const response = await axios.delete(`${defaultUrl}/pills/remove`,{data:{ pill_name, pill_id, user_id}})
    
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Axios error", error);
    } else {
      console.error("Unexpected error", error);
    }
  }
})


export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
        .addCase(getAllPills.pending,(state,action)=>{
            state.status = 'Loading'
        })
        .addCase(getAllPills.fulfilled,(state,action)=>{
            state.allPills = action.payload
            state.status = 'Success'
        })
        .addCase(getAllPills.rejected,(state,actino)=>{
            state.status = 'Failed'
        })
        .addCase(addPillToUser.pending,(state,action)=>{
            state.status = 'Loading'
        })
        .addCase(addPillToUser.fulfilled,(state,action)=>{
          state.allPills = [...state.allPills, action.payload.pill] || []
          state.status = 'Success'
        })
        .addCase(addPillToUser.rejected,(state,actino)=>{
            state.status = 'Failed'
        })
        .addCase(removePill.pending,(state,action)=>{
            state.status = 'Loading'
        })
        .addCase(removePill.fulfilled,(state,action)=>{
          const newArr = state.allPills.filter(item =>{
            return item.pill_id !== action.payload.pill[0].pill_id
          })
          state.allPills = newArr
          state.status = 'Success'
        })
        .addCase(removePill.rejected,(state,actino)=>{
            state.status = 'Failed'
        })
  }

});

export const {
    
} = dataSlice.actions

export default dataSlice.reducer