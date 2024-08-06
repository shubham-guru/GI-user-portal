import { Menu, Image, Divider } from 'antd'
import SideBarData from '../../../domain/constants/sideBarData';
import Sider from 'antd/es/layout/Sider';
import logo from "../../../assets/SB.png";
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../domain/constants/routes';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearAddresses } from '../../../redux/slice/addressSlice';
import { clearUserInfo } from '../../../redux/slice/userDataSlice';
import { clearOrderDetails } from '../../../redux/slice/orderDetailsSlice';
import { clearUserOrders } from '../../../redux/slice/userOrders';

import "./sidebar.css"

const SideBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedKey, setSelectedKey] = useState<number>(0);
    const url = window.location.pathname;

    useEffect(() => {
        if(url.includes(routes.DASHBOARD)) setSelectedKey(0)
        if(url.includes(routes.ORDERS)) setSelectedKey(1)
        if(url.includes(routes.INVENTORY)) setSelectedKey(2)
        if(url.includes(routes.ACCOUNT_DETAILS)) setSelectedKey(3)
        if(url.includes(routes.RATECALCULATOR)) setSelectedKey(4)
        if(url.includes(routes.HEAVYCARGO)) setSelectedKey(5)
        if(url.includes(routes.PAYMENTS)) setSelectedKey(6)
  }, [url, selectedKey]);

    const handleMenuClick = (e: { key: string }) => {
        if(e.key !== routes.LOGOUT){
            navigate(e.key)
        } else {
            dispatch(clearAddresses());
            dispatch(clearUserInfo());
            dispatch(clearOrderDetails());
            dispatch(clearUserOrders());
            navigate(routes.LOGIN)
        }
    };

    return (
            <Sider trigger={null} collapsible className='sidebar-container' width={230}>
                <div className="side-bar-div">
                    <Image src={logo} preview={false} alt="logo" onClick={() => navigate(routes.DASHBOARD)} width={120} style={{ cursor: "pointer" }}/>
                </div>
                <Divider />
                <Menu
                    mode="inline"
                    defaultSelectedKeys={[url]}
                    items={SideBarData}
                    onClick={handleMenuClick}
                />
            </Sider>
           
    )
}

export default SideBar