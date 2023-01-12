import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Descriptions, Row, Col, Typography, List, Select, Modal, message } from "antd";
import { IBasketItem, IOrder } from "../hooks/interface";
import { axios } from "../hooks/axios";
const month: string[] = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const { Option } = Select;
type selectType = "Собираем посылку" | "Отправлен" | "Доставлен" | "Отменен" | null;
export const AdminOrderId = () => {
  const [order, setOrder] = useState<IOrder>();
  const [send, setSend] = useState(false);
  const [type, setType] = useState<selectType>(null);
  const { id } = useParams();
  const date: Date | undefined = order?.date ? new Date(order.date) : undefined;
  const onChange = (value: selectType) => {
    setType(value);
    setSend(true);
  };
  useEffect(() => {
    axios.get("/api/order/id=" + id).then((result) => setOrder(result.data));
  }, []);
  return (
    <Row gutter={30}>
      <Col md={18}>
        {date ? (
          <>
            <Typography.Text mark>
              {date.getDay().toString()} {month[date.getMonth()]} {date.getFullYear()}
            </Typography.Text>{" "}
            <Typography.Text mark>
              {date.getHours()}:{date.getMinutes()}
            </Typography.Text>
          </>
        ) : null}
        <Descriptions title="Информация пользователя" bordered layout="vertical">
          <Descriptions.Item label="ФИО">{order?.firstName + " " + order?.lastName}</Descriptions.Item>
          <Descriptions.Item label="Почта">{order?.email}</Descriptions.Item>
          <Descriptions.Item label="Телефон">
            <a href={"tel:" + order?.phone}>{order?.phone}</a>
          </Descriptions.Item>
          <Descriptions.Item label="Страна">{order?.country}</Descriptions.Item>
          <Descriptions.Item label="Город или населенный пункт">{order?.city}</Descriptions.Item>
          <Descriptions.Item label="Почтовый индекс">{order?.postIndex}</Descriptions.Item>
          <Descriptions.Item label="Улица">{order?.street}</Descriptions.Item>
          <Descriptions.Item label="Номер Дома">{order?.homeIndex}</Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Select value={order?.status as selectType} style={{ width: "100%" }} onChange={(event: selectType) => onChange(event)}>
              <Option value="Собираем посылку">Собираем посылку</Option>
              <Option value="Отправлен">Отправлен</Option>
              <Option value="Доставлен">Доставлен</Option>
              <Option value="Отменен">Отменен</Option>
            </Select>
          </Descriptions.Item>
          <Descriptions.Item label="Коментарий" span={2}>
            {order?.comment}
          </Descriptions.Item>
          <Descriptions.Item label="Промокод">{order?.promocode}</Descriptions.Item>
          <Descriptions.Item label="Общая сумма">{order?.sum}</Descriptions.Item>
          <Descriptions.Item label="Скидка">{order?.discont}</Descriptions.Item>
          <Descriptions.Item label="Итог">{order?.result}</Descriptions.Item>
        </Descriptions>
      </Col>
      <Col md={6}>
        <List
          header={<strong>Корзина</strong>}
          dataSource={order?.basket || []}
          renderItem={(item: IBasketItem) => {
            return (
              <List.Item style={{ flexDirection: "column" }}>
                <div className="d-flex w-100">
                  <img src={item.img} alt="" width={75} height={75} />
                  <Typography.Text>{item.title.RU}</Typography.Text>
                </div>
                <div className="d-flex justify-content-between w-100" style={{ paddingLeft: 75 }}>
                  <Typography.Paragraph>
                    <Typography.Text>Кол: {item.que}</Typography.Text>
                  </Typography.Paragraph>
                  <Typography.Paragraph>
                    <Typography.Text>Цена: {item.prise}</Typography.Text>
                  </Typography.Paragraph>
                </div>
              </List.Item>
            );
          }}
        />
      </Col>
      <Col md={24}></Col>
      <Send open={send} setOpen={setSend} type={type} />
    </Row>
  );
};

const Send = ({ type, open, setOpen }: { type: selectType; open: boolean; setOpen: Function }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const onFinish = () => {
    axios.post("/api/order/edit=" + id, { type: type, text: ref.current?.innerHTML }).then((result) => {
      setOpen(false);
      message.success("Статус изменен, сообщение доставленно");
    });
  };
  useEffect(() => {
    if (ref.current) ref.current.innerHTML = "Вашь заказ собрат и отправлен курьерской службой.<br/> Ваш трек номер:";
  }, [open]);
  return (
    <Modal open={open} onCancel={() => setOpen(false)} onOk={onFinish} okText="Отправить клиенту" cancelText="Отмена" width={1000}>
      <Typography.Title level={3}>Данное сообщение клиент получит по почту</Typography.Title>
      <div contentEditable ref={ref}></div>
    </Modal>
  );
};
