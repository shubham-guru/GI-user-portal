import { Col, Descriptions, Divider, Flex, message, Row, Typography } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons';
import CustomButton from '../hocs/Button/CustomButton';
import { senderItems, buyerItems, productItems } from '../../domain/constants/orderDetails';

import "./styles/orderDetails.css";

const OrderDetails = () => {
    const { Text } = Typography;
    const url = window.location.href;
    const orderId = url.split("orders/")[1];
    const [messageApi, contextHolder] = message.useMessage();


    const copyId = (id: string) => {
        navigator.clipboard.writeText(id)
            .then(() => {
                console.log('Order Id copied to clipboard : ' + id);
                messageApi.success('Order Id copied !');

            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    return (
        <Row>
            {contextHolder}
            <Col span={24}>
                <Flex justify="space-between" align="center">
                    <Text type="secondary">Order Id: <span className="order-id-span">{orderId} </span> <CopyOutlined id="copy-icon" onClick={() => copyId(orderId)} /> </Text>
                    <Flex vertical>
                        <Flex align="center">
                            <Text type="secondary">Payment Status: <span id="order-id-span-pending" className="order-id-span">Pending </span></Text>
                            <CustomButton type="primary" text="Pay Now" size="small" onClick={() => { }} />
                        </Flex>
                        <Text type="secondary">Total Fare: <span className="order-id-span">₹9,717.3 </span> </Text>
                    </Flex>
                </Flex>
                <Divider />

                <Flex><Descriptions title="Sender's Details" items={senderItems} /> <EditOutlined /></Flex>
                <Flex><Descriptions title="Buyer's Details" items={buyerItems} /><EditOutlined /></Flex>
                <Descriptions title="Product's Details" items={productItems} bordered layout='vertical' column={8}/>

            </Col>
        </Row>
    )
}

export default OrderDetails