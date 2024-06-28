import React from 'react'
import { Typography } from 'antd';

import "./heading.css"

type IHeading = {
    text: string;
    fontWeight?: number;
}
const Heading: React.FC<IHeading> = ({ text, fontWeight }) => {
    const { Text } = Typography;

  return (
    <Text className="heading-text" style={{ fontWeight: fontWeight  }}>{text}</Text>
  )
}

export default Heading