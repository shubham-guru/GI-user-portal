import React, { ReactNode, Suspense, useEffect, useState } from 'react'
import { Flex, Image, Layout, theme, Typography } from 'antd'
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/GI_LOGO_BLACK.png";
import { routes } from '../../domain/constants/routes';
import { Content } from 'antd/es/layout/layout';
import { PlusCircleOutlined } from '@ant-design/icons';

import "./styles/mainLayoutPage.css";

type IMainLayoutPage = {
    children: ReactNode
}

const ProfilePopup = React.lazy(() => import("../hocs/ProfilePopup/ProfilePopup"));
const SideBar = React.lazy(() => import("../hocs/SideBar/SideBar"));
const CustomButton = React.lazy(() => import("../hocs/Button/CustomButton"));
const AddOrders = React.lazy(() => import("../components/AddOrders"));

const MainLayoutPage: React.FC<IMainLayoutPage> = ({ children }) => {

    const url = window.location.href;
    const navigate = useNavigate();
    const { Text } = Typography;
    const [href, setHref] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);

    // If Agreement page then logo will navigate to index page else dashboard
    useEffect(() => {
        if (url.includes(routes.AGREEMENT)) {
            setHref(routes.INDEX)
        } else {
            setHref(routes.DASHBOARD)
        }
    }, [url]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{height: "100vh", overflowY: "hidden"}}>
            {
                !url.includes(routes.AGREEMENT) ? <Suspense fallback=""><SideBar /></Suspense> : null
            }
            <Layout>
                <Flex align="center" justify="space-between" className="main-layout-flex">
                    {
                        url.includes(routes.AGREEMENT) ?
                            <Image src={logo} preview={false} alt="logo" width={200} style={{ cursor: "pointer" }} onClick={() => navigate(href)} /> :
                            <Suspense fallback=""><CustomButton type="primary" text="Add Order" size="middle" onClick={() => setShowModal(true)} icon={<PlusCircleOutlined />} /></Suspense>
                    }
                    <Text type="secondary" id="main-layout-nav-text">Start Selling Internationally</Text>
                    <Suspense fallback=""><ProfilePopup /></Suspense>
                </Flex>
                <Content
                    className="side-bar-content"
                    style={{
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}

                    {
                        showModal ? <Suspense fallback=""><AddOrders isOpen={showModal} onCancel={(value: boolean) => setShowModal(value)} /> </Suspense>: null
                    }
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayoutPage