import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Modal, Button, Form, Input, Select, Upload, InputNumber, Image, Alert, Table, Space, UploadFile, Checkbox } from "antd";
import { UploadOutlined, EditOutlined, DeleteOutlined, PlusCircleFilled } from "@ant-design/icons";
import { IAttribute, IProduct } from "../interface";
import { attributeApi } from "../../store/service/attirubute.service";
import { categoryApi } from "../../store/service/category.service";
import axios from "axios";
import { productApi } from "../../store/service/product.service";
import { RcFile, UploadProps } from "antd/lib/upload";
const { Option } = Select;
export const AdminProduct = () => {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <Button onClick={() => setOpen(true)} type="primary" style={{ marginBottom: 30 }} icon={<PlusCircleFilled />}>
        Создать товар
      </Button>
      <CreateProduct setState={setOpen} state={open} count={count} />
      <TableProduct state={count} setState={setCount} />
    </>
  );
};

const CreateProduct = ({ state, setState, count }: { state: boolean; setState: Function; count: number }) => {
  const [attribute, setAttribute] = useState<string[]>([]);
  const [err, setErr] = useState<string | undefined>();
  const categoryes = categoryApi.endpoints.GetAll.useQuery("");
  const attributes = attributeApi.endpoints.GetAll.useQuery("");
  const { refetch } = productApi.endpoints.GetAll.useQuery(count);
  const [form] = Form.useForm();
  const submit = useRef<HTMLButtonElement>(null);
  const onFinish = async (values: any) => {
    let images: RcFile[] = values.image.fileList.map((item: UploadFile) => item.originFileObj);
    const getBase = (file: RcFile): Promise<string> => {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();
        reader.readAsDataURL(file as File);
        reader.onload = () => resolve(reader.result as string);
      });
    };
    values.image = await Promise.all(images.map(async (item) => await getBase(item)));

    axios
      .post("/api/product", values)
      .then((res) => {
        setErr(undefined);
        setState(false);
        form.resetFields();
        setAttribute([]);
        refetch();
      })
      .catch((err) => setErr(err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (values: string) => {
    setAttribute(categoryes.data?.find((item) => item._id === values)?.attribute || []);
  };

  return (
    <Modal
      width={"100%"}
      open={state}
      onCancel={() => setState(false)}
      title="Создать товар"
      okText="Создать товар"
      onOk={() => submit.current?.click()}
      cancelText="Отмена"
    >
      {err ? <Alert message={err} type="error" showIcon style={{ marginBottom: 15 }} /> : undefined}
      <Form name="basic" form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Row gutter={30}>
          <Col span={6}>
            <Form.Item label="Картинка" name="image" rules={[{ required: true, message: "Пожалуйста загрузите картинку" }]}>
              <Upload
                name="logo"
                listType="picture"
                customRequest={(option) => (option.onSuccess ? option.onSuccess(true) : null)}
                multiple
                maxCount={10}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Нажми для загрузки картинки</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Название на русском" name={["title", "RU"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Название на казахском" name={["title", "KZ"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Название на английском" name={["title", "EN"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item name={["description", "RU"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на русском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на русском" />
            </Form.Item>
            <Form.Item name={["description", "KZ"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на казахском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на казахском" />
            </Form.Item>
            <Form.Item name={["description", "EN"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на английском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на английском" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Цена" name="prise" rules={[{ required: true, message: "Please input your password!" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Скидка" name="discont" initialValue={0} rules={[{ required: true, message: "Please input your password!" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Please input your password!" }]}>
              <Select onChange={onChange}>
                {categoryes.data?.map((item) => (
                  <Option value={item._id} key={item._id}>
                    {item.meaning.RU}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="inStock" rules={[{ required: true, message: "Please input your password!" }]} initialValue={false}>
              <Checkbox>Товар в наличий</Checkbox>
            </Form.Item>
            <Form.Item name="hit" rules={[{ required: true, message: "Please input your password!" }]} initialValue={false}>
              <Checkbox>Хит продаж</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            {/* <Form.Item name="attribute"> */}
            {attribute.map((item: string, i: number) =>
              getType(
                attributes.data?.find((elem) => elem._id === item),
                i
              )
            )}
            {/* </Form.Item> */}
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: "none" }}>
          <Button type="primary" htmlType="submit" ref={submit}></Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const EditProduct = ({ state, setState, count, id }: { state: boolean; setState: Function; count: number; id: string | null }) => {
  const [files, setFiles] = useState<UploadFile[]>([]); //Картинки
  const [attribute, setAttribute] = useState<string[]>([]); // Атрибуты из выбранной категорий
  const [err, setErr] = useState<string | undefined>(); // Ошибка
  const categoryes = categoryApi.endpoints.GetAll.useQuery(""); // Категорий из базы
  const attributes = attributeApi.endpoints.GetAll.useQuery(""); // Атрибуты из базы
  const { refetch } = productApi.endpoints.GetAll.useQuery(count); // обновление базы
  const [form] = Form.useForm(); // форма
  const submit = useRef<HTMLButtonElement>(null);
  const onFinish = async (values: any) => {
    values.old = await files.filter((item) => (item.uid.includes("old") ? item.url : false)).map((item) => item.url);
    values.image = await files.filter((item) => (item.uid.includes("old") ? false : item.url)).map((item) => item.url);
    axios
      .put("/api/product/id=" + values._id, {
        ...values,
        image: files.filter((item) => (item.uid.includes("old") ? false : item.url)).map((item) => item.url),
        old: files.filter((item) => (item.uid.includes("old") ? item.url : false)).map((item) => item.url),
      })
      .then((res) => {
        setErr(undefined);
        setState(false);
        form.resetFields();
        setAttribute([]);
        refetch();
      })
      .catch((err) => console.log("eer", err.response.data.message));
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (values: string) => {
    setAttribute(categoryes.data?.find((item) => item._id === values)?.attribute || []);
  };
  const onUpload: UploadProps["onChange"] = ({ file }) => {
    // let files: string[] = await Promise.all(fileList.map(async (item) => await getBase(item)));

    if (file.status === "removed") {
      let arr = [...files];
      let index = arr.findIndex((item) => item.uid === file.uid);
      arr.splice(index, 1);
      setFiles(arr);
    }
    if (file.status === "uploading") {
      let reader = new FileReader();
      let name = Date.now() + (Math.random() * 1000).toString();
      setFiles([...files, { uid: name, name: file.name, status: "uploading" }]);
      reader.onload = () => {
        let arr = [...files];
        let index = arr.findIndex((item) => item.uid === file.uid);
        arr.splice(index, 1);
        setFiles(arr);
        setFiles([...files, { uid: Date.now().toString(), name: file.name, status: "success", url: reader.result as string }]);
      };
      reader.readAsDataURL(file.originFileObj as File);
    }
  };
  useEffect(() => {
    if (state) {
      axios.get("/api/product/update=" + id).then((res) => {
        // console.log(res.data);
        let image: UploadFile[] = res.data.image.map((item: string, i: number) => ({
          uid: `-${i - 1}`,
          url: item,
          status: "done",
          name: `Картинка ${i}`,
        }));

        form.setFieldsValue({
          ...res.data,
          image,
        });
        onChange(res.data.category);
        setFiles(
          res.data.image.map((item: string, i: number) => ({
            url: item,
            name: "Картинка товара " + (i + 1),
            status: "done",
            uid: "old " + i.toString(),
          }))
        );
      });
    }
  }, [state === true]);
  return (
    <Modal
      width={1500}
      open={state}
      onCancel={() => setState(false)}
      title="Создать товар"
      okText="Создать товар"
      onOk={() => submit.current?.click()}
      cancelText="Отмена"
    >
      {err ? <Alert message={err} type="error" showIcon style={{ marginBottom: 15 }} /> : undefined}
      <Form name="basic" form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item name="_id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Row gutter={30}>
          <Col span={6}>
            <Form.Item label="Картинка" name="image" rules={[{ required: true, message: "Пожалуйста загрузите картинку" }]}>
              <Upload
                // name="logo"
                listType="picture"
                customRequest={(option) => (option.onSuccess ? option.onSuccess(true) : null)}
                multiple
                maxCount={10}
                accept="image/*"
                fileList={files}
                onChange={onUpload}
                // onChange={(event) => setFiles(event.fileList)}
              >
                <Button icon={<UploadOutlined />}>Нажми для загрузки картинки</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Название на русском" name={["title", "RU"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Название на казахском" name={["title", "KZ"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Название на английском" name={["title", "EN"]} rules={[{ required: true, message: "Please input your password!" }]}>
              <Input />
            </Form.Item>
            <Form.Item name={["description", "RU"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на русском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на русском" />
            </Form.Item>
            <Form.Item name={["description", "KZ"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на казахском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на казахском" />
            </Form.Item>
            <Form.Item name={["description", "EN"]} rules={[{ required: true, message: "Пожалуйста заполните описание товара на английском" }]}>
              <Input.TextArea rows={4} placeholder="Описание товара на английском" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Цена" name="prise" rules={[{ required: true, message: "Пожалуйста укажите цену" }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Скидка" name="discont" initialValue={0}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Категория" name="category" rules={[{ required: true, message: "Пожалуйста выберите категорию!" }]}>
              <Select onChange={onChange}>
                {categoryes.data?.map((item) => (
                  <Option value={item._id} key={item._id}>
                    {item.meaning.RU} {item._id}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="inStock" rules={[{ required: true, message: "Please input your password!" }]} valuePropName="checked">
              <Checkbox>Товар в наличий</Checkbox>
            </Form.Item>
            <Form.Item name="hit" rules={[{ required: true, message: "Please input your password!" }]} valuePropName="checked">
              <Checkbox>Хит продаж</Checkbox>
            </Form.Item>
          </Col>
          <Col span={6}>
            {attribute.map((item: string, i: number) => {
              return getType(
                attributes.data?.find((elem) => elem._id === item),
                i
              );
            })}
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ display: "none" }}>
          <Button type="primary" htmlType="submit" ref={submit}></Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
const getType = (props: IAttribute | undefined, i: number) => {
  return (
    <React.Fragment key={i}>
      <Form.Item name={["attribute", i, "_id"]} initialValue={props?._id} style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Form.Item label={props?.meaning?.RU} name={["attribute", i, "value", "RU"]}>
        {props?.type === "number" ? <InputNumber style={{ width: "100%" }} /> : <Input />}
      </Form.Item>
      <Form.Item label={props?.meaning?.KZ} name={["attribute", i, "value", "KZ"]}>
        {props?.type === "number" ? <InputNumber style={{ width: "100%" }} /> : <Input />}
      </Form.Item>
      <Form.Item label={props?.meaning?.EN} name={["attribute", i, "value", "EN"]}>
        {props?.type === "number" ? <InputNumber style={{ width: "100%" }} /> : <Input />}
      </Form.Item>
    </React.Fragment>
  );
};

const TableProduct = ({ state, setState }: any) => {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data, refetch } = productApi.endpoints.GetAll.useQuery(state);
  const destroy = (id: string) => {
    axios.delete("/api/product/" + id).then(() => refetch());
  };
  const update = (value: string) => {
    setId(value);
    setOpen(true);
  };
  return (
    <>
      <Table
        dataSource={data?.product.map((item: IProduct) => ({ ...item, key: item._id }))}
        onChange={(event) => setState((event.current || 1) - 1 || 0)}
        pagination={{ pageSize: 30, total: data?.count || (40 / 40) * 10 }}
      >
        <Table.Column
          title="Картинка"
          dataIndex="image"
          key="title"
          render={(
            _: string[] //<Image src={_[0]} width={75} height={75} />
          ) => <Images _={_} />}
        ></Table.Column>
        <Table.ColumnGroup title="Название">
          <Table.Column title="на казахском" dataIndex="title" key="title" render={(item) => item.KZ} />
          <Table.Column title="на русском" dataIndex="title" key="title" render={(item) => item.RU} />
          <Table.Column title="на английском" dataIndex="title" key="title" render={(item) => item.EN} />
        </Table.ColumnGroup>
        <Table.Column title="Цена товара" dataIndex="prise" key="title" />
        <Table.Column title="Категория товара" dataIndex="category" key="title" />
        <Table.Column title="Атрибуты товара" dataIndex="attribute" key="title" render={(_: object[], record: IProduct) => record.attribute.length} />
        <Table.Column
          dataIndex="action"
          render={(_: undefined, record: IProduct) => (
            <Space>
              <Button type="primary" icon={<EditOutlined />} onClick={() => update(record._id)}>
                Редактировать
              </Button>
              <Button type="primary" icon={<DeleteOutlined />} onClick={() => destroy(record._id)} danger>
                Удалить
              </Button>
            </Space>
          )}
        />
      </Table>
      <EditProduct state={open} setState={setOpen} count={state} id={id} />
    </>
  );
};
interface IImages {
  _: string[];
}
const Images = ({ _ }: IImages) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Image preview={{ visible: false }} width={75} height={75} src={_[0]} onClick={() => setVisible(true)} />
      <div style={{ display: "none" }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
          {_.map((item: string, i: number) => (
            <Image src={item} key={i} />
          ))}
        </Image.PreviewGroup>
      </div>
    </>
  );
};
const getBase = (file: RcFile): Promise<string> => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file as File);
    reader.onload = () => resolve(reader.result as string);
  });
};
const getFile = (e: any) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};
