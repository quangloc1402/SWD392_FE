import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.jpg";
import "./index.scss";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="logo">
        <a href="/">
          <img src={LOGO} alt="logo" />
        </a>
      </div>
      <div className="result-container">
        <Result
          status="success"
          title="Successfully Purchased for FEdutoy"
          subTitle="Mã đơn hàng: 180203. Cảm ơn bạn đã mua hàng."
          extra={[
            <Button
              type="primary"
              key="history"
              onClick={() => {
                navigate("/history");
              }}
            >
              Go To History
            </Button>,
            <Button key="buy">Buy Again</Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default SuccessPage;
