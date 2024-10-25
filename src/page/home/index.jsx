import React, { useEffect, useState} from "react";
import "./index.scss";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/cartSlice";
import { Button, Form, Image, Input, Modal, Popconfirm, Table, Card } from "antd";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { render } from "react-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Category from "../../components/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const user = useSelector((store) => store.user);
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [cartData, setCartData] = useState([]);
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
      const response = await api.post("post", values);
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
      const response = await api.get("post");
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
      title: "description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "CategoryId",
      dataIndex: "categoryId",
      key: "categoryId",
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
      <div className="main-content">

        <div className="swiper-container">
          <div className="swiper-wrapper">
            <Swiper
              spaceBetween={10}
              slidesPerView={1} // Show 3 products per view
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3500 }}
              modules={[Navigation, Pagination, Autoplay]}
              className="shopee-swiper"
            >
              <SwiperSlide>
                <img className="swiper-img"

                  src="https://theme.hstatic.net/200000569615/1001041811/14/slider_2.jpg?v=381"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img className="swiper-img"

                  src="https://i.pinimg.com/originals/fa/ca/68/faca686e03b99dc55ba4938a077e411f.jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img className="swiper-img"

                  src="https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img className="swiper-img"

                  src="https://img.pikbest.com/templates/20240815/banner-promoting-the-sale-of-toys-for-children-in-the-supermarket_10729034.jpg!w700wp"
                />
              </SwiperSlide>
            </Swiper>

          </div>
          <div className="extra-images">
            <img

              src="https://happytimevn.com/wp-content/uploads/2020/06/Banner-1024x507-1-4-1024x507.jpg" />
            <img

              src="https://theme.hstatic.net/200000569615/1001041811/14/slider_2.jpg?v=381" />
          </div>
        </div>
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
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input Description",
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
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please Price",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="category"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Please enter categoryId",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      {user != null ? (
        <>
          <Button onClick={() => setShowModal(true)}>Create New Post</Button>
        </>
      ) : (
        <></> // You can render something else for non-logged-in users or leave it empty
      )}

      <Card bordered={true} style={{ width: '100%', textAlign: "left" }}>
        <div style={{ fontSize: "25px", marginBottom: "16px" }}>Danh Mục</div>
        <Category />
      </Card>
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
  const handleAddToCart = async (postId, quantity) => {
    try {
      const response = await api.post(
        `cart/add?postId=${postId}&quantity=${quantity}&type=BUYTOY`
      );
      console.log(response.data);
      toast.success("Item added to cart successfully");

      // Refresh the page to show the updated cart
      window.location.reload();
    } catch (error) {
      console.error("Failed to add item to cart", error);
      toast.error("Failed to add item to cart");
    }
  };
  return (
    <div className="product">
      <img
        src="https://product.hstatic.net/1000120104/product/tbd05683819_37d2223e434249d6bf5f73cd54722871_master.jpg"
        alt=""
      />
      <h3>{product.toyName}</h3>
      <p>{product.description}</p>
      <p>{product.quantity}</p>
      <p>đ{product.price}</p>
      <center>
        <button onClick={() => handleAddToCart(product?.id, 1)}>
          {" "}
          Add to Cart
        </button>
      </center>
    </div>
  );
};

export default Home;
