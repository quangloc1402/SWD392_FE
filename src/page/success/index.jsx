import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.jpg";
import "./index.scss";
import api from "../../config/axios";
import useGetParams from "../../assets/hook/useGetParams";

function SuccessPage() {
  const navigate = useNavigate();
  const params= useGetParams();
  const orderID =params("orderID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  console.log(orderID);
  console.log("Status:", vnp_TransactionStatus)

  const postOrderID = async() => {
    try{
      const response = await api.post( `/orders/update-post-count/${orderID}`);
  }catch(e){
    console.log(e);
  }
  };

  useEffect(()=>{
    if(vnp_TransactionStatus ==="00"){
      postOrderID();
    }else{
      
    }
  },[]);
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
