import React from 'react'
import { Typography } from 'antd';

import "./heading.css"

type IHeading = {
    text: string;
}
const Heading: React.FC<IHeading> = ({ text }) => {
    const { Text } = Typography;

  return (
    <Text className="heading-text">{text}</Text>
  )
}

export default Heading