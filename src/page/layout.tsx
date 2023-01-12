import { Header } from "../component/header";
import { Outlet } from "react-router-dom";
import { Footer } from "../component/footer";
import { Button } from "antd";
import { UpOutlined } from "@ant-design/icons";
import { HelpSupport } from "../component/support";
export const Layout = () => {
  const top = () => {
    window.scroll({ top: 100, left: 100, behavior: "smooth" });
  };
  return (
    <div className="body">
      <div id="header">
        <Header />
      </div>
      <main>
        <Outlet />
        <HelpSupport />
        <Button shape="circle" icon={<UpOutlined />} className="btn btn-primary" size="large" id="yakor" onClick={top}></Button>
      </main>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
};
