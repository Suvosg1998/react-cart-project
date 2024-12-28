import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../../Api/AxiosInstance"

export const fetchProductDetails = createAsyncThunk(
    "products/fetchProductDetails",
    async (id) => (await AxiosInstance.get(`products/${id}`)).data
  );
  
  const productDetailsSlice = createSlice({
    name: "productDetails",
    initialState: { product: null, status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchProductDetails.pending, (state) => { state.status = "loading"; })
        .addCase(fetchProductDetails.fulfilled, (state, action) => {
          state.status = "succeeded"; state.product = action.payload;
        })
        .addCase(fetchProductDetails.rejected, (state) => { state.status = "failed"; });
    },
  });
  
    export default productDetailsSlice.reducer;
  