import React, { useState } from "react";
import { Table } from "antd";
import { useSelector } from "react-redux";
function CartPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "toyName",
      key: "toyName",
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const data = useSelector((store) => store.cart);
  console.log(data);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
}

export default CartPage;
