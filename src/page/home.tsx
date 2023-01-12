import { Button, Carousel, Grid, Space } from "antd";
import { useState } from "react";
import { CardProduct } from "../component/card";
import slider from "../image/slider.png";
import { productApi } from "../store/service/product.service";
import { useAppSelector } from "../hooks/redux";
import { langFile } from "../lang";
export const Home = () => {
  return (
    <div className="home">
      <Sliders />
      <br />
      <Catalog />
    </div>
  );
};
const Sliders = () => {
  const { md } = Grid.useBreakpoint();
  const images = [slider, slider, slider, slider, slider];
  return (
    <div className="slider" style={md ? {} : { padding: 10 }}>
      <Carousel>
        {images.map((item: string, i: number) => (
          <div key={i.toString()}>
            <img src={item} className="w-100" alt={i.toString()} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const Catalog = () => {
  const [active, setActive] = useState("news");
  const { data } = productApi.endpoints.GetParam.useQuery(active);
  const { lang } = useAppSelector((state) => state.lang);

  return (
    <div className="catalog">
      <Space className="mb-1">
        <Button className={active === "news" ? "active" : undefined} onClick={() => setActive("news")}>
          {langFile[lang].home.catalogButton.news}
        </Button>
        <Button className={active === "hit" ? "active" : undefined} onClick={() => setActive("hit")}>
          {langFile[lang].home.catalogButton.hit}
        </Button>
        <Button className={active === "discont" ? "active" : undefined} onClick={() => setActive("discont")}>
          {langFile[lang].home.catalogButton.discont}
        </Button>
      </Space>
      <div className="card-list">
        {data?.map((item) => (
          <CardProduct {...item} key={item._id} />
        ))}
      </div>
    </div>
  );
};
