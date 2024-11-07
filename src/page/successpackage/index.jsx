import React, { useEffect, useState } from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.jpg";
import api from "../../config/axios";
import useGetParams from "../../assets/hook/useGetParams";
import { useSelector } from "react-redux";

function SuccessPackagePage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const username = user.username;
  const params = useGetParams();
  const packageId = params("packageId");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");

  // Handler for confirming the payment status
  const confirmPaymentStatus = async () => {
    try {
      const response = await api.get(`/packages/${packageId}/payment-return`);
      // Optionally handle response, show notification, etc.
      console.log("Payment status confirmed:", response.data);
    } catch (error) {
      console.error("Error confirming payment status:", error);
      // Optionally show an error message to the user
    }
  };

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
          subTitle={`Cảm ơn ${username} đã thanh toán đơn hàng trên FEduToy`}
          extra={[
            <Button
              key="confirmStatus"
              type="primary"
              onClick={confirmPaymentStatus}
            >
              Confirm Payment Status
            </Button>,
            <Button
              key="buy"
              onClick={() => {
                navigate("/");
              }}
            >
              Buy Again
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}

export default SuccessPackagePage;
