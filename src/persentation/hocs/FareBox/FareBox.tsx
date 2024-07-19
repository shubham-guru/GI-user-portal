import React from 'react'
import { Flex, Typography } from 'antd'
import "./fareBox.css"

type IFareBox = {
    weight: string;
    type: string;
    dark?: boolean
}
const FareBox:React.FC<IFareBox> = ({ weight, type, dark }) => {
    const { Text } = Typography;
  return (
    <Flex className="fare-box-flex" vertical style={dark ? { borderColor: "#000" } : {}}>
        <Text style={{ fontSize: "1.7cqmax" }}>{weight}</Text>
        <Text type="secondary">{type}</Text>
    </Flex>
  )
}

export default FareBox