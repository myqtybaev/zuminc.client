import { useEffect, useState } from "react";
import { Space, Button, Drawer, InputNumber, Alert } from "antd";
import { Table, Form, Input, Select } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { usersApi } from "../store/service/user.service";
import { IUser } from "./interface";
import { incrementByAmount } from "../store/reducer/usersSlice";
import axios from "axios";
import { langFile } from "../lang";
const { Column } = Table;
const { Option } = Select;
export const AdminUser = () => {
  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { count } = useAppSelector((state) => state.userCount);
  const dispatch = useAppDispatch();
  const { data, refetch } = usersApi.endpoints.GetAll.useQuery(count);
  const { lang } = useAppSelector((state) => state.lang);
  const destroy = (id: string) => {
    axios.delete("/api/user/" + id).then((res) => refetch());
  };
  const edit = (id: string) => {
    setUserId(id);
    setUpdateUserOpen(true);
  };
  const onChange = (value: number | undefined) => {
    dispatch(incrementByAmount((value || 1) - 1));
  };
  return (
    <>
      <Table
        dataSource={data?.map((item: IUser) => ({ ...item, key: item._id }))}
        onChange={(event) => onChange(event.current)}
        pagination={{ pageSize: 30 }}
      >
        <Column title={langFile[lang].admin.user.email} dataIndex="email" key="_id" />
        <Column title={langFile[lang].admin.user.password} dataIndex="password" key="_id" />
        <Column title={langFile[lang].admin.user.role} dataIndex="role" key="_id" />
        <Column
          title={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateUserOpen(true)}>
              {langFile[lang].admin.user.createTitle}
            </Button>
          }
          key="_id"
          render={(_: undefined, record: IUser) => (
            <Space>
              <Button type="primary" icon={<EditOutlined />} onClick={() => edit(record._id)}>
                {langFile[lang].admin.user.editTitle}
              </Button>
              <Button type="primary" icon={<DeleteOutlined />} danger onClick={() => destroy(record._id)}>
                {langFile[lang].admin.user.destroyTitle}
              </Button>
            </Space>
          )}
        />
      </Table>
      <CreateUser open={createUserOpen} setOpen={setCreateUserOpen} />
      <UpdateUser open={updateUserOpen} setOpen={setUpdateUserOpen} id={userId} />
    </>
  );
};
const CreateUser = ({ open, setOpen }: { open: boolean; setOpen: Function }) => {
  const [err, setErr] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { count } = useAppSelector((state) => state.userCount);
  const { refetch } = usersApi.endpoints.GetAll.useQuery(count);
  const { lang } = useAppSelector((state) => state.lang);
  const onFinish = (value: { email: string; password: string; role: string }) => {
    console.log(value);
    axios
      .post("/api/user", value)
      .then((res) => {
        setOpen(false);
        form.resetFields();
        refetch();
      })
      .catch((err) => setErr(err.response.data.message));
  };
  return (
    <Drawer open={open} onClose={() => setOpen(false)} title={langFile[lang].admin.user.createTitle}>
      {err ? <Alert message={err} type="error" showIcon /> : null}
      <Form onFinish={onFinish} name="create-user" layout="vertical" form={form}>
        <Form.Item label={langFile[lang].admin.user.email} name="email" rules={[{ required: true, message: "Пожалуйста заполните почту!" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label={langFile[lang].admin.user.password} name="password" rules={[{ required: true, message: "Пожалуйста заполните пороль!" }]}>
          <Input maxLength={4} />
        </Form.Item>
        <Form.Item label={langFile[lang].admin.user.role} name="role" rules={[{ required: true, message: "Пожалуйста выберите роль!" }]}>
          <Select>
            <Option value="Пользователь">Пользователь</Option>
            <Option value="Админ">Админ</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            {langFile[lang].admin.user.createSubmit}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
const UpdateUser = ({ open, setOpen, id }: { open: boolean; setOpen: Function; id: string | null }) => {
  const [err, setErr] = useState<string | null>(null);
  const [form] = Form.useForm();
  const { count } = useAppSelector((state) => state.userCount);
  const { refetch } = usersApi.endpoints.GetAll.useQuery(count);
  const { lang } = useAppSelector((state) => state.lang);
  const onFinish = (value: { email: string; password: string; role: string }) => {
    console.log(value);
    axios
      .put("/api/user/id=" + id, value)
      .then((res) => {
        setOpen(false);
        form.resetFields();
        setErr(null);
        refetch();
      })
      .catch((err) => setErr(err.response.data.message));
  };
  useEffect(() => {
    if (open && id) axios.get("/api/user/id=" + id).then((res) => form.setFieldsValue(res.data));
  }, [open === true]);
  return (
    <Drawer open={open} onClose={() => setOpen(false)} title={langFile[lang].admin.user.editTitle}>
      {err ? <Alert message={err} type="error" showIcon /> : null}
      <Form onFinish={onFinish} name="create-user" layout="vertical" form={form}>
        <Form.Item label={langFile[lang].admin.user.email} name="email" rules={[{ required: true, message: "Пожалуйста заполните почту!" }]}>
          <Input type="email" />
        </Form.Item>
        <Form.Item label={langFile[lang].admin.user.password} name="password" rules={[{ required: true, message: "Пожалуйста заполните пороль!" }]}>
          <Input maxLength={4} />
        </Form.Item>
        <Form.Item label={langFile[lang].admin.user.role} name="role" rules={[{ required: true, message: "Пожалуйста выберите роль!" }]}>
          <Select>
            <Option value="Пользователь">Пользователь</Option>
            <Option value="Админ">Админ</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            {langFile[lang].admin.user.editSubmit}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};
