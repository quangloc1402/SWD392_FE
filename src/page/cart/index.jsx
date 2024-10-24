import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { clearAll } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import api from "../../config/axios";

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
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [cartData, setCartData] = useState([]);
  const dispatch = useDispatch();

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get("cart"); // Adjust endpoint accordingly
        const cartItems = response.data.cartItems.map((item) => ({
          id: item.id,
          toyName: item.post.toyName,
          quantity: item.post.quantity,
          description: item.post.description,
          price: item.post.price,
          imageUrl: item.post.imageUrl, // Assuming you want to keep track of it
          priceByDay: item.post.priceByDay,
          depositFee: item.post.depositFee,
          status: item.post.status,
        }));

        setCartData(cartItems);
      } catch (error) {
        console.error("Failed to fetch cart data", error);
        toast.error("Failed to load cart data");
      }
    };

    fetchCartData();
  }, []);

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
      const selectedItems = cartData.filter((toy) =>
        selectedRowKeys.includes(toy.id)
      );
      console.log(selectedItems);

      const item = selectedItems.map((toy) => ({
        postId: toy.id,
        quantity: toy.quantity,
      }));

      const response = await api.post("order/buy", { item });
      console.log(response.data);
      window.open(response.data);
      toast.success("Buy Successful");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create order");
    }
  };
  const handleClearAll = async () => {
    try {
      const response = await api.post("cart/clear"); // Adjust endpoint accordingly
      console.log(response.data);
      toast.success("Cart cleared successfully!");
      setCartData([]); // Clear the local cart data state
      dispatch(clearAll()); // Dispatch Redux action to clear the cart here if necessary
    } catch (error) {
      console.error("Failed to clear cart", error);
      toast.error("Failed to clear cart");
    }
  };

  return (
    <div
      style={{
        padding: "50px",
      }}
    >
      <Button onClick={handleClearAll}>Clear All</Button>
      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cartData}
      />

      <Button onClick={handleBuy}>Buy </Button>
    </div>
  );
}

export default CartPage;
