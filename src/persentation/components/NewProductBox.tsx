    import React, { Suspense, useState } from 'react'
    import { Col, Form, Row, Tooltip } from 'antd'
    import { NewProductsType } from '../../domain/types/FormTypes'
    import { OrderTypesData } from '../../domain/constants/orderTypesData'
    import { DeleteOutlined } from '@ant-design/icons'

    import "./styles/newProductBox.css"

    type INewProductsBox = {
        orderType: string;
        onDelete: () => void;
    }

    const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

    const NewProductBox: React.FC<INewProductsBox> = ({ orderType, onDelete}) => {
        const [productDetails, setProductDetails] = useState<NewProductsType>({
            productName: "",
            quantity: 0,
            hsn: "",
            unitValue: 0,
            weight: 0,
            color: "",
            size: "",
        })
        return (
            <Form
                name="basic"
                initialValues={{ remember: true }}
                // onFinish={onFinish}
                // onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
            >
                <Row gutter={20} className="add-new-product-row">
                    {/* Product Name */}
                    <Col span={6}>
                        <Suspense fallback=""><CustomInputs placeholder="Product Name"
                            type="text"
                            name="productName"
                            rules={[{ required: true, message: 'Please enter product name !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setProductDetails({ ...productDetails, productName: e.value })}
                            value={productDetails.productName} /></Suspense>

                    </Col>
                    {/* Quantity */}
                    <Col span={6}>
                        <Suspense fallback=""><CustomInputs placeholder="Quantity"
                            type="number"
                            name="quantity"
                            rules={[{ required: true, message: 'Please enter quantity !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setProductDetails({ ...productDetails, quantity: e.value })}
                            value={productDetails.quantity} /></Suspense>
                    </Col>
                    {/* HSN Code */}
                    {orderType === OrderTypesData.Commercial && <Col span={6}>
                        <Suspense fallback=""><CustomInputs placeholder="HSN Code"
                            type="text"
                            name="hsnCode"
                            rules={[{ required: true, message: 'Please enter HSN code !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setProductDetails({ ...productDetails, hsn: e.value })}
                            value={productDetails.hsn} /></Suspense>
                    </Col>}
                    {/* Unit Value */}
                    <Col span={6}>
                        <Suspense fallback=""><CustomInputs placeholder="Unit Value"
                            type="number"
                            name="unitValue"
                            rules={[{ required: true, message: 'Please enter unit value !' }]}
                            addonUnit={() => { }}
                            label
                            onChange={(e: any) => setProductDetails({ ...productDetails, unitValue: e.value })}
                            value={productDetails.unitValue} /></Suspense>
                    </Col>
                    {/* Weight (optional) */}
                    {orderType === OrderTypesData.Commercial &&
                        <>
                            <Col span={6}>
                                <Suspense fallback=""><CustomInputs placeholder="Weight"
                                    type="number"
                                    name="weight"
                                    rules={[{ required: false }]}
                                    addonUnit={() => { }}
                                    label
                                    onChange={(e: any) => setProductDetails({ ...productDetails, weight: e.value })}
                                    value={productDetails?.weight || 0} /></Suspense>
                            </Col>
                            {/* Color (optional) */}
                            <Col span={6}>
                                <Suspense fallback=""><CustomInputs placeholder="Color"
                                    type="text"
                                    name="color"
                                    rules={[{ required: false }]}
                                    addonUnit={() => { }}
                                    label
                                    onChange={(e: any) => setProductDetails({ ...productDetails, color: e.value })}
                                    value={productDetails?.color || ""} /></Suspense>
                            </Col>
                            {/* Size (optional) */}
                            <Col span={6}>
                                <Suspense fallback=""><CustomInputs placeholder="Size"
                                    type="text"
                                    name="size"
                                    rules={[{ required: false }]}
                                    addonUnit={() => { }}
                                    label
                                    onChange={(e: any) => setProductDetails({ ...productDetails, size: e.value })}
                                    value={productDetails?.size || ""} /></Suspense>
                            </Col>
                        </>
                    }
                    <Tooltip title="Delete Product">
                        <DeleteOutlined id="product-delete-icon" onClick={onDelete}/>
                    </Tooltip>
                </Row>
            </Form>
        )
    }

    export default NewProductBox