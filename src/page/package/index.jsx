import React, { useEffect, useState } from "react";
import api from "../../config/axios"; // Ensure axios instance has the correct baseURL
import { Button, message } from "antd";
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
          <div><strong>Package Name:</strong> {pkg.packageName}</div>
          <div><strong>Price:</strong> {pkg.packagePrice}</div>
          <div><strong>Number of Posts:</strong> {pkg.numberPost}</div>
          <div><strong>Description:</strong> {pkg.description}</div>
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
