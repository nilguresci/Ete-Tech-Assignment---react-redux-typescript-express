import { ICompany, ICompanyList } from "./../../models/Company";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";

const initialState: ICompanyList = {
  companies: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "abc",
};

export const getCompanies = createAsyncThunk(
  "/company/getCompanies",
  async (_, thunkAPI) => {
    try {
      return await companyService.getCompanies();
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

//update company
export const updateCompany = createAsyncThunk(
  "/company/updateCompany",
  async (companyData: ICompany, thunkAPI) => {
    try {
      return await companyService.updateCompany(companyData);
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

//delete company
export const deleteCompany: any = createAsyncThunk(
  "/company/deleteCompany",
  async (id: string, thunkAPI) => {
    try {
      return await companyService.deleteCompany(id);
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

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    reset: (state: ICompanyList) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanies.pending, (state: ICompanyList) => {
        state.isLoading = true;
      })
      .addCase(getCompanies.fulfilled, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(getCompanies.rejected, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateCompany.pending, (state: ICompanyList) => {
        state.isLoading = true;
      })
      .addCase(updateCompany.fulfilled, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload;
      })
      .addCase(updateCompany.rejected, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(deleteCompany.pending, (state: ICompanyList) => {
        state.isLoading = true;
      })
      .addCase(deleteCompany.fulfilled, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload.id
        );
      })
      .addCase(deleteCompany.rejected, (state: ICompanyList, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = companySlice.actions;
export default companySlice.reducer;
