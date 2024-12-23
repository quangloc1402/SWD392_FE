import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";
import { Button, InputNumber, Rate, Modal, Avatar } from "antd";
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
    } catch (e) {
      console.error(e);
      toast.error("Could not fetch feedback");
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

    if (quantity > product?.quantity) {
      toast.error(`Hiện tại cửa hàng chỉ còn ${product.quantity} sản phẩm.`);
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
              <p className="product-detail__description">
                {product?.description}
              </p>

              <Row gutter={16}>
                <Col span={12}>
                  <p>
                    <strong>Người bán: {product?.fromUser}</strong>
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Số lượng còn:</strong> {product?.quantity}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Giá:</strong> đ{product?.price}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Thuê theo ngày:</strong> đ{product?.priceByDay}
                  </p>
                </Col>
                <Col span={12}>
                  <p>
                    <strong>Tiền đặt cọc:</strong> đ{product?.depositFee}
                  </p>
                </Col>
                {product?.price !== 0 && (
                  <Col span={12}>
                    <div className="product-detail__amount">
                      <label>Số lượng mua:</label>
                      <InputNumber
                        min={1}
                        defaultValue={1}
                        onChange={onChange}
                      />
                    </div>
                  </Col>
                )}
              </Row>

              <div className="product-detail__actions">
                {product?.quantity === 0 ? (
                  <Button
                    disabled
                    type="default"
                    className="out-of-stock-button"
                  >
                    Hết hàng
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    onClick={() => handleAddToCart(product?.id, quantity)}
                  >
                    Thêm vào Giỏ Hàng
                  </Button>
                )}

                {product?.price === 0 && (
                  <Button type="default" onClick={showRentModal}>
                    Thuê Đồ Chơi
                  </Button>
                )}

                <Button
                  type="primary"
                  icon={<ArrowLeftOutlined />}
                  onClick={goBack}
                  className="btn-back"
                >
                  Quay Lại
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="product-detail__feedback">
        <h2>Đánh giá</h2>
        {feedback.length > 0 ? (
          <ul>
            {feedback.map((item) => (
              <li key={item.id} className="feedback-item">
                <p>
                  <Avatar
                    style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
                  >
                    U
                  </Avatar>{" "}
                  {item?.fromUser}
                </p>
                <strong>Rating:</strong>
                <Rate disabled allowHalf value={item.rating} />
                <p>{item?.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chưa có bài đánh giá nào!</p>
        )}
      </div>

      <Modal
        title="Rent Toy"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>
          Quantity:
          <InputNumber
            min={1}
            max={10}
            defaultValue={1}
            onChange={setQuantity}
          />
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
