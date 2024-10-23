import React from "react";
import { Button, Result } from 'antd';

function SuccessPage(){
    return (
        <div>   
        <Result
        status="success"
        title="Successfully Purchased for FEdutoy"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button type="primary" key="console">
            Go To HomePage 
          </Button>,
          <Button key="buy">Buy Again</Button>,
        ]}
      /></div>
    )
}
export default SuccessPage