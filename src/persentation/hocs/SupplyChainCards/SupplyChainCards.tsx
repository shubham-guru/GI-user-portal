import React from 'react'
import { Col, Divider, Typography } from 'antd';

import "./supplyCards.css"
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';

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
        <Col span={10} className="supply-chain-card" id={isEven === 0 ? "dark-card" : "light-card"}>
            <Text style={ isEven === 0 ?  { color: "#fff" }: { color: "#000" }} className="supply-card-index-text">{index+1}</Text>
            <IconComponent className="supply-cards-icons" />
            <Divider className="supply-card-hr" style={ isEven === 0 ?  { border: ".1px solid #fff" }: { border: ".1px solid #000" }} />
            {text}
        </Col>
  )
}

export default SupplyChainCards