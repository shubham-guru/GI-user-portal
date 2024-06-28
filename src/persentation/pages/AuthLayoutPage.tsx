import React, { ReactNode, useEffect, useState } from 'react';
import { Row, Col, Image, Flex, Typography, Divider } from "antd";
import authImage from "../../assets/authImage.jpg";
import googleLogo from "../../assets/google.svg";
import microsoftLogo from "../../assets/microsoft.svg";
import Heading from '../hocs/Heading/Heading';
import { routes } from '../../domain/constants/routes';

import "./styles/authLayoutPage.css";

type IAuthLayoutPage = {
  children: ReactNode;
};

const AuthLayoutPage: React.FC<IAuthLayoutPage> = ({ children }) => {
  const { Text, Title } = Typography;
  const url = window.location.href;
  const [heading, setHeading] = useState<string>("")

  useEffect(() => {
    if (url.includes(routes.LOGIN)) {
      setHeading("Login")
    } else {
      setHeading("Register")
    }
  }, [url]);

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
              <Image src={googleLogo} style={{ cursor: "pointer" }} alt="google-logo" preview={false} width={40} />
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
