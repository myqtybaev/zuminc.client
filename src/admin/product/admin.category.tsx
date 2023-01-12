import { useState, useEffect } from "react";
import { Alert, Table, Row, Col, Drawer, Form, Input, Select, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { attributeApi } from "../../store/service/attirubute.service";
import { categoryApi } from "../../store/service/category.service";
import { ICategory } from "../interface";

const { Option } = Select;
const { Column, ColumnGroup } = Table;
export const AdminCategory = () => {
  return (
    <>
      <Row gutter={30}>
        <Col span={6}>
          <CreateCategory />
        </Col>
        <Col span={18}>
          <TableCategory />
        </Col>
      </Row>
    </>
  );
};

const CreateCategory = () => {
  const [error, setError] = useState<string | null>(null);
  const { data } = attributeApi.endpoints.GetAll.useQuery("");
  const { refetch } = categoryApi.endpoints.GetAll.useQuery("");
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    axios
      .post("/api/product/category", values)
      .then((res) => {
        refetch();
        setError(null);
        form.resetFields();
      })
      .catch((err) => setError(err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form name="basic" form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
      {error ? <Alert message={error} type="error" showIcon /> : null}
      <Form.Item name="meaning">
        <Form.Item
          label="Название атрибута на казахском"
          name={["meaning", "KZ"]}
          rules={[{ required: true, message: "Пожалуйста заполните название категорий на казахском" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название атрибута на русском"
          name={["meaning", "RU"]}
          rules={[{ required: true, message: "Пожалуйста заполните название категорий на русском" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Название атрибута на английском"
          name={["meaning", "EN"]}
          rules={[{ required: true, message: "Пожалуйста заполните название категорий на английском" }]}
        >
          <Input />
        </Form.Item>
      </Form.Item>
      <Form.Item label="Ярлык категорий" name="name" rules={[{ required: true, message: "Пожалуйста заполните ярлык!" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Атрибуты" name="attribute" rules={[{ required: true, message: "Пожалуйста выберите атрибуты" }]}>
        <Select mode="multiple">
          {data?.map((item) => (
            <Option value={item._id} key={item._id}>
              {item.meaning.RU}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};
interface IEdit {
  open: boolean;
  setOpen: Function;
  id: string | null;
}
const EditCategory = ({ open, setOpen, id }: IEdit) => {
  const [error, setError] = useState<string | null>(null);
  const attributes = attributeApi.endpoints.GetAll.useQuery("").data;
  const { refetch } = categoryApi.endpoints.GetAll.useQuery("");
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    axios
      .put("/api/product/category/" + values._id, values)
      .then(() => {
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
    if (open && id !== null) axios.get("/api/product/category/" + id).then((res) => form.setFieldsValue(res.data));
  }, [open === true]);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} title="Изменить категорию">
      <Form name="basic" layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed} form={form}>
        {error ? <Alert message={error} type="error" showIcon /> : null}
        <Form.Item name="_id" style={{ display: "none" }} rules={[{ required: true, message: "Название категорий на казахском!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="meaning">
          <Form.Item
            label="Название атрибута на казахском"
            name={["meaning", "KZ"]}
            rules={[{ required: true, message: "Пожалуйста заполните название категорий на казахском" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название атрибута на русском"
            name={["meaning", "RU"]}
            rules={[{ required: true, message: "Пожалуйста заполните название категорий на русском" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Название атрибута на английском"
            name={["meaning", "EN"]}
            rules={[{ required: true, message: "Пожалуйста заполните название категорий на английском" }]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item label="Ярлык" name="label" rules={[{ required: true, message: "Please input your username!" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Тип" name="attribute" rules={[{ required: true, message: "Please input your username!" }]}>
          <Select mode="multiple">
            {attributes?.map((item) => (
              <Option value={item._id} key={item._id}>
                {item.meaning.RU}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

const TableCategory = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const { data, refetch } = categoryApi.endpoints.GetAll.useQuery("");
  const destroy = (id: string) => {
    axios.delete("/api/product/category/" + id).then((res) => refetch());
  };
  const edit = (value: string) => {
    setId(value);
    setOpen(true);
  };
  return (
    <>
      <Table dataSource={data?.map((item: ICategory) => ({ ...item, key: item._id }))}>
        <ColumnGroup title="Название">
          <Column title="Название" dataIndex="meaning" key="label" render={(meaning) => meaning?.KZ} />
          <Column title="Название" dataIndex="meaning" key="label" render={(meaning) => meaning?.RU} />
          <Column title="Название" dataIndex="meaning" key="label" render={(meaning) => meaning?.EN} />
        </ColumnGroup>
        <Column title="Ярллык" dataIndex="name" key="label" />
        <Column
          title="Функций"
          dataIndex="label"
          key="label"
          render={(_, record: ICategory) => (
            <Space>
              <Button type="primary" onClick={() => edit(record._id)}>
                <EditOutlined /> Изменить
              </Button>
              <Button type="primary" danger onClick={() => destroy(record._id)}>
                <DeleteOutlined /> Удалить
              </Button>
            </Space>
          )}
        />
      </Table>
      <EditCategory open={open} setOpen={setOpen} id={id} />
    </>
  );
};
