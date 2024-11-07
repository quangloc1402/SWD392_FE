import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, InputNumber, Rate, Modal } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import "./index.scss";
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
    // Check if quantity is less than 1
    if (quantity < 1) {
      toast.error("Quantity must be at least 1.");
      return;
    }

    // Check if price is zero
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

      // Refresh the page to show the updated cart
      window.location.reload();
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
      setIsModalVisible(false); // Close modal after renting
    } catch (error) {
      console.error("Failed to rent", error);
      toast.error("Failed to rent");
      setIsModalVisible(false); // Close the modal if there's an error
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  if (loading) return <div className="loading">Loading...</div>;



  return (
    <div className="product-detail">
      <div className="product-detail__content">
        <Row gutter={16}>
          {product?.imageUrl && (
            <Col span={12}>
              <div className="product-detail__image">
                <img src={product.imageUrl} alt={product.toyName} />
              </div>
            </Col>
          )}

          <Col span={product?.imageUrl ? 12 : 24}>
            <div className="product-detail__info">
              <h1 className="product-detail__title">{product?.toyName}</h1>
              <p className="product-detail__description">{product?.description}</p>

              <Row gutter={16}>
                <Col span={12}>
                  <p><strong>User:</strong> {product?.fromUser}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Quantity:</strong> {product?.quantity}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Price:</strong> đ{product?.price}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Price by Day:</strong> đ{product?.priceByDay}</p>
                </Col>
                <Col span={12}>
                  <p><strong>Deposit Fee:</strong> đ{product?.depositFee}</p>
                </Col>
                {product?.price !== 0 && (
                  <Col span={12}>
                    <div className="product-detail__amount">
                      <label>Amount:</label>
                      <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                    </div>
                  </Col>
                )}
              </Row>

              <div className="product-detail__actions">
                <Button type="primary" onClick={() => handleAddToCart(product?.id, quantity)}>
                  Add to Cart
                </Button>
                {product?.price === 0 && (
                  <Button type="default" onClick={showRentModal}>
                    Rent Toy
                  </Button>
                )}
                <Button type="primary" icon={<ArrowLeftOutlined />} onClick={goBack} className="btn-back">
                  Back
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="product-detail__feedback">
        <h2>Feedback</h2>
        {feedback.length > 0 ? (
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="feedback-item">
                <strong>Rating:</strong>
                <Rate disabled allowHalf value={item.rating} />
                <p>{item?.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedback available</p>
        )}
      </div>

      <Modal title="Rent Toy" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <label>
          Quantity:
          <InputNumber min={1} max={10} defaultValue={1} onChange={setQuantity} />
        </label>
        <br />
        <label>
          Days to Rent:
          <InputNumber min={1} defaultValue={1} onChange={setDaysToRent} />
        </label>
      </Modal>
    </div>


  );
};

export default ProductDetail;
