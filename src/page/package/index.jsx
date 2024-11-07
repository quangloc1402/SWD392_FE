import React, { useEffect, useState } from "react";
import api from "../../config/axios"; 
import { Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "./index.scss"; // Import SCSS file

function Package() {
  const [packages, setPackages] = useState([]);

  const fetchPackages = async () => {
    try {
      const response = await api.get("packages"); // Call the endpoint "api/packages"
      if (response.status === 200) {
        setPackages(response.data); // Directly set packages from the response data array
      } else {
        console.log("Failed to fetch packages:", response.statusText);
      }
    } catch (e) {
      console.error("Error fetching packages:", e);
    }
  };

  const handleBuy = async (packageId) => {
    try {
      const response = await api.post(`packages/${packageId}/pay`);
      console.log(response.data);
      window.open(response.data);

    } catch (error) {
      console.log(error);
      message.error("Failed to create order");
    }
  };

  useEffect(() => {
    fetchPackages(); // Fetch packages on component mount
  }, []);

  return (
    <div className="package-container">
      {packages.map((pkg) => (
        <div key={pkg.id} className="package-item">
          <h2>{pkg.packageName}</h2>
          <div className="package-price">
            <strong>Giá</strong> {pkg.packagePrice}đ
          </div>
          <div className="package-separator"></div> 
          <div><CheckOutlined /><strong> Number of Posts:</strong> {pkg.numberPost}</div>
          <div><CheckOutlined /><strong> Description:</strong> {pkg.description}</div>
          <Button
            type="primary"
            onClick={() => handleBuy(pkg.id)}
            className="buy-button"
          >
            Buy
          </Button>
        </div>
      ))}
    </div>

  );
}

export default Package;
