import { fetchUser } from "./userAction";
import { IUser } from "./../../admin/interface";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface UserCountState {
  user: IUser | null;
  isLoading: boolean;
  isAuth: boolean;
  error: string;
}
const initialState: UserCountState = {
  user: null,
  isLoading: false,
  isAuth: false,
  error: "",
};
export const userSlice = createSlice({
  name: "user-load",
  initialState,
  reducers: {
    load(state) {
      state.isLoading = false;
    },
    loadSuccess(state, action: PayloadAction<IUser>) {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    loadError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    close(state) {
      localStorage.removeItem("access-token");
      state.isAuth = false;
      state.user = null;
      state.error = "";
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
      state.isAuth = true;
    },
    [fetchUser.pending.type]: (state) => {
      state.isLoading = false;
    },
    [fetchUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuth = false;
    },
  },
});
export default userSlice.reducer;

export const { close } = userSlice.actions;
