import React, { Suspense, useState } from 'react';
import { Checkbox, Flex, Form, FormProps, notification, Row, Typography } from 'antd'

import CustomButton from '../hocs/Button/CustomButton';
import { AddressPersonalInfoType, AddressType } from '../../domain/types/FormTypes';

import "./styles/dashboard.css";

const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const Dashboard = () => {
  const { Text } = Typography;
  const [api, contextHolder] = notification.useNotification();

  const [userDetails, setUserDetails] = useState<AddressPersonalInfoType>({
    fullName: "",
    email: "",
    phone: "",
    alternatePhone: ""
  })

  const [addressDetails, setAddressDetails] = useState<AddressType>({
    companyName: "",
    completeAddress: "",
    pinCode: "",
    city: "",
    state: "",
    country: "India"
  })

  const openNotificationWithIcon = (type: NotificationType, message: string, desp: string) => {
    api[type]({
      message: message,
      description: desp,
    });
  };
  
  const onFinish: FormProps<AddressPersonalInfoType>['onFinish'] = (value) => {
    console.log("🚀 ~ Dashboard ~ value:", value)
  };

  const onFinishFailed: FormProps<AddressPersonalInfoType | AddressType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row>
      {contextHolder}
      <Text className="dashboard-pick-add-text">Enter Primary Pick Address</Text>
      <Flex className="dashboard-flex">
        {/* Personal Information Form */}
        <fieldset className="dashboard-fieldset">
          <legend>Personal Information</legend>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
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

            {/* Alternate Phone */}
            <Suspense fallback=""><CustomInputs placeholder="Alternate Phone"
              type="text"
              name="alternatePhone"
              rules={[{ required: false }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setUserDetails({ ...userDetails, alternatePhone: e.value })}
              value={userDetails.alternatePhone} /></Suspense>

            {/* Submit Button */}
            <Form.Item>
              <Suspense fallback=""><CustomButton type="primary" htmlType="submit" size="middle" text="Save" onClick={() => openNotificationWithIcon("success", "Successfully Saved", "Your personal info is saved. You can edit this in future")} /></Suspense>
            </Form.Item>
          </Form>

        </fieldset>

        {/* Address Information Form */}
        <fieldset className="dashboard-fieldset">
          <legend>Address Information</legend>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            {/* Company Name */}
            <Suspense fallback=""><CustomInputs placeholder="Company Name"
              type="text"
              name="companyName"
              rules={[{ required: true, message: 'Please enter company name !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, companyName: e.value })}
              value={addressDetails?.companyName || ""} /></Suspense>

            {/* Complete Address */}
            <Suspense fallback=""><CustomInputs placeholder="Complete Address - Street no / Building no, Street no, Area"
              type="text"
              name="completeAddress"
              rules={[{ required: true, message: 'Please enter complete address !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, completeAddress: e.value })}
              value={addressDetails.completeAddress} /></Suspense>

            <Flex justify="space-between">
            {/* Pin Code */}
            <Suspense fallback=""><CustomInputs placeholder="Pin Code"
              type="number"
              name="pinCode"
              rules={[{ required: true, message: 'Please enter pin code !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, pinCode: e.value })}
              value={addressDetails.pinCode} /></Suspense>

            {/* City */}
            <Suspense fallback=""><CustomInputs placeholder="City"
              type="text"
              name="city"
              rules={[{ required: true, message: 'Please enter city !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, city: e.value })}
              value={addressDetails.city} /></Suspense>
            </Flex>

            <Flex justify="space-between">
            {/* State */}
            <Suspense fallback=""><CustomInputs placeholder="State"
              type="text"
              name="state"
              rules={[{ required: true, message: 'Please enter state !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, state: e.value })}
              value={addressDetails.state} /></Suspense>

            {/* Country */}
            <Suspense fallback=""><CustomInputs placeholder="Country"
              type="text"
              name="country"
              rules={[{ required: true, message: 'Please enter country !' }]}
              addonUnit={() => { }}
              label
              onChange={(e: any) => setAddressDetails({ ...addressDetails, country: e.value })}
              value={addressDetails.country} /></Suspense>
            </Flex>
          <Checkbox onChange={() => {}}>Default Pickup Address</Checkbox>

            {/* Submit Button */}
            <Form.Item>
              <Suspense fallback=""><CustomButton type="primary" htmlType="submit" size="middle" text="Save" onClick={() => openNotificationWithIcon("success", "Successfully Saved", "Your Address has been saved. You can update and delete this address if required")} /></Suspense>
            </Form.Item>
          </Form>
        </fieldset>


      </Flex>
    </Row>
  )
}

export default Dashboard