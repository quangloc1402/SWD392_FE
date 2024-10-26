import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Table } from "antd";

function History() {
  const [Oders, setOrders] = useState([]);
  const fetchHistory = async () => {
    try {
      const response = await api.get("/orders/history");
      setOrders(response.data);
    } catch (e) {
      console.error(e);
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
      render: (text) => new Date(text).toLocaleString(), // Format date
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
  ];
  return (
    <div className="history">
      Lịch Sử Mua Hàng
      <Table dataSource={Oders} columns={columns} />
    </div>
  );
}

export default History;
