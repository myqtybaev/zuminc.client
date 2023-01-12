import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type langType = "RU" | "KZ" | "EN";
interface ILangState {
  lang: langType;
}
const local = localStorage.getItem("lang") as langType;
if (!local) localStorage.setItem("lang", "EN");
const initialState: ILangState = {
  lang: (localStorage.getItem("lang") as langType) || "RU",
};
export const userCount = createSlice({
  name: "lang",
  initialState,
  reducers: {
    change(state, action: PayloadAction<string>) {
      state.lang = action.payload as langType;
      // if (action.payload === "KZ") state.text = lang.KZ;
      // if (action.payload === "RU") state.text = lang.RU;
    },
  },
});
export const { change } = userCount.actions;
export default userCount.reducer;
