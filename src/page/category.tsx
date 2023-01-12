import { useState, useEffect } from "react";
import { Col, Row, Pagination } from "antd";
import { useParams } from "react-router-dom";
import { IProduct } from "../admin/interface";
import { CardProduct } from "../component/card";
import { productApi } from "../store/service/product.service";

export const CategoryPage = () => {
  const { category } = useParams();
  const [count, setCount] = useState(0);
  const { data, refetch } = productApi.endpoints.GetQuery.useQuery(`?category=${category}&count=${count}`);
  const change = (value: number) => {
    setCount(value - 1);
  };
  useEffect(() => {
    refetch();
  }, [category]);
  return (
    <Row className="category-page" justify="space-between">
      <Col md={24}>
        <div className="card-list">
          {data?.product.map((item: IProduct) => (
            <CardProduct {...item} key={item._id} />
          ))}
        </div>
        <div className="d-flex justify-conter w-100">
          <Pagination onChange={change} defaultCurrent={30} defaultPageSize={30} total={data?.count} style={{ margin: "auto", marginTop: 30 }} />
        </div>
      </Col>
    </Row>
  );
};
