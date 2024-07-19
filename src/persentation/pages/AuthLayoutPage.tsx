import React, { ReactNode, useEffect, useState } from 'react';
import { Row, Col, Image, Flex, Typography, Divider } from "antd";
import authImage from "../../assets/authImage.jpg";
import googleLogo from "../../assets/google.svg";
import microsoftLogo from "../../assets/microsoft.svg";
import Heading from '../hocs/Heading/Heading';
import { routes } from '../../domain/constants/routes';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useMsal } from "@azure/msal-react";
import { useDispatch } from 'react-redux';
import { Query, ThirdPartyQuery } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../../authConfig';
import { saveUserData } from '../../redux/slice/userDataSlice';
import { UserData } from '../../domain/interfaces/UserData';

import { apiRoutes } from '../../data/routes/apiRoutes';
import { Alert } from '../hocs/Alert/Alert';
import { registerType } from '../../domain/constants/registerTypes';
import "./styles/authLayoutPage.css";

type IAuthLayoutPage = {
  children: ReactNode;
};

const AuthLayoutPage: React.FC<IAuthLayoutPage> = ({ children }) => {

  const googleUrl = import.meta.env.VITE_GOOGLE_USER_AUTH_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Text, Title } = Typography;
  const { instance } = useMsal();
  const url = window.location.href;
  const [heading, setHeading] = useState<string>("");

  useEffect(() => {
    if (url.includes(routes.LOGIN)) {
      setHeading("Login")
    } else {
      setHeading("Register")
    }
  }, [url]);


  const googleAuth = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      fetchUserData(codeResponse)
    },
    onError: (error) => console.log('Login Failed:', error),
  });

  const microsoftAuth = () => {
    instance.loginPopup(loginRequest).catch(e => {
      console.error(e);
    });
  };

  const fetchUserData = async (data: TokenResponse) => {
    if (data) {
      try {
        const url = `${googleUrl}${data.access_token}`;
        const token = data.access_token;
        
        // Google Authentication
        await ThirdPartyQuery(HttpMethods.GET, url, token).then(async (res) => {
            if(res?.status === 200) {
              const info = res?.data;

              const data: UserData = {
                firstName: info.given_name,
                lastName: info.family_name,
                image: info.picture,
                verifiedEmail: info.verified_email,
              }
              const registerBody = {
                fullName: data.firstName+ " " +data.lastName,
                password: data.id,
                phone: data.phone,
                image: data.image,
                registeredFrom: registerType.GOOGLE
              }
              const loginBody = {
                email: info.email,
                password: info.id
              }
              heading === "Register" ? 
              // GOOGLE REGISTER QUERY
              await Query(HttpMethods.POST, apiRoutes.CREATE_USER, registerBody).then((res) => {
                if(res.status === 200) {
                  Alert("success", res?.data?.message);
                  dispatch(saveUserData(data));
                  // setLoading(false);
                  navigate(routes.AGREEMENT)
                } else {
                  Alert("error", res?.data?.message);
                  // setLoading(false);
                }
              }).catch((err) => {
                console.log("🚀 ~ awaitQuery ~ err:", err)
              }) : 

              // GOOGLE LOGIN QUERY
              await Query(HttpMethods.POST, apiRoutes.LOGIN, loginBody).then((res) => {
                if(res.status === 200) {
                  Alert("success", res?.data?.message);
                  const info = res?.data?.result?.rest;
                  data.token = res?.data?.result?.token;
                  data.address = res?.data?.result?.rest?.ADDRESS;
                  // setLoading(false);
                  dispatch(saveUserData(data))
                  if(!info.IS_AGREEMENT){
                    navigate(routes.AGREEMENT)
                  } else {
                    navigate(routes.DASHBOARD)
                  }
                } else {
                  Alert("error", res?.data?.message);
                  // setLoading(false);
                }
              }).catch((err) => {
                console.log("🚀 ~ awaitQuery ~ err:", err)
              })
            }
        }).catch((err) => {
          console.error('Failed to fetch user data:', err.statusText || err.message);
        })

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };


  return (
    <Row className="auth-layout-container">
      <Flex align="center" justify="space-between">
        <Col xs={0} md={0} lg={12} className="image-col">
          <Image src={authImage} alt="auth-page-image" preview={false} id="auth-image" />
        </Col>

        <Col xs={24} md={24} lg={12} className="login-auth-layout-col">
          <Heading text="GURU INTERNATIONALS" fontWeight={500} />
          <Text type="secondary">The most lightest supply chain for your products</Text>
          <Divider />
          <Title level={3}>{heading}</Title>
          <div className="login-auth-layout-div">
            <Flex align="center" justify="space-evenly">
              <Image src={googleLogo} style={{ cursor: "pointer" }} onClick={()=>googleAuth()} alt="google-logo" preview={false} width={40} />
              <Image src={microsoftLogo} style={{ cursor: "pointer" }} alt="microsoft-logo" onClick={() => microsoftAuth()} preview={false} width={40} />
            </Flex>
            <Text>or</Text>
            {children}
          </div>
        </Col>
        
      </Flex>
    </Row>
  );
};

export default AuthLayoutPage;
