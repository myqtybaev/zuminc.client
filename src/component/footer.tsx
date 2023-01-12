import { InstagramOutlined } from "@ant-design/icons";
import { Row, Col, Typography, Grid } from "antd";
import logo from "../image/logo.png";
import "./footer.css";
export const Footer = () => {
  const { md } = Grid.useBreakpoint();
  return (
    <footer>
      <Row justify="space-between" align="top" gutter={md ? 30 : 0} style={{ padding: md ? undefined : "10px" }}>
        <Col md={3} span={0}>
          <img src={logo} width="150" className="mt-1" />
        </Col>
        <Col md={3} span={12}>
          <Typography.Paragraph className="title">
            <strong>Для покупателей</strong>
          </Typography.Paragraph>
          <Typography.Paragraph className="p">Доставка и оплата</Typography.Paragraph>
          <Typography.Paragraph className="p">Возврат и обмен</Typography.Paragraph>
          <Typography.Paragraph className="p">Оферта</Typography.Paragraph>
        </Col>
        <Col md={3} span={12}>
          <Typography.Paragraph className="title">
            <strong>Информация</strong>
          </Typography.Paragraph>
          <Typography.Paragraph className="p">О компании</Typography.Paragraph>
          <Typography.Paragraph className="p">Условия доставки</Typography.Paragraph>
          <Typography.Paragraph className="p">Условия продажи</Typography.Paragraph>
        </Col>
        <Col md={3} span={12} style={{ margin: md ? undefined : "auto" }}>
          <Typography.Paragraph className="title">
            <strong>Контакты</strong>
          </Typography.Paragraph>
          <Typography.Paragraph className="p">
            <a href="https://www.instagram.com/zum.inc/?igshid=YmMyMTA2M2Y%3D" className="p">
              <InstagramOutlined /> Наш инстраграм
            </a>
          </Typography.Paragraph>
        </Col>
      </Row>
    </footer>
  );
};
