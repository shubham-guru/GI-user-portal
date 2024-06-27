import React, { Suspense } from 'react'
import { Col, Flex, Image, Row } from 'antd'
import logo from "../../assets/GI_LOGO_BLACK.png"
import { useNavigate } from 'react-router-dom';

import "./styles/navbar.css"
import { routes } from '../../domain/constants/routes';

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <Row className="navbar-row">
        <Col xs={24} md={16} lg={18}>
            <Image preview={false} onClick={() => navigate(routes.INDEX)} src={logo} alt="logo" id="logo-img" />
        </Col>

        <Col xs={0} md={8} lg={6}>
            <Flex justify="space-evenly" align="center">
                <Suspense fallback=""><CustomButton type="primary" size="middle" text="Login" onClick={() => navigate(routes.LOGIN)}/></Suspense>
                <Suspense fallback=""><CustomButton type="default" size="middle" text="Let's Talk" onClick={() => navigate(routes.SIGNUP)}/></Suspense>
            </Flex>
        </Col>
    </Row>
  )
}

export default Navbar