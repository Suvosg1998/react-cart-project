import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance";

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async () => (await AxiosInstance.get("products/categories")).data
  );

  const categoriesSlice = createSlice({
    name: "categories",
    initialState: { items: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, (state) => { state.status = "loading"; })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.status = "succeeded"; state.items = action.payload;
        })
        .addCase(fetchCategories.rejected, (state) => { state.status = "failed"; });
    },
  });

  export default categoriesSlice.reducer;