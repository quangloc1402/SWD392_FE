import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/features/cartSlice";
import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Table,
  Card,
} from "antd";
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { render } from "react-dom";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Category from "../../components/category";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [form] = Form.useForm();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState([]);

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
                <img
                  className="swiper-img"
                  src="https://theme.hstatic.net/200000569615/1001041811/14/slider_2.jpg?v=381"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="swiper-img"
                  src="https://img.pikbest.com/templates/20240725/sale-banner-template-to-decorate-a-shop-selling-children-27s-toys_10680872.jpg!w700wp"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="swiper-img"
                  src="https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg"
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className="swiper-img"
                  src="https://img.pikbest.com/templates/20240815/banner-promoting-the-sale-of-toys-for-children-in-the-supermarket_10729034.jpg!w700wp"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="extra-images">
            <img src="https://happytimevn.com/wp-content/uploads/2020/06/Banner-1024x507-1-4-1024x507.jpg" />
            <img src="https://theme.hstatic.net/200000569615/1001041811/14/slider_2.jpg?v=381" />
          </div>
        </div>
      </div>
      <Card bordered={true} style={{ width: "100%", textAlign: "left" }}>
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
