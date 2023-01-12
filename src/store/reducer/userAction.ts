import { AppDispatch } from "../store";
import axios from "axios";
import { IUser } from "../../admin/interface";
import { userSlice } from "./userSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// export const fetchUser = () => async (dispatch: AppDispatch) => {
//   try {
//   } catch (err: any) {
//     dispatch(userSlice.actions.loadError(err.message));
//   }
// };
export const fetchUser = createAsyncThunk("user-load", async () => {
  //  dispatch(userSlice.actions.load());
  const responce = await axios.post<IUser>("/api/auth/load", {}, { headers: { "access-token": String(localStorage.getItem("access-token")) } });
  //    dispatch(userSlice.actions.loadSuccess(responce.data));
  return responce.data;
});
