import React, { useEffect, useState } from "react";
import { Button, Result, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.jpg";
import "./index.scss";
import api from "../../config/axios";
import useGetParams from "../../assets/hook/useGetParams";
import { useSelector } from "react-redux";

function SuccessPage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const username = user.username;
  const params = useGetParams();
  const orderID = params("orderID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const postOrderID = async () => {
    try {
      const response = await api.post(`/orders/update-post-count/${orderID}`);
      console.log("Order count updated:", response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const updateOrderStatus = async (status) => {
    try {
      // Update the API call to use query parameters
      const response = await api.post(
        `/orders/update-status?orderId=${orderID}&status=${status}`
      );
      console.log("Order status updated:", response.data);
      Modal.success({
        content: 'Order status updated to "COMPLETED".',
      });
    } catch (error) {
      console.log("Error updating order status:", error);
      Modal.error({
        title: "Update Failed",
        content: "Could not update the order status. Please try again later.",
      });
    }
  };

  useEffect(() => {
    if (vnp_TransactionStatus === "00") {
      postOrderID();
    }
  }, [vnp_TransactionStatus]);

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
              onClick={() => setIsModalVisible(true)}
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

      {/* Modal for confirming the payment status */}
      <Modal
        title="Confirm Order Status"
        visible={isModalVisible}
        onOk={() => {
          updateOrderStatus("COMPLETED");
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>
          Are you sure you want to confirm the payment status as "COMPLETED"?
        </p>
      </Modal>
    </div>
  );
}

export default SuccessPage;
