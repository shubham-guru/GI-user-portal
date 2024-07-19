import React, { Suspense, useEffect, useState } from 'react'
import { Card, Checkbox, Descriptions, DescriptionsProps, Divider, Flex, Form, FormProps, message, Modal, Radio, RadioChangeEvent, Select, Steps, Tag, theme, Typography } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import { IndexPageFormType } from '../../domain/types/FormTypes';
import NewProductBox from './NewProductBox';
import { OrderTypesData } from '../../domain/constants/orderTypesData';
import { dimensions, weightUnits } from '../../domain/constants/units';
import FareBox from '../hocs/FareBox/FareBox';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';

import "./styles/addOrders.css";

type IAddOrders = {
    isOpen: boolean;
    onCancel: (value: boolean) => void;
}

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const AddOrders: React.FC<IAddOrders> = ({ isOpen, onCancel }) => {
    const { Text } = Typography;
    const { token } = theme.useToken();
    const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [isBtnEnable, setIsBtnEnable] = useState<boolean>(false);
    const [current, setCurrent] = useState(0);
    const [orderType, setOrderType] = useState<string>(OrderTypesData.Commercial);
    const [unit, setUnit] = useState<string | undefined>("");
    console.log("🚀 ~ unit:", unit)
    const [addresses, setAddresses] = useState<[]>([]);
    const [selectedAddress, setSelectedAddress] = useState();
    const [isWareHouse, setIsWareHouse] = useState<boolean>(false);
    const [products, setProducts] = useState<any>([]);
    const [calculateData, setCalculateData] = useState({
        totalWeight: 0,
        length: 0,
        breadth: 0,
        height: 0
    });
    const { totalWeight, length, breadth, height } = calculateData;

    // Check if all values are greater than 0
    const isShippingDetails = totalWeight > 0 && length > 0 && breadth > 0 && height > 0;

    const [userDetails, setUserDetails] = useState<{ [key: string]: string }>({
        fullName: "",
        email: "",
        phone: "",
        alternatePhone: "",
        completeAddress: "",
        pinCode: "",
        city: "",
        state: "",
        country: "",
    })
    const fetchAddresses = async () => {
        await Query(HttpMethods.GET, apiRoutes.GET_ADDRESSES, {}, user?.token).then((res) => {
            if (res.status === 200) {
                const add = res?.data?.addresses.map((item: any) => {
                    return {
                        label: item.COMPLETE_ADDRESS + ", " + item.CITY + ", " + item.STATE + ", " + item.COUNTRY + ", " + item.PIN_CODE,
                        value: item.COMPLETE_ADDRESS + ", " + item.CITY + ", " + item.STATE + ", " + item.COUNTRY + ", " + item.PIN_CODE
                    }
                })

                setAddresses(add)
            }
        })
    }

    useEffect(() => {
        fetchAddresses();
    }, [])


    const addProduct = () => {
        setProducts([...products, { id: products.length, orderType: 'someOrderType' }]); // Add a new product with a unique id and an orderType
    };

    const deleteProduct = (id: string) => {
        setProducts(products.filter((product: { id: string; }) => product.id !== id));
    };

    const onFinish: FormProps<IndexPageFormType>['onFinish'] = (value) => {
        console.log("🚀 ~ value:", value)
    };

    const onFinishFailed: FormProps<IndexPageFormType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const descpItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'UserName',
            children: <p>Zhou Maomao</p>,
        },
        {
            key: '2',
            label: 'Telephone',
            children: <p>1810000000</p>,
        },
        {
            key: '3',
            label: 'Live',
            children: <p>Hangzhou, Zhejiang</p>,
        },
        {
            key: '4',
            label: 'Remark',
            children: <p>empty</p>,
        },
        {
            key: '5',
            label: 'Address',
            children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
        },
    ];

    const handleFormData = (e: any) => {
        switch (e.placeholder) {
            case "Total Weight":
                setCalculateData({ ...calculateData, totalWeight: parseFloat(e.value) });
                break;
            case "Length":
                setCalculateData({ ...calculateData, length: parseFloat(e.value) })
                break;
            case "Breadth":
                setCalculateData({ ...calculateData, breadth: parseFloat(e.value) })
                break;
            case "Height":
                setCalculateData({ ...calculateData, height: parseFloat(e.value) })
                break;
        }
    }


    useEffect(() => {
        const { alternatePhone, ...requiredDetails } = userDetails;
    
        const values = Object.values(requiredDetails);
        const filledValues = values.filter(ele => ele.trim().length > 0);
        setIsBtnEnable(filledValues.length === values.length)
    }, [userDetails])

    // Buyer Details Function
    const buyerDetails = () => {
        return (
            <Flex className="add-orders-flex" vertical>
                <Select
                    className="add-orders-select"
                    showSearch
                    suffixIcon={<CaretDownOutlined />}
                    placeholder="Select Pick up Address"
                    optionFilterProp="label"
                    onChange={(value) => setSelectedAddress(value)}
                    value={selectedAddress}
                    options={addresses}
                />
                <Checkbox onChange={(e) => setIsWareHouse(e.target.checked)}>Ship to our warehouse</Checkbox>
                <fieldset className="add-orders-fieldset">
                    <legend>Buyer's Address</legend>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        {
                            Object.keys(userDetails).map((ele, index: number) => {
                                const placeholder = ele.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
                                const required = placeholder === "ALTERNATE PHONE" ? false : true;
                                const type = placeholder === "EMAIL" ? "email" : (placeholder === "PHONE") || (placeholder === "ALTERNATE PHONE") || (placeholder === "PIN CODE") ? "number" : "text"
                                return (
                                    <Suspense fallback=""><CustomInputs placeholder={placeholder}
                                    type={type}
                                    key={index}
                                    name={ele}
                                    disabled={isWareHouse && true}
                                    rules={[{ required: required, message: `Please enter ${placeholder.toLowerCase()} !` }]}
                                    addonUnit={() => { }}
                                    label
                                    onChange={(e: any) => setUserDetails({ ...userDetails, [ele]: e.value })}
                                    value={userDetails[ele]} />
                                </Suspense>
                                )
                            })
                        }
                    </Form>
                </fieldset>
            </Flex>
        )
    }

    // Add Products Function
    const addProducts = () => {
        return (
            <Flex className="add-orders-flex" vertical>
                <Text> <b> Product Details: </b> <Text type="secondary">List each of your products individually for shipping or storage. For example, if you have a shirt in various
                    sizes and colors, add each variation as a separate product. This means you should list <b> "Shirt - Black, Small," "Shirt - Black,
                        Medium," "Shirt - Red, Large," and "Shirt - Black, Large" </b> as different products. </Text></Text>
                <Flex align="center" style={{ margin: "1.5cqmax 0cqmax 1.5cqmax 0cqmax" }}>
                    <Text><b> Order Type: </b> </Text>
                    <Radio.Group onChange={(e: RadioChangeEvent) => setOrderType(e.target.value)} value={orderType} style={{ marginLeft: "1cqmax" }}>
                        <Radio
                            value={OrderTypesData.Commercial}
                            checked={orderType === OrderTypesData.Commercial}
                            onChange={() => setOrderType(OrderTypesData.Commercial)}
                        >
                            Commercial
                        </Radio>
                        <Radio
                            value={OrderTypesData.NonCommercial}
                            checked={orderType === OrderTypesData.NonCommercial}
                            onChange={() => setOrderType(OrderTypesData.NonCommercial)}
                        >
                            Non-Commercial
                        </Radio>
                    </Radio.Group>
                </Flex>

                {/* Add New Products */}
                {products.map((product: { id: string; orderType: string; }) => (
                    <NewProductBox key={product.id} orderType={orderType} onDelete={() => deleteProduct(product.id)} />
                ))}
                <Flex>
                    <Suspense fallback="">
                        <CustomButton type="primary" text="+Add" size="middle" onClick={addProduct} />
                    </Suspense>
                </Flex>
            </Flex>
        )
    }

    // Shipping Details
    const shippingDetails = () => {
        return (
            <Flex className="add-orders-flex" vertical>
                <Text> <b> Shipping Details: </b> <Text type="secondary">Please provide the exact dimensions of the box you will be using to pack all your products. Make sure you
                    measure the dimensions after packaging. Also, include the dead weight, which is the total weight of the box when packed. </Text></Text>

                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className="add-shipping-form"
                >
                    {/* Weight Field */}
                    <Suspense fallback=""><CustomInputs placeholder="Total Weight"
                        type="number"
                        name="totalWeight"
                        addonAfter={weightUnits}
                        rules={[{ required: true, message: 'Please enter total weight !' }]}
                        addonUnit={(value: string) => setUnit(value)}
                        onChange={(e: EventTarget) => handleFormData(e)}
                        value={calculateData.totalWeight} /></Suspense>

                    {/* Length Field */}
                    <Suspense fallback=""><CustomInputs placeholder="Length" type="number"
                        name="length"
                        addonAfter={dimensions}
                        addonUnit={(value: string) => setUnit(value)}
                        rules={[{ required: true, message: 'Please enter length !' }]}
                        onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.length} /></Suspense>

                    {/* Breadth Filed */}
                    <Suspense fallback=""><CustomInputs placeholder="Breadth" type="number"
                        addonAfter={dimensions}
                        name="breadth"
                        rules={[{ required: true, message: 'Please enter breadth !' }]}
                        addonUnit={(value: string) => setUnit(value)}
                        onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.breadth} /></Suspense>

                    {/* Height Field */}
                    <Suspense fallback=""><CustomInputs placeholder="Height" type="number"
                        addonAfter={dimensions}
                        name="height"
                        rules={[{ required: true, message: 'Please enter height !' }]}
                        addonUnit={(value: string) => setUnit(value)}
                        onChange={(e: EventTarget) => handleFormData(e)} value={calculateData.height} /></Suspense>
                </Form>
            </Flex>
        )
    }

    // Preview & Pay
    const previewPay = () => {
        return (
            <Flex className="add-orders-flex">
                <Card title="Preview Order">
                    <Descriptions items={descpItems} />
                </Card>
                <Card title="Total Fare">
                    <Flex align="center" justify="center" vertical>
                        <Flex justify="space-around">
                            <FareBox weight="15.00 KG" type="Dead Weight" />
                            <FareBox weight="4.34 KG" type="Volumetric Weight" />
                        </Flex>
                        <FareBox weight="4.34 KG" type="Billed Weight" dark />
                    </Flex>
                    <Divider />
                    <Flex align="center" justify="space-between">
                        <Flex vertical align="flex-end" >
                            <Radio value={1} checked><Text className="shipping-text-pri">Guru Internationals</Text></Radio>
                            <Tag color='green'>Lightest</Tag>
                        </Flex>
                        <Text className="shipping-text-sec">$2334</Text>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text className="shipping-text-pri">Sub Total
                            <Text type="secondary"> +18% GST</Text>
                        </Text>
                        <Text className="shipping-text-sec">$2675.5</Text>
                    </Flex>
                    <Text type="secondary">
                        <Divider />
                        This above price includes Pick up from your address, Tagging of
                        products in our warehouse in India, Ship to the port, Shipping of
                        products to the respective customer.
                    </Text>
                    <Flex align="center" justify="space-around">
                        <CustomButton text="Save & Pay Later" size="middle" type="default" onClick={() => { }} />
                        <CustomButton text="Pay Now" size="middle" type="primary" onClick={() => { }} />
                    </Flex>
                </Card>
            </Flex>

        )
    }

    const steps = [
        {
            title: 'Buyer Details',
            content: buyerDetails(),
        },
        {
            title: 'Add Products',
            content: addProducts(),
        },
        {
            title: 'Shipping Details',
            content: shippingDetails(),
        },
        {
            title: 'Preview & Pay',
            content: previewPay(),
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const contentStyle: React.CSSProperties = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
    };

    const handleOk = () => {
        setIsModalOpen(!isOpen);
        onCancel(!isOpen)
    };

    const handleCancel = () => {
        setIsModalOpen(!isOpen);
        onCancel(!isOpen)
    };

    return (
        <Modal title="Add Orders" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1500} className="add-order-modal">
            <Divider />
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>


                {current > 0 && (
                    <Suspense fallback=""><CustomButton style={{ margin: '0 1cqmax' }} type="default" text="Previous" size="middle" onClick={() => setCurrent(current - 1)} /></Suspense>
                )}
                {current === steps.length - 1 && (
                    <Suspense fallback=""><CustomButton type="primary" text="Done" size="middle" onClick={() => message.success('Processing complete!')} /></Suspense>
                )}
                {current < steps.length - 1 && (
                    <Suspense fallback=""><CustomButton type="primary"  disabled={
                        !(isWareHouse || isBtnEnable) || 
                        (products.length === 0 && current === 1) || 
                        (!isShippingDetails && current === 2)
                      }  text="Save & Next" size="middle" onClick={() => setCurrent(current + 1)} /></Suspense>
                )}
            </div>
        </Modal>
    )
}

export default AddOrders