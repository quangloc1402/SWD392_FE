import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, InputNumber, Rate, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "./index.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Row, Col } from "antd";

const ProductDetail = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [daysToRent, setDaysToRent] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onChange = (value) => {
    setQuantity(value);
  };

  const fetchProductDetail = async () => {
    try {
      const response = await api.get(`toy/${id}`);
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

  const fetchFeedback = async () => {
    try {
      const response = await api.get(`feedback/${id}`);
      setFeedback(response.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
      toast.error("Could not fetch feedback");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, [id]);

  const handleAddToCart = async (postId, quantity) => {
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    if (product?.price === 0) {
      toast.error(
        "Đồ chơi cho thuê không thể thêm vào giỏ hàng. Vui lòng chọn thuê đồ chơi"
      );
      return;
    }

    try {
      const response = await api.post(
        `cart/add?postId=${postId}&quantity=${quantity}&type=BUYTOY`
      );
      console.log(response.data);
      toast.success("Item added to cart successfully");
    } catch (error) {
      console.error("Failed to add item to cart", error);
      toast.error("Failed to add item to cart");
    }
  };

  const showRentModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const response = await api.post(
        `order-rent/create?toyId=${product?.id}&quantity=${quantity}&daysToRent=${daysToRent}`
      );
      window.open(response.data);
      setIsModalVisible(false);
    } catch (error) {
      console.error("Failed to rent", error);
      toast.error("Failed to rent");
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <div className="loading">Loading...</div>;

  const images = [
    "https://img.pikbest.com/templates/20240725/sale-banner-template-to-decorate-a-shop-selling-children-27s-toys_10680872.jpg!w700wp",
    "https://daiphattoy.vn/upload/images/do-choi-am-nhac-cho-be(1).jpg",
    "https://cafefcdn.com/thumb_w/640//203337114487263232/2024/8/8/avatar1723122947437-1723122947859806833189.jpg",
  ];

  const handleThumbnailClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div>
      <div className="product-detail">
        <div className="product-detail__content">
          <div className="product-detail__image">
            <Swiper
              ref={swiperRef}
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
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="product-detail__info">
            <h1 className="product-detail__title">{product?.toyName}</h1>
            <p className="product-detail__description">
              {product?.description}
            </p>
            <Row gutter={16}>
              <Col span={12}>
                <div className="quantity">
                  <p>
                    <span>Quantity:</span> {product?.quantity}
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div className="price">
                  <p>
                    <span>Price:</span> đ{product?.price}
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div className="pricebyday">
                  <p>
                    <span>Price by Day:</span> đ{product?.priceByDay}
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div className="fee">
                  <p>
                    <span>Deposit Fee:</span> đ{product?.depositFee}
                  </p>
                </div>
              </Col>
              {product?.price !== 0 && (
                <Col span={12}>
                  <div className="amount">
                    Amount:
                    <InputNumber
                      style={{ marginLeft: "10px" }}
                      min={1}
                      max={10}
                      defaultValue={1}
                      onChange={onChange}
                    />
                  </div>
                </Col>
              )}
            </Row>
            <Button
              type="primary"
              className="btnadd"
              onClick={() => handleAddToCart(product?.id, quantity)}
            >
              Add to Cart
            </Button>
            {product?.price === 0 && (
              <Button
                type="default"
                className="btn-rent"
                onClick={showRentModal}
                style={{ marginLeft: "10px" }}
              >
                Thuê Đồ Chơi
              </Button>
            )}
          </div>
        </div>

        <Button type="primary" icon={<ArrowLeftOutlined />} onClick={goBack}>
          Back
        </Button>
      </div>

      {/* Feedback Section */}
      <div className="product-detail__feedback">
        <h2>Feedback</h2>
        {feedback.length > 0 ? (
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="feedback-item">
                <strong>Rating:</strong>
                <p>{item?.content}</p>
                <Rate disabled allowHalf value={item.rating} />
                <p>{item.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available</p>
        )}
      </div>

      {/* Rent Modal */}
      <Modal
        title="Rent Toy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <label>
            Quantity:
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              onChange={setQuantity}
              style={{ marginLeft: "10px" }}
            />
          </label>
          <br />
          <label>
            Days to Rent:
            <InputNumber
              min={1}
              defaultValue={1}
              onChange={setDaysToRent}
              style={{ marginLeft: "10px" }}
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default ProductDetail;
