import { Row, Col } from "antd";
import { UserOutlined, MessageOutlined, LoginOutlined, BarChartOutlined } from "@ant-design/icons";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./index.css";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import React, { useEffect } from "react";
import { fetchUser } from "../../store/reducer/userAction";
import { close } from "../../store/reducer/userSlice";
import { langFile } from "../../lang";
export const UserLayout = () => {
  const { lang } = useAppSelector((state) => state.lang);
  let activeClassName = "active";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const exit = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    dispatch(close());
    navigate("/");
  };
  useEffect(() => {
    dispatch(fetchUser()).then((result) => {
      if (!result.payload) navigate("/");
    });
  }, []);
  return (
    <div className="user-layout">
      <Row>
        <Col md={5} span={0}>
          <nav>
            <ul>
              <li>
                <NavLink to="/user/profile" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                  <UserOutlined className="icon" /> {langFile[lang].user.menu.profile}
                </NavLink>
              </li>
              <li>
                <NavLink to="/user/orders" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                  <BarChartOutlined className="icon" /> {langFile[lang].user.menu.profile}
                </NavLink>
              </li>
              {/* <li>
                <NavLink to="/user/message" className={({ isActive }) => (isActive ? activeClassName : undefined)}>
                  <MessageOutlined className="icon" /> Техническая поддержка
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/user/exit" className={({ isActive }) => (isActive ? activeClassName : undefined)} onClick={exit}>
                  <LoginOutlined className="icon" /> {langFile[lang].user.menu.exit}
                </NavLink>
              </li>
            </ul>
          </nav>
        </Col>
        <Col md={19}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};
