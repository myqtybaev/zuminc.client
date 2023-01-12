import { Row, Col, Space, Typography, Form, Input, Select, Card, Button, message, Modal, Result, Grid } from "antd";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { axios } from "../hooks/axios";
import { IModal, IOrder } from "../hooks/interface";
import { useAppSelector } from "../hooks/redux";
import { langFile } from "../lang";
import { show } from "../store/reducer/authReducer";
import { setDiscont, reset } from "../store/reducer/basketSlice";
const { Title, Paragraph } = Typography;
const { Option } = Select;

export const OrderPage = () => {
  const { md } = Grid.useBreakpoint();
  const { sum, baskets, discont, result } = useAppSelector((state) => state.basket);
  const [citys, setCitys] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [promocode, setPromocode] = useState<string | null>(null);
  const dispatch = useDispatch();
  const submit = useRef<HTMLButtonElement>(null);
  const { user, isAuth } = useAppSelector((state) => state.userReducer);
  const [form] = Form.useForm();
  const { lang } = useAppSelector((state) => state.lang);
  const onChange = (value: string) => {
    if (value === "Республика Казахстан") {
      axios.get("https://api.post.kz/api/objects/A1?from=0").then((result) => setCitys(result.data.data.map((item: any) => item.nameKaz)));
    } else {
      setCitys([]);
    }
  };
  const onPromocode = (value: { promocode: string }) => {
    axios
      .get("/api/promocode/name=" + value.promocode)
      .then((result) => {
        dispatch(setDiscont(result.data.discont));
        setPromocode(value.promocode);
      })
      .catch((err) => message.error(err.response.data.message));
  };
  const onFinish = (values: IOrder) => {
    const date = new Date();
    const expires_at: string = date.toLocaleDateString().split(".").reverse().join("-") + " " + date.toLocaleTimeString();
    const min: number = Math.ceil(100000);
    const max: number = Math.floor(999999);
    values.basket = baskets;
    values.discont = discont;
    values.sum = sum;
    values.result = result;
    values.date = new Date();
    values.promocode = promocode || "";
    values.nomer = Number(`${date.toLocaleDateString().split(".").join("")}${Math.floor(Math.random() * (max - min) + min)}`);
    values.date = date;
    const data = {
      token: "kmVVH2bWp2AAWJKnKMKgPynZrJ10EUbN",
      payment: {
        order: `${values.nomer}`,
        amount: `${result}`,
        currency: "KZT",
        description: `https://zuminc.kz/admin/order/${values.nomer}`,
        expires_at: `${expires_at}`,
        options: {
          user: {
            email: `${values.email}`,
            phone: `${values.phone}`,
          },
        },
      },
      successCallback: async function (payment: any) {
        axios.post("/api/order", values).then((result) => {
          setSuccess(true);
          form.resetFields();
          dispatch(reset());
          setTimeout(() => setSuccess(false), 2000);
        });
      },
      errorCallback: function (payment: any) {
        //...
        // payment.then((res: any) => console.log(res));
      },
    };
    console.log("pay", data);
    //@ts-ignore
    PayBox(data).create();
  };

  const showAuth = () => {
    dispatch(show());
  };
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  return (
    <>
      <Modal open={!isAuth} footer={[]} style={{ padding: 30, textAlign: "center" }} width={700}>
        <Typography.Title level={1}>Пожалуйста Авторизуйтесь</Typography.Title>
        <Typography.Paragraph>
          Для дальнейшего оформления заказа <br />
          вы должны авторизоватся
        </Typography.Paragraph>
        <Space>
          <Button className="btn btn-danger">
            <Link to="/">Вернутся в главное меню</Link>
          </Button>
          <Button className="btn btn-primary" onClick={showAuth}>
            Авторизоватся
          </Button>
        </Space>
      </Modal>

      <Row className="order-page" justify="space-between">
        <Col md={24}>
          <Title level={2}>{langFile[lang].order.title}</Title>
        </Col>
        <Col md={16} flex={2}>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Paragraph>{langFile[lang].order.personTitle}</Paragraph>
            <Space direction={md ? "horizontal" : "vertical"} className="w-100">
              <Form.Item
                label={langFile[lang].order.firstName}
                name="firstName"
                rules={[{ required: true, message: "Пожалуйста заполните ваше имя!" }]}
              >
                <Input placeholder={langFile[lang].order.firstName} style={{ width: md ? 171 : "100%" }} />
              </Form.Item>
              <Form.Item
                label={langFile[lang].order.lastName}
                name="lastName"
                rules={[{ required: true, message: "Пожалуйста заполните ваше имя!" }]}
              >
                <Input placeholder={langFile[lang].order.lastName} style={{ width: md ? 171 : "100%" }} />
              </Form.Item>
              <Form.Item label={langFile[lang].order.email} name="email" rules={[{ required: true, message: "Пожалуйста заполните вашу почту!" }]}>
                <Input placeholder={langFile[lang].order.email} type="email" style={{ width: md ? 350 : "100%" }} />
              </Form.Item>
            </Space>
            <Form.Item name="phone" label={langFile[lang].order.phone} rules={[{ required: true, message: "Пожалуйста заполните ваш телефон!" }]}>
              <Input type="tel" style={{ width: md ? 708 : "100%" }} placeholder="Вашь телефон" prefix={"+7"} />
            </Form.Item>
            <Paragraph>
              <strong>{langFile[lang].order.addressTitle}</strong>
            </Paragraph>
            <Space direction={md ? "horizontal" : "vertical"} className="w-100">
              <Form.Item
                name="country"
                label={langFile[lang].order.country}
                rules={[{ required: true, message: "Пожалуйста выберите вашу страну!" }]}
              >
                <Select style={{ width: md ? 350 : "100%" }} placeholder={langFile[lang].order.country} onChange={onChange}>
                  <Option value="Республика Казахстан">Республика Казахстан</Option>
                  <Option value="Азербайджанская Республика">Азербайджанская Республика</Option>
                  <Option value="Республика Армения">Республика Армения</Option>
                  <Option value="Республика Беларусь">Республика Беларусь</Option>
                  <Option value="Кыргызская Республика">Кыргызская Республика</Option>
                  <Option value="Республика Молдова">Республика Молдова</Option>
                  <Option value="Российская Федерация">Российская Федерация</Option>
                  <Option value="Республика Таджикистан">Республика Таджикистан</Option>
                  <Option value="Туркменистан">Туркменистан</Option>
                  <Option value="Республика Узбекистан">Республика Узбекистан</Option>
                  <Option value="Украина">Украина</Option>
                </Select>
              </Form.Item>
              <Form.Item name="city" label={langFile[lang].order.city} rules={[{ required: true, message: "Пожалуйста заполните ваш город!" }]}>
                {citys.length !== 0 ? (
                  <Select style={{ width: md ? 350 : "100%" }}>
                    {citys.map((item: string, i: number) => (
                      <Option value={item} key={i.toString()}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                ) : (
                  <Input placeholder={langFile[lang].order.city} style={{ width: md ? 350 : "100%" }} />
                )}
              </Form.Item>
            </Space>
            <Space direction={md ? "horizontal" : "vertical"} className="w-100">
              <Form.Item
                name="postIndex"
                label={langFile[lang].order.postIndex}
                rules={[{ required: true, message: "Пожалуйста заполните ваш почтовый индекс!" }]}
              >
                <Input placeholder={langFile[lang].order.postIndex} style={{ width: md ? 228 : "100%" }} />
              </Form.Item>
              <Form.Item name="street" label={langFile[lang].order.street} rules={[{ required: true, message: "Пожалуйста заполните вашу улицу!" }]}>
                <Input placeholder={langFile[lang].order.street} style={{ width: md ? 240 : "100%" }} />
              </Form.Item>
              <Form.Item name="homeIndex" label={langFile[lang].order.homeIndex}>
                <Input placeholder={langFile[lang].order.homeIndex} style={{ width: md ? 223 : "100%" }} />
              </Form.Item>
            </Space>
            <Form.Item name="comment" label={langFile[lang].order.comment}>
              <Input.TextArea rows={6} style={{ width: md ? 708 : "100%" }} />
            </Form.Item>
            <Form.Item style={{ display: "none" }}>
              <Button htmlType="submit" ref={submit}></Button>
            </Form.Item>
          </Form>
        </Col>
        <Col md={6} flex={1}>
          <Card>
            <Title level={4}>{langFile[lang].order.promocodeTitle}</Title>
            <Paragraph className="d-flex justify-content-between">
              <span>{langFile[lang].order.summOrder}:</span> <span>{sum} &#8376;</span>
            </Paragraph>

            <Paragraph className="d-flex justify-content-between">
              <span>{langFile[lang].order.delivery}:</span> <span>800 &#8376;</span>
            </Paragraph>
            <Form layout="vertical" onFinish={onPromocode}>
              <div className="d-flex gap-1">
                <Form.Item name="promocode" style={{ width: "100%" }}>
                  <Input placeholder={langFile[lang].order.promocode} />
                </Form.Item>
                <Form.Item>
                  <Button className="btn btn-primary" htmlType="submit">
                    {langFile[lang].order.promocodeSubmit}
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <hr />
            <Paragraph className="d-flex justify-content-between">
              <span>{langFile[lang].order.discont}:</span> <span>{discont} %</span>
            </Paragraph>
            <Paragraph className="d-flex justify-content-between">
              <span>{langFile[lang].order.itog}:</span> <span>{result} &#8376;</span>
            </Paragraph>

            <Button className="btn btn-primary w-100" onClick={() => submit.current?.click()}>
              {langFile[lang].order.submit}
            </Button>
          </Card>
        </Col>
      </Row>
      <Success open={success} setOpen={setSuccess} />
    </>
  );
};

const Success = ({ open, setOpen }: IModal) => {
  return (
    <Modal open={open} onCancel={() => setOpen(false)} footer={false}>
      <Result status="success" title="Ваша заказ принят" subTitle="Ваш заказ будет отправлен почтовой службой течение дня" />
    </Modal>
  );
};
