import React, { useEffect, useState } from "react";
import api from "../../config/axios";
import { Table } from "antd";

function History() {
  const [orders, setOrders] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
  ];
  const fetchHistory = async () => {
    try {
      const response = await api.get("orders/history");
      setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="history">
      <h1>Order History</h1>

      <Table dataSource={orders} columns={columns} />
    </div>
  );
}

export default History;
