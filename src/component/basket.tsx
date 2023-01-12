import { Button, Drawer, Space, Typography } from "antd";
import { LeftOutlined, CloseOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { IModal, IBasketItem } from "../hooks/interface";
import { useAppSelector } from "../hooks/redux";
import { useDispatch } from "react-redux";
import { destroy, editQue } from "../store/reducer/basketSlice";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { langFile } from "../lang";
const { Title, Text, Paragraph } = Typography;
export const Basket = ({ open, setOpen }: IModal) => {
  const { baskets, sum } = useAppSelector((state) => state.basket);
  const { lang } = useAppSelector((state) => state.lang);
  const navigate = useNavigate();
  const onOrder = () => {
    setOpen(false);
    navigate("/order");
  };
  const onClose = () => setOpen(false);
  console.log(baskets);

  return (
    <Drawer open={open} onClose={onClose} placement="right" className="basket" width={380}>
      <Title level={4} className="text-center back" onClick={onClose}>
        <LeftOutlined />
        {langFile[lang].basket.title}
      </Title>
      <Space direction="vertical">
        {baskets.map((item, i) => (
          <div key={item._id}>
            <BasketItem {...item} />
            {i + 1 !== baskets.length ? <hr /> : null}
          </div>
        ))}
      </Space>

      <div className="sum d-flex justify-content-between">
        <Paragraph>{langFile[lang].basket.allSum}</Paragraph>
        <Paragraph className="text-right">{sum}₸</Paragraph>
      </div>
      <button className="btn btn-primary w-100" onClick={onOrder}>
        {langFile[lang].basket.submit}
      </button>
    </Drawer>
  );
};

const BasketItem = ({ title, img, prise, que, _id }: IBasketItem) => {
  const dispatch = useDispatch(); //dispatch
  const { lang } = useAppSelector((state) => state.lang);
  const destroyItem = () => dispatch(destroy(_id)); //Удаление товара из корзины
  const change = (value: number) => {
    dispatch(editQue({ value, _id }));
  };
  const plus = () => {
    dispatch(editQue({ value: que + 1, _id }));
  };
  const minus = () => {
    dispatch(editQue({ value: que - 1, _id }));
  };
  return (
    <div className="basket-item">
      <Button className="destroy" shape="circle" size="small" onClick={destroyItem}>
        <CloseOutlined />
      </Button>
      <img width={120} height={120} src={img} />
      <div className="w-100">
        <Paragraph>{title[lang || "RU"]}</Paragraph>
        <Space className="que">
          <input value={que} type="number" onChange={(event) => change(parseInt(event.currentTarget.value))} />
          <PlusOutlined onClick={plus} />
          <MinusOutlined onClick={minus} />
        </Space>
        <Text className="prise">{prise}₸</Text>
      </div>
    </div>
  );
};
