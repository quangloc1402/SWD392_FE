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
  Menu,
  Popconfirm,
  Table,
  Card,
  Pagination,
} from "antd";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { render } from "react-dom";
import { Autoplay, Pagination as SwipperPag, Navigation } from "swiper/modules";
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
  const [pageCurrent, setPagecurrent] = useState(0);
  let pageSize = 5;
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `toy?status=CREATED&type=SELL&page=${pageCurrent}&size=${pageSize}`
      );
      const filteredProducts = response.data.filter(
        (product) => product.status === "CREATED" && product.toyType === "SELL"
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [pageCurrent]);

  const handlePage = async (page) => {
    console.log(page);
    setPagecurrent(page - 1);
    try {
      const response = await api.get(
        `toy?status=APPROVED&type=SELL&page=${pageCurrent}&size=${pageSize}`
      );
      const filteredProducts = response.data.filter(
        (product) => product.toyType === "SELL" && product.status === "CREATED"
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
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
              modules={[Navigation, SwipperPag, Autoplay]}
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

      {/* <img
        src="https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg"
        alt=""
        style={{
          display: "inline-block",
          width: "100%",
          height: "70vh",
          objectFit: "cover",
          objectPosition: "center",
        }}
      /> */}
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
      <Pagination
        align="center"
        defaultCurrent={1}
        onChange={(page) => {
          handlePage(page);
        }}
        pageSize={pageSize}
        total={20}
      />
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
      <img src={product.imageUrl} alt={product.toyName} />
      <h3>{product.toyName}</h3>
      <p>{product.description}</p>
      <p>Quantity: {product.quantity}</p>
      <p>Price: đ{product.price}</p>
      <p>Price by Day: đ{product.priceByDay}</p>
      <p>Deposit Fee: đ{product.depositFee}</p>

      <center>
        <button
          className="buttonAdd"
          onClick={() => handleAddToCart(product?.id, 1)}
        >
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
