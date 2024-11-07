import React, { useEffect, useState } from "react";
import { Button, Result, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import LOGO from "../../assets/images/logo.jpg";

import api from "../../config/axios";
import useGetParams from "../../assets/hook/useGetParams";
import { useSelector } from "react-redux";

function SuccessPackagePage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const username = user.username;
  const params = useGetParams();
  const orderID = params("orderID");
  const vnp_TransactionStatus = params("vnp_TransactionStatus");
}

export default SuccessPackagePage;
