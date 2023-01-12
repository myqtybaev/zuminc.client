import { BoxPlotOutlined, UserOutlined, BarcodeOutlined, ContainerOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { langFile } from "../lang";
import address from "../image/country2.png";
const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]) => {
  return {
    key,
    icon,
    children,
    label: children ? label : <Link to={"/admin/" + key}>{label}</Link>,
  } as MenuItem;
};

export const AdminLaoyt = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { lang } = useAppSelector((state) => state.lang);
  const items: MenuItem[] = [
    getItem(langFile[lang].admin.layout.user, "user", <UserOutlined />),
    getItem(langFile[lang].admin.layout.promocode, "promocode", <BarcodeOutlined />),
    getItem(langFile[lang].admin.layout.order, "order", <ContainerOutlined />),
    getItem("Страны", "address", <img src={address} alt="address" width={18} height={18} />),
    getItem(langFile[lang].admin.layout.productSub, "productChild", <BoxPlotOutlined />, [
      getItem(langFile[lang].admin.layout.attribute, "attribute"),
      getItem(langFile[lang].admin.layout.category, "category"),
      getItem(langFile[lang].admin.layout.product, "product"),
    ]),
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultOpenKeys={["product"]}
          defaultSelectedKeys={[window.location.pathname.split("/").slice(-1).toString()]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Menu
            mode="horizontal"
            items={[
              { label: <Link to="/">{langFile[lang].admin.layout.home}</Link>, key: "home" },
              { label: <Link to="/user/profile">{langFile[lang].admin.layout.profile}</Link>, key: "person" },
            ]}
          ></Menu>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Zuminc ©2022 Created by Harble TM</Footer>
      </Layout>
    </Layout>
  );
};
