import React from 'react'
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import "./orderBox.css"

type IOrderBox = {
  orderId: string;
  orderType: string;
  paymentStatus: string;
  createdOn: string;
}
const OrderBox: React.FC<IOrderBox> = ({ orderId, orderType, paymentStatus, createdOn }) => {
  const { Text } = Typography;
  const payment = paymentStatus == "1" ? "Paid" : "Pending";
  const date = new Date(createdOn);
  const navigate = useNavigate();

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZone: 'UTC'
  }

  const readableDate = date.toLocaleDateString('en-US', dateOptions);
  const readableTime = date.toLocaleTimeString('en-US', timeOptions);

  return (
    <Card title={`Order Id: ${orderId}`} className="order-box-card" bordered={false} onClick={() => navigate(orderId)}>
      <div className="order-box-div">
        <Text className="order-box-key">Order Type:</Text>
        <Text className="order-box-value"> {orderType} </Text>
      </div>
      <div className="order-box-div">
        <Text className="order-box-key">Payment Status:</Text>
        <Text className="order-box-value" style={{ color: payment === "Paid" ? "#2D9127" : "#DAAB37" }}>{payment}</Text>
      </div>
      <div className="order-box-div">
        <Text className="order-box-key">Created Date:</Text>
        <Text className="order-box-value">{readableDate}</Text>
      </div>
      <div className="order-box-div">
        <Text className="order-box-key">Created Time:</Text>
        <Text className="order-box-value">{readableTime}</Text>
      </div>
    </Card>
  )
}

export default OrderBox