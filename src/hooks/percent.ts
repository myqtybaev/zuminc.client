import { IBasketItem } from "./interface";
export const percent = (sum: number, percent: number): number => {
  return Math.round(sum - (sum * percent) / 100);
};

export const sum = (arr: IBasketItem[]): number => {
  let sum = 0;
  arr.forEach((item) => (sum += item.que * item.prise));
  return sum;
};
