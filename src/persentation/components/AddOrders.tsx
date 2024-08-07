import React, { Suspense, useEffect, useState } from 'react'
import { Card, Checkbox, Descriptions, DescriptionsProps, Divider, Flex, Form, message, Modal, Radio, RadioChangeEvent, Select, Steps, Tag, theme, Typography } from 'antd';

import { CaretDownOutlined } from '@ant-design/icons';
import NewProductBox from './NewProductBox';
import { OrderTypesData } from '../../domain/constants/orderTypesData';
import { dimensions, weightUnits } from '../../domain/constants/units';
import FareBox from '../hocs/FareBox/FareBox';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { UserData } from '../../domain/interfaces/UserData';
import { setUserAddresses } from '../../redux/slice/addressSlice';
import { addProductInfo, clearOrderDetails, saveBuyerDetails, saveOrderFareInfo, saveShippingDetails } from '../../redux/slice/orderDetailsSlice';
import { calculateFare } from '../../data/helpers/CalculateFare';
import { Alert } from '../hocs/Alert/Alert';

import "./styles/addOrders.css";
import { clearUserOrders } from '../../redux/slice/userOrders';
import { fetchAddresses } from '../../data/helpers/getAddresses';

type IAddOrders = {
    isOpen: boolean;
    onCancel: (value: boolean) => void;
}
interface CustomTitleProps {
    text: string;
  }

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const AddOrders: React.FC<IAddOrders> = ({ isOpen, onCancel }) => {
    const { Text } = Typography;
    const { token } = theme.useToken();
    const [form] = Form.useForm()
    const dispatch = useDispatch();
    const user = useSelector((state: { userDetails: { currentUser: UserData } }) => state.userDetails.currentUser);
    const userAddresses = useSelector((state: { address: { addresses: [] } }) => state.address.addresses);
    const orderDetails: any = useSelector((state: { orderDetails: { details: [] } }) => state.orderDetails.details);

    const selectedUnit = orderDetails[0]?.shippingDetails?.unit;
    let params: {};
    const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
    const [isBtnEnable, setIsBtnEnable] = useState<boolean>(false);
    const [current, setCurrent] = useState(0);
    const [orderType, setOrderType] = useState<string>(OrderTypesData.Commercial);
    const [unit, setUnit] = useState<{[key: string]: string}>({
        totalWeight: "g",
        length: "cm",
        breadth: "cm",
        height: "cm"
    });
    const [selectedAddress, setSelectedAddress] = useState(orderDetails.pickUpAddressId);
    const [isWareHouse, setIsWareHouse] = useState<boolean>(orderDetails.isWareHouse);
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<any>([]);
    const [fare, setFare] = useState<number>(0);
    const [calculateData, setCalculateData] = useState<{ [key: string]: number }>({
        totalWeight: 0,
        length: 0,
        breadth: 0,
        height: 0
    });
    const { totalWeight, length, breadth, height } = calculateData;
    
    const deadWeight = orderDetails[0]?.shippingDetails?.calculateData?.totalWeight+" "+orderDetails[0]?.shippingDetails?.unit?.totalWeight;
    const dimensionalFactor = selectedUnit === "inch" ? 139 : 5000;
    const volumetricWeight = (length*breadth*height)/dimensionalFactor+" "+orderDetails[0]?.shippingDetails?.unit?.totalWeight;
    const billedWeight = Math.max((length*breadth*height)/dimensionalFactor, orderDetails[0]?.shippingDetails?.calculateData?.totalWeight)+" "+orderDetails[0]?.shippingDetails?.unit?.totalWeight;

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
        country: ""
    })

    // Making the L,B and H units same
    const handleUnits = (value: string, ele: string) => {
        if(ele === "totalWeight"){
            setUnit({...unit, totalWeight: value})
        } else if(ele === "length" || ele === "breadth" ||  ele === "height") {
            setUnit({...unit, length: value, breadth: value, height: value})
        }
    }

    // Calculating Fare
    useEffect(() => {
        if (unit.totalWeight === weightUnits[0]) {
            setFare(calculateFare(totalWeight * 0.001))
          } else if (unit.totalWeight === weightUnits[1]) {
            setFare(calculateFare(totalWeight));
          }
    }, [current])

     const taxFare = (18/100)*fare;
     const totalFare = taxFare+fare;
    
     const fareInfo = {
        totalFare: totalFare,
        deadWeight: deadWeight,
        volumetricWeight: volumetricWeight,
        paymentStatus: "Pending" 
     }

    // Fetching Pickup Address
    

    // Calling FetchAddress
    useEffect(() => {
        if (userAddresses?.length === 0) {
            getAddresses();
        }
    }, [])


    const getAddresses = async () => {
        const addresses = await fetchAddresses(user?.token);
        if(addresses) {
            dispatch(setUserAddresses(addresses));
        }
    };

    // Pre Filled Data
    useEffect(() => {
        form.setFieldsValue({
            fullName: orderDetails.fullName,
            email: orderDetails.email,
            phone: orderDetails.phone,
            alternatePhone: orderDetails.alternatePhone,
            completeAddress: orderDetails.completeAddress,
            pinCode: orderDetails.pinCode,
            city: orderDetails.city,
            state: orderDetails.state,
            country: orderDetails.country
        });
    }, [form]);

    const descpItems: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Pick up Address',
            children: <p>Zhou Maomao</p>,
        },
        {
            key: '2',
            label: 'Ship to Warehouse',
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
    
    const handlePayLater = async () => {
        setLoading(true);
            params = {
                // Buyyers Address
                fullName: orderDetails[0]?.buyerDetails?.fullName,
                email: orderDetails[0]?.buyerDetails?.email,
                phone: orderDetails[0]?.buyerDetails?.phone,
                alternatePhone: orderDetails[0]?.buyerDetails?.alternatePhone,
                completeAddress: orderDetails[0]?.buyerDetails?.completeAddress,
                pinCode: orderDetails[0]?.buyerDetails?.pinCode,
                city: orderDetails[0]?.buyerDetails?.city,
                state: orderDetails[0]?.buyerDetails?.state,
                country: orderDetails[0]?.buyerDetails?.country,
                isWarehouse: orderDetails[0]?.buyerDetails?.isWareHouse ? orderDetails[0]?.buyerDetails?.isWareHouse : false,
                // Product Info
                products: products,
                // Order Info
                pickUpAddressId: JSON.stringify(orderDetails[0]?.buyerDetails?.pickUpAddressId),
                orderType: orderDetails[0]?.productInfo?.orderType,
                totalFare: JSON.stringify(totalFare),
                isPaid: false,
                paymentId: "",
                // Shipping Info
                weight: JSON.stringify(orderDetails[0]?.shippingDetails?.calculateData?.totalWeight),
                length: JSON.stringify(orderDetails[0]?.shippingDetails?.calculateData?.length),
                breadth: JSON.stringify(orderDetails[0]?.shippingDetails?.calculateData?.breadth),
                height: JSON.stringify(orderDetails[0]?.shippingDetails?.calculateData?.height),
                weightUnit: orderDetails[0]?.shippingDetails?.unit?.totalWeight,
                sidesUnit: orderDetails[0]?.shippingDetails?.unit?.length
            }

        await Query(HttpMethods.POST, apiRoutes.CREATE_ORDER, params, user?.token).then((res) => {
            if(res?.status === 200) {
                setLoading(false);
                Alert("success", res?.data?.message);
                dispatch(saveOrderFareInfo(fareInfo));
                dispatch(clearUserOrders());
                handleCancel();
            } else {
                setLoading(false);
                Alert("error", res?.data?.message);
            }
        })
    }

    // Checking all the required fields in Buyer's Address form
    useEffect(() => {
        const { alternatePhone, ...requiredDetails } = userDetails;
        const values = Object.values(requiredDetails);
        const filledValues = values.filter(ele => ele.trim().length > 0);
        setIsBtnEnable(filledValues.length === values.length);
    }, [userDetails]);

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
                    options={userAddresses}
                />
                <Checkbox checked={isWareHouse ?? orderDetails.isWareHouse} onChange={(e) => setIsWareHouse(e.target.checked)}>Ship to our warehouse</Checkbox>
                <fieldset className="add-orders-fieldset">
                    <legend>Buyer's Address</legend>
                    <Form
                        form={form}
                        name="basic"
                        initialValues={{ userDetails }}
                        autoComplete="off"
                        layout="vertical"
                    >
                        {
                            Object.keys(userDetails).map((ele, index: number) => {
                                const placeholder = ele.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
                                const required = (placeholder === "ALTERNATE PHONE") || (placeholder === "EMAIL") ? false : true;
                                const type = placeholder === "EMAIL" ? "email" : (placeholder === "PHONE") || (placeholder === "ALTERNATE PHONE") || (placeholder === "PIN CODE") ? "number" : "text"
                                return (
                                    <Suspense fallback="" key={index}><CustomInputs placeholder={placeholder}
                                        type={type}
                                        name={ele}
                                        disabled={isWareHouse && true}
                                        rules={[{ required: required, message: `Please enter ${placeholder.toLowerCase()} !` }]}
                                        addonUnit={() => { }}
                                        label={placeholder}
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
        const addProduct = () => {
            setProducts([...products, { id: products.length, productName: '' }]);
        };
    
        const updateProductInfo = (index: number, newInfo: any) => {
            const updatedProducts = [...products];
            updatedProducts[index] = { ...updatedProducts[index], ...newInfo };
            setProducts(updatedProducts);
        };
    
        const deleteProduct = (id: number) => {
            setProducts(products.filter((product: { id: number }) => product.id !== id));
        };
        return (
            <Flex className="add-orders-flex" vertical>
            <Text>
                <b>Product Details:</b> 
                <Text type="secondary">
                    List each of your products individually for shipping or storage. For example, if you have a shirt in various
                    sizes and colors, add each variation as a separate product. This means you should list 
                    <b> "Shirt - Black, Small," "Shirt - Black, Medium," "Shirt - Red, Large," and "Shirt - Black, Large"</b> 
                    as different products.
                </Text>
            </Text>
            <Flex align="center" style={{ margin: "1.5cqmax 0cqmax 1.5cqmax 0cqmax" }}>
                <Text><b>Order Type:</b></Text>
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
            {products?.map((product: { id: any }, index: number) => (
                <NewProductBox 
                    key={product.id} 
                    orderType={orderType} 
                    onDelete={() => deleteProduct(product.id)} 
                    productsInfo={(newInfo) => updateProductInfo(index, newInfo)} 
                />
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
                    autoComplete="off"
                    className="add-shipping-form"
                >
                    {
                        Object.keys(calculateData).map((ele, index: number) => {
                            const placeholder = ele.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
                            const dimUnits = (placeholder.includes("WEIGHT") ? weightUnits : dimensions);
                            return (
                                <Suspense fallback=""  key={index}><CustomInputs placeholder={placeholder}
                                    type="number"
                                    name={ele}
                                    addonAfter={dimUnits}
                                    rules={[{ required: true, message: `Please enter ${placeholder} !` }]}
                                    addonUnit={(value: string) => handleUnits(value, ele)}
                                    onChange={(e: any) => setCalculateData({ ...calculateData, [ele]: parseFloat(e.value)})}
                                    value={calculateData[ele]} /></Suspense>
                            )
                        })
                    }
                </Form>
            </Flex>
        )
    }

    const CustomTitle: React.FC<CustomTitleProps> = ({ text }) => (
        <Text style={{ fontSize: "2cqmax", fontWeight: 400 }}>
          {text}
        </Text>
      );
      
    // Preview & Pay
    const previewPay = () => {
        return (
            <Flex className="add-orders-flex" gap={30}>
                <Card title={<CustomTitle text="Preview Order" />}>
                    <Descriptions title="Buyer Details" items={descpItems} />
                </Card>
                <Card title={<CustomTitle text="Total Fare" />} style={{ fontSize: "4cqmax", fontWeight: 400 }}>
                    <Flex align="center" justify="center" vertical>
                        <Flex justify="space-around">
                            <FareBox weight={deadWeight} type="Dead Weight" />
                            <FareBox weight={volumetricWeight} type="Volumetric Weight" />
                        </Flex>
                        <FareBox weight={billedWeight} type="Billed Weight" dark />
                    </Flex>
                    <Divider />
                    <Flex align="center" justify="space-between">
                        <Flex vertical align="flex-end" >
                            <Radio value={1} checked><Text className="shipping-text-pri">Guru Internationals</Text></Radio>
                            <Tag color='green'>Lightest</Tag>
                        </Flex>
                        <Text className="shipping-text-sec">&#x20b9; {fare.toFixed(1)}/-</Text>
                    </Flex>
                    <Flex align="center" justify="space-between">
                        <Text className="shipping-text-pri">Sub Total
                            <Text type="secondary"> +18% GST</Text>
                        </Text>
                        <Text className="shipping-text-sec">&#x20b9; {totalFare.toFixed(1)}/-</Text>
                    </Flex>
                    <Text type="secondary">
                        <Divider />
                        This above price includes Pick up from your address, Tagging of
                        products in our warehouse in India, Ship to the port, Shipping of
                        products to the respective customer.
                    </Text>
                    <Flex align="center" justify="space-around">
                        <CustomButton text="Save & Pay Later" size="middle" loading={loading} type="default" onClick={handlePayLater} />
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
        onCancel(!isOpen);
        dispatch(clearOrderDetails());
    };

    const handleSaveAndNextBtn = () => {
        if (current === 0) {
            const buyerAddress = {
                ...userDetails,
                pickUpAddressId: selectedAddress,
                isWareHouse
            }
            dispatch(saveBuyerDetails(buyerAddress))
        }
        else if(current === 1){
            
            const productInfo = {
                orderType,
                products
            }
            dispatch(addProductInfo(productInfo))
        } else if(current === 2) {
                const shippingDetails: any = {
                    calculateData,
                    unit
                };
            dispatch(saveShippingDetails(shippingDetails));
        }
        setCurrent(current + 1)
    }

    const handlePreviousBtn = () => {
        setCurrent(current - 1);
    }

    return (
        <Modal title="Add Orders" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1500} className="add-order-modal">
            <Divider />
            <Steps current={current} items={items} />
            <div style={contentStyle}>{steps[current].content}</div>
            <div style={{ marginTop: 24 }}>


                {current > 0 && (
                    <Suspense fallback=""><CustomButton style={{ margin: '0 1cqmax' }} type="default" text="Previous" size="middle" onClick={handlePreviousBtn} /></Suspense>
                )}
                {current === steps.length - 1 && (
                    <Suspense fallback=""><CustomButton type="primary" text="Done" size="middle" onClick={() => message.success('Processing complete!')} /></Suspense>
                )}
                {current < steps.length - 1 && (
                    <Suspense fallback=""><CustomButton type="primary" disabled={
                        !(isWareHouse || isBtnEnable) ||
                        (products.length === 0 && current === 1) ||
                        (!isShippingDetails && current === 2)
                    } text="Save & Next" size="middle" onClick={handleSaveAndNextBtn} /></Suspense>
                )}
            </div>
        </Modal>
    )
}

export default AddOrders