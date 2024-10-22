import React, { useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
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
  const dispatch = useDispatch();
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

  const handleBuy = async () => {
    try {
      const seletedItems = data.filter((toy) =>
        selectedRowKeys.includes(toy.id)
      );
      console.log(seletedItems);

      const item = selectedRowKeys.map((toy) => ({
        postId: toy.id,
        quantity: toy.quantity,
      }));
      const response = await api.post("order/buy", { item });
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <Button onClick={() => dispatch(clearAll())}>Clear All</Button>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />

      <Button onClick={handleBuy}>Buy </Button>
    </div>
  );
}

export default CartPage;
