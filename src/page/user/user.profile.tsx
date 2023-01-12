import { useAppSelector } from "../../hooks/redux";
import { Row, Col, Space, Form, Input, InputNumber, Select, Typography, Button, message } from "antd";
import { useEffect, useState } from "react";
import Axios from "axios";
import { axios } from "../../hooks/axios";
import { langFile } from "../../lang";
const { Title } = Typography;
const { Option } = Select;
export const UserProfile = () => {
  const { user } = useAppSelector((state) => state.userReducer);
  const { lang } = useAppSelector((state) => state.lang);
  const [citys, setCitys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    axios.put("/api/user/id=" + user?._id, values).then(() => message.success("Информация изменина"));
  };
  const getCity = (value: string) => {
    if (value === "Республика Казахстан") {
      Axios.get("https://api.post.kz/api/objects/A1?from=0").then((result) => setCitys(result.data.data.map((item: any) => item.nameKaz)));
    }
  };
  useEffect(() => {
    form.setFieldsValue(user);
  }, [user]);
  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={30}>
          <Col md={12} span={24}>
            <Title level={2}>{langFile[lang].user.profile.personTitle}</Title>
            <Form.Item label={langFile[lang].user.profile.email} name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label={langFile[lang].user.profile.firstName} name="firstName">
              <Input />
            </Form.Item>
            <Form.Item label={langFile[lang].user.profile.lastName} name="lastName">
              <Input />
            </Form.Item>
            <Form.Item label={langFile[lang].user.profile.gender} name="gender">
              <Select>
                <Select.Option value="Мужской">Мужской</Select.Option>
                <Select.Option value="Женский">Женский</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label={langFile[lang].user.profile.birdDay} name="birdDay">
              <Input type="date" />
            </Form.Item>
          </Col>
          <Col md={12} span={24}>
            <Title level={2}>{langFile[lang].user.profile.addressTitle}</Title>
            <Form.Item label={langFile[lang].user.profile.country} name="country">
              <Select placeholder={langFile[lang].user.profile.country} onChange={getCity}>
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
            <Form.Item label={langFile[lang].user.profile.city} name="city">
              {citys.length !== 0 ? (
                <Select>
                  {citys.map((item: string, key: number) => (
                    <Option key={key.toString()} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input />
              )}
            </Form.Item>
            <Form.Item label={langFile[lang].user.profile.postIndex} name="postIndex">
              <Input />
            </Form.Item>
            <div className="d-flex" style={{ gap: 8 }}>
              <Form.Item label={langFile[lang].user.profile.street} name="street" style={{ width: "100%" }}>
                <Input style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label={langFile[lang].user.profile.homeIndex} name="homeIndex" style={{ width: "100%" }}>
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </div>
            <Form.Item label={<span style={{ color: "#fff" }}>Кнопка</span>}>
              <Button htmlType="submit" className="btn btn-primary w-100">
                {langFile[lang].user.profile.submit}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
