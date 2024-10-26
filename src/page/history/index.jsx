import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Table } from "antd";

const History = () => {
  const [orders, setOrders] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/orders/history/type");
      console.log(response.data); // Check response structure
      if (Array.isArray(response.data)) {
        setOrders(response.data);
      } else {
        console.error("Expected an array but got:", response.data);
        setOrders([]); // Reset to an empty array
      }
    } catch (e) {
      console.error(e);
      setOrders([]); // Reset to empty array on error
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: ["order", "quantity"],
      key: "quantity",
    },
    {
      title: "Total Price",
      dataIndex: ["order", "totalPrice"],
      key: "totalPrice",
    },
  ];

  return (
    <div className="history">
      <h1>Order History</h1>
      <Table dataSource={orders} columns={columns} rowKey="id" />
    </div>
  );
};

export default History;
