import React, { useEffect } from "react";
import { Button, Result } from "antd";
import useGetParams from "../../assets/hook/useGetParams";
import api from "../../config/axios";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
  // const params = useGetParams();
  // const orderID = params("orderID");
  // console.log(orderID);
  // const vnp_TmnCode = params("vnp_TmnCode");
  // console.log("OrderID", orderID);
  // console.log("vnp_TnmCode", vnp_TmransactionStatus);
  const navigate = useNavigate();

  // const postOrderID = async() =>{
  //     const response = await api.post("/../..")
  // }

  // useEffect(() => {
  //     if(vnp_TmnCode ==="00"){
  //         postOrderID();

  //     }else{
  //         //navigate to failed page
  //     }
  // }, []);
  return (
    <div>
      <Result
        status="success"
        title="Successfully Purchased for FEdutoy"
        subTitle="Ma don hang: 180203 cam on thang lozz da mua hang."
        extra={[
          <Button
            type="primary"
            key="console"
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
  );
}
export default SuccessPage;
