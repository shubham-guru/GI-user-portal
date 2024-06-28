import React, { ReactNode, useEffect, useState } from 'react';
import { Row, Col, Image, Flex, Typography, Divider } from "antd";
import authImage from "../../assets/authImage.jpg";
import googleLogo from "../../assets/google.svg";
import microsoftLogo from "../../assets/microsoft.svg";
import Heading from '../hocs/Heading/Heading';
import { routes } from '../../domain/constants/routes';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { Query } from '../../data/ApiQueries/Query';
import { HttpMethods } from '../../domain/constants/httpMethods';
import { useNavigate } from 'react-router-dom';

import "./styles/authLayoutPage.css";

type IAuthLayoutPage = {
  children: ReactNode;
};

const AuthLayoutPage: React.FC<IAuthLayoutPage> = ({ children }) => {

  const googleUrl = import.meta.env.VITE_GOOGLE_USER_AUTH_URL;
  const { Text, Title } = Typography;
  const url = window.location.href;
  const navigate = useNavigate();
  const [heading, setHeading] = useState<string>("");
  const [user, setUser] = useState<TokenResponse | null>(null);

  useEffect(() => {
    if (url.includes(routes.LOGIN)) {
      setHeading("Login")
    } else {
      setHeading("Register")
    }
  }, [url]);

  const googleAuth = useGoogleLogin({
    onSuccess: (codeResponse: TokenResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error),
  });


  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const url = `${googleUrl}${user.access_token}`;
          const token = user.access_token;

          const userData = await Query(HttpMethods.GET, url, token);

          if (userData && userData.status === 200) {
            console.log("🚀 ~ userData:", userData.data);
            navigate(routes.AGREEMENT)
          } else {
            console.error('Failed to fetch user data:', userData.statusText || userData.message);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <Row className="auth-layout-container">
      <Flex align="center" justify="space-between">
        <Col span={12} className="image-col">
          <Image src={authImage} alt="auth-page-image" preview={false} />
        </Col>

        <Col span={12} className="login-auth-layout-col">
          <Heading text="GURU INTERNATIONALS" fontWeight={500} />
          <Text type="secondary">The most lightest supply chain for your products</Text>
          <Divider />
          <Title level={3}>{heading}</Title>
          <div className="login-auth-layout-div">
            <Flex align="center" justify="space-evenly">
              <Image src={googleLogo} style={{ cursor: "pointer" }} onClick={()=>googleAuth()} alt="google-logo" preview={false} width={40} />
              <Image src={microsoftLogo} style={{ cursor: "pointer" }} alt="microsoft-logo" preview={false} width={40} />
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
