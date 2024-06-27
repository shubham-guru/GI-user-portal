import React from 'react'
import { Col, Divider, Typography } from 'antd';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

import "./supplyCards.css"

type ISupplyChainCards = {
    icon: React.ForwardRefExoticComponent<Omit<AntdIconProps, 'ref'>>;
    text: string;
    index: number;
}
const SupplyChainCards: React.FC<ISupplyChainCards> = ({ icon, text, index }) => {
    const IconComponent = icon;
    const isEven = index % 2;
    const { Text } = Typography
  return (
        <Col span={20} className="supply-chain-card" id={isEven === 0 ? "dark-card" : "light-card"}>
            <Text style={ isEven === 0 ?  { color: "#fff" }: { color: "#000" }} className="supply-card-index-text">{index+1}</Text>
            <IconComponent className="supply-cards-icons" />
            <Divider className="supply-card-hr" style={ isEven === 0 ?  { border: ".1px solid #fff" }: { border: ".1px solid #000" }} />
            <Text className="supply-chain-card-text" style={ isEven === 0 ?  { color: "#fff" }: { color: "#000" }} >{text}</Text>
        </Col>
  )
}

export default SupplyChainCards