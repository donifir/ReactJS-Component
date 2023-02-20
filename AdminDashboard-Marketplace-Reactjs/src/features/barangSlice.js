import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getBarang = createAsyncThunk(
  "barang/getBarang",
  async () =>
    await axios.get("api/barang").then(function (response) {
      //   console.log(response.data.data);
      return response.data.data;
    })
);

// create
export const createBarang = createAsyncThunk(
  "barang/createBarang",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("api/barang/create", formData )
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      })
);

// update
export const updateBarang = createAsyncThunk(
  "barang/createBarang",
  async ({formData, id},{rejectWithValue }) =>
    await axios
      .post(`api/barang/${id}/update`, formData )
      .then(function (response) {
        console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      })
);

export const deleteBarang = createAsyncThunk(
  "barang/deleteBarang",
  async (id) =>
    await axios.delete(`api/barang/${id}/delete`).then(function (response) {
      return id;
    })
);

////
const barangEntity = createEntityAdapter({
  selectId: (barang) => barang.id,
});

const barangSlice = createSlice({
  name: "suplier",
  initialState: barangEntity.getInitialState(),

  extraReducers: {
    [getBarang.pending]: (state, action) => {
      state.dataStatus = "pending";
    },
    [getBarang.fulfilled]: (state, action) => {
      barangEntity.setAll(state, action.payload);
    },
    [getBarang.rejected]: (state, action) => {
      state.dataError = action.error.message;
    },

    //create
    [createBarang.fulfilled]: (state, action) => {
      barangEntity.addOne(state, action.payload);
      state.dataStatus = "fulfilled";
    },
    [createBarang.rejected]: (state, action) => {
      state.dataStatus = "rejected";
      state.dataError = action.payload;
    },

    //update
    [updateBarang.fulfilled]: (state, action) => {
      barangEntity.updateOne(state, action.payload);
      state.dataStatus = "fulfilled";
    },
    [updateBarang.rejected]: (state, action) => {
      state.dataStatus = "rejected";
      state.dataError = action.payload;
    },

    // delete
    [deleteBarang.fulfilled]: (state, action) => {
        barangEntity.removeOne(state, action.payload);
      state.dataStatus = "pending";
    },
  },
});

export const barangSelectors = barangEntity.getSelectors(
  (state) => state.barang
); //suplier harus sama dengan di store

export default barangSlice.reducer; //agar bsa dipanggil di store
