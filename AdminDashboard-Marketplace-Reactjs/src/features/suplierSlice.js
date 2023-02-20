import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getSuplier = createAsyncThunk("supliers/getSuplier", async () => {
  const response = await axios.get("api/suplier");
  return response.data.data; //dikirim ke action payload
  // console.log(response);
});

export const createSuplier = createAsyncThunk(
  "suplier/createSuplier",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("api/suplier/create", formData)
      .then(function (response) {
        // console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      })
);

//update
export const updateSuplier = createAsyncThunk(
  "suplier/updateSuplier",
  async ({ formData, id }, { rejectWithValue }) =>
    await axios
      .post(`api/suplier/${id}/update`, formData)
      .then(function (response) {
        // console.log(response.data.data);
        return response.data.data;
      })
      .catch(function (error) {
        // console.log(error.response.data.message);
        return rejectWithValue(error.response.data.message);
      })
);

//delete
export const deleteSuplier = createAsyncThunk(
  "supliers/deleteSuplier",
  async (id) => {
    const response = await axios.delete(`api/suplier/${id}`);
    return id;
    // console.log(response);
  }
);

////
const suplierEntity = createEntityAdapter({
  selectId: (suplier) => suplier.id,
});

const suplierSlice = createSlice({
  name: "suplier",
  initialState: suplierEntity.getInitialState(),

  extraReducers: {
    [getSuplier.pending]: (state, action) => {
      state.dataStatus = "pending";
    },
    [getSuplier.fulfilled]: (state, action) => {
      suplierEntity.setAll(state, action.payload);
    },
    [getSuplier.rejected]: (state, action) => {
      state.dataError = action.error.message;
    },

    //craete
    [createSuplier.fulfilled]: (state, action) => {
      suplierEntity.addOne(state, action.payload);
      state.dataStatus = "fulfilled";
    },
    [createSuplier.rejected]: (state, action) => {
      state.dataError = action.payload;
      state.dataStatus = "rejected";
    },

    //update
    [updateSuplier.fulfilled]: (state, action) => {
      suplierEntity.updateOne(state, action.payload);
      state.dataStatus = "fulfilled";
    },
    [updateSuplier.rejected]: (state, action) => {
      state.dataErrorUpdate = action.payload;
      state.dataStatus = "rejected";
    },

    //delete
    [deleteSuplier.fulfilled]: (state, action) => {
      suplierEntity.removeOne(state, action.payload);
    },
  },
});

export const suplierSelectors = suplierEntity.getSelectors(
  (state) => state.suplier
); //suplier harus sama dengan di store
export default suplierSlice.reducer; //agar bsa dipanggil di store
