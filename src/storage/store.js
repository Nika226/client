import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/productSlices";
import categories from "./slices/categoriesSlices";

export default configureStore({
  reducer: { products, categories },
});
