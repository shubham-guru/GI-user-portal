import React, { Suspense, useRef, useState } from 'react'
import type { FormProps } from 'antd';
import { Col, Divider, Flex, Form, Image, Row, Typography } from "antd";
import img from "../../assets/index-img.jpg";
import { supplyChainData } from '../../domain/constants/supplyChainData';
import { dimensions, heavyCargoUnit, weightUnits } from '../../domain/constants/units';
import { IndexPageFormType, HeavyCargoFormType } from '../../domain/types/FormTypes';
import KeyValueChips from '../hocs/KeyValueChips/KeyValueChips';
import { ContactData } from '../../domain/constants/contactData';
import { calculateFare } from '../../data/helpers/CalculateFare';
import { routes } from '../../domain/constants/routes';
import { useNavigate } from 'react-router-dom';
import useWindowWidth from '../../data/helpers/InnerWidth';

import "./styles/index.css";

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const Navbar = React.lazy(() => import("../components/Navbar"));
const SupplyChainCards = React.lazy(() => import("../hocs/SupplyChainCards/SupplyChainCards"));
const Heading = React.lazy(() => import("../hocs/Heading/Heading"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));
const CustomModal = React.lazy(() => import("../hocs/Modal/CustomModal"));
const Loader = React.lazy(() => import("../hocs/Loader/Loader"));

const Index = () => {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const targetFareRef = useRef<HTMLDivElement>(null);
  const targetContactRef = useRef<HTMLDivElement>(null);

  const [calculateData, setCalculateData] = useState({
    totalWeight: 0,
    length: 0,
    breadth: 0,
    height: 0
  });
  const [heavyCargoData, setHeavyCargoData] = useState({
    fullName: "",
    email: "",
    shipments: "",
    destination: "",
    weight: ""
  });


  const [unit, setUnit] = useState<string | undefined>("");
  const [fare, setFare] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  const handleOk = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Getting inner width of the browser
  const windowWidth = useWindowWidth();

  const scrollToCalculator = () => {
    if (targetFareRef.current) {
      targetFareRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToContact = () => {
    if (targetContactRef.current) {
      targetContactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  // Checking if object contains 0
  const isAnyValueZero = (obj: IndexPageFormType) => {
    return Object.values(obj).some(value => value === 0);
  };

  const onFinish: FormProps<IndexPageFormType>['onFinish'] = () => {
    // Converting Grams into Kg and calculating fare
    if (!unit || unit === weightUnits[0]) {
      setFare(calculateFare(calculateData.totalWeight * 0.001))
    } else if (unit === weightUnits[1]) {
      setFare(calculateFare(calculateData.totalWeight));
    }

    const lengthConversions: { [key: string]: number } = {
      [dimensions[1]]: 100,
      [dimensions[2]]: 30.48,
      [dimensions[3]]: 2.54,
    };

    if (unit && unit in lengthConversions) {
      const conversionFactor = lengthConversions[unit];
      setCalculateData({
        ...calculateData,
        length: calculateData.length * conversionFactor,
        breadth: calculateData.breadth * conversionFactor,
        height: calculateData.height * conversionFactor,
      });
    }

    if (windowWidth <= 425) {
      handleOk();
    }
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 5000); // 5 seconds
  };

  const onHeavyCargoFinish: FormProps<HeavyCargoFormType>['onFinish'] = (value) => {
    console.log("🚀 ~ Index ~ value:", value)
  };

  const onFinishFailed: FormProps<IndexPageFormType | HeavyCargoFormType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


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
      case "Full Name":
        setHeavyCargoData({ ...heavyCargoData, fullName: e.value })
        break;
      case "Email-Id":
        setHeavyCargoData({ ...heavyCargoData, email: e.value })
        break;
      case "Shipments per month":
        setHeavyCargoData({ ...heavyCargoData, shipments: e.value })
        break;
      case "Destination Country":
        setHeavyCargoData({ ...heavyCargoData, destination: e.value })
        break;
      case "Approx Weight":
        setHeavyCargoData({ ...heavyCargoData, weight: e.value })
        break;
    }
  }

  return (
    <Row gutter={[0, 30]}>
      {/* Navbar with logo and buttons */}
      <Col span={24}>
        <Suspense fallback=""><Navbar /></Suspense>
      </Col>

      {/* Hero Section */}
      <Col span={24}>
        <Flex align="center" justify="center">
          {windowWidth! >= 427 ? <Image preview={false} src={img} alt="index-img" id="hero-img" /> : null}
          <Flex vertical align="center">
            <Text className="hero-text">
              Ship <span id="hero-span1"> 2.5kg </span>in just <br /> <span id="hero-span2">&#x20b9;999/- </span> <br />from India to USA
            </Text>
            <Flex justify="space-between" align="center" style={windowWidth! >= 427 ? {} : { width: "100%" }}>
              <Suspense fallback=""><CustomButton type="primary" hidden={windowWidth! >= 427} size="middle"
                text="Login" onClick={() => navigate(routes.LOGIN)} /></Suspense>
              <Suspense fallback=""><CustomButton type="primary" size="middle" text="Calculate Rate" onClick={scrollToCalculator} /></Suspense>
              <Suspense fallback=""><CustomButton type="default" hidden={windowWidth! >= 427} size="middle" text="Let's Talk"
                onClick={scrollToContact} /></Suspense>
            </Flex>
          </Flex>
        </Flex>
      </Col>

      {/* Supply Chain Steps Cards */}
      <Col span={24} className="supply-chain-col">
        <Text type='secondary' className="supply-title-text">“the most lightest supply chain” </Text>
      </Col>
      {
        supplyChainData.map((item, index: number) => {
          return (
            <Col key={index} xs={24} md={12} lg={8} className="supply-chain-data-card">
              <Suspense fallback=""><SupplyChainCards icon={item.icon} text={item.text} index={index} /></Suspense>
            </Col>
          )
        })
      }

      {/* Calculate Rates Form */}
      <Col span={24} className="index-col" ref={targetFareRef}>
        <Suspense fallback=""><Heading text="Get Instant Rates" /></Suspense>
        {!isCalculating ? <Flex align="center" style={{ padding: "2cqmax" }}>
          <Col xs={24} md={14} lg={12} className="form-col">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
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

              {/* Submit Button */}
              <Form.Item>
                <Suspense fallback=""><CustomButton type="primary" htmlType="submit" disabled={isAnyValueZero(calculateData)} size="middle" text="Calculate" onClick={() => { }} /></Suspense>
              </Form.Item>

            </Form>
          </Col>

          <Col xs={0} md={10} lg={12}>
            <Text className="calculate-rate-text">
              *Lighest Fare : <br /> <span id="rate-fare-span">&#x20b9; {fare.toFixed(1)}/- </span>
            </Text>
          </Col>

          <Suspense fallback="">
            <CustomModal title="Total Fare" isModalOpen={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} children={
              <Text className="calculate-rate-text">
                *Lighest Fare : <br /> <span id="rate-fare-span">&#x20b9; {fare.toFixed(1)}/-</span>
              </Text>} />
          </Suspense>

        </Flex> : <Suspense fallback=""><Loader text="Calculating Best Fare for you !" /></Suspense>}
      </Col>

      {/* Heavy Cargo Form */}
      <Col span={24} className="index-col">
        <Suspense fallback=""><Heading text="Heavy Cargo ?" /></Suspense>
        <Col span={24} className="form-col">
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onHeavyCargoFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            {/* Name Field */}
              <Suspense fallback="">
                <CustomInputs
                  addonUnit={() => { }}
                  placeholder="Full Name"
                  type="text"
                  name="fullName"
                  onChange={(e: EventTarget) => handleFormData(e)}
                  value={heavyCargoData.fullName}
                  rules={[{ required: true, message: 'Please enter name !' }]}
                />
              </Suspense>

            {/* Email Field */}
              <Suspense fallback="">
                <CustomInputs
                  addonUnit={() => { }}
                  placeholder="Email-Id"
                  type="email"
                  name="email"
                  onChange={(e: EventTarget) => handleFormData(e)}
                  value={heavyCargoData.email}
                  rules={[{ required: true, message: 'Please enter name !' }]}
                />
              </Suspense>

            {/* Shipments Field */}
              <Suspense fallback="">
                <CustomInputs
                  addonUnit={() => { }}
                  placeholder="Shipments per month"
                  type="text"
                  name="shipments"
                  rules={[{ required: true, message: 'Please enter shipments per month !' }]}
                  onChange={(e: EventTarget) => handleFormData(e)}
                  value={heavyCargoData.shipments}
                />
              </Suspense>

            {/* Destination Field */}
              <Suspense fallback="">
                <CustomInputs
                  addonUnit={() => { }}
                  placeholder="Destination Country"
                  type="text"
                  name="destination"
                  rules={[{ required: true, message: 'Please enter destination country !' }]}
                  onChange={(e: EventTarget) => handleFormData(e)}
                  value={heavyCargoData.destination}
                />
              </Suspense>

            {/* Weight Field */}
              <Suspense fallback="">
                <CustomInputs
                  addonUnit={() => { }}
                  placeholder="Approx Weight"
                  type="text"
                  rules={[{ required: true, message: 'Please enter approx weight !' }]}
                  name="weight"
                  addonAfter={heavyCargoUnit}
                  onChange={(e: any) => setHeavyCargoData({ ...heavyCargoData, weight: e.value })}
                  value={heavyCargoData.weight}
                />
              </Suspense>

            {/* Submit Button */}
            <Suspense fallback="">
              <CustomButton type="primary" htmlType="submit" size="middle" text="Submit" onClick={() => { }} />
            </Suspense>
          </Form>
        </Col>

      </Col>

      {/* Contact us */}
      <Col span={24} className="index-col" ref={targetContactRef}>
        <Suspense fallback=""><Heading text="Contact us" /></Suspense>
        {
          ContactData.map((item, index) => {
            return (
              <KeyValueChips customKey={item.customKey} customValue={item.customValue} key={index} />
            )
          })
        }
      </Col>
      <Divider className="footer-divider" />
      <Col span={24}>
        <Flex justify="space-around">
          <Text id="copyright-text">&#169;	Guru Internationals</Text>
          <Link id="copyright-text" onClick={() => navigate(routes.PRIVACY_POLICY)}>Privacy Policy</Link>
        </Flex>
      </Col>
    </Row>
  )
}

export default Index