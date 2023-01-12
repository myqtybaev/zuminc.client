import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IBasketItem, IProduct } from "../../hooks/interface";
import { percent, sum } from "../../hooks/percent";
interface BaketState {
  baskets: IBasketItem[];
  sum: number;
  discont: number;
  result: number;
}
if (!localStorage.getItem("v")) {
  localStorage.removeItem("basket");
  localStorage.setItem("v", "2");
}
const localstor = localStorage.getItem("basket");

const initialState: BaketState = {
  baskets: localstor ? (JSON.parse(localstor) as IBasketItem[]) : [],
  sum: localstor ? sum(JSON.parse(localstor) as IBasketItem[]) : 0,
  discont: 0,
  result: localstor ? percent(sum(JSON.parse(localstor) as IBasketItem[]), 0) : 0,
};
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    add(state, payload: PayloadAction<IProduct | any>) {
      const productFind = state.baskets.findIndex((item: IBasketItem) => item._id === payload.payload._id);
      if (productFind >= 0) state.baskets[productFind].que += payload.payload.que || 1;
      else state.baskets.push({ ...payload.payload, img: payload.payload.image[0] });
      localStorage.setItem("basket", JSON.stringify(state.baskets));
      state.result = percent(sum(state.baskets), state.discont);
      state.sum = sum(state.baskets);
      console.log(payload);
    },
    destroy(state, payload: PayloadAction<string>) {
      const productFind = state.baskets.findIndex((item: IBasketItem) => item._id === payload.payload);
      state.baskets.splice(productFind, 1);
      localStorage.setItem("basket", JSON.stringify(state.baskets));
      state.result = sum(state.baskets);
      state.sum = sum(state.baskets);
    },
    editQue(state, payload: PayloadAction<{ value: number; _id: string }>) {
      const productFind = state.baskets.findIndex((item: IBasketItem) => item._id === payload.payload._id);
      state.baskets[productFind].que = payload.payload.value > 0 ? payload.payload.value : 1;
      localStorage.setItem("basket", JSON.stringify(state.baskets));
      state.result = percent(sum(state.baskets), state.discont);
      state.sum = sum(state.baskets);
    },
    setDiscont(state, payload: PayloadAction<number>) {
      state.discont = payload.payload;
      state.result = percent(sum(state.baskets), payload.payload);
      state.sum = sum(state.baskets);
    },
    reset(state) {
      state.baskets = [];
      state.discont = 0;
      state.result = 0;
      state.sum = 0;
    },
    // loadSuccess(state, action: PayloadAction<IUser>) {
    //   state.isLoading = false;
    //   state.error = "";
    //   state.user = action.payload;
    // },
    // loadError(state, action: PayloadAction<string>) {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // },
    // close(state) {
    //   state.isAuth = false;
    //   state.user = null;
    //   state.error = "";
    // },
  },
});
export const { add, destroy, editQue, setDiscont, reset } = basketSlice.actions;
export default basketSlice.reducer;
