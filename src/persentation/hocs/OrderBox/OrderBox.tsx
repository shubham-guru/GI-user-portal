import React from 'react'
import { Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

import "./orderBox.css"

type IOrderBox = {
    text: string;
    link: string;
}
const OrderBox: React.FC<IOrderBox> = ({ link, text }) => {
    const { Text } = Typography;
    const navigate = useNavigate();
  return (
    <Col span={24} className="order-box-col" onClick={() => navigate(link)}>
       Order Id: <br /> <Text className="order-box-text"> {text} </Text>
    </Col>
  )
}

export default OrderBox