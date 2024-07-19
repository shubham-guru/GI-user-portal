import React, { Suspense, useState } from 'react'
import { Col, Form, FormProps, Row, Typography } from 'antd'
import { LoginDataFormType } from '../../domain/types/FormTypes';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../domain/constants/routes';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { apiRoutes } from '../../data/routes/apiRoutes';
import { Alert } from '../hocs/Alert/Alert';
import { saveUserData } from '../../redux/slice/userDataSlice';
import { useDispatch } from 'react-redux';

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const CustomInputs = React.lazy(() => import("../hocs/InputFileds/CustomInputs"));

const Login = () => {
  const { Text, Link } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const onFinish: FormProps<LoginDataFormType>['onFinish'] = async (value) => {
    setLoading(true);
    const body = value;
    // Login Query
    await Query(HttpMethods.POST, apiRoutes.LOGIN, body).then((res) => {
      if(res.status === 200){
        Alert("success", res?.data?.message);
        const info = res?.data?.result?.rest;
        const token = res?.data?.token;
        setLoading(false);
        const data = {
          firstName: info.FULLNAME.split(" ")[0],
          lastName: info.FULLNAME.split(" ")[1],
          phone: info.PHONE,
          image: "",
          token: token,
          address: info.ADDRESS ?? "",
          isAgreement: info.IS_AGREEMENT
        }
        dispatch(saveUserData(data))
        if(!info.IS_AGREEMENT){
          navigate(routes.AGREEMENT)
        } else {
          navigate(routes.DASHBOARD)
        }
      } else {
        Alert("error", res?.data?.message);
        setLoading(false);
      }
    }).catch((err) => {
      console.log("🚀 ~ awaitQuery ~ err:", err)
    })
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
              <CustomButton type="primary" htmlType="submit" size="middle" loading={loading} text="Login" onClick={()=>{}} />
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