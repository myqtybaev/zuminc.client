import { addressApi } from "./service/address.service";
import { promocodeApi } from "./service/promocode.service";
//import { userCount } from './reducer/usersSlice';
import { usersApi } from "./service/user.service";
import { productApi } from "./service/product.service";
import { categoryApi } from "./service/category.service";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { attributeApi } from "./service/attirubute.service";
import userCount from "./reducer/usersSlice";
import userReducer from "./reducer/userSlice";
import basket from "./reducer/basketSlice";
import lang from "./reducer/langSlice";
import authShow from "./reducer/authReducer";
const rootReducer = combineReducers({
  [attributeApi.reducerPath]: attributeApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [promocodeApi.reducerPath]: promocodeApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  userCount: userCount,
  userReducer,
  basket,
  lang,
  authShow,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(attributeApi.middleware)
        .concat(categoryApi.middleware)
        .concat(productApi.middleware)
        .concat(usersApi.middleware)
        .concat(promocodeApi.middleware)
        .concat(addressApi.middleware),
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
