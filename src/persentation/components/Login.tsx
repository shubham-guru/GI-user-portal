import React, { Suspense, useState } from 'react'
import { Col, Form, FormProps, Row, Typography } from 'antd'
import { LoginDataFormType } from '../../domain/types/FormTypes';
import { useNavigate } from 'react-router-dom';

import { routes } from '../../domain/constants/routes';


const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const Login = () => {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });


  const onFinish: FormProps<LoginDataFormType>['onFinish'] = (value) => {
    console.log("🚀 ~ Login ~ value:", value)
  };


  const onFinishFailed: FormProps<LoginDataFormType>['onFinishFailed'] = (errorInfo) => {
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
          <Form.Item<LoginDataFormType>
            name="email"
            initialValue={loginData.email}
            rules={[{ required: true, message: 'Please enter your email !' }]}
          >
            <Suspense fallback=""> <CustomInputs placeholder="Email-Id"
              type="email"
              onChange={(e: any) => setLoginData({ ...loginData, email: e.value })}
              addonUnit={() => { }}
              size="large"
              value={loginData.email}
            /> </Suspense>
          </Form.Item>

          <Form.Item<LoginDataFormType>
            name="password"
            initialValue={loginData.password}
            rules={[{ required: true, message: 'Please enter your password !' }]}
          >
            <Suspense fallback=""><CustomInputs placeholder="Password"
              type="password"
              size="large"
              onChange={(e: any) => setLoginData({ ...loginData, password: e.value })}
              addonUnit={() => { }}
              value={loginData.password}
            /></Suspense>
          </Form.Item>

          <Form.Item>
            <Suspense fallback="">
              <CustomButton type="primary" htmlType="submit" size="middle" text="Login" onClick={()=>{}} />
            </Suspense>
          </Form.Item>


        </Form>
        <Text type="secondary">
          Not Registered ? Start selling internationally - <Link onClick={() => navigate(routes.SIGNUP)}>Register</Link>
        </Text>
      </Col>
    </Row>
  )
}

export default Login