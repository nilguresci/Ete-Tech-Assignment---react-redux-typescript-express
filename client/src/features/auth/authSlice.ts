import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../auth/authService";
import { IUser, IUserInitialInfo } from "../../models/User";

//get user from localstorage
const localStorageData = localStorage.getItem("user");
const user = localStorageData ? JSON.parse(localStorageData) : null;

const initialState: IUserInitialInfo = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "abc",
};

//login user
export const login = createAsyncThunk(
  "/auth/login",
  async (user: IUserInitialInfo, thunkAPI) => {
    try {
      await authService.login(user).then((res: any) => {
        if (res) {
          return res;
        } else {
          throw new Error();
        }
      });
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

//register user
export const register = createAsyncThunk(
  "/auth/register",
  async (user: IUserInitialInfo, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IUserInitialInfo) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state: IUserInitialInfo) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state: IUserInitialInfo, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.meta.arg.user;
      })
      .addCase(login.rejected, (state: IUserInitialInfo, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(register.pending, (state: IUserInitialInfo) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state: IUserInitialInfo, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.meta.arg.user;
      })
      .addCase(register.rejected, (state: IUserInitialInfo, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = "Something goes wrong!";
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
