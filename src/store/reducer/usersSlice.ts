import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface UserCountState {
  count: 0;
  isLoading: boolean;
  error: string;
}
const initialState: UserCountState = {
  count: 0,
  isLoading: false,
  error: "",
};
export const userCount = createSlice({
  name: "users-count",
  initialState,
  reducers: {
    incrementByAmount(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
});
export const { incrementByAmount } = userCount.actions;
export default userCount.reducer;
