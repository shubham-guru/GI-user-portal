import React, { useState } from "react"
import { Col, Form, FormProps, Row, Typography } from 'antd'
import { Suspense } from "react"
import { useNavigate } from "react-router-dom"
import { routes } from "../../domain/constants/routes"
import { SignupFormType } from "../../domain/types/FormTypes"
import { Query } from "../../data/ApiQueries/Query"
import { HttpMethods } from "../../domain/constants/httpMethods"
import { apiRoutes } from "../../data/routes/apiRoutes"
import { Alert } from "../hocs/Alert/Alert"
import { registerType } from "../../domain/constants/registerTypes"


const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const SignUp = () => {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    phone: ""
  })

  const onFinish: FormProps<SignupFormType>['onFinish'] = async (value) => {
      setLoading(true);
      if(value.password !== value.cPassword){
        Alert("error", "Password does not match");
        setLoading(false);
      } 
      if(value.password.length < 6) {
        Alert("error", "Password must be more than 6 letters");
        setLoading(false);
      }
      
      else {
        const body = {
          fullName: value.name,
          email: value.email,
          password: value.password,
          phone: value.phone,
          registeredFrom: registerType.MANUAL
        }
        await Query(HttpMethods.POST, apiRoutes.CREATE_USER, body).then((res) => {
          if(res.status === 200){
            Alert("success", res?.data?.message);
            setLoading(false);
            navigate(routes.LOGIN)
          } else {
            Alert("error", res?.data?.message);
            setLoading(false);
          }
        }).catch((err) => {
          console.log("🚀 ~ awaitQuery ~ err:", err)
        })
      }
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
            <Suspense fallback=""> <CustomInputs placeholder="Full Name"
              type="text"
              name="name"
              rules={[{ required: true, message: 'Please enter your name !' }]}
              onChange={(e: any) => setSignUpData({ ...signUpData, name: e.value })}
              addonUnit={() => { }}
              size="large"
              value={signUpData.name}
            /> </Suspense>

          {/* Email */}
            <Suspense fallback=""> <CustomInputs placeholder="Email-Id"
              type="email"
              name="email"
              rules={[{ required: true, message: 'Please enter your email !' }]}
              onChange={(e: any) => setSignUpData({ ...signUpData, email: e.value })}
              addonUnit={() => { }}
              size="large"
              value={signUpData.email}
            /> </Suspense>

          {/* Passowrd */}
            <Suspense fallback=""><CustomInputs placeholder="Password"
              type="password"
              size="large"
              name="password"
              rules={[{ required: true, message: 'Please enter your password !' }]}
              onChange={(e: any) => setSignUpData({ ...signUpData, password: e.value })}
              addonUnit={() => { }}
              value={signUpData.password}
            /></Suspense>

          {/* Confirm Password */}
            <Suspense fallback=""><CustomInputs placeholder="Confirm Password"
              type="password"
              size="large"
              name="cPassword"
              rules={[{ required: true, message: 'Please enter your confirm password !' }]}
              onChange={(e: any) => setSignUpData({ ...signUpData, cPassword: e.value })}
              addonUnit={() => { }}
              value={signUpData.cPassword}
            /></Suspense>

          {/* Phone */}
            <Suspense fallback=""> <CustomInputs placeholder="Phone"
              type="number"
              onChange={(e: any) => setSignUpData({ ...signUpData, phone: e.value })}
              addonUnit={() => { }}
              name="phone"
              rules={[{ required: true, message: 'Please enter your phone !' }]}
              size="large"
              value={signUpData.phone}
            /> </Suspense>

            <Suspense fallback="">
              <CustomButton type="primary" htmlType="submit" loading={loading} size="middle" text="Register" onClick={() => { }} />
            </Suspense>


        </Form>
        <Text type="secondary">
          Already selling internationally with us ? <Link onClick={() => navigate(routes.LOGIN)}>Login</Link>
        </Text>
      </Col>
    </Row>
  )
}

export default SignUp