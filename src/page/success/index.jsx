import React, { useEffect } from "react";
import { Button, Result } from 'antd';
import useGetParams from "../../assets/hook/useGetParams";
import api from "../../config/axios";

function SuccessPage(){
    const params = useGetParams();
    const orderID = params("orderID");
    console.log(orderID);
    const vnp_TmnCode =params("vnp_TmnCode");
    console.log("OrderID", orderID);
    console.log("vnp_TnmCode", vnp_TmransactionStatus);


    const postOrderID = async() =>{
        const response = await api.post("/../..")
    }

    useEffect(() => {
        if(vnp_TmnCode ==="00"){
            postOrderID();

        }else{
            //navigate to failed page
        }
    }, []);
    return (
        <div>   
        <Result
        status="success"
        title="Successfully Purchased for FEdutoy"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console" >
            Go To HomePage 
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      /></div>
    )
}
export default SuccessPage