import { Button, Drawer, Form, Input, Space, Table } from "antd";
import { DeleteOutlined, PlusOutlined, MinusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { IModal } from "./interface";
import { axios } from "../hooks/axios";
import { addressApi } from "../store/service/address.service";
export const AdminAddress = () => {
  const [state, setState] = useState(false); // Создание
  const show = () => setState(true);
  return (
    <>
      <Button type="primary" onClick={show}>
        Создать Страну
      </Button>
      <Create setState={setState} state={state} />
      <TableAddress />
    </>
  );
};

const Create = ({ state, setState }: IModal) => {
  const { refetch } = addressApi.endpoints.GetAll.useQuery("");
  const onFinish = (value: any) => {
    value.city = value.city.map((item: { city: string }) => item.city);

    axios.post("/api/address", value).then((result) => {
      setState(false);
      refetch();
    });
  };
  return (
    <Drawer open={state} onClose={() => setState(false)} title="Создать адресс">
      <Form name="address" layout="vertical" onFinish={onFinish}>
        <Form.Item name="country" label="Страна" rules={[{ required: true, message: "Пожалуйста заполните страну!" }]}>
          <Input />
        </Form.Item>
        <p>Города или населенные пункты</p>
        <Form.List name="city">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="d-flex align-items-center" style={{ marginBottom: 8, gap: 10 }} key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "city"]}
                    rules={[{ required: true, message: "Пожалуйста заполните поле" }]}
                    style={{ margin: 0, width: "100%" }}
                  >
                    <Input placeholder="Город" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить город
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button className="w-100" type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
const Edit = ({ state, setState, id }: { state: boolean; setState: Function; id: null | string }) => {
  const { refetch } = addressApi.endpoints.GetAll.useQuery("");
  const [form] = Form.useForm();
  const close = () => {
    form.resetFields();
    setState(false);
  };
  const onFinish = (value: any) => {
    value.city = value.city.map((item: { city: string }) => item.city);
    axios.post("/api/address", value).then((result) => {
      setState(false);
      refetch();
    });
  };
  useEffect(() => {
    if (state)
      axios
        .get("/api/address/" + id)
        .then((result) => form.setFieldsValue({ ...result.data, city: result.data.city.map((item: string) => ({ city: item })) }));
  }, [state === true]);
  return (
    <Drawer open={state} onClose={close} title="Создать адресс">
      <Form name="address" layout="vertical" onFinish={onFinish} form={form}>
        <Form.Item name="country" label="Страна" rules={[{ required: true, message: "Пожалуйста заполните страну!" }]}>
          <Input />
        </Form.Item>
        <p>Города или населенные пункты</p>
        <Form.List name="city">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <div className="d-flex align-items-center" style={{ marginBottom: 8, gap: 10 }} key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, "city"]}
                    rules={[{ required: true, message: "Пожалуйста заполните поле" }]}
                    style={{ margin: 0, width: "100%" }}
                  >
                    <Input placeholder="Город" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Добавить город
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button className="w-100" type="primary" htmlType="submit">
            Создать
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
const TableAddress = () => {
  const { data, refetch } = addressApi.endpoints.GetAll.useQuery("");
  const [id, setId] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const destroy = (id: string) => axios.delete("/api/address/" + id).then(() => refetch());
  const update = (id: string) => {
    setId(id);
    setEdit(true);
  };
  return (
    <>
      <Table dataSource={data?.map((item, i) => ({ ...item, key: i.toString() })) || []}>
        <Table.Column title="Страна" dataIndex="country" key="_id" />
        <Table.Column title="Города" dataIndex="city" key="_id" render={(item) => item.length} />
        <Table.Column title="Города" dataIndex="city" key="_id" render={(item) => <Space>{item.map((item: string) => item)}</Space>} />
        <Table.Column
          dataIndex="_id"
          key="_id"
          render={(item: string) => (
            <Space>
              <Button type="primary" icon={<EditOutlined />} onClick={() => update(item)}>
                Редактировать
              </Button>
              <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => destroy(item)}>
                Удалить
              </Button>
            </Space>
          )}
        />
      </Table>
      <Edit setState={setEdit} state={edit} id={id} />
    </>
  );
};
