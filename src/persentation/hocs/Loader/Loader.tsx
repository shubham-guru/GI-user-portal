import React from 'react'
import { Col, Flex, Image, Typography } from 'antd'
import loader from "../../../assets/gear-spinner.svg";

const { Text } = Typography;

type ILoader = {
    text: string;
}
const Loader: React.FC<ILoader> = ({ text }) => {
  return (
    <Col span={24}> 
        <Flex align='center' vertical>
            <Image src={loader} alt="loader" preview={false} />
            <Text mark>{text}</Text>
        </Flex>
  </Col>
  )
}

export default Loader