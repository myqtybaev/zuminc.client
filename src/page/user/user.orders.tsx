import { Col, Grid, Row, Space, Tag, Typography } from "antd";
import { useState, useEffect } from "react";
import { axios } from "../../hooks/axios";
import { IBasketItem, IOrder } from "../../hooks/interface";
import { useAppSelector } from "../../hooks/redux";
const { Paragraph, Text } = Typography;
export const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const { user } = useAppSelector((state) => state.userReducer);
  useEffect(() => {
    if (user) axios.get("/api/order/user").then((result) => setOrders(result.data));
  }, [user]);
  return (
    <div className="page-order">
      {orders.map((item: IOrder) => (
        <TableRow {...item} key={item._id} />
      ))}
    </div>
  );
};

const TableRow = ({
  basket,
  status,
  result,
  date,
  nomer,
  firstName,
  lastName,
  email,
  phone,
  comment,
  country,
  city,
  street,
  postIndex,
  homeIndex,
}: IOrder) => {
  return (
    <Row className="item" gutter={30} justify="space-between">
      <Col md={3} span={12} className="border-right">
        <Paragraph>
          <Text className="color-primary">Номер заказа</Text>
          <br />
          <Text>{nomer}</Text>
        </Paragraph>
        <Space direction="vertical">
          {basket.map((item) => (
            <img width={64} className="m-auto d-block" src={item.img} />
          ))}
        </Space>
      </Col>
      <Col md={4} span={12} className="border-right">
        <Paragraph>
          <Text className="color-primary text-center d-block">Дата отправки</Text>
          <Text className=" text-center d-block">{new Date(date).toLocaleDateString()}</Text>
        </Paragraph>
        <Paragraph>
          <Text className="color-primary text-center d-block">Общая сумма</Text>
          <Text className="text-center d-block">{result}</Text>
        </Paragraph>
      </Col>
      <Col md={4} span={12} className="border-right">
        <Paragraph>
          <Text className="color-primary text-center d-block">Статус</Text>
          <Text className=" text-center d-block">{status}</Text>
        </Paragraph>
        <Paragraph>
          <Text className="color-primary text-center d-block">Имя получателя</Text>
          <Text className="text-center d-block">
            {firstName} {lastName}
          </Text>
        </Paragraph>
      </Col>
      <Col md={4} span={12} className="border-right">
        <Paragraph>
          <Text className="color-primary text-center d-block">Контакты</Text>
          <Text className=" text-center d-block">{email}</Text> <Text className=" text-center d-block">+7 {phone}</Text>
        </Paragraph>
        <Paragraph>
          <Text className="color-primary text-center d-block">Коментарий</Text>
          <Text className="text-center d-block">{comment}</Text>
        </Paragraph>
      </Col>
      <Col md={4} span={24}>
        <Paragraph>
          <Text className="color-primary d-block">Адресс получателя</Text>
          <Text className=" d-block">Страна: {country}</Text>
          <Text className="d-block">Город: {city}</Text>
          <Text className="d-block">Индекс: {postIndex}</Text>
          <Text className=" d-block">Улица: {street}</Text>
          <Text className="d-block">Дом: {homeIndex}</Text>
        </Paragraph>
      </Col>
    </Row>
  );
};
