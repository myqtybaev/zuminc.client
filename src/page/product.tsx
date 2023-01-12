import { Row, Col, Image, Typography, Space, Breadcrumb, List, Button, Grid } from "antd";
import { LeftOutlined, RightOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import "./product.css";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { add } from "../store/reducer/basketSlice";
import { IProduct } from "../hooks/interface";
const { Title, Text } = Typography;
export const ProductPage = () => {
  const { md } = Grid.useBreakpoint();
  const { id } = useParams();
  const [data, setData] = useState<IProduct | undefined>();
  const [image, setImage] = useState(false);
  const [active, setActive] = useState("option");
  const [count, setCount] = useState(0);
  const [que, setQue] = useState<number>(1);
  const { lang } = useAppSelector((state) => state.lang);
  const handleCount = (value: boolean) => {
    if (value && count < data!.image.length - 1) setCount(count + 1);
    if (!value && count > 0) setCount(count - 1);
  };
  const dispatch = useAppDispatch();
  const addBasket = () => {
    if (data) dispatch(add({ ...data, que: que }));
  };
  useEffect(() => {
    axios.get("/api/product/id=" + id).then((result) => {
      setData(result.data);
      console.log(result.data);
    });
  }, []);

  return (
    <div className="product-page">
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/">Главное</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{/* <Link to={"/category/" + data?.category.name || "/"}>{data?.category.meaning[lang]}</Link> */}</Breadcrumb.Item>
        <Breadcrumb.Item>{data?.title[lang]}</Breadcrumb.Item>
      </Breadcrumb>
      <Row justify="space-between" style={{ marginTop: 30 }}>
        <Col md={8} span={24}>
          <Title>{data?.title[lang]}</Title>
          {md ? null : (
            <div className="slider-mobile">
              <div>
                <Image
                  className="image-sing"
                  preview={{ visible: false }}
                  src={data?.image[count]}
                  onClick={() => setImage(true)}
                  alt={data?.title[lang]}
                />
                <Space className="slid-image" align="center">
                  <LeftOutlined onClick={() => handleCount(false)} />
                  <span>{count + 1}</span>
                  <span>/</span>
                  <sup>{data?.image.length}</sup>
                  <RightOutlined onClick={() => handleCount(true)} />
                </Space>
              </div>
              <div className="image">
                <Image.PreviewGroup preview={{ visible: image, onVisibleChange: (vis) => setImage(vis) }}>
                  <div className="d-flex">
                    {data?.image.map((item: string, key: number) => (
                      <Image src={item} key={key} className={count === key ? "active" : undefined} />
                    ))}
                  </div>
                </Image.PreviewGroup>
              </div>
            </div>
          )}
          <Title level={3}>{data?.prise} &#8376;</Title>
          <Text>{data?.description[lang]}</Text>
          <div className="d-flex justify-content-between mt-4">
            <div className="que">
              <button onClick={() => (que > 1 ? setQue(que - 1) : setQue(1))}>
                <MinusOutlined />
              </button>
              <input type="number" value={que} onChange={(e) => setQue(Number(e.target.value))} />
              <button onClick={() => setQue(que + 1)}>
                <PlusOutlined />
              </button>
            </div>
            <button className="btn-primary btn" onClick={addBasket}>
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
          <div className="d-grid g-col-2 gap-1 mt-4">
            <Button className={active === "option" ? "w-100 btn-primary" : "w-100"} shape="round" onClick={() => setActive("option")}>
              Характеристики
            </Button>
            {/* <Button className={active === "comment" ? "w-100 btn-primary" : "w-100"} shape="round" onClick={() => setActive("comment")}>
              Отзывы
            </Button> */}
          </div>
          <List
            header={<div>Основные характеристики</div>}
            dataSource={data?.attribute}
            renderItem={(item: any) =>
              item?.value ? (
                <List.Item>
                  <Row style={{ width: "100%" }}>
                    <Col span={12}>
                      <span className="title">{item.meaning[lang]}</span>
                    </Col>
                    <Col span={12}>{item?.value[lang]}</Col>
                  </Row>
                </List.Item>
              ) : undefined
            }
          />
        </Col>
        <Col md={12} span={0}>
          <div>
            <Image
              className="image-sing"
              preview={{ visible: false }}
              src={data?.image[count]}
              onClick={() => setImage(true)}
              alt={data?.title[lang]}
            />
            <Space className="slid-image" align="center">
              <LeftOutlined onClick={() => handleCount(false)} />
              <span>{count + 1}</span>
              <span>/</span>
              <sup>{data?.image.length}</sup>
              <RightOutlined onClick={() => handleCount(true)} />
            </Space>
          </div>
          <div className="image">
            <Image.PreviewGroup preview={{ visible: image, onVisibleChange: (vis) => setImage(vis) }}>
              <div className="d-flex">
                {data?.image.map((item: string, key: number) => (
                  <Image src={item} key={key} className={count === key ? "active" : undefined} />
                ))}
              </div>
            </Image.PreviewGroup>
          </div>
        </Col>
      </Row>
    </div>
  );
};

// const Attribute = () => {
//   const [attribute, setAttribute] = useState<IAttribute[]>([]);
//   const { id } = useParams();
//   const { data } = productApi.endpoints.GetOne.useQuery(id);
//   const { lang } = useAppSelector((state) => state.lang);
//   useEffect(() => {
//     // if (data !== undefined) {
//     //   axios.get("/api/product/attribute/ids=" + data.attribute.map((item: any) => item._id).join(",")).then((result) => setAttribute(result.data));
//     // }
//   }, [data]);
//   return (

//   );
// };
