import { Card, Space } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { IProduct } from "../admin/interface";
import "./card.css";
import { useAppSelector } from "../hooks/redux";
export const CardProduct = ({ _id, image, title, prise, inStock, discont }: IProduct) => {
  const { lang } = useAppSelector((state) => state.lang);
  return (
    <Link to={"/product/" + _id}>
      <Card className="card" cover={<img src={image[0]} alt={"Image"} />}>
        {inStock ? (
          <span className="in-stock">
            <CheckCircleFilled /> товар в наличий
          </span>
        ) : null}
        <p className="m-1 card-title">
          <strong>{title[lang]}</strong>
        </p>
        {discont > 0 ? <s>{prise} &#8376;</s> : null}
        <Space style={{ width: "100%", justifyContent: "space-between" }} align="center">
          <span>{prise - Math.round(prise * (discont / 100))} &#8376;</span>
        </Space>
      </Card>
    </Link>
  );
};
