import { Alert, Col, Drawer, InputNumber, Row, Space, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { axios } from "../hooks/axios";
import { IPoromocode } from "../hooks/interface";
import { promocodeApi } from "../store/service/promocode.service";
const { Column } = Table;
export const AdminPromocode = () => {
  const [count, setCount] = useState(0);
  return (
    <Row gutter={30}>
      <Col md={6}>
        <CreatePromocode count={count} />
      </Col>
      <Col md={18}>
        <PromocodeTable count={count} setCount={setCount} />
      </Col>
    </Row>
  );
};
const CreatePromocode = ({ count }: { count: number }) => {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = promocodeApi.endpoints.GetAll.useQuery(count);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    axios
      .post("/api/promocode", values)
      .then((result) => {
        refetch();
        form.resetFields();
      })
      .catch((err) => setError(err.response.data.message));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {error ? <Alert message={error} type="error" showIcon /> : null}
      <Form name="createPromocode" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <Form.Item
          label="Промокод"
          help="Должен быть уникальным"
          name="promocode"
          rules={[{ required: true, message: "Пожалуйста введите промокод" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Скидка" help="Скидка в проценте" name="discont" rules={[{ required: true, message: "Пожалуйста введите скидку" }]}>
          <InputNumber style={{ width: "100%" }} max={100} />
        </Form.Item>
        <Form.Item label="медиа-партнер" name="partner" rules={[{ required: true, message: "Пожалуйста введите портнера" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Ссылка на партнера" name="partnerUrl">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
const Edit = ({ open, setOpen, id, count }: { open: boolean; setOpen: Function; id: string; count: number }) => {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = promocodeApi.endpoints.GetAll.useQuery(count);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    axios
      .put("/api/promocode/" + id, values)
      .then((result) => {
        refetch();
        form.resetFields();
        setOpen(false);
      })
      .catch((err) => setError(err.response.data.message));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (open) axios.get("/api/promocode/id=" + id).then((result) => form.setFieldsValue(result.data));
  }, [open]);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} title="Редактирование">
      {error ? <Alert message={error} type="error" showIcon /> : null}
      <Form name="createPromocode" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} layout="vertical">
        <Form.Item
          label="Промокд"
          help="Должен быть уникальным"
          name="promocode"
          rules={[{ required: true, message: "Пожалуйста введите промокод" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Скидка" help="Скидка в проценте" name="discont" rules={[{ required: true, message: "Пожалуйста введите скидку" }]}>
          <InputNumber style={{ width: "100%" }} max={100} />
        </Form.Item>
        <Form.Item label="Медиа партнер" name="partner" rules={[{ required: true, message: "Пожалуйста введите портнера" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Ссылка на партнера" name="partnerUrl">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
const PromocodeTable = ({ count, setCount }: { count: number; setCount: Function }) => {
  const { data, refetch } = promocodeApi.endpoints.GetAll.useQuery(count);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const destroy = (id: string) => {
    axios.delete("/api/promocode/" + id).then((res) => refetch());
  };
  const onOpen = (id: string) => {
    setId(id);
    setOpen(true);
  };
  return (
    <>
      <Table
        dataSource={data?.data.map((item, i) => ({ ...item, key: i.toString() })) || []}
        onChange={(event) => setCount((event.current || 1) - 1 || 0)}
        pagination={{ pageSize: 30, total: data?.count }}
      >
        <Column title="Промокд" dataIndex="promocode" key="promocode" />
        <Column title="Скидка" dataIndex="discont" key="promocode" render={(discont: number) => discont.toString() + "%"} />
        <Column title="Медиа партнер" dataIndex="partner" key="promocode" />
        <Column title="Ссылка на медиа партнер" dataIndex="partnerUrl" key="promocode" />
        <Column
          key="promocode"
          render={(_: undefined, record: IPoromocode) => {
            return (
              <Space>
                <Button type="primary" icon={<EditOutlined />} onClick={() => onOpen(record._id)}>
                  Изменирть
                </Button>
                <Button type="primary" danger onClick={() => destroy(record._id)} icon={<DeleteOutlined />}>
                  Удалить
                </Button>
              </Space>
            );
          }}
        />
      </Table>
      <Edit open={open} setOpen={setOpen} count={count} id={id} />
    </>
  );
};
