import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLaoyt } from "./admin/layout";
import { AdminAttribute } from "./admin/product/admin.attribute";
import { AdminCategory } from "./admin/product/admin.category";
import { AdminProduct } from "./admin/product/admin.product";
import { AdminUser } from "./admin/user";
import { useAppDispatch } from "./hooks/redux";
import "./index.css";
import "./util.css";
import { Home } from "./page/home";
import { Layout } from "./page/layout";
import { ProductPage } from "./page/product";
import { fetchUser } from "./store/reducer/userAction";
import { CategoryPage } from "./page/category";
import { AdminPromocode } from "./admin/promocode";
import { OrderPage } from "./page/order";
import { AdminOrder } from "./admin/order";
import { AdminOrderId } from "./admin/orderId";
import { UserLayout } from "./page/user/user";
import { UserProfile } from "./page/user/user.profile";
import { UserOrders } from "./page/user/user.orders";
import { EditAll } from "./admin/edit";
import { AdminAddress } from "./admin/address";

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="user" element={<UserLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
      </Route>
      <Route path="/admin" element={<AdminLaoyt />}>
        <Route path="attribute" element={<AdminAttribute />} />
        <Route path="category" element={<AdminCategory />} />
        <Route path="product" element={<AdminProduct />} />
        <Route path="user" element={<AdminUser />} />
        <Route path="promocode" element={<AdminPromocode />} />
        <Route path="order" element={<AdminOrder />} />
        <Route path="order/:id" element={<AdminOrderId />} />
        <Route path="address" element={<AdminAddress />} />
        <Route path="editall" element={<EditAll />} />
      </Route>
    </Routes>
  );
};
