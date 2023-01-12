import { useState, useEffect } from "react";
import { Row, Col, Spin, Select, Alert, Drawer } from "antd";
import { Form, Input, Button } from "antd";
import { Space, Table, Tag, Tabs } from "antd";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { attributeApi } from "../../store/service/attirubute.service";
import { IAttribute } from "../interface";

import { axios } from "../../hooks/axios";
const { Column } = Table;

export const AdminAttribute = () => {
  const { isLoading } = attributeApi.endpoints.GetAll.useQuery("");
  return (
    <>
      <Row gutter={30}>
        <Col span={6}>
          <CreateAttribute />
        </Col>
        <Col span={18}>{isLoading ? <Spin /> : <TableAttribute />}</Col>
      </Row>
    </>
  );
};
const CreateAttribute = () => {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = attributeApi.endpoints.GetAll.useQuery("");
  const onFinish = (values: { label: { RU: string; KZ: string; EN: string }; name: string; type: string }) => {
    axios
      .post("/api/product/attribute", values)
      .then((res) => {
        refetch();
        setError(null);
      })
      .catch((err) => setError(err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      {error ? <Alert message={error} type="error" showIcon /> : null}
      <Form.Item name="meaning">
        <Form.Item
          label="Название атрибута на казахском"
          name={["meaning", "KZ"]}
          rules={[{ required: true, message: "Пожалуйста заполните название атрибута на казахском" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название атрибута на русском"
          name={["meaning", "RU"]}
          rules={[{ required: true, message: "Пожалуйста заполните название атрибута на русском" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название атрибута на английском"
          name={["meaning", "EN"]}
          rules={[{ required: true, message: "Пожалуйста заполните название атрибута на английском" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Ярлык" name="name" rules={[{ required: true, message: "Пожалуйста заполните ярлык атрибута" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Тип" name="type" rules={[{ required: true, message: "Пожалуйста выберите тип" }]}>
        <Select>
          <Select.Option value="number">Число</Select.Option>
          <Select.Option value="string">Строка</Select.Option>
          {/* <Select.Option value="boolean">Логическое</Select.Option> */}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};
interface IEdit {
  open: boolean;
  setOpen: Function;
  attribute: IAttribute | null;
}
const EditAttribute = ({ open, setOpen, attribute }: IEdit) => {
  const [error, setError] = useState<string | null>(null);
  const { refetch } = attributeApi.endpoints.GetAll.useQuery("");
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
    axios
      .put("/api/product/attribute/" + values._id, values)
      .then((res) => {
        setError(null);
        refetch();
        setOpen(false);
        form.resetFields();
      })
      .catch((err) => setError(err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (open === true) form.setFieldsValue(attribute);
  }, [open === true]);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} title="Редактирование атрибута">
      <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        {error ? <Alert message={error} type="error" showIcon /> : null}
        <Form.Item name="_id" rules={[{ required: true, message: "Please input your username!" }]} style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item name="meaning">
          <Form.Item
            label="Название атрибута на казахском"
            name={["meaning", "KZ"]}
            rules={[{ required: true, message: "Пожалуйста заполните название атрибута на казахском" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название атрибута на русском"
            name={["meaning", "RU"]}
            rules={[{ required: true, message: "Пожалуйста заполните название атрибута на русском" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название атрибута на английском"
            name={["meaning", "EN"]}
            rules={[{ required: true, message: "Пожалуйста заполните название атрибута на английском" }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Ярлык" name="name" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Тип" name="type" rules={[{ required: true, message: "Please input your username!" }]}>
          <Select>
            <Select.Option value="number">Число</Select.Option>
            <Select.Option value="string">Строка</Select.Option>
            {/* <Select.Option value="boolean">Логическое</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const TableAttribute = () => {
  const [open, setOpen] = useState(false);
  const [attribute, setAttribute] = useState<IAttribute | null>(null);
  const { data, refetch } = attributeApi.endpoints.GetAll.useQuery("");
  const destroy = (id: string) => {
    axios.delete("/api/product/attribute/" + id).then((res) => refetch());
  };
  const edit = (value: IAttribute) => {
    setAttribute(value);
    setOpen(true);
  };
  return (
    <>
      <Table dataSource={data?.map((item: IAttribute) => ({ ...item, key: item._id })).reverse()}>
        <Column
          title="Название атрибута RU|KZ|EN"
          dataIndex="meaning"
          key="label"
          render={(meaning: { RU: string; KZ: string; EN: string }) => `${meaning.RU} | ${meaning.KZ} | ${meaning.EN}`}
        />
        <Column title="Ярллык Атрибута" dataIndex="name" key="label" />
        <Column
          title="Тип Атрибута"
          dataIndex="label"
          key="label"
          render={(_, record: IAttribute) => <Tag color="blue">{record.type === "number" ? "Числовое" : "строка"}</Tag>}
        />
        <Column
          title="Функций"
          dataIndex="label"
          key="label"
          render={(_, record: IAttribute) => (
            <Space>
              <Button type="primary" onClick={() => edit(record)}>
                <EditOutlined /> Изменить
              </Button>
              <Button type="primary" danger onClick={() => destroy(record._id)}>
                <DeleteOutlined /> Удалить
              </Button>
            </Space>
          )}
        />
      </Table>
      <EditAttribute open={open} setOpen={setOpen} attribute={attribute} />
    </>
  );
};
