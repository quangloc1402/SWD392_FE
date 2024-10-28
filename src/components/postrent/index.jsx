import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";

function PostRent() {
  const [products, setProducts] = useState([]);
  const fetchProduct = async () => {
    try {
      const response = await api.get("post");
      const filteredProducts = response.data.filter((product) => {
        return product.status === "APPROVED" && product.type == "RENTTOY";
      });
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
      <div style={{ margin: "100px auto" }} className="product-list">
        {products.map((product) => (
          <Product product={product} />
        ))}
      </div>
    </div>
  );
}
const Product = ({ product }) => {
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

export default PostRent;
