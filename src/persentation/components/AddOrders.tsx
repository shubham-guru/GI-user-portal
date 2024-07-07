import React, { Suspense, useState } from 'react'
import { Checkbox, Divider, Flex, Form, message, Modal, Radio, RadioChangeEvent, Select, Steps, theme, Typography } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import { AddressMerged } from '../../domain/types/FormTypes';
import NewProductBox from './NewProductBox';
import { OrderTypesData } from '../../domain/constants/orderTypesData';

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

    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [current, setCurrent] = useState(0);
    const [orderType, setOrderType] = useState<string>(OrderTypesData.Commercial);
    const [products, setProducts] = useState<any>([]);
    const [userDetails, setUserDetails] = useState<AddressMerged>({
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
    const handleChange = () => {

    }

    const addProduct = () => {
        setProducts([...products, { id: products.length, orderType: 'someOrderType' }]); // Add a new product with a unique id and an orderType
      };

    const deleteProduct = (id: string) => {
        setProducts(products.filter((product: { id: string; }) => product.id !== id));
      };

    // Buyer Details Function
    const buyerDetails = () => {
        return (
            <Flex className="add-orders-flex" vertical>
                <Select
                    defaultValue="lucy"
                    className="add-orders-select"
                    showSearch
                    placeholder="Select Pickup Address"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    suffixIcon={<CaretDownOutlined />}
                    onChange={handleChange}
                    options={[
                        { value: 'Address One', label: 'Address One' },
                        { value: 'Address Two', label: 'Address Two' },
                        { value: 'Address Three', label: 'Address Three' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
                <Checkbox onChange={() => { }}>Ship to warehouse</Checkbox>
                <fieldset className="add-orders-fieldset">
                    <legend>Buyer's Address</legend>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        // onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        layout="vertical"
                    >
                        <Flex justify="space-between">
                            {/* Full Name */}
                            <Suspense fallback=""><CustomInputs placeholder="Full Name"
                                type="text"
                                name="fullName"
                                rules={[{ required: true, message: 'Please enter full name !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, fullName: e.value })}
                                value={userDetails.fullName} /></Suspense>
                            {/* Email Id */}
                            <Suspense fallback=""><CustomInputs placeholder="Email Id"
                                type="email"
                                name="email"
                                rules={[{ required: true, message: 'Please enter email id !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, email: e.value })}
                                value={userDetails.email} /></Suspense>
                            {/* Phone */}
                            <Suspense fallback=""><CustomInputs placeholder="Phone Number"
                                type="sting"
                                name="phone"
                                rules={[{ required: true, message: 'Please enter phone number !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, phone: e.value })}
                                value={userDetails.phone} /></Suspense>
                        </Flex>


                        {/* Alternate Phone */}
                        <Suspense fallback=""><CustomInputs placeholder="Alternate Phone"
                            type="text"
                            name="alternatePhone"
                            rules={[{ required: false }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setUserDetails({ ...userDetails, alternatePhone: e.value })}
                            value={userDetails.alternatePhone} /></Suspense>

                        {/* Complete Address */}
                        <Suspense fallback=""><CustomInputs placeholder="Complete Address - Street no / Building no, Street no, Area"
                            type="text"
                            name="completeAddress"
                            rules={[{ required: true, message: 'Please enter complete address !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setUserDetails({ ...userDetails, completeAddress: e.value })}
                            value={userDetails.completeAddress} /></Suspense>

                        <Flex justify="space-between">
                            {/* Pin Code */}
                            <Suspense fallback=""><CustomInputs placeholder="Pin Code"
                                type="number"
                                name="pinCode"
                                rules={[{ required: true, message: 'Please enter pin code !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, pinCode: e.value })}
                                value={userDetails.pinCode} /></Suspense>

                            {/* City */}
                            <Suspense fallback=""><CustomInputs placeholder="City"
                                type="text"
                                name="city"
                                rules={[{ required: true, message: 'Please enter city !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, city: e.value })}
                                value={userDetails.city} /></Suspense>

                            {/* State */}
                            <Suspense fallback=""><CustomInputs placeholder="State"
                                type="text"
                                name="state"
                                rules={[{ required: true, message: 'Please enter state !' }]}
                                addonUnit={() => { }}
                                label
                                onChange={(e: any) => setUserDetails({ ...userDetails, state: e.value })}
                                value={userDetails.state} /></Suspense>
                        </Flex>


                        {/* Country */}
                        <Suspense fallback=""><CustomInputs placeholder="Country"
                            type="text"
                            name="country"
                            rules={[{ required: true, message: 'Please enter country !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setUserDetails({ ...userDetails, country: e.value })}
                            value={userDetails.country} /></Suspense>
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
                <Flex align="center" style={{margin: "1.5cqmax 0cqmax 1.5cqmax 0cqmax"}}>
                    <Text><b> Order Type: </b> </Text> 
                    <Radio.Group onChange={(e: RadioChangeEvent) => setOrderType(e.target.value)} value={orderType} style={{marginLeft: "1cqmax"}}>
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
                    <NewProductBox key={product.id} orderType={orderType}  onDelete={() => deleteProduct(product.id)} />
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
        return(
            <Flex className="add-orders-flex" vertical>
                <Text> <b> Shipping Details: </b> <Text type="secondary">Please provide the exact dimensions of the box you will be using to pack all your products. Ensure you 
                measure the dimensions after packaging. Also, include the dead weight, which is the total weight of the box when packed. </Text></Text>
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
                    <Suspense fallback=""><CustomButton type="primary" disabled={products.length === 0 && current === 1} text="Save & Next" size="middle" onClick={() => setCurrent(current + 1)} /></Suspense>
                )}
            </div>
        </Modal>
    )
}

export default AddOrders