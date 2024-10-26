import React, { useEffect, useState } from "react";
import "./index.scss";
import api from "../../config/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "antd";
import { useSelector } from "react-redux";
import Category from "../../components/category";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

function Home() {
  const user = useSelector((store) => store.user);
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await api.get("post");
      const filteredProducts = response.data.filter(
        (product) => product.status === "APPROVED"
      );
      setProducts(filteredProducts);
      console.log(filteredProducts);
    } catch (e) {
      console.log("Error product: ", e);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div>
      <div className="main-content">
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
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
              alt="Banner 1"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="swiper-img"
              src="https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg"
              alt="Banner 2"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="swiper-img"
              src="https://cafefcdn.com/thumb_w/640//203337114487263232/2024/8/8/avatar1723122947437-1723122947859806833189.jpg"
              alt="Banner 3"
            />
          </SwiperSlide>
        </Swiper>

        {user != null ? <></> : <></>}

        <Card bordered={true} style={{ width: "100%", textAlign: "left" }}>
          <div style={{ fontSize: "25px", marginBottom: "16px" }}>Danh Mục</div>
          <Category />
        </Card>
        <div style={{ margin: "100px auto" }} className="product-list">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
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
      <p>{product.quantity}</p>
      <p>đ{product.price}</p>
      <center>
        <button onClick={() => handleAddToCart(product?.id, 1)}>
          Add to Cart
        </button>
      </center>
    </div>
  );
};

export default Home;
