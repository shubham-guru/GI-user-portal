import {
    CalculatorOutlined,
    DashboardOutlined,
    DollarOutlined,
    HomeOutlined,
    KeyOutlined,
    LogoutOutlined,
    RocketOutlined,
    UnorderedListOutlined,
  } from '@ant-design/icons';
import { routes } from './routes';

const SideBarData = [
    {
        key: routes.DASHBOARD,
        label: "Dashboard",
        icon: <DashboardOutlined />,
    },
    {
        key: routes.ORDERS,
        label: "Orders",
        icon: <UnorderedListOutlined />,
    },
    {
        key: routes.INVENTORY,
        label: "Inventory",
        icon: <HomeOutlined />,
    },
    {
        key: routes.ACCOUNT_DETAILS,
        label: "Account Details",
        icon: <KeyOutlined />,
    },
    {
        key: routes.RATECALCULATOR,
        label: "Rate Calculator",
        icon: <CalculatorOutlined />,
    },
    {
        key: routes.HEAVYCARGO,
        label: "Heavy Cargo",
        icon: <RocketOutlined />,
    },
    {
        key: routes.PAYMENTS,
        label: "Payments",
        icon: <DollarOutlined />,
    },
    {
        key: routes.LOGOUT,
        label: "Logout",
        icon: <LogoutOutlined />,
    }
]

export default SideBarData