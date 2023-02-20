import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.post["Conten-Type"] = "application/json"; //sama dengan postman di header ada Conten-Type dan Accept
axios.defaults.headers.post["Accept"] = "application/json";

axios.interceptors.request.use(function (config) {
  //cara agara logout tidak Unauthenticated
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const resetData = createAsyncThunk("post/resetData", async () => {
  const data = "reset";
  return data;
});

export const postRegister = createAsyncThunk(
  "register/postRegister",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("api/register", formData)
      .then(function (response) {
        console.log(response);
        return response.data.data;
      })
      .catch(function (error) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
      })
);

export const postLogin = createAsyncThunk(
  "login/postLogin",
  async (formData, { rejectWithValue }) =>
    await axios
      .post("api/login", formData)
      .then(function (response) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
        return rejectWithValue(error.response.data.message);
      })
);

export const postLogout = createAsyncThunk(
  "logout/postLogout",
  async () =>
    await axios.post("api/logout").then(function (response) {
      console.log(response);
      return response.data;
    })
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    dataStatus: "",
    redirectLogin: "false",
    redirectRegister: "false",
    redirectLogout: "false",
  },
  extraReducers: {
    [resetData.fulfilled]: (state, action) => {
      state.dataStatus = "pending";
      state.redirectLogin = "pending";
      state.redirectRegister = "pending";
      state.dataStatus = "pending";
    },

    //register
    [postRegister.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.dataStatus = "fulfilled";
      state.redirectRegister = "true";
    },
    [postRegister.rejected]: (state, action) => {
      state.dataError = action.payload;
      state.dataStatus = "rejected";
    },

    //login
    [postLogin.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.dataStatus = "fulfilled";
      state.redirectLogin = "true";
    },
    [postLogin.rejected]: (state, action) => {
      state.dataError = action.payload;
      state.dataStatus = "rejected";
    },

    //logout
    [postLogout.fulfilled]: (state, action) => {
      state.postData = action.payload;
      state.dataStatus = "fulfilled";
      state.redirectLogout = "true";
    },
  },
});

export default authSlice.reducer;
