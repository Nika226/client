import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "categories/getAllcategories",
  async () => {
    const response = await fetch("http://localhost:3333/categories/all");
    const data = await response.json();
    return data;
  }
);

export const categoriesSlices = createSlice({
  name: "categories",
  initialState: {
    categoriesList: [],
    status: {
      error: null,
      loading: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.pending, (state) => {
      state.status.loading = true;
      state.status.error = false;
    });
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.status.loading = false;
      state.status.error = false;
      state.categoriesList = action.payload;
    });
    builder.addCase(getAllCategories.rejected, (state) => {
      state.status.loading = false;
      state.status.error = true;
    });
  },
});

export default categoriesSlices.reducer;
