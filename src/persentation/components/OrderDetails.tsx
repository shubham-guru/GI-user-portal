import { Col, Descriptions, DescriptionsProps, Divider, Flex, Row, Typography } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons';
import CustomButton from '../hocs/Button/CustomButton';
import { useEffect, useState } from 'react';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';

import "./styles/orderDetails.css";
import { Alert } from '../hocs/Alert/Alert';

const OrderDetails = () => {
    const { Text } = Typography;
    const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
    const url = window.location.href;
    const orderId = url.split("orders/")[1];
    const [orderDetails, setOrderDetails] = useState<any>([]);
    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        getOrderDetails();
    }, [])

    const getOrderDetails = async () => {
        const body = {
            orderId: orderId.split("-")[1]
        };
        
        await Query(HttpMethods.GET, apiRoutes.GET_SELECTED_ORDER, body, user?.token).then((res) => {
            if(res?.status === 200) {
                setOrderDetails(res?.data?.data[0][0]);
                setProducts(res?.data?.data[1]);
            } else{
                Alert("error", res?.data?.message);
            }
        })
    }

    const copyId = (id: string) => {
        navigator.clipboard.writeText(id)
            .then(() => {
                Alert("success", 'Order Id copied !');

            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    }

    const buyerItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Buyers Name',
            children: <p>{orderDetails?.BUYER_NAME}</p>,
        },
        {
            key: '2',
            label: 'Buyers Phone',
            children: <p>{orderDetails?.BUYER_PHONE}</p>,
        },
        {
            key: '3',
            label: 'Buyers Email',
            children: <p>{orderDetails?.BUYER_EMAIL}</p>,
        },
        {
            key: '4',
            label: 'Buyers City',
            children: <p>{orderDetails?.BUYER_CITY}</p>,
        },
        {
            key: '5',
            label: 'Buyers Complete Address',
            children: <p>{orderDetails?.BUYER_COMPLETE_ADDRESS}</p>,
        },
        {
            key: '6',
            label: 'Buyers State',
            children: <p>{orderDetails?.BUYER_STATE}</p>,
        },
        {
            key: '7',
            label: 'Buyers Country',
            children: <p>{orderDetails?.BUYER_COUNTRY}</p>,
        },
        {
            key: '8',
            label: 'Buyers Pin Code',
            children: <p>{orderDetails?.BUYER_PIN_CODE}</p>,
        },
        {
            key: '9',
            label: 'Buyers Country',
            children: <p>{orderDetails?.BUYER_COUNTRY}</p>,
        },
    ];

    const productItems = products.map((product: { [key: string]: string }, index: number) => {
        // Create an array to hold the Description.Items that are not null or "0"
        const itemArray = [];
        if (product.PRODUCT_NAME) itemArray.push(<Descriptions.Item label="Name" key="name">{product.PRODUCT_NAME}</Descriptions.Item>);
        if (product.PRODUCT_QUANTITY && product.PRODUCT_QUANTITY !== "0") itemArray.push(<Descriptions.Item label="Quantity" key="quantity">{product.PRODUCT_QUANTITY}</Descriptions.Item>);
        if (product.PRODUCT_HSN_CODE) itemArray.push(<Descriptions.Item label="HSN Code" key="hsnCode">{product.PRODUCT_HSN_CODE}</Descriptions.Item>);
        if (product.PRODUCT_UNIT_VALUE && product.PRODUCT_UNIT_VALUE !== "0") itemArray.push(<Descriptions.Item label="Per Unit Value" key="unitValue">{product.PRODUCT_UNIT_VALUE}</Descriptions.Item>);
        if (product.PRODUCT_SKU_WEIGHT && product.PRODUCT_SKU_WEIGHT !== "0") itemArray.push(<Descriptions.Item label="Weight" key="weight">{product.PRODUCT_SKU_WEIGHT}</Descriptions.Item>);
        if (product.PRODUCT_SKU_COLOR) itemArray.push(<Descriptions.Item label="Color" key="color">{product.PRODUCT_SKU_COLOR}</Descriptions.Item>);
        if (product.PRODUCT_SKU_SIZE) itemArray.push(<Descriptions.Item label="Size" key="size">{product.PRODUCT_SKU_SIZE}</Descriptions.Item>);
        
        // Only create Descriptions if there are valid items
        return itemArray.length > 0 ? {
            key: `${index + 1}`,
            label: `Product_${index + 1}`,
            children: <Descriptions>{itemArray}</Descriptions>,
        } : null;
    }).filter((item: { [key: string]: string }) => item !== null); // Remove null items from the array

    const packageDimensions: DescriptionsProps['items'] = [
        {
            key: '1',
            label: `Package Length in ${orderDetails?.DIMENSION_SIDES_UNIT}`,
            children: <p>{orderDetails?.DIMENSION_LENGTH}</p>,
        },
        {
            key: '2',
            label: `Package Breadth in ${orderDetails?.DIMENSION_SIDES_UNIT}`,
            children: <p>{orderDetails?.DIMENSION_BREADTH}</p>,
        },
        {
            key: '3',
            label: `Package Height in ${orderDetails?.DIMENSION_SIDES_UNIT}`,
            children: <p>{orderDetails?.DIMENSION_HEIGHT}</p>,
        },
        {
            key: '4',
            label: `Package Dead Weight in ${orderDetails?.DIMENSION_WEIGHT_UNIT}`,
            children: <p>{orderDetails?.DIMENSION_WEIGHT}</p>,
        }
    ];
    

    return (
        <Row>
            <Col span={24}>
                <Flex justify="space-between" align="center">
                    <Flex vertical>
                        <Text type="secondary">Order Id: <span className="order-id-span">{orderId} </span> <CopyOutlined id="copy-icon" onClick={() => copyId(orderId)} /> </Text>
                        <Text type="secondary">Store in warehouse: <span style={{ color: orderDetails?.IS_WAREHOUSE === 1 ? "#6fbad6" : "#222" }} className="order-id-span">{orderDetails?.IS_WAREHOUSE === 1 ? "Yes" : "No"} </span></Text>
                        {/* <Text type="secondary">Order Type: <span className="order-id-span">{orderDetails?.ORDER_TYPE} </span></Text> */}
                    </Flex>

                    <Flex vertical>
                        <Flex align="center">
                            <Text type="secondary">Payment Status: <span id="order-id-span-pending" style={{ color: orderDetails?.IS_PAID === 1 ? "#2d9127" : "#daab37" }} className="order-id-span">{orderDetails?.IS_PAID === 1 ? "Paid" : "Pending"}</span></Text>
                           { orderDetails?.IS_PAID !== 1 && <CustomButton type="primary" text="Pay Now" size="small" onClick={() => { }} />}
                        </Flex>
                        <Text type="secondary">Total Fare: <span className="order-id-span">&#x20b9;{parseFloat(orderDetails?.TOTAL_FARE).toFixed(2)} </span> </Text>
                    </Flex>
                </Flex>
                <Divider />

                { orderDetails?.IS_WAREHOUSE !== 1 && <><Flex><Descriptions title="Buyer's Details" items={buyerItems} /><EditOutlined /></Flex> <Divider /></>}
                <Flex><Descriptions title="Package Dimensions" items={packageDimensions} /><EditOutlined /></Flex>
                <Divider />
                <Flex align="flex-end" vertical><Text type="secondary">Order Type: <span className="order-id-span">{orderDetails?.ORDER_TYPE} </span> </Text></Flex>
                <Descriptions title="Product Details" column={1} bordered layout="horizontal">
                    {productItems?.map((item: {[key: string]: string}) => (
                        <Descriptions.Item key={item.key} label={item.label}>
                            {item.children}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </Col>
        </Row>
    )
}

export default OrderDetails