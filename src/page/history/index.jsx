import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Alert, Button, Form, Input, Modal, Rate, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";

function History() {
  const [orders, setOrders] = useState([]);
  const [form] = useForm();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/orders/history");
      console.log(response.data);
      setOrders(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleFeedback = async (values) => {
    console.log(selectedOrder);
    values.postId = selectedOrder; // Assuming postId refers to orderId

    try {
      const response = await api.post("feedback", values);
      fetchHistory();
      setSelectedOrder(null);
      form.resetFields();
      toast.success("Successfully created feedback");
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      title: "Order Detail ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `${text.toLocaleString()} VND`, // Format price
    },
    {
      title: "Toys",
      dataIndex: "toy",
      key: "toy",
      render: (toy) => toy?.toyName,
    },
    {
      title: "Action",
      dataIndex: "orderId",
      key: "action",
      render: (value, record) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              setSelectedOrder(record);
            }}
          >
            Give Feedback
          </Button>
        );
      },
    },
  ];

  return (
    <div className="history">
      <h2>Lịch Sử Mua Hàng</h2>
      <Table dataSource={orders} columns={columns} rowKey="orderId" />
      <Modal
        title="Feedback"
        open={!!selectedOrder} // Open modal if there is a selected order
        onOk={() => form.submit()}
        onCancel={() => {
          setSelectedOrder(null);
        }}
      >
        <Alert
          message={`Feedback for Order ID ${selectedOrder?.orderId}`}
          type="info"
        />
        <Form
          labelCol={{
            span: 25,
          }}
          onFinish={handleFeedback}
          form={form}
        >
          <Form.Item
            label="Rating"
            name="rating"
            rules={[{ required: true, message: "Please select a rating!" }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            label="Feedback"
            name="content"
            rules={[{ required: true, message: "Please enter your feedback!" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default History;
