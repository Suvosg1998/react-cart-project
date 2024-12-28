import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance"

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await AxiosInstance.get("products/");
  return response.data;
});

export const fetchProductsByCategory = createAsyncThunk(
    "products/fetchProductsByCategory",
    async (category) => {
      const response = await AxiosInstance.get(`products/category/${category}`);
      return response.data;
    }
  );

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", categories: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default productsSlice.reducer;
