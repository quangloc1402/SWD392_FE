import { Button, Card, Pagination, Modal, Form, Input } from "antd"; // Import Form and Input from antd
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify"; // Import for toast notifications

function PostRent() {
  const [products, setProducts] = useState([]);
  const [pageCurrent, setPagecurrent] = useState(0);
  let pageSize = 5;

  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `toy?status=CREATED&TYPE=RENT&page=${pageCurrent}&size=${pageSize}`
      );
      const filteredProducts = response.data.filter(
        (product) => product.status === "CREATED" && product.toyType === "RENT"
      );
      setProducts(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [pageCurrent]);

  const handlePage = async (page) => {
    setPagecurrent(page - 1);
  };

  return (
    <div>
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product key={product.id} product={product} /> // Added key for mapped elements
        ))}
      </div>
      <Pagination
        align="center"
        defaultCurrent={1}
        onChange={(page) => handlePage(page)}
        pageSize={pageSize}
        total={20} // Make sure to replace with actual total if known
      />
    </div>
  );
}

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [daysToRent, setDaysToRent] = useState(3); // Default days to rent

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    await handleRent(product.id, quantity, daysToRent);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleRent = async (id, quantity, daysToRent) => {
    try {
      const response = await api.post(
        `order-rent/create?toyId=${id}&quantity=${quantity}&daysToRent=${daysToRent}`
      );
      window.open(response.data);
    } catch (error) {
      console.error("Failed to rent", error);
      toast.error("Failed to rent");
    }
  };

  return (
    <div className="product">
      <img
        src={product.imageUrl}
        alt={product.toyName}
        style={{ maxWidth: "100%" }}
      />
      <h3>{product.toyName}</h3>
      <p>{product.description}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price by Day: đ{product.priceByDay}</p>
      <p>Deposit Fee: đ{product.depositFee}</p>

      <center>
        <Button className="buttonAdd" onClick={showModal}>
          Thanh Toán
        </Button>
        <br />
        <Link to={`/post/${product.id}`}>
          <button>Detail</button>
        </Link>
      </center>

      <Modal
        title="Choose Quantity and Days to Rent"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Confirm"
        cancelText="Cancel"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Confirm
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item
            label="Quantity"
            rules={[{ required: true, message: "Please input the quantity!" }]}
          >
            <Input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Days to Rent"
            rules={[
              { required: true, message: "Please input the number of days!" },
            ]}
          >
            <Input
              type="number"
              value={daysToRent}
              min={1}
              onChange={(e) => setDaysToRent(e.target.value)}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PostRent;
