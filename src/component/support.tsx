import { useState } from "react";
import { Button } from "antd";
import { CloseOutlined, TeamOutlined } from "@ant-design/icons";
import phone from "../image/phone.svg";
import telegram from "../image/telegram.svg";
import instagram from "../image/instagram.svg";
import whatsapp from "../image/whatsapp.svg";
export const HelpSupport = () => {
  const [state, setState] = useState(false);
  return (
    <div className={state ? "support active" : "support"} id="support">
      <Button className="show" size="large" shape="circle" onClick={() => setState(!state)}>
        <TeamOutlined />
      </Button>
      <div className="support-modal">
        <Button shape="circle" className="close" onClick={() => setState(false)}>
          <CloseOutlined />
        </Button>
        <div className="header">
          <div className="logo">
            <TeamOutlined />
          </div>
          <div>
            <p>
              <strong>zuminc</strong>
            </p>
            <p>Чат поддержки</p>
          </div>
        </div>
        <div className="body">
          <p className="title">Информация </p>
          <ul>
            <li>
              <a href="tel:99999">
                <img src={phone} alt="phone" width={16} height={16} /> Наш телефон +7 777 777 77 77
              </a>
            </li>
            <li>
              <a href="sd.com">
                <img src={telegram} alt="telegram" width={16} height={16} /> Наш Telegram
              </a>
            </li>
            <li>
              <a href="tel:99999">
                <img src={whatsapp} alt="whatsapp" width={16} height={16} /> Наш WhatsApp
              </a>
            </li>
            <li>
              <a href="tel:99999">
                <img src={instagram} alt="instagram" width={16} height={16} /> Наш Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
