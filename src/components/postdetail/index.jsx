// src/pages/ProductDetail.js

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, InputNumber } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const ProductDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null); // Reference to the Swiper instance
  const [quantity, setQuantity] = useState(1);
  const onChange = (value) => {
    setQuantity(value);
  };
  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`post/${id}`);
      setProduct(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product detail: ", error);
      toast.error("Could not fetch product details");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductDetail();
  }, [id]);
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

  if (loading) return <div className="loading">Loading...</div>;

  // Example array of images to use in thumbnails
  const images = [
    "https://img.pikbest.com/templates/20240725/sale-banner-template-to-decorate-a-shop-selling-children-27s-toys_10680872.jpg!w700wp",
    "https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg",
    "https://cafefcdn.com/thumb_w/640//203337114487263232/2024/8/8/avatar1723122947437-1723122947859806833189.jpg",
  ];

  const handleThumbnailClick = (index) => {
    // Use the Swiper instance to slide to the clicked thumbnail's index
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="product-detail">
      <div className="product-detail__content">
        <div className="product-detail__image">
          <Swiper
            ref={swiperRef} // Set the reference for the Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3500 }}
            modules={[Navigation, Pagination, Autoplay]}
            className="shopee-swiper"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <img
                  className="swiper-img"
                  src={src}
                  alt={`Slide ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Thumbnails */}
          <div className="thumbnail-gallery">
            {images.map((src, index) => (
              <img
                key={index}
                className="thumbnail-img"
                src={src}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleThumbnailClick(index)} // Attach click handler
              />
            ))}
          </div>
        </div>
        {/* <img src={product.imageUrl} alt={product.toyName} /> */}
        <div className="product-detail__info">
          <h1 className="product-detail__title">{product.toyName}</h1>
          <p className="product-detail__description">{product.description}</p>
          <div className="product-detail__pricing">
            <img src={product.imageUrl} alt={product.toyName} />
            <p>
              <span>Quantity:</span> {product.quantity}
            </p>
            <p>
              <span>Price:</span> đ{product.price}
            </p>
            <p>
              <span>Price by Day:</span> đ{product.priceByDay}
            </p>
            <p>
              <span>Deposit Fee:</span> đ{product.depositFee}
            </p>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={onChange}
            />
          </div>
          <button onClick={() => handleAddToCart(product?.id, quantity)}>
            Add to Cart
          </button>
        </div>
      </div>

      <Button type="primary" icon={<ArrowLeftOutlined />} onClick={goBack}>
        Back
      </Button>
    </div>
  );
};

export default ProductDetail;
