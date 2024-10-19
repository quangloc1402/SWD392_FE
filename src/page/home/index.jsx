import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/cartSlice";
import { Button, Form, Image, Input, Modal, Popconfirm, Table } from "antd";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { render } from "react-dom";
function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState([]);
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      if (values.id) {
        const response = await api.put(
          `https://670a190caf1a3998baa30985.mockapi.io/product/${values.id}`,
          values
        );
      } else {
      }
      const response = await api.post(
        "https://670a190caf1a3998baa30985.mockapi.io/product",
        values
      );
      toast.success("Successfully saved! ");
      fetchStaff();
      form.resetFields;
      setOpenModal(false);
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      setLoading(false);
    }
  };
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        "https://670a190caf1a3998baa30985.mockapi.io/product"
      );
      setProducts(response.data);
      console.log(response.data);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);
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

  const handleCloseModal = () => {
    setShowModal(false);
    form.resetFields();
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };
  return (
    <div>
      <div>
        
        <Button onClick={() => setShowModal(true)}> Create New Post</Button>

        <Modal
          title="Staff"
          open={showModal}
          onCancel={handleCloseModal}
          onOk={() => {
            form.submit();
          }}
        >
          <Form
            form={form}
            labelCol={{
              span: 24,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Name"
              name="toyName"
              rules={[
                {
                  required: true,
                  message: "Please input Toy's name!",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please input Category",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Quantity"
              name="quantity"
              rules={[
                {
                  required: true,
                  message: "Please input quantity",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Price"
              name="Price"
              rules={[
                {
                  required: true,
                  message: "Please Price",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
}
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addProduct(product));
  };
  return (
    <div className="product">
      <img
        src="https://product.hstatic.net/1000120104/product/tbd05683819_37d2223e434249d6bf5f73cd54722871_master.jpg"
        alt=""
      />
      <h3>{product.toyName}</h3>
      <p>{product.category}</p>
      <p>{product.quantity}</p>
      <p>{product.Price}</p>
      <center>
        <button onClick={handleAddToCart}> Add to Cart</button>
      </center>
    </div>
  );
};

export default Home;
