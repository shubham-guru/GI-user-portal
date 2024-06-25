import React, { SyntheticEvent } from 'react'
import { Col, Flex, Image, Row } from 'antd'
import logo from "../../assets/GI_LOGO_BLACK.png"
import { useNavigate } from 'react-router-dom';

import "./styles/navbar.css"
import { routes } from '../../domain/constants/routes';

const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));

const Navbar = () => {

    const navigate = useNavigate();

    const handleClick = (e: SyntheticEvent) => {
        console.log(e)
    }

  return (
    <Row className="navbar-row">
        <Col span={18}>
            <Image preview={false} onClick={() => navigate(routes.INDEX)} src={logo} alt="logo" width={220} />
        </Col>

        <Col span={6}>
            <Flex justify="space-evenly">
                <CustomButton type="primary" size="middle" text="Login" onClick={(e: SyntheticEvent) => handleClick(e)}/>
                <CustomButton type="default" size="middle" text="Let's Talk" onClick={(e: SyntheticEvent) => handleClick(e)}/>
            </Flex>
        </Col>
    </Row>
  )
}

export default Navbar