import React, { Suspense, useEffect, useState } from 'react'
import { Col, Form, Row, Tooltip } from 'antd'
import { OrderTypesData } from '../../domain/constants/orderTypesData'
import { DeleteOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'

import "./styles/newProductBox.css"

type INewProductsBox = {
    orderType: string;
    onDelete: () => void;
    productsInfo: (value: { [key: string]: string | number }) => void;
}

const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const NewProductBox: React.FC<INewProductsBox> = ({ orderType, onDelete, productsInfo }) => {
    const [form] = Form.useForm();
    const productsData: any = useSelector((state: { orderDetails: { details: [] } }) => state.orderDetails.details);
    const [productDetails, setProductDetails] = useState<{ [key: string]: string | number }>({
        productName: "",
        quantity: 0,
        hsnCode: "",
        unitValue: 0,
        skuWeight: 0,
        skuColor: "",
        skuSize: "",
    })

    useEffect(() => {
        productsInfo(productDetails)
    }, [productDetails])


    useEffect(() => {
            productsData[0]?.productInfo?.products?.map((item: { [key: string]: string }) => {
                form.setFieldsValue({
                    productName: item.productName,
                    quantity: item.quantity,
                    hsnCode: item.hsnCode,
                    unitValue: item.unitValue,
                    skuWeight: item.skuWeight,
                    skuColor: item.skuColor,
                    skuSize: item.skuSize,
                });
            })
    }, [form])

    return (
        <Form
            name="basic"
            form={form}
            initialValues={{ productDetails }}
            autoComplete="off"
            layout="vertical"
        >
            <Row gutter={20} className="add-new-product-row">
                {
                    Object.keys(productDetails)?.map((ele, index) => {
                        const placeholder = ele.split(/(?=[A-Z])/).join(" ").toLocaleUpperCase();
                        const required = (placeholder === "SKU WEIGHT") || (placeholder === "SKU COLOR") || (placeholder === "SKU SIZE") ? false : true;
                        const type = (placeholder === "SKU WEIGHT") || (placeholder === "QUANTITY") || (placeholder === "UNIT VALUE") ? "number" : "text"

                        // Condition to hide specific fields when orderType is Non Commercial
                        const shouldHide = orderType !== OrderTypesData.Commercial && (
                            placeholder === "SKU WEIGHT" ||
                            placeholder === "SKU COLOR" ||
                            placeholder === "SKU SIZE" ||
                            placeholder === "HSN CODE"
                        );

                        if (shouldHide) {
                            return null;
                        }

                        return (
                            <Col span={6} key={index}>
                                <Suspense fallback="">
                                    <CustomInputs
                                        placeholder={placeholder}
                                        type={type}
                                        name={ele}
                                        rules={[{ required: required, message: `Please enter ${placeholder} !` }]}
                                        addonUnit={() => { }}
                                        label
                                        onChange={(e: any) => setProductDetails({ ...productDetails, [ele]: e.value })}
                                        value={productDetails[ele]}
                                    />
                                </Suspense>
                            </Col>
                        );
                    })
                }

                <Tooltip title="Delete Product">
                    <DeleteOutlined id="product-delete-icon" onClick={onDelete} />
                </Tooltip>
            </Row>
        </Form>
    )
}

export default NewProductBox