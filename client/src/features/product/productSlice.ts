import { IProduct, IProductList } from "./../../models/Product";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState: IProductList = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "abc",
};

export const getProducts = createAsyncThunk(
  "/product/getProducts",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// //get product by id
// export const getOneProduct: any = createAsyncThunk(
//   "product/getProduct",
//   async (id: string, thunkAPI) => {
//     try {
//       return await productService.getOneProduct(id);
//     } catch (error: any) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();

//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

//update product
export const updateProduct = createAsyncThunk(
  "/product/updateProduct",
  async (productData: IProduct, thunkAPI) => {
    try {
      return await productService.updateProduct(productData);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//delete product
export const deleteProduct: any = createAsyncThunk(
  "/product/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state: IProductList) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state: IProductList) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state: IProductList) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(updateProduct.rejected, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state: IProductList) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(deleteProduct.rejected, (state: IProductList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
