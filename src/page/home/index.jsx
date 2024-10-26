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
import { Link } from "react-router-dom";

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
                  src="https://cafefcdn.com/thumb_w/640//203337114487263232/2024/8/8/avatar1723122947437-1723122947859806833189.jpg"
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="extra-images">
            <img src="https://sieuthidochoimamnon.com/wp-content/uploads/2024/04/do-choi-giao-tri.jpg" />
            <img src="https://daistore.vn/wp-content/uploads/2021/09/do-choi-khoa-hoc-lap-ghep-dieu-khien-daistore-vn-1.jpg" />
          </div>
        </div>
      </div>

      {user != null ? (
        <></>
      ) : (
        <></> // You can render something else for non-logged-in users or leave it empty
      )}

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
        <br />
        <Link to={`/post/${product.id}`}>
          <button>Detail</button>
        </Link>
      </center>
    </div>
  );
};

export default Home;
