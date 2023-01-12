import { createSlice } from "@reduxjs/toolkit";
interface IAuthShow {
  show: boolean;
}
const initialState: IAuthShow = {
  show: false,
};
export const authShow = createSlice({
  name: "users-auth",
  initialState,
  reducers: {
    show(state) {
      state.show = true;
    },
    hide(state) {
      state.show = false;
    },
  },
});
export const { show, hide } = authShow.actions;
export default authShow.reducer;
