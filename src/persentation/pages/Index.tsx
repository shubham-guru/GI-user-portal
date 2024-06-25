import React, { Suspense } from 'react'
import type { FormProps } from 'antd';
import { Col, Divider, Flex, Form, Image, Row, Typography } from 'antd';
import img from "../../assets/index-img.jpg";
import { supplyChainData } from '../../domain/constants/supplyChainData';
import { IndexPageFormType } from '../../domain/types/IndexPageFormType';
import { dimensions, heavyCargoUnit, weightUnits } from '../../domain/constants/units';
import { HeavyCargoFormType } from '../../domain/types/HeavyCargoFormType';
import KeyValueChips from '../hocs/KeyValueChips/KeyValueChips';
import { ContactData } from '../../domain/constants/contactData';

import "./styles/index.css";

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const Navbar = React.lazy(() => import("../components/Navbar"));
const SupplyChainCards = React.lazy(() => import("../hocs/SupplyChainCards/SupplyChainCards"));
const Heading = React.lazy(() => import("../hocs/Heading/Heading"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const Index = () => {
  const { Text } = Typography;

  const onFinish: FormProps<IndexPageFormType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };
  
  const onFinishFailed: FormProps<IndexPageFormType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <Row gutter={[0, 30]}>
        {/* Navbar with logo and buttons */}
        <Col span={24}>
          <Suspense fallback=""><Navbar /></Suspense>
        </Col>

        {/* Hero Section */}
        <Col span={24}>
          <Flex align="center">
              <Image preview={false} src={img} alt="index-img" width={800} />
              <Flex vertical align="center">
                <Text className="hero-text">
                  Ship <span id="hero-span1"> 2.5kg </span>in just <br /> <span id="hero-span2">&#x20b9;999/- </span> <br />from India to USA
                </Text>
                <CustomButton type="primary" size="middle" text="Calculate Rate" onClick={()=>{}} />
              </Flex>
          </Flex>
        </Col>

        {/* Supply Chain Steps Cards */}
        <Col span={24} className="supply-chain-col">
          <Text type='secondary' className="supply-title-text">“the most lightest supply chain” </Text>
        </Col>
          {
            supplyChainData.map((item, index: number) => {
              return(
                <Col key={index} xs={12} lg={8} className="supply-chain-data-card">
                  <SupplyChainCards icon={item.icon} text={item.text} index={index} />
                </Col>
              )
            })
          }

          {/* Calculate Rates */}
          <Col span={24} className="index-col">
            <Suspense fallback=""><Heading text="Get Instant Rates" /></Suspense>
            <Flex align="center" style={{ padding: "2cqmax" }}>
              <Col span={12} className="form-col">
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  {/* Weight Field */}
                  <Form.Item<IndexPageFormType>
                    name="weight"
                    rules={[{ required: true, message: 'Please enter total weight !' }]}
                  >
                    <CustomInputs placeholder="Total Weight" type="number" size="large" addonAfter={weightUnits} onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Length Field */}
                  <Form.Item<IndexPageFormType>
                    name="length"
                    rules={[{ required: true, message: 'Please enter length !' }]}
                  >
                    <CustomInputs placeholder="Length" type="number" size="large" addonAfter={dimensions} onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Breadth Filed */}
                  <Form.Item<IndexPageFormType>
                    name="breadth"
                    rules={[{ required: true, message: 'Please enter breadth !' }]}
                  >
                    <CustomInputs placeholder="Breadth" type="number" size="large" addonAfter={dimensions} onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Height Field */}
                  <Form.Item<IndexPageFormType>
                    name="height"
                    rules={[{ required: true, message: 'Please enter height !' }]}
                  >
                    <CustomInputs placeholder="Height" type="number" size="large" addonAfter={dimensions} onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item>
                    <CustomButton type="primary" htmlType="submit" size="middle" text="Calculate" onClick={() => {}} />
                </Form.Item>

                </Form>
              </Col>

              <Col span={12}>
                  <Text className="calculate-rate-text">
                    *Cheapest Fare : <br /> <span id="rate-fare-span">&#x20b9; 992/-</span>
                  </Text>
              </Col>
            </Flex>
          </Col>

          {/* Heavy Cargo */}
          <Col span={24} className="index-col">
            <Suspense fallback=""><Heading text="Heavy Cargo ?" /></Suspense>

            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                style={{ maxWidth: 1000 }}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="form-col"
                >
                  {/* Name Field */}
                  <Form.Item<HeavyCargoFormType>
                    name="name"
                    rules={[{ required: true, message: 'Please enter name !' }]}
                  >
                    <CustomInputs placeholder="Full Name" type="text" size="large" onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Email Field */}
                  <Form.Item<HeavyCargoFormType>
                    name="email"
                    rules={[{ required: true, message: 'Please enter email !' }]}
                  >
                    <CustomInputs placeholder="Email-Id" type="email" size="large" onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Shipements Filed */}
                  <Form.Item<HeavyCargoFormType>
                    name="shipments"
                    rules={[{ required: true, message: 'Please enter shipments per month !' }]}
                  >
                    <CustomInputs placeholder="Shipments per month" type="number" size="large" onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Height Field */}
                  <Form.Item<HeavyCargoFormType>
                    name="destination"
                    rules={[{ required: true, message: 'Please enter destination country !' }]}
                  >
                    <CustomInputs placeholder="Destination Country" type="text" size="large" onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Weight Field */}
                  <Form.Item<HeavyCargoFormType>
                    name="weight"
                    rules={[{ required: true, message: 'Please enter approx weight !' }]}
                  >
                    <CustomInputs placeholder="Approx Weight" type="number" size="large" addonAfter={heavyCargoUnit} onChange={(e: string) => {console.log(e)}} />
                  </Form.Item>

                  {/* Submit Button */}
                  <Form.Item>
                    <CustomButton type="primary" htmlType="submit" size="middle" text="Submit" onClick={() => {}} />
                </Form.Item>

                </Form>

          </Col>

          {/* Contact us */}
          <Col span={24} className="index-col">
            <Suspense fallback=""><Heading text="Contact us" /></Suspense>
                {
                  ContactData.map((item, index) => {
                    return(
                      <KeyValueChips customKey={item.customKey} customValue={item.customValue} key={index} />
                    )
                  })
                }
          </Col>
          <Divider className="footer-divider" />
          <Text id="copyright-text">&#169;	Guru Internationals</Text>
    </Row>
  )
}

export default Index