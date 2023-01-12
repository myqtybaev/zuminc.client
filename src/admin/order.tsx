import { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { IOrder } from "../hooks/interface";
import { axios } from "../hooks/axios";
import { Link } from "react-router-dom";
const { Column } = Table;
export const AdminOrder = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const get = () => {
    axios.get("/api/order?count=" + count).then((result) => {
      setOrders(result.data.data);
      setTotal(result.data.total);
    });
  };
  const destroy = (id: string) => {
    axios.delete("/api/order/" + id).then(get);
  };
  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <Table
        bordered
        dataSource={orders.map((item: IOrder) => ({ ...item, key: item._id })).reverse()}
        onChange={(event) => setCount((event.current || 1) - 1 || 0)}
        pagination={{ pageSize: 30, total: total }}
      >
        <Column title="Номер заказа" dataIndex="nomer" key="_id" />
        <Column title="Почта" dataIndex="email" key="_id" />
        <Column title="Телефон" dataIndex="phone" key="_id" />
        <Column title="Итог" dataIndex="result" key="_id" />
        <Column title="Статус" dataIndex="status" key="_id" />
        <Column
          key="_id"
          render={(_: undefined, record: IOrder) => (
            <Space>
              <Link to={record._id} style={{ color: "#fff" }} target="_blank">
                <Button type="primary" icon={<EyeOutlined />}>
                  Подробнее
                </Button>
              </Link>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => destroy(record._id)}>
                Подробнее
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
};
