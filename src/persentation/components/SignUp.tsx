import React, { useState } from "react"
import { Col, Form, FormProps, Row, Typography } from 'antd'
import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../domain/constants/routes"
import { SignupFormType } from "../../domain/types/FormTypes"


const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const SignUp = () => {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: ""
  })

  const onFinish: FormProps<SignupFormType>['onFinish'] = (value) => {
  console.log("🚀 ~ SignUp ~ value:", value)
  }

  const onFinishFailed: FormProps<SignupFormType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row className="auth-row">
      <Col span={24}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* Name */}
          <Form.Item<SignupFormType>
            name="name"
            initialValue={signUpData.name}
            rules={[{ required: true, message: 'Please enter your name !' }]}
          >
            <Suspense fallback=""> <CustomInputs placeholder="Full Name"
              type="text"
              onChange={(e: any) => setSignUpData({ ...signUpData, name: e.value })}
              addonUnit={() => { }}
              size="large"
              value={signUpData.name}
            /> </Suspense>
          </Form.Item>

          {/* Email */}
          <Form.Item<SignupFormType>
            name="email"
            initialValue={signUpData.email}
            rules={[{ required: true, message: 'Please enter your email !' }]}
          >
            <Suspense fallback=""> <CustomInputs placeholder="Email-Id"
              type="email"
              onChange={(e: any) => setSignUpData({ ...signUpData, email: e.value })}
              addonUnit={() => { }}
              size="large"
              value={signUpData.email}
            /> </Suspense>
          </Form.Item>

          {/* Passowrd */}
          <Form.Item<SignupFormType>
            name="password"
            initialValue={signUpData.password}
            rules={[{ required: true, message: 'Please enter your password !' }]}
          >
            <Suspense fallback=""><CustomInputs placeholder="Password"
              type="password"
              size="large"
              onChange={(e: any) => setSignUpData({ ...signUpData, password: e.value })}
              addonUnit={() => { }}
              value={signUpData.password}
            /></Suspense>
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item<SignupFormType>
            name="cPassword"
            initialValue={signUpData.cPassword}
            rules={[{ required: true, message: 'Please enter your confirm password !' }]}
          >
            <Suspense fallback=""><CustomInputs placeholder="Confirm Password"
              type="password"
              size="large"
              onChange={(e: any) => setSignUpData({ ...signUpData, cPassword: e.value })}
              addonUnit={() => { }}
              value={signUpData.cPassword}
            /></Suspense>
          </Form.Item>

          {/* Phone */}
          <Form.Item<SignupFormType>
            name="phone"
            initialValue={signUpData.phone}
            rules={[{ required: true, message: 'Please enter your phone !' }]}
          >
            <Suspense fallback=""> <CustomInputs placeholder="Phone"
              type="number"
              onChange={(e: any) => setSignUpData({ ...signUpData, phone: e.value })}
              addonUnit={() => { }}
              size="large"
              value={signUpData.phone}
            /> </Suspense>
          </Form.Item>

          <Form.Item>
            <Suspense fallback="">
              <CustomButton type="primary" htmlType="submit" size="middle" text="Register" onClick={() => { }} />
            </Suspense>
          </Form.Item>


        </Form>
        <Text type="secondary">
          Already selling internationally with us ? <Link onClick={() => navigate(routes.LOGIN)}>Login</Link>
        </Text>
      </Col>
    </Row>
  )
}

export default SignUp