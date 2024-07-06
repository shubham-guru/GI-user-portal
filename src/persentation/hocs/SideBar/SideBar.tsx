import { Menu, Image, Divider } from 'antd'
import SideBarData from '../../../domain/constants/sideBarData';
import Sider from 'antd/es/layout/Sider';
import logo from "../../../assets/SB.png";
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../domain/constants/routes';

import "./sidebar.css"
import { useEffect, useState } from 'react';

const SideBar = () => {

    const navigate = useNavigate();
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const url = window.location.href;

    useEffect(() => {
        if(url.includes(routes.DASHBOARD)) setSelectedKey(0)
        if(url.includes(routes.ORDERS)) setSelectedKey(1)
        if(url.includes(routes.INVENTORY)) setSelectedKey(2)
        if(url.includes(routes.KYC)) setSelectedKey(3)
        if(url.includes(routes.RATECALCULATOR)) setSelectedKey(4)
        if(url.includes(routes.HEAVYCARGO)) setSelectedKey(5)
        if(url.includes(routes.PAYMENTS)) setSelectedKey(6)
  }, [url, selectedKey]);

    const handleMenuClick = (e: { key: string }) => {
        navigate(e.key)
    };

    return (
            <Sider trigger={null} collapsible className='sidebar-container' width={230}>
                <div className="side-bar-div">
                    <Image src={logo} preview={false} alt="logo" onClick={() => navigate(routes.DASHBOARD)} width={120} style={{ cursor: "pointer" }}/>
                </div>
                <Divider />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[SideBarData[selectedKey].key]}
                    items={SideBarData}
                    onClick={handleMenuClick}
                />
            </Sider>
           
    )
}

export default SideBar