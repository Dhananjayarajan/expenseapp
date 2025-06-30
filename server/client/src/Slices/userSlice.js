import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, signinUser } from "../apiCalls/userApi";

export const getUser = createAsyncThunk("/api/getUser", async () => {
  const response = await fetchUser();

  return response;
});

export const loginUser = createAsyncThunk("api/loginuser", async () => {
  const response = await signinUser();
  return response;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    data: null,
    error: null,
  },
  reducers: {},
  extraReducers: (building) => {
    building
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = "Error fetching data";
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
