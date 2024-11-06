import { Card, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axios";
import { useDispatch } from "react-redux";

function BuyPage() {
  const [products, setProducts] = useState([]);
  const [pageCurrent, setPagecurrent] = useState(0);
  let pageSize = 10;
  const fetchProduct = async () => {
    try {
      const response = await api.get(
        `toy?status=CREATED&TYPE=SELL&page=${pageCurrent}&size=${pageSize}`
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
        `toy?status=CREATED&type=SELL&page=${pageCurrent}&size=${pageSize}`
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

export default BuyPage;
