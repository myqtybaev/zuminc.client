import { useState, useRef, useEffect } from "react";
import { Button, Modal, Form, Input, Alert, Space, Avatar, Badge, Grid, Drawer, List } from "antd";
import { UserOutlined, MessageOutlined, MailOutlined, MenuOutlined, PhoneOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import "./header.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchUser } from "../store/reducer/userAction";
import { categoryApi } from "../store/service/category.service";
import { ICategory } from "../admin/interface";
import { Basket } from "./basket";
import { useDispatch } from "react-redux";
import { change } from "../store/reducer/langSlice";
import { langFile } from "../lang";
import { hide } from "../store/reducer/authReducer";
export const Header = () => {
  const [open, setOpen] = useState(false);
  const [categoryes, setCategoryes] = useState(false);
  const { md } = Grid.useBreakpoint();
  const { lang } = useAppSelector((state) => state.lang);
  const [openBasket, setOpenBasket] = useState(false); // Открыть корзину
  const { baskets } = useAppSelector((state) => state.basket);
  return (
    <header>
      <div className="section align-items-center mb-2">
        {md ? (
          <p className="m-0 fs-28" style={{ cursor: "pointer" }} onClick={() => setCategoryes(true)}>
            Каталог
          </p>
        ) : null}

        <Link to="/">
          <img className="logo" alt="logo" src={logo} width={150} />
        </Link>
        <span className="d-flex gap-1 align-items-center">
          <div className="text-center">
            <span className="date  fs-12">{langFile[lang].header.week}:</span> <br /> <span className=" fs-12">9:00 AM - 5:30 PM</span>
            <a href="tel:+7777777777" className="d-block  fs-12" style={{ height: "max-content" }}>
              <PhoneOutlined style={{ transform: "scale(-1, 1)" }} /> +7(777)777-77-33
            </a>
          </div>
        </span>
      </div>
      <div className={!md ? "d-flex justify-content-between align-items-center pl-1 pr-1" : "d-flex justify-content-center"}>
        {!md ? (
          <>
            <Button className="btn btn-primary" onClick={() => setOpen(true)}>
              <MenuOutlined />
            </Button>
            <Badge count={baskets.length}>
              <Avatar
                style={{ color: "#000", background: "#fff", fontSize: 25 }}
                icon={<ShoppingCartOutlined />}
                onClick={() => setOpenBasket(true)}
              />
            </Badge>
          </>
        ) : null}
      </div>
      <Basket open={openBasket} setOpen={setOpenBasket} />
      <Categoryes setState={setCategoryes} state={categoryes} />
      <Menus state={open} setState={setOpen} />
    </header>
  );
};
interface IModal {
  state: boolean;
  setState: Function;
}
const Categoryes = ({ state, setState }: IModal) => {
  const { data } = categoryApi.endpoints.GetAll.useQuery("");
  const { lang } = useAppSelector((state) => state.lang);
  return (
    <Drawer open={state} onClose={() => setState(false)} title="Каталог">
      <nav>
        <List
          dataSource={data}
          renderItem={(item: ICategory) => (
            <List.Item>
              <Link to={"/category/" + item.name} style={{ color: "#000000" }}>
                {item.meaning[lang]}
              </Link>
            </List.Item>
          )}
        />
      </nav>
    </Drawer>
  );
};
const Menus = ({ state, setState }: IModal) => {
  const [auth, setAuth] = useState(false);
  const [openBasket, setOpenBasket] = useState(false); // Открыть корзину
  const { isAuth, user } = useAppSelector((state) => state.userReducer);
  const { data } = categoryApi.endpoints.GetAll.useQuery("");
  const { baskets } = useAppSelector((state) => state.basket);
  const { md } = Grid.useBreakpoint();
  const { lang } = useAppSelector((state) => state.lang);
  const dispatch = useDispatch();
  const isAcitve = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);
  let userIcon = <UserOutlined onClick={() => setAuth(true)} />;
  if (isAuth) {
    if (user?.role === "admin") {
      userIcon = (
        <Link to="/admin/user">
          <UserOutlined />
        </Link>
      );
    } else {
      userIcon = (
        <Link to="/user/profile">
          <UserOutlined />
        </Link>
      );
    }
  }
  const showAuthModal = () => {
    setState(false);
    setAuth(true);
  };
  const showBasket = () => {
    setState(false);
    setOpenBasket(true);
  };
  const des = () => {
    setState(false);
  };
  const setLang = (value: "RU" | "KZ" | "EN") => {
    dispatch(change(value));
    localStorage.setItem("lang", value);
  };

  return (
    <div className="menu ">
      <Authorization state={auth} setState={setAuth} />
      {!md ? null : (
        <>
          <div className="link">
            {data?.map((item: ICategory) => (
              <Link to={"category/" + item.name} key={item._id}>
                {item.meaning[lang]}
              </Link>
            ))}
          </div>
          <Space className="button-group">
            <div className="lang">
              <span className="d-block" style={{ cursor: "pointer", fontSize: 18 }}>
                {lang === "KZ" ? "Қаз" : lang === "RU" ? "Рус" : "Eng"}
              </span>
              <ul className="lang-items">
                <li onClick={() => setLang("RU")}>Рус</li>
                <li onClick={() => setLang("KZ")}>Каз</li>
                <li onClick={() => setLang("EN")}>Енг</li>
              </ul>
            </div>
            {/* <SearchOutlined /> */}
            {userIcon}
            <Badge count={baskets.length}>
              <Avatar style={{ background: "#fff" }} icon={<ShoppingCartOutlined />} onClick={() => setOpenBasket(true)} />
            </Badge>
          </Space>
        </>
      )}
      <Basket open={openBasket} setOpen={setOpenBasket} />
      <Drawer title="Навигация" open={state} onClose={() => setState(false)}>
        <nav className="menu-mobile">
          <ul>
            <li>
              <NavLink to="/" className={isAcitve} onClick={des}>
                Главное
              </NavLink>
            </li>
            {data?.map((item: ICategory) => (
              <li key={item._id}>
                <NavLink className={isAcitve} to={"category/" + item.name} onClick={des} key={item._id}>
                  {item.meaning[lang]}
                </NavLink>
              </li>
            ))}
            {isAuth ? (
              <li>
                <Link to="/user/profile" onClick={des}>
                  <UserOutlined /> Личный кабинет
                </Link>
              </li>
            ) : (
              <li onClick={showAuthModal}>
                <UserOutlined /> Войти/Регистрация
              </li>
            )}
            <li onClick={showBasket}>
              <ShoppingCartOutlined /> Корзина
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
};
const Authorization = ({ state, setState }: IModal) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const [err, setErr] = useState<string | null>(null);
  const [timerActive, setTimerActive] = useState(false);
  const { show } = useAppSelector((state) => state.authShow);
  const { lang } = useAppSelector((state) => state.lang);
  const second = useRef<HTMLSpanElement>(null);
  const submit = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onFinish = (values: { email: string; code: string | undefined }) => {
    if (!code) {
      axios.post("/api/auth", { email: values.email }).then((res) => {
        if (res.data.status) {
          setCode(true);
          setTimerActive(true);
        }
      });
    } else {
      axios
        .post("/api/auth/authorization", values)
        .then((res) => {
          localStorage.setItem("access-token", res.data.payload);
          setState(false);
          dispatch(fetchUser()).then((result) => {
            if (!window.location.pathname.includes("order")) {
              if (res.data.role === "Пользователь") navigate("/user/profile");
              if (res.data.role === "Админ") navigate("/admin");
            }
            dispatch(hide());
          });
        })
        .catch((err) => setErr(err.response.data.message));
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const sendCode = () => {
    setTimerActive(false);
    setSeconds(60);
    setErr(null);
    axios.post("/api/auth", { email: email }).then((res) => {
      if (res.data.status) {
        setTimerActive(true);
      }
    });
  };

  useEffect(() => {
    if (seconds > 0 && timerActive) {
      setTimeout(setSeconds, 1000, seconds - 1);
      if (second.current !== null) second.current.innerHTML = (seconds - 1).toString();
    } else {
      setTimerActive(false);
    }
  }, [seconds, timerActive]);
  return (
    <Modal
      open={state || show}
      onCancel={() => setState(false)}
      title={langFile[lang].header.auth.title}
      okText={langFile[lang].header.auth.submit}
      cancelText={langFile[lang].header.auth.cancel}
      onOk={() => submit.current?.click()}
    >
      <Form name="authorization" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        {err ? <Alert type="error" message={err} showIcon /> : null}
        <Form.Item name="email" rules={[{ required: true, message: "Пожалуйста заполните почту!" }]}>
          <Input prefix={<MailOutlined />} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="Ваша почта" type="email" />
        </Form.Item>
        {code ? (
          <div style={{ display: "flex" }}>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Пожалуйста заполните код" }]}
              style={{ flex: 1 }}
              validateStatus={err ? "error" : undefined}
              help={
                seconds ? (
                  <span>
                    {langFile[lang].header.auth.helpSend} <span ref={second}></span>
                  </span>
                ) : null
              }
            >
              <Input placeholder="Код" prefix={<MessageOutlined />} />
            </Form.Item>
            <Button style={{ flex: 0 }} onClick={sendCode} disabled={seconds > 0 ? true : false}>
              {langFile[lang].header.auth.sendMessage}
            </Button>
          </div>
        ) : null}
        <Form.Item style={{ display: "none" }}>
          <Button htmlType="submit" ref={submit}>
            {langFile[lang].header.auth.submit}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
