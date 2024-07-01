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
            <Suspense fallback=""> 
            <CustomInputs placeholder="Email-Id"
              type="email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email !' }]}
              onChange={(e: any) => setLoginData({ ...loginData, email: e.value })}
              addonUnit={() => { }}
              value={loginData.email}
            /> </Suspense>

            <Suspense fallback=""><CustomInputs placeholder="Password"
              type="password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password !' }]}
              onChange={(e: any) => setLoginData({ ...loginData, password: e.value })}
              addonUnit={() => { }}
              value={loginData.password}
            /></Suspense>

            <Suspense fallback="">
              <CustomButton type="primary" htmlType="submit" size="middle" text="Login" onClick={()=>{}} />
            </Suspense>

        </Form>
        
        <Text type="secondary">
          Not Registered ? Start selling internationally - <Link onClick={() => navigate(routes.SIGNUP)}>Register</Link>
        </Text>
      </Col>
    </Row>
  )
}

export default Login